import { useCallback, useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

export interface VirtualItem {
  index: number;
  start: number;
  size: number;
}

interface Options {
  count: number;
  getScrollElement: () => HTMLDivElement | null;
  estimateSize: () => number;
  overscan?: number;
}

export function useTanstackVirtualizer(opts: Options) {
  const { count, getScrollElement, estimateSize, overscan = 5 } = opts;

  const virtualizer = useVirtualizer({
    count,
    getScrollElement,
    estimateSize,
    overscan,
  });

  const scrollToIndex = useCallback(
    (index: number, options?: { align?: "auto" | "center" | "start" | "end" }) => {
      virtualizer.scrollToIndex(index, { align: options?.align ?? "auto" });
    },
    [virtualizer],
  );

  const getVirtualItems = useCallback(
    (): VirtualItem[] =>
      virtualizer.getVirtualItems().map((item) => ({
        index: item.index,
        start: item.start,
        size: item.size,
      })),
    [virtualizer],
  );

  // TanStack Virtual positions rows absolutely within the totalSize container,
  // so no separate row container transform is needed. Provide a dummy ref.
  const rowContainerRef = useRef<HTMLDivElement>(null);

  return {
    getVirtualItems,
    getTotalSize: () => virtualizer.getTotalSize(),
    scrollToIndex,
    measureElement: virtualizer.measureElement,
    /** No-op — TanStack Virtual handles scroll internally */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    _onScroll: () => {},
    rowContainerRef,
  };
}
