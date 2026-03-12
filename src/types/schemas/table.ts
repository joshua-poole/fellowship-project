import { z } from "zod";
import { TableModelSchema } from "generated/zod/schemas/variants/pure/Table.pure";
import { ColumnModelSchema } from "generated/zod/schemas/variants/pure/Column.pure";
import { ViewModelSchema } from "generated/zod/schemas/variants/pure/View.pure";
import { ViewFilterModelSchema } from "generated/zod/schemas/variants/pure/ViewFilter.pure";
import { ViewSortModelSchema } from "generated/zod/schemas/variants/pure/ViewSort.pure";
import { ViewHiddenColumnModelSchema } from "generated/zod/schemas/variants/pure/ViewHiddenColumn.pure";

export type Table = z.infer<typeof TableModelSchema>;

export const TableGetByIdInputSchema = TableModelSchema.pick({
  id: true,
});

export const TableGetByIdOutputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
  baseId: true,
  rowCount: true,
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
      search: true,
    }).extend({
      filters: z.array(ViewFilterModelSchema.pick({
        id: true,
        columnId: true,
        operator: true,
        value: true,
      })),
      sorts: z.array(ViewSortModelSchema.pick({
        id: true,
        columnId: true,
        direction: true,
        order: true,
      })),
      hiddenColumns: z.array(ViewHiddenColumnModelSchema.pick({
        id: true,
        columnId: true,
      })),
    }),
  ),
});

export const TableCreateInputSchema = TableModelSchema.pick({
  baseId: true,
  name: true,
}).partial({ name: true });

export const TableCreateOutputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
});

export const TableUpdateInputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
}).partial({ name: true, order: true });

export const TableUpdateOutputSchema = TableModelSchema.pick({
  id: true,
  name: true,
  order: true,
});

export const TableDeleteInputSchema = TableModelSchema.pick({
  id: true,
});

export const TableDeleteOutputSchema = z.boolean();
