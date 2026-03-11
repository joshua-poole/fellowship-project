import { api } from "~/trpc/react";

export function useTableMutations(
  baseId: string,
  activeTableId: string | undefined,
  setActiveTableId: (id: string | undefined) => void,
) {
  const utils = api.useUtils();

  const create = api.table.create.useMutation({
    onMutate: async ({ baseId: bid }) => {
      await utils.base.getById.cancel({ id: bid });
      const prev = utils.base.getById.getData({ id: bid });
      const existingTables = prev?.tables ?? [];
      const highestNum = existingTables.reduce((max, t) => {
        const match = /^Table (\d+)$/.exec(t.name);
        return match ? Math.max(max, parseInt(match[1]!, 10)) : max;
      }, 0);
      const lastOrder = existingTables[existingTables.length - 1]?.order ?? -1;
      const optimisticTable = {
        id: `tbl_tmp_${Date.now()}`,
        name: `Table ${highestNum + 1}`,
        order: lastOrder + 1,
      };
      utils.base.getById.setData({ id: bid }, (old) =>
        old ? { ...old, tables: [...old.tables, optimisticTable] } : old,
      );
      return { prev, optimisticId: optimisticTable.id };
    },
    onSuccess: (newTable, { baseId: bid }, ctx) => {
      utils.base.getById.setData({ id: bid }, (old) =>
        old ? {
          ...old,
          tables: old.tables.map((t) =>
            t.id === ctx?.optimisticId ? { id: newTable.id, name: newTable.name, order: newTable.order } : t
          ),
        } : old,
      );
      setActiveTableId(newTable.id);
    },
    onError: (_err, { baseId: bid }, ctx) => {
      if (ctx?.prev) utils.base.getById.setData({ id: bid }, ctx.prev);
    },
    onSettled: (_data, _err, { baseId: bid }) => {
      void utils.base.getById.invalidate({ id: bid });
    },
  });

  const remove = api.table.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.base.getById.cancel({ id: baseId });
      const prev = utils.base.getById.getData({ id: baseId });
      utils.base.getById.setData({ id: baseId }, (old) =>
        old ? { ...old, tables: old.tables.filter((t) => t.id !== id) } : old,
      );
      if (activeTableId === id) {
        const remaining = prev?.tables.filter((t) => t.id !== id) ?? [];
        setActiveTableId(remaining[0]?.id);
      }
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.base.getById.setData({ id: baseId }, ctx.prev);
    },
    onSettled: () => {
      void utils.base.getById.invalidate({ id: baseId });
    },
  });

  return { create, remove };
}
