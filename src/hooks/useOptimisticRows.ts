import { useCallback, useRef } from "react";
import { api } from "~/trpc/react";
import { useWindowedRows } from "~/hooks/useWindowedRows";
import type { TableQueryInput, RowData } from "~/types/Props";

/**
 * Wraps useWindowedRows with an optimistic overlay cache.
 * Cell edits appear instantly in the UI and are cleared once server data catches up.
 */
export function useOptimisticRows(
  queryInput: TableQueryInput,
  serverRowCount: number,
) {
  const tableId = queryInput.tableId;
  const windowed = useWindowedRows(queryInput, serverRowCount);
  const utils = api.useUtils();

  // Optimistic overlay: rowId:columnId → optimistic value
  const optimisticRef = useRef(new Map<string, string | number>());

  const updateCell = api.row.updateCell.useMutation({
    onMutate: ({ rowId, columnId, value }) => {
      const key = `${rowId}:${columnId}`;
      if (value != null) optimisticRef.current.set(key, value);
    },
    onSettled: (_data, _err, { rowId, columnId }) => {
      // Clear the optimistic entry — server data will take over on next fetch
      const key = `${rowId}:${columnId}`;
      optimisticRef.current.delete(key);
      void utils.row.getByTable.invalidate({ tableId });
    },
  });

  const saveCell = useCallback(
    (rowId: string, columnId: string, value: string | number) => {
      updateCell.mutate({ rowId, columnId, value });
    },
    [updateCell],
  );

  // Wrap getRow to overlay optimistic values
  const getRow = useCallback(
    (index: number): RowData | undefined => {
      const row = windowed.getRow(index);
      if (!row) return row;

      const overlay = optimisticRef.current;
      if (overlay.size === 0) return row;

      // Check if any optimistic edits apply to this row
      let patched = false;
      let newValues: Record<string, string | number> | undefined;
      for (const [key, val] of overlay) {
        if (key.startsWith(row.id + ":")) {
          if (!patched) {
            newValues = { ...row.values };
            patched = true;
          }
          const colId = key.slice(row.id.length + 1);
          newValues![colId] = val;
        }
      }

      if (!patched) return row;
      return { ...row, values: newValues! };
    },
    [windowed.getRow],
  );

  return {
    getRow,
    saveCell,
    totalCount: windowed.totalCount,
    isLoading: windowed.isLoading,
    isFetching: windowed.isFetching,
    tableContainerRef: windowed.tableContainerRef,
    handleScroll: windowed.handleScroll,
    visibleFirst: windowed.visibleFirst,
    visibleLast: windowed.visibleLast,
  };
}
