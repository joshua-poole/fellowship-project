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
} from "~/types/schemas/row";
import type { RowFilter } from "~/types/Props";

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

/**
 * Groups filters into AND/OR segments and builds a composite WHERE clause.
 *
 * Filters are split into groups at each "or" conjunction boundary.
 * Within each group, conditions are ANDed together.
 * Groups are then ORed together.
 *
 * Example: [Where A, and B, or C, and D] → (A AND B) OR (C AND D)
 */
function buildFilterClause(
  filters: RowFilter[],
  params: (string | number)[],
): string | null {
  if (filters.length === 0) return null;

  // Split into groups: a new group starts at each "or" conjunction
  const groups: RowFilter[][] = [[]];
  for (const f of filters) {
    if (f.conjunction === "or") {
      groups.push([f]);
    } else {
      groups[groups.length - 1]!.push(f);
    }
  }

  const groupClauses: string[] = [];
  for (const group of groups) {
    const conditions: string[] = [];
    for (const f of group) {
      const cond = buildRawFilterCondition(f, params);
      if (cond) conditions.push(cond);
    }
    if (conditions.length === 1) {
      groupClauses.push(conditions[0]!);
    } else if (conditions.length > 1) {
      groupClauses.push(`(${conditions.join(" AND ")})`);
    }
  }

  if (groupClauses.length === 0) return null;
  if (groupClauses.length === 1) return groupClauses[0]!;
  return `(${groupClauses.join(" OR ")})`;
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

      const { limit, offset, cursor } = input;
      const hasSorts = input.sorts && input.sorts.length > 0;
      const hasFilters = input.filters && input.filters.length > 0;
      const hasSearch = !!input.search;

      // Cursor-based pagination is only usable when ordering by `order` ASC
      // (no custom sorts). With custom sorts the row order differs from `order`
      // column so we must fall back to OFFSET.
      const useCursor = cursor != null && !hasSorts;

      // Use raw SQL when sorts/filters/search involve JSON fields
      if (hasSorts || hasFilters || hasSearch) {
        const params: (string | number)[] = [];
        const whereParts: string[] = [];

        params.push(input.tableId);
        whereParts.push(`"tableId" = $${params.length}`);

        // cursor-based WHERE (only for non-sorted queries)
        if (useCursor) {
          params.push(cursor.order);
          whereParts.push(`"order" > $${params.length}`);
        }

        if (hasSearch) {
          params.push(`%${input.search!}%`);
          whereParts.push(`EXISTS (SELECT 1 FROM jsonb_each_text("values") AS kv WHERE kv.value ILIKE $${params.length})`);
        }

        if (hasFilters) {
          const filterClause = buildFilterClause(input.filters!, params);
          if (filterClause) whereParts.push(filterClause);
        }

        const orderParts = (input.sorts ?? []).map((s) => {
          return `NULLIF("values"->>'${s.columnId}', '') ${s.direction === "desc" ? "DESC NULLS LAST" : "ASC NULLS FIRST"}`;
        });
        orderParts.push(`"order" ASC`);

        const whereClause = whereParts.join(" AND ");

        params.push(limit);
        const limitIdx = params.length;

        let offsetClause = "";
        if (!useCursor) {
          params.push(offset);
          offsetClause = `OFFSET $${params.length}`;
        }

        const query = `
          SELECT "id", "order", "values"
          FROM "Row"
          WHERE ${whereClause}
          ORDER BY ${orderParts.join(", ")}
          LIMIT $${limitIdx}
          ${offsetClause}
        `;

        // Rebuild count params: need tableId + search/filter params only (no cursor, limit, offset)
        const cParams: (string | number)[] = [];
        const cWhere: string[] = [];
        cParams.push(input.tableId);
        cWhere.push(`"tableId" = $${cParams.length}`);
        if (hasSearch) {
          cParams.push(`%${input.search!}%`);
          cWhere.push(`EXISTS (SELECT 1 FROM jsonb_each_text("values") AS kv WHERE kv.value ILIKE $${cParams.length})`);
        }
        if (hasFilters) {
          const filterClause = buildFilterClause(input.filters!, cParams);
          if (filterClause) cWhere.push(filterClause);
        }
        const countQ = `SELECT COUNT(*)::int AS count FROM "Row" WHERE ${cWhere.join(" AND ")}`;

        const [rawRows, countResult] = await Promise.all([
          ctx.db.$queryRawUnsafe<Array<{ id: string; order: number; values: unknown }>>(query, ...params),
          ctx.db.$queryRawUnsafe<[{ count: number }]>(countQ, ...cParams),
        ]);

        return {
          rows: rawRows.map((row) => ({
            id: row.id,
            order: row.order,
            values: castValues(row.values),
          })),
          totalCount: countResult[0]?.count ?? 0,
        };
      }

      // Simple case: no sorts/filters/search
      if (useCursor) {
        // Cursor-based: efficient sequential scan via (tableId, order) index
        const rows = await ctx.db.row.findMany({
          where: { tableId: input.tableId, order: { gt: cursor.order } },
          orderBy: [{ order: "asc" as const }],
          take: limit,
          select: { id: true, order: true, values: true },
        });

        return {
          rows: rows.map((row) => ({
            id: row.id,
            order: row.order,
            values: castValues(row.values),
          })),
          totalCount: Number(table.rowCount),
        };
      }

      // Offset-based: for random-access jumps
      const rows = await ctx.db.row.findMany({
        where: { tableId: input.tableId },
        orderBy: [{ order: "asc" as const }],
        skip: offset,
        take: limit,
        select: { id: true, order: true, values: true },
      });

      return {
        rows: rows.map((row) => ({
          id: row.id,
          order: row.order,
          values: castValues(row.values),
        })),
        totalCount: Number(table.rowCount),
      };
    }),

  create: protectedProcedure
    .input(RowCreateInputSchema)
    .output(RowCreateOutputSchema)
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.findFirst({
        where: ownerWhere(input.tableId, ctx.session.user.id),
        include: { columns: { select: { id: true, type: true } } },
      });

      if (!table) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Table not found" });
      }

      // Validate and coerce values against column definitions
      const columnMap = new Map(table.columns.map((c) => [c.id, c.type]));
      const validated: Record<string, string | number> = {};
      for (const [key, val] of Object.entries(input.values ?? {})) {
        const colType = columnMap.get(key);
        if (!colType) {
          throw new TRPCError({ code: "BAD_REQUEST", message: `Unknown column: ${key}` });
        }
        if (colType === "NUMBER") {
          const num = Number(val);
          if (isNaN(num)) {
            throw new TRPCError({ code: "BAD_REQUEST", message: `Value for column ${key} must be a number` });
          }
          validated[key] = num;
        } else {
          validated[key] = String(val);
        }
      }

      const last = await ctx.db.row.findFirst({
        where: { tableId: input.tableId },
        orderBy: { order: "desc" },
        select: { order: true },
      });

      const [row] = await ctx.db.$transaction([
        ctx.db.row.create({
          data: {
            id: rowId(),
            tableId: input.tableId,
            order: (last?.order ?? -1) + 1,
            values: validated,
          },
        }),
        ctx.db.table.update({
          where: { id: input.tableId },
          data: { rowCount: { increment: 1 } },
        }),
      ]);

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

      const SQL_BATCH = 2000;
      for (let offset = 0; offset < input.count; offset += SQL_BATCH) {
        const batchSize = Math.min(SQL_BATCH, input.count - offset);
        const rowsSql: string[] = [];
        for (let i = 0; i < batchSize; i++) {
          const id = rowIdFast();
          const order = startOrder + offset + i;
          const values: Record<string, string | number> = {};
          for (const col of table.columns) {
            if (col.type === "NUMBER") {
              values[col.id] = faker.number.int({ min: 0, max: 10000 });
            } else if (col.name.toLowerCase().includes("name")) {
              values[col.id] = faker.person.fullName();
            } else {
              values[col.id] = faker.lorem.words({ min: 1, max: 3 });
            }
          }
          const valuesJson = JSON.stringify(values);
          rowsSql.push(`('${id}', '${input.tableId}', ${order}, $json$${valuesJson}$json$::jsonb, '${now}')`);
        }
        await ctx.db.$executeRawUnsafe(`
          INSERT INTO "Row" ("id", "tableId", "order", "values", "updatedAt")
          VALUES ${rowsSql.join(", ")};
        `);
      }
      await ctx.db.table.update({
        where: { id: input.tableId },
        data: { rowCount: { increment: input.count } },
      });
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

      await ctx.db.$transaction([
        ctx.db.row.delete({ where: { id: input.id } }),
        ctx.db.table.update({
          where: { id: row.tableId },
          data: { rowCount: { decrement: 1 } },
        }),
      ]);
      return true;
    }),
});
