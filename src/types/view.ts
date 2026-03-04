import { z } from "zod";
import { ViewModelSchema } from "generated/zod/schemas/variants/pure/View.pure";

export type View = z.infer<typeof ViewModelSchema>;

const ViewFilterSchema = z.object({
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
});

const ViewSortSchema = z.object({
  columnId: z.string(),
  direction: z.enum(["asc", "desc"]),
});

const ViewConfigSchema = z
  .object({
    filters: z.array(ViewFilterSchema).optional(),
    sorts: z.array(ViewSortSchema).optional(),
    hiddenColumns: z.array(z.string()).optional(),
    search: z.string().optional(),
  })
  .nullable();

export const ViewGetByTableInputSchema = z.object({
  tableId: z.string(),
});

export const ViewGetByTableOutputSchema = z.array(
  ViewModelSchema.pick({
    id: true,
    name: true,
    type: true,
    order: true,
  }).extend({
    config: ViewConfigSchema,
  }),
);

export const ViewCreateInputSchema = z.object({
  tableId: z.string(),
  name: z.string().optional(),
});

export const ViewCreateOutputSchema = ViewModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
}).extend({
  config: ViewConfigSchema,
});

export const ViewUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  order: z.number().int().optional(),
  config: ViewConfigSchema.optional(),
});

export const ViewUpdateOutputSchema = ViewModelSchema.pick({
  id: true,
  name: true,
  order: true,
}).extend({
  config: ViewConfigSchema,
});

export const ViewDeleteInputSchema = z.object({
  id: z.string(),
});

export const ViewDeleteOutputSchema = z.boolean();
