"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";
import { EditableCell } from "~/components/EditableCell";
import { Plus } from "lucide-react";

type RowData = { id: string; order: number; values: Record<string, string | number> };
type ColDef = { id: string; name: string; type: string; order: number };

interface VirtualizedTableProps {
  tableId: string;
  columns: ColDef[];
}

export function VirtualizedTable({ tableId, columns }: VirtualizedTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);

  // Infinite query using cursor-based pagination
  const {
    data: rowPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch: refetchRows,
  } = api.row.getByTable.useInfiniteQuery(
    { tableId, limit: 100 },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  // Flatten pages into a single array
  const rows: RowData[] = useMemo(
    () => rowPages?.pages.flatMap((p) => p.rows) ?? [],
    [rowPages],
  );

  const createRow = api.row.create.useMutation({
    onSuccess: () => refetchRows(),
  });

  // Fetch more rows when scrolling near the bottom
  const fetchMoreOnBottomReached = useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        if (
          scrollHeight - scrollTop - clientHeight < 500 &&
          !isFetchingNextPage &&
          hasNextPage
        ) {
          void fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetchingNextPage, hasNextPage],
  );

  useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);

  // Build TanStack Table columns from the dynamic column definitions
  const columnHelper = createColumnHelper<RowData>();

  const tableColumns = useMemo<ColumnDef<RowData, unknown>[]>(() => {
    const cols: ColumnDef<RowData, unknown>[] = [
      columnHelper.display({
        id: "_checkbox",
        header: () => <input type="checkbox" className="h-3.5 w-3.5 accent-blue-500" />,
        cell: () => <input type="checkbox" className="h-3.5 w-3.5 accent-blue-500" />,
        size: 36,
      }) as ColumnDef<RowData, unknown>,
      columnHelper.display({
        id: "_rowNum",
        header: () => null,
        cell: ({ row }) => (
          <span className="text-gray-400 text-xs tabular-nums">{row.index + 1}</span>
        ),
        size: 48,
      }) as ColumnDef<RowData, unknown>,
    ];

    for (const col of columns) {
      cols.push(
        columnHelper.accessor((row) => row.values[col.id] ?? "", {
          id: col.id,
          header: () => col.name,
          cell: (info) => (
            <EditableCell
              tableId={tableId}
              rowId={info.row.original.id}
              columnId={col.id}
              initialValue={String(info.getValue())}
            />
          ),
          size: 180,
        }) as ColumnDef<RowData, unknown>,
      );
    }

    cols.push(
      columnHelper.display({
        id: "_addCol",
        header: () => <Plus className="h-4 w-4 text-gray-400" />,
        cell: () => null,
        size: 48,
      }) as ColumnDef<RowData, unknown>,
    );

    return cols;
  }, [columns, columnHelper, tableId]);

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows: tableRows } = table.getRowModel();

  const rowVirtualizer = useVirtualizer({
    count: tableRows.length,
    estimateSize: () => 33,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
        ? (element: Element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-full" />
        ))}
      </div>
    );
  }

  return (
    <div
      ref={tableContainerRef}
      onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
      className="flex-1 min-w-0 overflow-auto relative"
    >
      <table style={{ display: "grid" }} className="text-sm">
        <thead
          style={{ display: "grid", position: "sticky", top: 0, zIndex: 1 }}
          className="bg-gray-100"
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="text-left px-3 py-1.5 text-xs font-medium text-gray-600 border-b border-r border-(--colors-border-default)"
                  style={{ display: "flex", width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          style={{
            display: "grid",
            height: `${rowVirtualizer.getTotalSize()}px`,
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = tableRows[virtualRow.index]!;
            return (
              <tr
                data-index={virtualRow.index}
                ref={(node) => rowVirtualizer.measureElement(node)}
                key={row.id}
                className="hover:bg-blue-50/50"
                style={{
                  display: "flex",
                  position: "absolute",
                  transform: `translateY(${virtualRow.start}px)`,
                  width: "100%",
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-1 border-b border-r border-(--colors-border-default) text-sm"
                    style={{ display: "flex", width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Add row / bulk create */}
      <div className="flex items-center border-b border-(--colors-border-default)">
        <div
          className="flex items-center hover:bg-gray-50 cursor-pointer transition-colors flex-1"
          onClick={() => createRow.mutate({ tableId })}
        >
          <div className="px-3 py-1 border-r border-(--colors-border-default)" style={{ width: 36 }} />
          <div className="px-3 py-1 border-r border-(--colors-border-default)" style={{ width: 48 }}>
            <Plus className="h-3.5 w-3.5 text-gray-400" />
          </div>
        </div>
        <BulkCreateInput tableId={tableId} />
      </div>

      {isFetchingNextPage && (
        <div className="py-2 text-center text-xs text-gray-400">Loading more...</div>
      )}
    </div>
  );
}

function BulkCreateInput({ tableId }: { tableId: string }) {
  const [count, setCount] = useState(1000);
  const utils = api.useUtils();

  const bulkCreate = api.row.bulkCreate.useMutation({
    onSuccess: () => utils.row.getByTable.invalidate({ tableId }),
  });

  return (
    <div className="flex items-center gap-1 px-2">
      <input
        type="number"
        min={1}
        max={100000}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-20 px-2 py-0.5 text-xs border border-(--colors-border-default) rounded-sm outline-none"
        disabled={bulkCreate.isPending}
      />
      <button
        className="px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors whitespace-nowrap rounded-sm"
        onClick={() => bulkCreate.mutate({ tableId, count })}
        disabled={bulkCreate.isPending || count < 1}
      >
        {bulkCreate.isPending ? "Inserting..." : `+ rows`}
      </button>
    </div>
  );
}
