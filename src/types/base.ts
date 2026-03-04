import { z } from "zod";
import { BaseModelSchema } from "generated/zod/schemas/variants/pure/Base.pure";
import { TableModelSchema } from "generated/zod/schemas/variants/pure/Table.pure";

export type Base = z.infer<typeof BaseModelSchema>

export const BaseGetAllOutputSchema = BaseModelSchema.pick({
  id: true,
  name: true,
  lastOpenedAt: true,
});

export const BaseGetByIdInputSchema = z.object({
  id: z.string()
});

export const BaseGetByIdOutputSchema = BaseModelSchema.pick({
  id: true,
  name: true,
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

export const BaseDeleteInputSchema = z.object({
  id: z.string(),
});

export const BaseUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string()
});

export const BaseUpdateOutputSchema = BaseModelSchema.pick({
  id: true,
  name: true,

});

export const BaseDeleteOutputSchema = z.boolean();