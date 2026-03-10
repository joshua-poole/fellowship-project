import { TRPCError } from "@trpc/server";
import { faker } from "@faker-js/faker";
import { DbNull } from "@prisma/client-runtime-utils";
import { rowId, rowIdFast } from "~/lib/ids";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  RowGetByTableInputSchema,
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

function numericIfPossible(value: string | number | undefined): string | number | undefined {
  if (value == null) return value;
  if (typeof value === "number") return value;
  const n = Number(value);
  return !isNaN(n) && value.trim() !== "" ? n : value;
}

function buildFilterCondition(filter: RowFilter) {
  const { columnId, operator, value } = filter;
  const path = [columnId];

  switch (operator) {
    case "equals":
      if (value == null) return {};
      return { values: { path, equals: numericIfPossible(value) } };
    case "contains":
      if (value == null || value === "") return {};
      return { values: { path, string_contains: String(value) } };
    case "not_contains":
      if (value == null || value === "") return {};
      return { NOT: { values: { path, string_contains: String(value) } } };
    case "gt":
      if (value == null) return {};
      return { values: { path, gt: numericIfPossible(value) } };
    case "lt":
      if (value == null) return {};
      return { values: { path, lt: numericIfPossible(value) } };
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

      const limit = input.cursor?.limit ?? input.limit;

      const rows = await ctx.db.row.findMany({
        where: {
          tableId: input.tableId,
          ...(input.cursor != null && { order: { gt: input.cursor.order } }),
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
        take: limit + 1,
        select: { id: true, order: true, values: true },
      });

      let nextCursor: { order: number; limit: number } | undefined;
      if (rows.length > limit) {
        rows.pop();
        nextCursor = { order: rows[rows.length - 1]!.order, limit };
      }

      const result = {
        rows: rows.map((row) => ({
          id: row.id,
          order: row.order,
          values: castValues(row.values),
        })),
        nextCursor,
      };

      return result;
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
        include: { columns: { select: { id: true, name: true, type: true } } },
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
      const now = new Date().toISOString();

      const rowsSql = [];
      for (let i = 0; i < input.count; i++) {
        const id = rowIdFast();
        const order = startOrder + i;
        const values: Record<string, string | number> = {};
        for (const col of table.columns) {
          if (col.type === "NUMBER") {
            values[col.id] = faker.number.int({ min: 0, max: 10000 });
          } else if (col.name.toLowerCase().includes("name")) {
            values[col.id] = faker.person.fullName();
          } else {
            values[col.id] = faker.lorem.sentences({ min: 1, max: 3 });
          }
        }
        const valuesJson = JSON.stringify(values).replace(/'/g, "''");
        rowsSql.push(`('${id}', '${input.tableId}', ${order}, '${valuesJson}'::jsonb, '${now}')`);
      }
      await ctx.db.$executeRawUnsafe(`
        INSERT INTO "Row" ("id", "tableId", "order", "values", "updatedAt")
        VALUES ${rowsSql.join(", ")};
      `);
      return { count: input.count };
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
