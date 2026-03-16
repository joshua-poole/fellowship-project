import { api } from "~/trpc/react";

export function useColumnMutations(tableId: string) {
  const utils = api.useUtils();

  const create = api.column.create.useMutation({
    onMutate: async (input) => {
      await utils.table.getById.cancel({ id: tableId });
      const prev = utils.table.getById.getData({ id: tableId });
      const existingCols = prev?.columns ?? [];
      let newOrder: number;
      if (input.order !== undefined) {
        newOrder = input.order;
      } else {
        newOrder = (existingCols[existingCols.length - 1]?.order ?? -1) + 1;
      }
      const optimisticCol = {
        id: `fld_tmp_${Date.now()}`,
        name: input.name,
        type: input.type,
        order: newOrder,
      };
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        let cols: typeof old.columns;
        if (input.order !== undefined) {
          cols = old.columns.map((c) =>
            c.order >= input.order! ? { ...c, order: c.order + 1 } : c
          );
          cols.push(optimisticCol);
        } else {
          cols = [...old.columns, optimisticCol];
        }
        cols.sort((a, b) => a.order - b.order);
        return { ...old, columns: cols };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.table.getById.setData({ id: tableId }, ctx.prev);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  const update = api.column.update.useMutation({
    onMutate: async (input) => {
      await utils.table.getById.cancel({ id: tableId });
      const prev = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          columns: old.columns.map((c) =>
            c.id === input.id
              ? {
                  ...c,
                  ...(input.name !== undefined && { name: input.name }),
                  ...(input.type !== undefined && { type: input.type }),
                  ...(input.order !== undefined && { order: input.order }),
                }
              : c
          ),
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.table.getById.setData({ id: tableId }, ctx.prev);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  const remove = api.column.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.table.getById.cancel({ id: tableId });
      const prev = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, columns: old.columns.filter((c) => c.id !== id) };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.table.getById.setData({ id: tableId }, ctx.prev);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ id: tableId });
      // Re-fetch rows so deleted column's values are stripped from the cache
      void utils.row.getByTable.invalidate();
    },
  });

  return { create, update, remove };
}
