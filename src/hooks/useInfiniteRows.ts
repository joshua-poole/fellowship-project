import { useMemo, useCallback, useEffect, useRef } from "react";
import { api } from "~/trpc/react";
import type { TableQueryInput, RowData } from "~/types/Props";
import { PAGE_LIMITS } from "~/lib/constants";

export function useInfiniteRows(queryInput: TableQueryInput) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const {
    data: rowPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.row.getByTable.useInfiniteQuery(queryInput, {
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.nextCursor) return undefined;
      const idx = Math.min(allPages.length, PAGE_LIMITS.length - 1);
      const nextLimit = PAGE_LIMITS[idx] ?? PAGE_LIMITS[PAGE_LIMITS.length - 1] ?? 50000;
      return { order: lastPage.nextCursor.order, limit: nextLimit };
    },
  });

  const rows: RowData[] = useMemo(
    () => rowPages?.pages.flatMap((p) => p.rows) ?? [],
    [rowPages],
  );

  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (scrollHeight - scrollTop - clientHeight < 500 && !isFetchingNextPage && hasNextPage) {
          void fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  return {
    rows,
    isLoading,
    isFetchingNextPage,
    tableContainerRef,
    fetchMoreOnBottomReached,
  };
}
