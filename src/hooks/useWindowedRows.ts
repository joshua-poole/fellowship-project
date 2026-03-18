import { useState, useCallback, useRef, useMemo } from "react";
import { api } from "~/trpc/react";
import type { TableQueryInput, RowData } from "~/types/Props";
import { PAGE_SIZE, BUFFER_PAGES, ROW_HEIGHT } from "~/lib/constants";

const MAX_SCROLL_HEIGHT = 10_000_000;

/** Debounce page fetching (ms) — fast enough to feel responsive, slow enough
 *  to avoid churning queries during fast scrolling. */
const PAGE_FETCH_DEBOUNCE = 50;

export function useWindowedRows(
  queryInput: TableQueryInput,
  serverRowCount: number,
) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Track the last `order` value per loaded page to enable cursor-based fetching
  const pageCursorsRef = useRef<Map<number, number>>(new Map());

  // Store the needed page range — only triggers re-renders when crossing a
  // page boundary, not on every scroll pixel.
  const [pageRange, setPageRange] = useState({ first: 0, last: 0 });
  const visibleRangeRef = useRef({ first: 0, last: 50 });

  const neededPages = useMemo(() => {
    const pages: number[] = [];
    for (let p = pageRange.first; p <= pageRange.last; p++) pages.push(p);
    return pages;
  }, [pageRange.first, pageRange.last]);

  const hasSorts = (queryInput.sorts?.length ?? 0) > 0;

  // Fetch pages using tRPC's useQueries
  const pageQueries = api.useQueries((t) =>
    neededPages.map((pageIdx) => {
      const prevLastOrder = pageCursorsRef.current.get(pageIdx - 1);
      const useCursor = prevLastOrder != null && !hasSorts;

      return t.row.getByTable(
        {
          ...queryInput,
          limit: PAGE_SIZE,
          offset: useCursor ? 0 : pageIdx * PAGE_SIZE,
          ...(useCursor ? { cursor: { order: prevLastOrder } } : {}),
        },
        { staleTime: 60_000, gcTime: 5 * 60_000 },
      );
    }),
  );

  // Persistent row cache — keeps previously loaded rows visible while new
  // pages load so rows don't flicker when neededPages changes.
  const rowCacheRef = useRef(new Map<number, RowData>());
  const totalCountRef = useRef(serverRowCount);

  // Update cache with freshly loaded pages
  useMemo(() => {
    for (let i = 0; i < neededPages.length; i++) {
      const pageIdx = neededPages[i]!;
      const result = pageQueries[i];
      if (result?.data) {
        totalCountRef.current = result.data.totalCount;
        const rows = result.data.rows;
        for (let r = 0; r < rows.length; r++) {
          rowCacheRef.current.set(pageIdx * PAGE_SIZE + r, rows[r]!);
        }
        if (rows.length > 0) {
          pageCursorsRef.current.set(pageIdx, rows[rows.length - 1]!.order);
        }
      }
    }

    // Evict rows far outside the needed range to bound memory
    const keepStart = Math.max(0, pageRange.first - BUFFER_PAGES) * PAGE_SIZE;
    const keepEnd = (pageRange.last + BUFFER_PAGES + 1) * PAGE_SIZE;
    for (const key of rowCacheRef.current.keys()) {
      if (key < keepStart || key >= keepEnd) rowCacheRef.current.delete(key);
    }
  }, [neededPages, pageQueries, pageRange.first, pageRange.last]);

  const totalCount = totalCountRef.current;

  const getRow = useCallback(
    (index: number): RowData | undefined => rowCacheRef.current.get(index),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [neededPages, pageQueries],
  );

  // Only true on the very first load — once any data has arrived, never show
  // the skeleton again (placeholder rows handle unloaded areas during scroll).
  const hasLoadedOnce = useRef(false);
  if (rowCacheRef.current.size > 0) hasLoadedOnce.current = true;
  const isLoading = !hasLoadedOnce.current && pageQueries.length > 0 && pageQueries.every((q) => q.isLoading);

  // Debounced isFetching — stays true until no queries have been fetching for
  // 300ms so the spinner doesn't flash on/off between page loads.
  const rawFetching = pageQueries.some((q) => q.isFetching);
  const [isFetching, setIsFetching] = useState(false);
  const fetchingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  if (rawFetching && !isFetching) {
    if (fetchingTimerRef.current) clearTimeout(fetchingTimerRef.current);
    fetchingTimerRef.current = null;
    // Use a microtask to batch with React's render cycle
    queueMicrotask(() => setIsFetching(true));
  }
  if (!rawFetching && isFetching && !fetchingTimerRef.current) {
    fetchingTimerRef.current = setTimeout(() => {
      fetchingTimerRef.current = null;
      setIsFetching(false);
    }, 300);
  }

  // Throttled scroll handler — fires immediately then rate-limits so pages
  // start loading as soon as scrolling begins instead of waiting until it stops.
  const lastFireRef = useRef(0);
  const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const updateVisibleRange = useCallback(() => {
    const el = tableContainerRef.current;
    if (!el) return;
    const realHeight = serverRowCount * ROW_HEIGHT;
    const totalSize = Math.min(realHeight, MAX_SCROLL_HEIGHT);
    const maxScroll = Math.max(1, totalSize - el.clientHeight);
    const realMaxScroll = Math.max(1, realHeight - el.clientHeight);
    const scrollFraction = Math.min(1, el.scrollTop / maxScroll);
    const realScrollTop = scrollFraction * realMaxScroll;
    const first = Math.floor(realScrollTop / ROW_HEIGHT);
    const last = Math.ceil((realScrollTop + el.clientHeight) / ROW_HEIGHT);
    visibleRangeRef.current = { first, last };

    // Only trigger a React re-render when the needed page range changes
    const tp = Math.max(1, Math.ceil(serverRowCount / PAGE_SIZE));
    const fp = Math.max(0, Math.floor(first / PAGE_SIZE) - BUFFER_PAGES);
    const lp = Math.min(tp - 1, Math.floor(last / PAGE_SIZE) + BUFFER_PAGES);
    setPageRange((prev) => {
      if (prev.first === fp && prev.last === lp) return prev;
      return { first: fp, last: lp };
    });
    lastFireRef.current = Date.now();
  }, [serverRowCount]);

  // Always defer page-range updates so they never cause synchronous re-renders
  // during the scroll event (which would jitter before the virtualizer transform).
  const handleScroll = useCallback(() => {
    if (throttleRef.current) clearTimeout(throttleRef.current);
    const now = Date.now();
    const elapsed = now - lastFireRef.current;
    const delay = elapsed >= PAGE_FETCH_DEBOUNCE ? 0 : PAGE_FETCH_DEBOUNCE - elapsed;
    throttleRef.current = setTimeout(updateVisibleRange, delay);
  }, [updateVisibleRange]);

  return {
    getRow,
    totalCount,
    isLoading,
    isFetching,
    tableContainerRef,
    handleScroll,
    visibleFirst: visibleRangeRef.current.first,
    visibleLast: visibleRangeRef.current.last,
  };
}
