import { z } from "zod";
import { BaseModelSchema } from "generated/zod/schemas/variants/pure/Base.pure";
import { TableModelSchema } from "generated/zod/schemas/variants/pure/Table.pure";

export type Base = z.infer<typeof BaseModelSchema>

export const BaseGetAllOutputSchema = BaseModelSchema.pick({
  id: true,
  name: true,
  lastOpenedAt: true,
});

export const BaseGetByIdInputSchema = BaseModelSchema.pick({
  id: true
});

export const BaseGetByIdOutputSchema = BaseModelSchema.pick({
  id: true,
  name: true,
  color: true,
  lastOpenedAt: true,
}).extend({
  tables: z.array(TableModelSchema.pick({
    id: true,
    name: true,
    order: true,
  }))
});

export const BaseCreateInputSchema = BaseModelSchema.pick({
  name: true,
});

export const BaseCreateOutputSchema = BaseModelSchema.pick({
  id: true,
});

export const BaseDeleteInputSchema = BaseModelSchema.pick({
  id: true
});

export const BaseUpdateInputSchema = BaseModelSchema.pick({
  id: true,
  name: true,
  color: true,
});

export const BaseUpdateOutputSchema = BaseModelSchema.pick({
  id: true,
  name: true,
  color: true,
});

export const BaseDeleteOutputSchema = z.boolean();