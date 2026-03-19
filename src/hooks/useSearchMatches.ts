import { useMemo, useEffect, useRef } from "react";
import type { RowData, ColDef } from "~/types/Props";

export type SearchMatch = { rowIndex: number; columnId: string };

export function useSearchMatches(
  search: string | undefined,
  getRow: (index: number) => RowData | undefined,
  totalCount: number,
  columns: ColDef[],
  visibleFirst: number,
  visibleLast: number,
  searchMatchIndex: number | undefined,
  onSearchMatchCountChange: ((total: number) => void) | undefined,
) {
  // Only search loaded/visible rows — server-side search already filters the
  // full dataset.  Client-side matching is purely for highlighting.
  const searchMatches = useMemo(() => {
    if (!search) return [];
    const lower = search.toLowerCase();
    const matches: SearchMatch[] = [];
    // Include header matches (rowIndex -1)
    for (const col of columns) {
      if (col.name.toLowerCase().includes(lower)) {
        matches.push({ rowIndex: -1, columnId: col.id });
      }
    }
    // Search a window around the visible range (loaded pages cover this)
    const start = Math.max(0, visibleFirst - 500);
    const end = Math.min(totalCount, visibleLast + 500);
    for (let r = start; r < end; r++) {
      const row = getRow(r);
      if (!row) continue;
      for (const col of columns) {
        const val = row.values[col.id];
        if (val != null && String(val).toLowerCase().includes(lower)) {
          matches.push({ rowIndex: r, columnId: col.id });
        }
      }
    }
    return matches;
  }, [search, getRow, totalCount, columns, visibleFirst, visibleLast]);

  useEffect(() => {
    if (onSearchMatchCountChange) (onSearchMatchCountChange as (n: number) => void)(searchMatches.length);
  }, [searchMatches.length, onSearchMatchCountChange]);

  const scrollToRowRef = useRef<((index: number) => void) | null>(null);

  useEffect(() => {
    if (searchMatchIndex == null || searchMatches.length === 0) return;
    const match = searchMatches[searchMatchIndex % searchMatches.length];
    if (match) {
      scrollToRowRef.current?.(match.rowIndex);
    }
  }, [searchMatchIndex, searchMatches]);

  return { searchMatches, scrollToRowRef };
}
