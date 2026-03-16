import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import type { FilterConfig, SortConfig } from "~/components/ViewToolbar";
import type { ColDef, ViewData, ViewUpdatePayload } from "~/types/Props";

const SEARCH_DEBOUNCE_MS = 300;

export function useViewConfig(
  activeView: ViewData | undefined,
  saveToView: (update: ViewUpdatePayload) => void,
  columns: ColDef[],
) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [filters, setFilters] = useState<FilterConfig[]>([]);
  const [sorts, setSorts] = useState<SortConfig[]>([]);
  const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load state from active view when it changes
  useEffect(() => {
    if (activeView) {
      setSearch(activeView.search ?? "");
      setDebouncedSearch(activeView.search ?? "");
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

  const handleSearchChange = useCallback((v: string) => {
    setSearch(v);
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      setDebouncedSearch(v);
      saveViewConfig({ search: v });
    }, SEARCH_DEBOUNCE_MS);
  }, [saveViewConfig]);

  // Cleanup timer on unmount
  useEffect(() => () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current); }, []);

  const handleFiltersChange = useCallback((v: FilterConfig[]) => { setFilters(v); saveViewConfig({ filters: v }); }, [saveViewConfig]);
  const handleSortsChange = useCallback((v: SortConfig[]) => { setSorts(v); saveViewConfig({ sorts: v }); }, [saveViewConfig]);
  const handleHiddenColumnsChange = useCallback((v: string[]) => { setHiddenColumns(v); saveViewConfig({ hiddenColumns: v }); }, [saveViewConfig]);

  const visibleColumns = useMemo(() => {
    const hiddenSet = new Set(hiddenColumns);
    return columns.filter((c) => !hiddenSet.has(c.id));
  }, [columns, hiddenColumns]);

  return {
    search,
    debouncedSearch,
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
