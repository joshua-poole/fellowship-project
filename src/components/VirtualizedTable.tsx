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
import { Plus, ChevronDown, Check } from "lucide-react";
import { rowId } from "~/lib/ids";

type RowData = { id: string; order: number; values: Record<string, string | number> };
type ColDef = { id: string; name: string; type: string; order: number };

interface VirtualizedTableProps {
  tableId: string;
  columns: ColDef[];
}

const ROW_HEIGHT = 32;

export function VirtualizedTable({ tableId, columns }: VirtualizedTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const {
    data: rowPages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = api.row.getByTable.useInfiniteQuery(
    { tableId, limit: 100 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  const rows: RowData[] = useMemo(
    () => rowPages?.pages.flatMap((p) => p.rows) ?? [],
    [rowPages],
  );

  const utils = api.useUtils();

  // TODO: Add optimistic updates for row and column creation to make it instant in frontend
  const createRow = api.row.create.useMutation({
    onMutate: async ({ tableId: tid }) => {
      await utils.row.getByTable.cancel({ tableId: tid });
      const prev = utils.row.getByTable.getInfiniteData({ tableId: tid });
      const lastPage = prev?.pages[prev.pages.length - 1];
      const lastOrder = lastPage?.rows[lastPage.rows.length - 1]?.order ?? -1;
      const optimisticRow: RowData = { id: rowId(), order: lastOrder + 1, values: {} };
      utils.row.getByTable.setInfiniteData({ tableId: tid }, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page, i) =>
          i === old.pages.length - 1 ? { ...page, rows: [...page.rows, optimisticRow] } : page
        )};
      });
      return { prev, optimisticRow };
    },
    onError: (_err, { tableId: tid }, ctx) => {
      if (ctx?.prev) utils.row.getByTable.setInfiniteData({ tableId: tid }, ctx.prev);
    },
    onSuccess: (newRow, { tableId: tid }, ctx) => {
      utils.row.getByTable.setInfiniteData({ tableId: tid }, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page) => ({
          ...page,
          rows: page.rows.map((r) => r.id === ctx?.optimisticRow.id ? newRow : r),
        }))};
      });
    },
    onSettled: (_data, _err, { tableId: tid }) => {
      void utils.row.getByTable.invalidate({ tableId: tid });
    },
  });

  // TODO: imlpement properly
  const createColumn = api.column.create.useMutation({
    onSuccess: () => void utils.column.getByTable.invalidate({ tableId }),
  });

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

  const columnHelper = createColumnHelper<RowData>();

  const tableColumns = useMemo<ColumnDef<RowData, unknown>[]>(() => {
    const cols: ColumnDef<RowData, unknown>[] = [
      columnHelper.display({
        id: "_rowNum",
        header: () => {
          const allSelected = rows.length > 0 && selectedRows.size === rows.length;
          return (
            <div className="w-11 h-8 flex items-center justify-center pl-3">
              <div
                className="cursor-pointer flex items-center justify-center"
                onClick={() =>
                  setSelectedRows(allSelected ? new Set() : new Set(rows.map((r) => r.id)))
                }
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  backgroundColor: allSelected ? "rgb(22, 110, 225)" : "white",
                  border: `1.5px solid ${allSelected ? "rgb(22, 110, 225)" : "#d1d5db"}`,
                  boxSizing: "content-box",
                }}
              >
                {allSelected && <Check style={{ width: 9, height: 9, color: "white", strokeWidth: 3 }} />}
              </div>
            </div>
          );
        },
        cell: ({ row }) => {
          const isSelected = selectedRows.has(row.original.id);
          const toggle = () =>
            setSelectedRows((prev) => {
              const next = new Set(prev);
              if (isSelected) {
                next.delete(row.original.id);
              } else {
                next.add(row.original.id);
              }
              return next;
            });
          return (
            <div className="w-8 h-8 flex items-center justify-center ml-3">
              <span className={`select-none text-xs text-gray-500 tabular-nums ${isSelected ? "hidden" : "group-hover/row:hidden"}`}>
                {row.index + 1}
              </span>
              <div
                className={`cursor-pointer rounded-[3px] flex items-center justify-center ${isSelected ? "flex" : "hidden group-hover/row:flex"}`}
                onClick={toggle}
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 3,
                  backgroundColor: isSelected ? "rgb(22, 110, 225)" : "white",
                  border: `1.5px solid ${isSelected ? "rgb(22, 110, 225)" : "#d1d5db"}`,
                  boxSizing: "content-box",
                }}
              >
                {isSelected && <Check style={{ width: 9, height: 9, color: "white", strokeWidth: 3 }} />}
              </div>
            </div>
          );
        },
        size: 84,
      }) as ColumnDef<RowData, unknown>,
    ];

    for (let i = 0; i < columns.length; i++) {
      const col = columns[i]!;
      const isFirstCol = i === 0;
      const isLastCol = i === columns.length - 1;
      cols.push(
        columnHelper.accessor((row) => row.values[col.id] ?? "", {
          id: col.id,
          header: () => (
            <div className="group/header flex items-center w-full h-full overflow-hidden px-2">
              <span className="truncate font-medium text-xs text-gray-700 flex-1">{col.name}</span>
              <button className="invisible group-hover/header:visible flex items-center justify-center shrink-0 h-5 w-5 rounded hover:bg-black/10">
                <ChevronDown className="h-3 w-3 text-gray-500" />
              </button>
            </div>
          ),
          cell: (info) => (
            <EditableCell
              tableId={tableId}
              rowId={info.row.original.id}
              columnId={col.id}
              initialValue={String(info.getValue())}
              isFirstCol={isFirstCol}
              isLastCol={isLastCol}
              isFirstRow={info.row.index === 0}
            />
          ),
          size: 180,
        }) as ColumnDef<RowData, unknown>,
      );
    }

    // Button to add another column
    cols.push(
      columnHelper.display({
        id: "_addCol",
        header: () => (
          <div className="flex items-center justify-center w-23.5 h-8 cursor-pointer" onClick={() => createColumn.mutate({ tableId, name: `Column ${columns.length + 1}`, type: "TEXT" })}>
            <Plus className="h-4 w-4" />
          </div>
        ),
        cell: () => null,
        size: 94,
      }) as ColumnDef<RowData, unknown>,
    );

    return cols;
  }, [columns, columnHelper, tableId, rows, selectedRows, createColumn]);

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows: tableRows } = table.getRowModel();

  const dataColumnsWidth = table
    .getAllColumns()
    .filter((col) => col.id !== "_addCol")
    .reduce((sum, col) => sum + col.getSize(), 0);

  const rowVirtualizer = useVirtualizer({
    count: tableRows.length,
    estimateSize: () => ROW_HEIGHT,
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
    <div className="flex flex-col justify-between h-full w-full bg-[#f6f8fc]">
      <div
        ref={tableContainerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        className="flex-1 min-w-0 overflow-auto relative"
      >
        <table style={{ display: "grid" }} className="text-sm">
          {/* Header */}
          <thead
            style={{ display: "grid" }}
            className="sticky top-0 z-1 bg-[#fbfcfe]"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-r border-b border-(--colors-border-default) overflow-hidden shrink-0 p-0 hover:bg-gray-50 bg-white"
                    style={{ display: "flex", width: header.getSize(), height: ROW_HEIGHT }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody
            style={{
              display: "grid",
              height: `${rowVirtualizer.getTotalSize()}px`,
              position: "relative",
            }} className="bg-white"
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const row = tableRows[virtualRow.index]!;
              const isSelected = selectedRows.has(row.original.id);
              return (
                <tr
                  data-index={virtualRow.index}
                  ref={(node) => rowVirtualizer.measureElement(node)}
                  key={row.id}
                  className={`group/row ${isSelected ? "bg-blue-50" : "hover:bg-gray-50/80"} bg-[#f6f8fc] focus-within:z-10`}
                  style={{
                    display: "flex",
                    position: "absolute",
                    transform: `translateY(${virtualRow.start}px)`,
                    width: "100%",
                    height: ROW_HEIGHT,
                  }}
                >
                  {row.getVisibleCells().filter((cell) => cell.column.id !== "_addCol").map((cell, colIndex) => (
                    <td
                      key={cell.id}
                      className={`border-b border-r border-(--colors-border-default) focus-within:border-transparent shrink-0 ${colIndex === 0 ? "p-0 overflow-hidden" : "flex items-center px-1.5"} bg-white relative`}
                      style={{ display: "flex", width: cell.column.getSize(), height: ROW_HEIGHT }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Ghost / add row */}
        <div
          className="flex items-center border-b border-r border-(--colors-border-default) hover:bg-gray-50 cursor-pointer transition-colors bg-white"
          style={{ height: ROW_HEIGHT, width: dataColumnsWidth }}
          onClick={() => createRow.mutate({ tableId })}
        >
          <div className="shrink-0 border-r border-(--colors-border-default) h-full w-21">
            <div className="w-8 h-8 flex items-center justify-center ml-3">
              <Plus className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {isFetchingNextPage && (
          <div className="py-2 text-center text-xs text-gray-400">Loading more...</div>
        )}
      </div>

      {/* Summary bar */}
      <div className="flex items-center shrink-0 border-t border-(--colors-border-default) bg-white text-xs text-gray-500 h-7">
        <div className="flex items-center justify-between px-3 shrink-0 border-r border-(--colors-border-default) h-full w-21">
          <span className="tabular-nums">{rows.length} records</span>
        </div>
        {columns.map((col) => (
          <div
            key={col.id}
            className="flex items-center justify-end px-2 shrink-0 border-r border-(--colors-border-default) h-full text-gray-400 hover:bg-gray-50 cursor-pointer w-45"
          >
            <span>Summary</span>
            <ChevronDown className="h-3 w-3 ml-1" />
          </div>
        ))}
        <BulkCreateInput tableId={tableId} />
      </div>
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
    <div className="flex items-center gap-1 px-2 ml-auto">
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
