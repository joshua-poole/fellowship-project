import { TRPCError } from "@trpc/server";
import { faker } from "@faker-js/faker";
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

function buildRawFilterCondition(
  filter: RowFilter,
  params: (string | number)[],
): string | null {
  const { columnId, operator, value } = filter;
  // columnId is system-generated cuid — safe to interpolate
  const jsonPath = `"values"->>'${columnId}'`;

  switch (operator) {
    case "equals":
      if (value == null) return null;
      params.push(typeof value === "number" ? value.toString() : String(value));
      return `${jsonPath} = $${params.length}`;
    case "contains":
      if (value == null || value === "") return null;
      params.push(`%${value}%`);
      return `${jsonPath} ILIKE $${params.length}`;
    case "not_contains":
      if (value == null || value === "") return null;
      params.push(`%${value}%`);
      return `${jsonPath} NOT ILIKE $${params.length}`;
    case "gt":
      if (value == null) return null;
      params.push(typeof value === "number" ? value : Number(value));
      return `(${jsonPath})::numeric > $${params.length}`;
    case "lt":
      if (value == null) return null;
      params.push(typeof value === "number" ? value : Number(value));
      return `(${jsonPath})::numeric < $${params.length}`;
    case "is_empty":
      return `(${jsonPath} IS NULL OR ${jsonPath} = '')`;
    case "is_not_empty":
      return `(${jsonPath} IS NOT NULL AND ${jsonPath} != '')`;
    default:
      return null;
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

      const limit = input.cursor?.limit ?? input.limit;
      const hasSorts = input.sorts && input.sorts.length > 0;
      const hasFilters = input.filters && input.filters.length > 0;
      const hasSearch = !!input.search;

      // Use raw SQL when sorts/filters/search involve JSON fields
      // (Prisma doesn't support orderBy on JSON fields for PostgreSQL)
      if (hasSorts || hasFilters || hasSearch) {
        const params: (string | number)[] = [];
        const whereParts: string[] = [];

        params.push(input.tableId);
        whereParts.push(`"tableId" = $${params.length}`);

        // Only use cursor-based WHERE when not sorting (order field is sequential)
        if (input.cursor != null && !hasSorts) {
          params.push(input.cursor.order);
          whereParts.push(`"order" > $${params.length}`);
        }

        if (hasSearch) {
          params.push(`%${input.search!}%`);
          whereParts.push(`"values"::text ILIKE $${params.length}`);
        }

        if (hasFilters) {
          for (const f of input.filters!) {
            const cond = buildRawFilterCondition(f, params);
            if (cond) whereParts.push(cond);
          }
        }

        const orderParts = (input.sorts ?? []).map((s) => {
          // columnId is system-generated cuid, direction validated by zod — safe to interpolate
          // NULLS FIRST for ASC so empty cells appear before content (matching Airtable behavior)
          return `NULLIF("values"->>'${s.columnId}', '') ${s.direction === "desc" ? "DESC NULLS LAST" : "ASC NULLS FIRST"}`;
        });
        orderParts.push(`"order" ASC`);

        params.push(limit + 1);
        const limitParamIdx = params.length;

        // When sorting, use OFFSET-based pagination (cursor.order carries the offset)
        let offsetClause = "";
        if (hasSorts && input.cursor != null) {
          params.push(input.cursor.order);
          offsetClause = `OFFSET $${params.length}`;
        }

        const query = `
          SELECT "id", "order", "values"
          FROM "Row"
          WHERE ${whereParts.join(" AND ")}
          ORDER BY ${orderParts.join(", ")}
          LIMIT $${limitParamIdx}
          ${offsetClause}
        `;

        const rawRows = await ctx.db.$queryRawUnsafe<
          Array<{ id: string; order: number; values: unknown }>
        >(query, ...params);

        let nextCursor: { order: number; limit: number } | undefined;
        if (rawRows.length > limit) {
          rawRows.pop();
          if (hasSorts) {
            // For sorted queries, cursor.order is the offset for the next page
            const currentOffset = input.cursor?.order ?? 0;
            nextCursor = { order: currentOffset + limit, limit };
          } else {
            nextCursor = { order: rawRows[rawRows.length - 1]!.order, limit };
          }
        }

        return {
          rows: rawRows.map((row) => ({
            id: row.id,
            order: row.order,
            values: castValues(row.values),
          })),
          nextCursor,
        };
      }

      // Simple case: no sorts/filters/search — use Prisma
      const rows = await ctx.db.row.findMany({
        where: {
          tableId: input.tableId,
          ...(input.cursor != null && { order: { gt: input.cursor.order } }),
        },
        orderBy: [{ order: "asc" as const }],
        take: limit + 1,
        select: { id: true, order: true, values: true },
      });

      let nextCursor: { order: number; limit: number } | undefined;
      if (rows.length > limit) {
        rows.pop();
        nextCursor = { order: rows[rows.length - 1]!.order, limit };
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

      // Validate value against column type
      const column = await ctx.db.column.findFirst({
        where: { id: input.columnId, tableId: row.tableId },
        select: { type: true },
      });

      if (!column) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Column not found" });
      }

      let cellValue = input.value;
      if (column.type === "NUMBER" && cellValue !== null) {
        if (typeof cellValue === "string" && cellValue !== "") {
          const num = Number(cellValue);
          if (isNaN(num)) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "Value must be a number" });
          }
          cellValue = num;
        }
      }

      const values = castValues(row.values);
      if (cellValue === null || cellValue === "") {
        delete values[input.columnId];
      } else {
        values[input.columnId] = cellValue;
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
