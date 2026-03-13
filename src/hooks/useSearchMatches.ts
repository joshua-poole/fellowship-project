import { useMemo, useEffect, useRef } from "react";
import type { RowData, ColDef } from "~/types/Props";

export type SearchMatch = { rowIndex: number; columnId: string };

export function useSearchMatches(
  search: string | undefined,
  rows: RowData[],
  columns: ColDef[],
  searchMatchIndex: number | undefined,
  onSearchMatchCountChange: ((total: number) => void) | undefined,
) {
  const searchMatches = useMemo(() => {
    if (!search) return [];
    const lower = search.toLowerCase();
    const matches: SearchMatch[] = [];
    for (let r = 0; r < rows.length; r++) {
      for (const col of columns) {
        const val = rows[r]?.values[col.id];
        if (val != null && String(val).toLowerCase().includes(lower)) {
          matches.push({ rowIndex: r, columnId: col.id });
        }
      }
    }
    return matches;
  }, [search, rows, columns]);

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
