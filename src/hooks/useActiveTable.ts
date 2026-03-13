import { useState, useEffect, useCallback } from "react";
import { api } from "~/trpc/react";

export function useActiveTable(baseId: string, initialTableId?: string) {
  const [activeTableId, setActiveTableIdState] = useState<string | undefined>(initialTableId);
  const [activeViewId, setActiveViewId] = useState<string | undefined>(undefined);

  const { data: base } = api.base.getById.useQuery({ id: baseId });

  const setActiveTableId = useCallback((id: string | undefined) => {
    setActiveTableIdState(id);
  }, []);

  // Auto-select first table when base loads
  useEffect(() => {
    if (!activeTableId && base?.tables?.[0]) {
      setActiveTableId(base.tables[0].id);
    }
  }, [base, activeTableId, setActiveTableId]);

  // Table data query (skip temp IDs from optimistic updates)
  const isRealTableId = !!activeTableId && !activeTableId.startsWith("tbl_tmp_");
  const { data: tableData } = api.table.getById.useQuery(
    { id: activeTableId! },
    { enabled: isRealTableId },
  );

  const activeView = tableData?.views?.find((v) => v.id === activeViewId) ?? tableData?.views?.[0];

  // Auto-select first view when views change
  useEffect(() => {
    if (tableData?.views?.length && !tableData.views.some((v) => v.id === activeViewId)) {
      setActiveViewId(tableData.views[0]!.id);
    }
  }, [tableData?.views, activeViewId]);

  // URL sync
  useEffect(() => {
    if (activeTableId && activeView) {
      window.history.replaceState(null, "", `/${baseId}/${activeTableId}/${activeView.id}`);
    } else if (activeTableId) {
      window.history.replaceState(null, "", `/${baseId}/${activeTableId}`);
    }
  }, [activeTableId, activeView, baseId]);

  return {
    activeTableId,
    setActiveTableId,
    activeViewId,
    setActiveViewId,
    tableData,
    activeView,
    isRealTableId,
  };
}
