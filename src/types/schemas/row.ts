import { z } from "zod";
import { RowModelSchema } from "generated/zod/schemas/variants/pure/Row.pure";

export type Row = z.infer<typeof RowModelSchema>;

// Cell values stored as { [columnId]: string | number }
const CellValuesSchema = z.record(z.string(), z.union([z.string(), z.number()]));

export const RowGetByTableInputSchema = RowModelSchema.pick({
  tableId: true,
}).extend({
  /** Row offset for random-access jumps (used when no cursor is available). */
  offset: z.number().int().min(0).default(0),
  limit: z.number().int().min(1).max(5000).default(500),
  /** Cursor for efficient sequential loading from a known position. */
  cursor: z.object({
    order: z.number().int(),
  }).optional(),
  search: z.string().optional(),
  sorts: z
    .array(
      z.object({
        columnId: z.string(),
        direction: z.enum(["asc", "desc"]),
      }),
    )
    .optional(),
  filters: z
    .array(
      z.object({
        columnId: z.string(),
        operator: z.enum([
          "equals",
          "contains",
          "not_contains",
          "is_empty",
          "is_not_empty",
          "gt",
          "lt",
        ]),
        value: z.union([z.string(), z.number()]).optional(),
      }),
    )
    .optional(),
});

export const RowGetByTableOutputSchema = z.object({
  rows: z.array(
    RowModelSchema.pick({
      id: true,
      order: true,
    }).extend({
      values: CellValuesSchema,
    }),
  ),
  totalCount: z.number().int(),
});

export const RowCreateInputSchema = RowModelSchema.pick({
  tableId: true,
}).extend({
  values: CellValuesSchema.optional(),
});

export const RowCreateOutputSchema = RowModelSchema.pick({
  id: true,
  order: true,
}).extend({
  values: CellValuesSchema,
});

export const RowBulkCreateInputSchema = RowModelSchema.pick({
  tableId: true,
}).extend({
  count: z.number().int().min(1).max(100000),
});

export const RowBulkCreateOutputSchema = z.object({
  count: z.number().int(),
});

export const RowUpdateCellInputSchema = z.object({
  rowId: z.string(),
  columnId: z.string(),
  value: z.union([z.string(), z.number(), z.null()]),
});

export const RowUpdateCellOutputSchema = RowModelSchema.pick({
  id: true,
}).extend({
  values: CellValuesSchema,
});

export const RowDeleteInputSchema = RowModelSchema.pick({
  id: true,
});

export const RowDeleteOutputSchema = z.boolean();
