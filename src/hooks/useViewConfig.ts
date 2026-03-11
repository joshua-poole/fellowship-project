import { useState, useEffect, useCallback, useMemo } from "react";
import type { FilterConfig, SortConfig } from "~/components/ViewToolbar";

type ViewData = {
  id: string;
  search: string | null;
  filters: { columnId: string; operator: string; value: string | null }[];
  sorts: { columnId: string; direction: string }[];
  hiddenColumns: { columnId: string }[];
};

type ColDef = { id: string; name: string; type: string; order: number };

type ViewUpdatePayload = {
  id: string;
  search?: string | null;
  name?: string;
  order?: number;
  filters?: { columnId: string; operator: "equals" | "contains" | "not_contains" | "is_empty" | "is_not_empty" | "gt" | "lt"; value?: string | null }[];
  sorts?: { columnId: string; direction: "asc" | "desc"; order?: number }[];
  hiddenColumns?: string[];
};

export function useViewConfig(
  activeView: ViewData | undefined,
  saveToView: (update: ViewUpdatePayload) => void,
  columns: ColDef[],
) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [sorts, setSorts] = useState<SortConfig[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);

  // Load state from active view when it changes
  useEffect(() => {
    if (activeView) {
      setSearch(activeView.search ?? "");
      setFilters(activeView.filters?.map((f) => ({
        columnId: f.columnId,
        operator: f.operator,
        value: f.value ?? null,
      })) ?? []);
      setSorts(activeView.sorts?.map((s) => ({
        columnId: s.columnId,
        direction: s.direction as SortConfig["direction"],
      })) ?? []);
      setHiddenColumns(activeView.hiddenColumns?.map((h) => h.columnId) ?? []);
    }
  }, [activeView?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Persist toolbar changes back to the active view
  const saveViewConfig = useCallback((update: {
    search?: string;
    filters?: FilterConfig[];
    sorts?: SortConfig[];
    hiddenColumns?: string[];
  }) => {
    if (!activeView) return;
    saveToView({
      id: activeView.id,
      ...(update.search !== undefined && { search: update.search || null }),
      ...(update.filters !== undefined && {
        filters: update.filters.map((f) => ({
          columnId: f.columnId,
          operator: f.operator as "equals" | "contains" | "not_contains" | "is_empty" | "is_not_empty" | "gt" | "lt",
          value: f.value ?? null,
        })),
      }),
      ...(update.sorts !== undefined && {
        sorts: update.sorts.map((s, i) => ({
          columnId: s.columnId,
          direction: s.direction,
          order: i,
        })),
      }),
      ...(update.hiddenColumns !== undefined && { hiddenColumns: update.hiddenColumns }),
    });
  }, [activeView, saveToView]);

  const handleSearchChange = useCallback((v: string) => { setSearch(v); saveViewConfig({ search: v }); }, [saveViewConfig]);
  const handleFiltersChange = useCallback((v: FilterConfig[]) => { setFilters(v); saveViewConfig({ filters: v }); }, [saveViewConfig]);
  const handleSortsChange = useCallback((v: SortConfig[]) => { setSorts(v); saveViewConfig({ sorts: v }); }, [saveViewConfig]);
  const handleHiddenColumnsChange = useCallback((v: string[]) => { setHiddenColumns(v); saveViewConfig({ hiddenColumns: v }); }, [saveViewConfig]);

  const visibleColumns = useMemo(() => {
    const hiddenSet = new Set(hiddenColumns);
    return columns.filter((c) => !hiddenSet.has(c.id));
  }, [columns, hiddenColumns]);

  return {
    search,
    filters,
    sorts,
    hiddenColumns,
    visibleColumns,
    handleSearchChange,
    handleFiltersChange,
    handleSortsChange,
    handleHiddenColumnsChange,
  };
}
