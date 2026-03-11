import { api } from "~/trpc/react";
import { rowId } from "~/lib/ids";
import type { QueryInput, RowData } from "~/types/Props";

export function useRowMutations(tableId: string, queryInput: QueryInput) {
  const utils = api.useUtils();

  const create = api.row.create.useMutation({
    onMutate: async ({ tableId: tid }) => {
      await utils.row.getByTable.cancel({ tableId: tid });
      const prev = utils.row.getByTable.getInfiniteData(queryInput);
      const lastPage = prev?.pages[prev.pages.length - 1];
      const lastOrder = lastPage?.rows[lastPage.rows.length - 1]?.order ?? -1;
      const optimisticRow: RowData = { id: rowId(), order: lastOrder + 1, values: {} };
      utils.row.getByTable.setInfiniteData(queryInput, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page, i) =>
          i === old.pages.length - 1 ? { ...page, rows: [...page.rows, optimisticRow] } : page
        )};
      });
      return { prev, optimisticRow };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.row.getByTable.setInfiniteData(queryInput, ctx.prev);
    },
    onSuccess: (newRow, _vars, ctx) => {
      utils.row.getByTable.setInfiniteData(queryInput, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page) => ({
          ...page,
          rows: page.rows.map((r) => r.id === ctx?.optimisticRow.id ? newRow : r),
        }))};
      });
    },
    onSettled: () => {
      void utils.row.getByTable.invalidate({ tableId });
    },
  });

  return { create };
}
