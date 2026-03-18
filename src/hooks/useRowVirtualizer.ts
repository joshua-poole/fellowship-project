import { useCallback, useRef } from "react";
import { useVirtualizer, observeElementOffset, elementScroll } from "@tanstack/react-virtual";
import type { VirtualizerReturn } from "~/types/Props";
import { ROW_HEIGHT } from "~/lib/constants";

/**
 * TanStack Virtual + scroll scaling that feels 1:1.
 *
 * Uses TanStack's useVirtualizer for item computation but overrides scroll
 * observation to support unlimited rows. The key trick: wheel events are
 * intercepted so each deltaY pixel moves exactly 1 virtual pixel (identical
 * to plain TanStack), while the scrollbar thumb uses fraction mapping to
 * give access to the full range. This is the same approach VS Code uses.
 */

const MAX_SCROLL_HEIGHT = 10_000_000;

interface Options {
  count: number;
  getScrollElement: () => HTMLDivElement | null;
  overscan?: number;
}

export function useRowVirtualizer(opts: Options): VirtualizerReturn {
  const { count, getScrollElement, overscan = 10 } = opts;

  const realTotalSize = count * ROW_HEIGHT;
  const needsScaling = realTotalSize > MAX_SCROLL_HEIGHT;

  const rowContainerRef = useRef<HTMLDivElement>(null);
  const firstItemStartRef = useRef(0);
  // Precise virtual offset — avoids rounding drift from scrollTop ↔ fraction conversions
  const virtualOffsetRef = useRef(0);

  const virtualizer = useVirtualizer({
    count,
    getScrollElement,
    estimateSize: () => ROW_HEIGHT,
    overscan,
    useFlushSync: false,

    ...(needsScaling
      ? {
          observeElementOffset: (instance, cb) => {
            const el = instance.scrollElement as HTMLElement | null;
            if (!el) return observeElementOffset(instance, cb);

            const maxBrowserScroll = () => Math.max(1, MAX_SCROLL_HEIGHT - el.clientHeight);
            const maxVirtualScroll = () => Math.max(1, realTotalSize - el.clientHeight);

            // Flag to distinguish wheel-initiated scrolls from scrollbar drags
            let fromWheel = false;

            const wheelHandler = (e: WheelEvent) => {
              e.preventDefault();

              // Convert deltaY to virtual pixels — handle line/page modes
              let delta = e.deltaY;
              if (e.deltaMode === 1) delta *= ROW_HEIGHT;
              else if (e.deltaMode === 2) delta *= el.clientHeight;

              // Update virtual offset 1:1 (identical to TanStack's native behavior)
              virtualOffsetRef.current = Math.max(
                0,
                Math.min(maxVirtualScroll(), virtualOffsetRef.current + delta),
              );

              // Map back to browser scroll space so the scrollbar thumb moves
              fromWheel = true;
              const fraction = virtualOffsetRef.current / maxVirtualScroll();
              el.scrollTop = fraction * maxBrowserScroll();
            };

            const scrollHandler = () => {
              let virtualOffset: number;

              if (fromWheel) {
                // Wheel-initiated: use precise tracked value (no rounding drift)
                fromWheel = false;
                virtualOffset = virtualOffsetRef.current;
              } else {
                // Scrollbar drag / programmatic: fraction mapping for full range
                const fraction = Math.min(1, el.scrollTop / maxBrowserScroll());
                virtualOffset = fraction * maxVirtualScroll();
                virtualOffsetRef.current = virtualOffset;
              }

              // Synchronously update wrapper transform via DOM
              if (rowContainerRef.current) {
                const offset =
                  firstItemStartRef.current + el.scrollTop - virtualOffset;
                rowContainerRef.current.style.transform = `translateY(${offset}px)`;
              }

              cb(virtualOffset, true);
            };

            // Non-passive so we can preventDefault on wheel
            el.addEventListener("wheel", wheelHandler, { passive: false });
            el.addEventListener("scroll", scrollHandler, { passive: true });
            scrollHandler(); // initial

            return () => {
              el.removeEventListener("wheel", wheelHandler);
              el.removeEventListener("scroll", scrollHandler);
            };
          },

          scrollToFn: (offset, canvasOptions, instance) => {
            const el = instance.scrollElement as HTMLElement | null;
            if (!el) return;
            const adjusted = offset + (canvasOptions.adjustments ?? 0);
            const maxVS = Math.max(1, realTotalSize - el.clientHeight);
            const maxBS = Math.max(1, MAX_SCROLL_HEIGHT - el.clientHeight);
            const fraction = maxVS > 0 ? adjusted / maxVS : 0;
            virtualOffsetRef.current = adjusted;
            elementScroll(fraction * maxBS, { behavior: canvasOptions.behavior }, instance);
          },
        }
      : {}),
  });

  const scrollToIndex = useCallback(
    (index: number, options?: { align?: "auto" | "center" | "start" | "end" }) => {
      virtualizer.scrollToIndex(index, { align: options?.align ?? "auto" });
    },
    [virtualizer],
  );

  const items = virtualizer.getVirtualItems();
  if (items.length > 0) {
    firstItemStartRef.current = items[0]!.start;
  }

  return {
    getVirtualItems: () =>
      virtualizer.getVirtualItems().map((item) => ({
        index: item.index,
        start: item.start,
        size: item.size,
      })),
    getTotalSize: () =>
      needsScaling
        ? MAX_SCROLL_HEIGHT
        : virtualizer.getTotalSize(),
    scrollToIndex,
    needsWrapperTransform: needsScaling,
    rowContainerRef,
    firstItemStart: items[0]?.start ?? 0,
  };
}
