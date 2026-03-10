import { z } from "zod";
import { RowModelSchema } from "generated/zod/schemas/variants/pure/Row.pure";

export type Row = z.infer<typeof RowModelSchema>;

// Cell values stored as { [columnId]: string | number }
const CellValuesSchema = z.record(z.string(), z.union([z.string(), z.number()]));

export const RowGetByTableInputSchema = z.object({
  tableId: z.string(),
  cursor: z.object({
    order: z.number().int(),
    limit: z.number().int().min(1).max(50000),
  }).optional(),
  limit: z.number().int().min(1).max(50000).default(2000),
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
  nextCursor: z.object({
    order: z.number().int(),
    limit: z.number().int(),
  }).optional(),
});

export const RowCreateInputSchema = z.object({
  tableId: z.string(),
  values: CellValuesSchema.optional(),
});

export const RowCreateOutputSchema = RowModelSchema.pick({
  id: true,
  order: true,
}).extend({
  values: CellValuesSchema,
});

export const RowBulkCreateInputSchema = z.object({
  tableId: z.string(),
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

export const RowDeleteInputSchema = z.object({
  id: z.string(),
});

export const RowDeleteOutputSchema = z.boolean();
