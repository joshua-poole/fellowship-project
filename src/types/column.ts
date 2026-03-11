import { z } from "zod";
import { ColumnModelSchema } from "generated/zod/schemas/variants/pure/Column.pure";
import { ColumnTypeSchema } from "generated/zod/schemas/enums/ColumnType.schema";

export type Column = z.infer<typeof ColumnModelSchema>;

export const ColumnGetByTableInputSchema = ColumnModelSchema.pick({
  tableId: true,
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

export const ColumnCreateInputSchema = ColumnModelSchema.pick({
  tableId: true,
  name: true,
  type: true,
  order: true,
}).partial({ order: true });

export const ColumnCreateOutputSchema = ColumnModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
});

export const ColumnUpdateInputSchema = ColumnModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
  description: true,
  defaultValue: true,
}).partial({
  name: true,
  type: true,
  order: true,
  description: true,
  defaultValue: true,
});

export const ColumnUpdateOutputSchema = ColumnModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
});

export const ColumnDeleteInputSchema = ColumnModelSchema.pick({
  id: true,
});

export const ColumnDeleteOutputSchema = z.boolean();
