import { z } from "zod";
import { ViewModelSchema } from "generated/zod/schemas/variants/pure/View.pure";

export type View = z.infer<typeof ViewModelSchema>;

const FilterOperatorSchema = z.enum([
  "equals",
  "contains",
  "not_contains",
  "is_empty",
  "is_not_empty",
  "gt",
  "lt",
]);

const ViewFilterSchema = z.object({
  id: z.string(),
  columnId: z.string(),
  operator: FilterOperatorSchema,
  value: z.string().nullable(),
});

const ViewSortSchema = z.object({
  id: z.string(),
  columnId: z.string(),
  direction: z.enum(["asc", "desc"]),
  order: z.number().int(),
});

const ViewHiddenColumnSchema = z.object({
  id: z.string(),
  columnId: z.string(),
});

// --- Input schemas for create/update (no id required) ---

const ViewFilterInputSchema = z.object({
  columnId: z.string(),
  operator: FilterOperatorSchema,
  value: z.string().nullable().optional(),
});

const ViewSortInputSchema = z.object({
  columnId: z.string(),
  direction: z.enum(["asc", "desc"]),
  order: z.number().int().optional(),
});

// --- Procedure schemas ---

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
    search: z.string().nullable(),
    filters: z.array(ViewFilterSchema),
    sorts: z.array(ViewSortSchema),
    hiddenColumns: z.array(ViewHiddenColumnSchema),
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
  search: z.string().nullable(),
  filters: z.array(ViewFilterSchema),
  sorts: z.array(ViewSortSchema),
  hiddenColumns: z.array(ViewHiddenColumnSchema),
});

export const ViewUpdateInputSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  order: z.number().int().optional(),
  search: z.string().nullable().optional(),
  filters: z.array(ViewFilterInputSchema).optional(),
  sorts: z.array(ViewSortInputSchema).optional(),
  hiddenColumns: z.array(z.string()).optional(), // array of columnIds
});

export const ViewUpdateOutputSchema = ViewModelSchema.pick({
  id: true,
  name: true,
  order: true,
}).extend({
  search: z.string().nullable(),
  filters: z.array(ViewFilterSchema),
  sorts: z.array(ViewSortSchema),
  hiddenColumns: z.array(ViewHiddenColumnSchema),
});

export const ViewDeleteInputSchema = z.object({
  id: z.string(),
});

export const ViewDeleteOutputSchema = z.boolean();
