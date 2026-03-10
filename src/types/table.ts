import { z } from "zod";
import { TableModelSchema } from "generated/zod/schemas/variants/pure/Table.pure";
import { ColumnModelSchema } from "generated/zod/schemas/variants/pure/Column.pure";
import { ViewModelSchema } from "generated/zod/schemas/variants/pure/View.pure";

export type Table = z.infer<typeof TableModelSchema>;

export const TableGetByIdInputSchema = z.object({
  id: z.string(),
});

export const TableGetByIdOutputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
  baseId: true,
}).extend({
  columns: z.array(
    ColumnModelSchema.pick({
      id: true,
      name: true,
      type: true,
      order: true,
    }),
  ),
  views: z.array(
    ViewModelSchema.pick({
      id: true,
      name: true,
      type: true,
      order: true,
    }).extend({
      search: z.string().nullable(),
      filters: z.array(z.object({
        id: z.string(),
        columnId: z.string(),
        operator: z.string(),
        value: z.string().nullable(),
      })),
      sorts: z.array(z.object({
        id: z.string(),
        columnId: z.string(),
        direction: z.string(),
        order: z.number().int(),
      })),
      hiddenColumns: z.array(z.object({
        id: z.string(),
        columnId: z.string(),
      })),
    }),
  ),
});

export const TableCreateInputSchema = z.object({
  baseId: z.string(),
  name: z.string().optional(),
});

export const TableCreateOutputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
});

export const TableUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  order: z.number().int().optional(),
});

export const TableUpdateOutputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
});

export const TableDeleteInputSchema = z.object({
  id: z.string(),
});

export const TableDeleteOutputSchema = z.boolean();
