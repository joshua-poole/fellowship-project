import type { Dispatch, SetStateAction } from "react";
import { api } from "~/trpc/react";

export function useViewMutations(
  activeTableId: string | undefined,
  setActiveViewId: Dispatch<SetStateAction<string | undefined>>,
) {
  const utils = api.useUtils();
  const tableQueryKey = { id: activeTableId! };

  const create = api.view.create.useMutation({
    onMutate: async (input) => {
      if (!activeTableId) return;
      await utils.table.getById.cancel(tableQueryKey);
      const prev = utils.table.getById.getData(tableQueryKey);
      const existingViews = prev?.views ?? [];
      const optimisticId = `viw_tmp_${Date.now()}`;
      const optimisticView = {
        id: optimisticId,
        name: input.name ?? "Grid view",
        type: "grid",
        order: (existingViews[existingViews.length - 1]?.order ?? -1) + 1,
        search: null,
        filters: [],
        sorts: [],
        hiddenColumns: [],
      };
      utils.table.getById.setData(tableQueryKey, (old) =>
        old ? { ...old, views: [...old.views, optimisticView] } : old,
      );
      return { prev, optimisticId };
    },
    onSuccess: (newView, _vars, ctx) => {
      if (!activeTableId || !ctx?.optimisticId) return;
      utils.table.getById.setData(tableQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          views: old.views.map((v) =>
            v.id === ctx.optimisticId ? { ...newView } : v
          ),
        };
      });
      setActiveViewId((cur) => cur === ctx.optimisticId ? newView.id : cur);
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev && activeTableId) utils.table.getById.setData(tableQueryKey, ctx.prev);
    },
    onSettled: () => {
      if (activeTableId) void utils.table.getById.invalidate(tableQueryKey);
    },
  });

  const update = api.view.update.useMutation({
    onMutate: async (input) => {
      if (!activeTableId) return;
      await utils.table.getById.cancel(tableQueryKey);
      const prev = utils.table.getById.getData(tableQueryKey);
      utils.table.getById.setData(tableQueryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          views: old.views.map((v) => {
            if (v.id !== input.id) return v;
            return {
              ...v,
              ...(input.name !== undefined && { name: input.name }),
              ...(input.search !== undefined && { search: input.search }),
              ...(input.filters !== undefined && {
                filters: input.filters.map((f, i) => ({
                  id: `vfl_tmp_${i}`,
                  columnId: f.columnId,
                  operator: f.operator,
                  value: f.value ?? null,
                  conjunction: f.conjunction ?? null,
                })),
              }),
              ...(input.sorts !== undefined && {
                sorts: input.sorts.map((s, i) => ({
                  id: `vsr_tmp_${i}`,
                  columnId: s.columnId,
                  direction: s.direction,
                  order: s.order ?? i,
                })),
              }),
              ...(input.hiddenColumns !== undefined && {
                hiddenColumns: input.hiddenColumns.map((colId, i) => ({
                  id: `vhc_tmp_${i}`,
                  columnId: colId,
                })),
              }),
            };
          }),
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev && activeTableId) utils.table.getById.setData(tableQueryKey, ctx.prev);
    },
    onSettled: () => {
      if (activeTableId) void utils.table.getById.invalidate(tableQueryKey);
    },
  });

  const remove = api.view.delete.useMutation({
    onMutate: async (input) => {
      if (!activeTableId) return;
      await utils.table.getById.cancel(tableQueryKey);
      const prev = utils.table.getById.getData(tableQueryKey);
      utils.table.getById.setData(tableQueryKey, (old) =>
        old ? { ...old, views: old.views.filter((v) => v.id !== input.id) } : old,
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev && activeTableId) utils.table.getById.setData(tableQueryKey, ctx.prev);
    },
    onSettled: () => {
      if (activeTableId) void utils.table.getById.invalidate(tableQueryKey);
    },
  });

  return { create, update, remove };
}
