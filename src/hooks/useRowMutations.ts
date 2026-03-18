import { api } from "~/trpc/react";

export function useRowMutations(tableId: string) {
  const utils = api.useUtils();

  const createRow = api.row.create.useMutation({
    onMutate: async () => {
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) + 1 };
      });
    },
    onError: () => {
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) - 1 };
      });
    },
    onSettled: () => {
      void utils.row.getByTable.invalidate();
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  const deleteRow = api.row.delete.useMutation({
    onMutate: async () => {
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Math.max(0, Number(old.rowCount) - 1) };
      });
    },
    onError: () => {
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, rowCount: Number(old.rowCount) + 1 };
      });
    },
    onSettled: () => {
      void utils.row.getByTable.invalidate();
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  return { createRow, deleteRow };
}
