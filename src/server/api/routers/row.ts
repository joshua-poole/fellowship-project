import { TRPCError } from "@trpc/server";
import { faker } from "@faker-js/faker";
import { DbNull } from "@prisma/client-runtime-utils";
import { rowId } from "~/lib/ids";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  RowGetByTableInputSchema,
  RowGetByTableOutputSchema,
  RowCreateInputSchema,
  RowCreateOutputSchema,
  RowBulkCreateInputSchema,
  RowBulkCreateOutputSchema,
  RowUpdateCellInputSchema,
  RowUpdateCellOutputSchema,
  RowDeleteInputSchema,
  RowDeleteOutputSchema,
} from "~/types/row";

type RowFilter = {
  columnId: string;
  operator: string;
  value?: string | number;
};

function buildFilterCondition(filter: RowFilter) {
  const { columnId, operator, value } = filter;
  const path = [columnId];

  switch (operator) {
    case "equals":
      return { values: { path, equals: value } };
    case "contains":
      return { values: { path, string_contains: String(value ?? "") } };
    case "not_contains":
      return { NOT: { values: { path, string_contains: String(value ?? "") } } };
    case "gt":
      return { values: { path, gt: value } };
    case "lt":
      return { values: { path, lt: value } };
    case "is_empty":
      return {
        OR: [
          { values: { path, equals: "" } },
          { NOT: { values: { path, not: DbNull } } },
        ],
      };
    case "is_not_empty":
      return {
        values: { path, not: "" },
        AND: { values: { path, not: DbNull } },
      };
    default:
      return {};
  }
}

function castValues(values: unknown): Record<string, string | number> {
  return (values ?? {}) as Record<string, string | number>;
}

const ownerWhere = (tableId: string, userId: string) => ({
  id: tableId,
  base: { userId },
});

export const rowRouter = createTRPCRouter({
  getByTable: protectedProcedure
    .input(RowGetByTableInputSchema)
    .output(RowGetByTableOutputSchema)
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: ownerWhere(input.tableId, ctx.session.user.id),
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Prisma JSON filter types are unresolvable by ESLint
      const conditions: any[] = [];

      if (input.search) {
        conditions.push({ values: { string_contains: input.search } });
      }

      if (input.filters) {
        conditions.push(...input.filters.map(buildFilterCondition));
      }

      const rows = await ctx.db.row.findMany({
        where: {
          tableId: input.tableId,
          ...(conditions.length > 0 && { AND: conditions as [] }),
        },
        orderBy: [
          ...(input.sorts?.map(
            (s) =>
              ({
                values: { path: [s.columnId], order: s.direction },
              }) as never,
          ) ?? []),
          { order: "asc" as const },
        ],
        skip: input.cursor ?? 0,
        take: input.limit + 1,
        select: { id: true, order: true, values: true },
      });

      let nextCursor: number | undefined;
      if (rows.length > input.limit) {
        rows.pop();
        nextCursor = (input.cursor ?? 0) + input.limit;
      }

      return {
        rows: rows.map((row) => ({
          id: row.id,
          order: row.order,
          values: castValues(row.values),
        })),
        nextCursor,
      };
    }),

  create: protectedProcedure
    .input(RowCreateInputSchema)
    .output(RowCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: ownerWhere(input.tableId, ctx.session.user.id),
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      const last = await ctx.db.row.findFirst({
        where: { tableId: input.tableId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const row = await ctx.db.row.create({
        data: {
          id: rowId(),
          tableId: input.tableId,
          order: (last?.order ?? -1) + 1,
          values: input.values ?? {},
        },
      });

      return { id: row.id, order: row.order, values: castValues(row.values) };
    }),

  bulkCreate: protectedProcedure
    .input(RowBulkCreateInputSchema)
    .output(RowBulkCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: ownerWhere(input.tableId, ctx.session.user.id),
        include: { columns: { select: { id: true, type: true } } },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      const last = await ctx.db.row.findFirst({
        where: { tableId: input.tableId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const startOrder = (last?.order ?? -1) + 1;
      const BATCH_SIZE = 5000;

      // Build all batches
      const batches: Parameters<typeof ctx.db.row.createMany>[0][] = [];
      for (let i = 0; i < input.count; i += BATCH_SIZE) {
        const batchSize = Math.min(BATCH_SIZE, input.count - i);
        const ids = new Set<string>();
        while (ids.size < batchSize) ids.add(rowId());

        batches.push({
          data: [...ids].map((id, j) => ({
            id,
            tableId: input.tableId,
            order: startOrder + i + j,
            values: Object.fromEntries(
              table.columns.map((col) => [
                col.id,
                col.type === "NUMBER"
                  ? faker.number.int({ min: 0, max: 10000 })
                  : faker.lorem.words({ min: 1, max: 3 }),
              ]),
            ),
          })),
          skipDuplicates: true,
        });
      }

      // Run all batches in parallel
      const results = await Promise.all(
        batches.map((batch) => ctx.db.row.createMany(batch)),
      );
      const created = results.reduce((sum, r) => sum + r.count, 0);

      return { count: created };
    }),

  updateCell: protectedProcedure
    .input(RowUpdateCellInputSchema)
    .output(RowUpdateCellOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const row = await ctx.db.row.findFirst({
        where: { id: input.rowId, table: { base: { userId: ctx.session.user.id } } },
      });

      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Row not found" });
      }

      const values = castValues(row.values);
      if (input.value === null) {
        delete values[input.columnId];
      } else {
        values[input.columnId] = input.value;
      }

      const updated = await ctx.db.row.update({
        where: { id: input.rowId },
        data: { values },
      });

      return { id: updated.id, values: castValues(updated.values) };
    }),

  delete: protectedProcedure
    .input(RowDeleteInputSchema)
    .output(RowDeleteOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const row = await ctx.db.row.findFirst({
        where: { id: input.id, table: { base: { userId: ctx.session.user.id } } },
      });

      if (!row) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Row not found" });
      }

      await ctx.db.row.delete({ where: { id: input.id } });
      return true;
    }),
});
