import { z } from "zod";
import { ColumnModelSchema } from "generated/zod/schemas/variants/pure/Column.pure";
import { ColumnTypeSchema } from "generated/zod/schemas/enums/ColumnType.schema";

export type Column = z.infer<typeof ColumnModelSchema>;

export const ColumnGetByTableInputSchema = z.object({
  tableId: z.string(),
});

export const ColumnGetByTableOutputSchema = z.array(
  ColumnModelSchema.pick({
    id: true,
    name: true,
    type: true,
    order: true,
    description: true,
    defaultValue: true,
  }),
);

export const ColumnCreateInputSchema = z.object({
  tableId: z.string(),
  name: z.string(),
  type: ColumnTypeSchema,
});

export const ColumnCreateOutputSchema = ColumnModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
});

export const ColumnUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  type: ColumnTypeSchema.optional(),
  order: z.number().int().optional(),
  description: z.string().nullable().optional(),
  defaultValue: z.string().nullable().optional(),
});

export const ColumnUpdateOutputSchema = ColumnModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
});

export const ColumnDeleteInputSchema = z.object({
  id: z.string(),
});

export const ColumnDeleteOutputSchema = z.boolean();
