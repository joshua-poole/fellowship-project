import { z } from "zod";
import { ViewModelSchema } from "generated/zod/schemas/variants/pure/View.pure";
import { ViewFilterModelSchema } from "generated/zod/schemas/variants/pure/ViewFilter.pure";
import { ViewSortModelSchema } from "generated/zod/schemas/variants/pure/ViewSort.pure";
import { ViewHiddenColumnModelSchema } from "generated/zod/schemas/variants/pure/ViewHiddenColumn.pure";

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

const ViewFilterSchema = ViewFilterModelSchema.pick({
  id: true,
  columnId: true,
  operator: true,
  value: true,
});

const ViewSortSchema = ViewSortModelSchema.pick({
  id: true,
  columnId: true,
  direction: true,
  order: true,
});

const ViewHiddenColumnSchema = ViewHiddenColumnModelSchema.pick({
  id: true,
  columnId: true,
});

// --- Input schemas for create/update (no id required) ---

const ViewFilterInputSchema = ViewFilterModelSchema.pick({
  columnId: true,
  value: true,
}).partial({ value: true }).extend({
  operator: FilterOperatorSchema,
});

const ViewSortInputSchema = ViewSortModelSchema.pick({
  columnId: true,
  order: true,
}).partial({ order: true }).extend({
  direction: z.enum(["asc", "desc"]),
});

// --- Procedure schemas ---

export const ViewGetByTableInputSchema = ViewModelSchema.pick({
  tableId: true,
});

export const ViewGetByTableOutputSchema = z.array(
  ViewModelSchema.pick({
    id: true,
    name: true,
    type: true,
    order: true,
    search: true,
  }).extend({
    filters: z.array(ViewFilterSchema),
    sorts: z.array(ViewSortSchema),
    hiddenColumns: z.array(ViewHiddenColumnSchema),
  }),
);

export const ViewCreateInputSchema = ViewModelSchema.pick({
  tableId: true,
  name: true,
}).partial({ name: true });

export const ViewCreateOutputSchema = ViewModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
  search: true,
}).extend({
  filters: z.array(ViewFilterSchema),
  sorts: z.array(ViewSortSchema),
  hiddenColumns: z.array(ViewHiddenColumnSchema),
});

export const ViewUpdateInputSchema = ViewModelSchema.pick({
  id: true,
  name: true,
  order: true,
  search: true,
}).partial({
  name: true,
  order: true,
  search: true,
}).extend({
  filters: z.array(ViewFilterInputSchema).optional(),
  sorts: z.array(ViewSortInputSchema).optional(),
  hiddenColumns: z.array(z.string()).optional(),
});

export const ViewUpdateOutputSchema = ViewModelSchema.pick({
  id: true,
  name: true,
  type: true,
  order: true,
  search: true,
}).extend({
  filters: z.array(ViewFilterSchema),
  sorts: z.array(ViewSortSchema),
  hiddenColumns: z.array(ViewHiddenColumnSchema),
});

export const ViewDeleteInputSchema = ViewModelSchema.pick({
  id: true,
});

export const ViewDeleteOutputSchema = z.boolean();
