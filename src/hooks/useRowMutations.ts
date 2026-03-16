import { api } from "~/trpc/react";
import { rowId } from "~/lib/ids";
import type { TableQueryInput, RowData } from "~/types/Props";

export function useRowMutations(tableId: string, queryInput: TableQueryInput) {
  const utils = api.useUtils();

  const createRow = api.row.create.useMutation({
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
      utils.table.getById.setData({ id: tid }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) + 1 };
      });
      return { prev, optimisticRow };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.row.getByTable.setInfiniteData(queryInput, ctx.prev);
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) - 1 };
      });
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

  const deleteRow = api.row.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.row.getByTable.cancel({ tableId });
      const prev = utils.row.getByTable.getInfiniteData(queryInput);
      utils.row.getByTable.setInfiniteData(queryInput, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page) => ({
          ...page,
          rows: page.rows.filter((r) => r.id !== id),
        }))};
      });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Math.max(0, Number(old.rowCount) - 1) };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.row.getByTable.setInfiniteData(queryInput, ctx.prev);
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) + 1 };
      });
    },
    onSettled: () => {
      void utils.row.getByTable.invalidate({ tableId });
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  return { createRow, deleteRow };
}
