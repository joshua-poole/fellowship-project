"use client";

import React, { useState, useMemo, createContext, useContext } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Skeleton } from "~/components/ui/skeleton";
import { EditableCell } from "~/components/EditableCell";
import { ColumnHeaderCell } from "~/components/ColumnHeaderCell";
import { ColumnFieldForm } from "~/components/ColumnFieldForm";
import { BulkCreateInput } from "~/components/BulkCreateInput";
import { Plus } from "lucide-react";
import { RowCheckbox } from "~/components/RowCheckbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { useInfiniteRows } from "~/hooks/useInfiniteRows";
import { useSearchMatches } from "~/hooks/useSearchMatches";
import { useRowMutations } from "~/hooks/useRowMutations";
import { useColumnMutations } from "~/hooks/useColumnMutations";
import type { RowData, TableQueryInput, TableVirtualizerContextValue, VirtualizedTableProps } from "~/types/Props";
import { ROW_HEIGHT, PAGE_LIMITS } from "~/lib/constants";

const TableVirtualizerContext = createContext<TableVirtualizerContextValue | null>(null);

export function useTableVirtualizer() {
  return useContext(TableVirtualizerContext);
}

export function VirtualizedTable({ tableId, columns, rowCount, search, searchMatchIndex, onSearchMatchCountChange, filters, sorts, onAddSort, onAddFilter, onHideColumn }: VirtualizedTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [addColumnOpen, setAddColumnOpen] = useState(false);

  // Build query input with view config
  const queryInput = useMemo<TableQueryInput>(() => {
    const input: TableQueryInput = { tableId, limit: PAGE_LIMITS[0] };
    if (search) input.search = search;
    if (filters?.length) {
      input.filters = filters.map((f) => ({
        columnId: f.columnId,
        operator: f.operator as NonNullable<TableQueryInput["filters"]>[number]["operator"],
        ...(f.value != null && f.value !== "" ? { value: f.value } : {}),
      }));
    }
    if (sorts?.length) {
      input.sorts = sorts.map((s) => ({ columnId: s.columnId, direction: s.direction }));
    }
    return input;
  }, [tableId, search, filters, sorts]);

  // Extracted hooks
  const { rows, isLoading, isFetchingNextPage, tableContainerRef, fetchMoreOnBottomReached } = useInfiniteRows(queryInput);
  const { searchMatches, scrollToRowRef } = useSearchMatches(search, rows, columns, searchMatchIndex, onSearchMatchCountChange);
  const { createRow } = useRowMutations(tableId, queryInput);
  const columnMutations = useColumnMutations(tableId);

  // Compute sets of columns with active filters/sorts for cell coloring
  const filteredColumnIds = useMemo(() => new Set(filters?.map((f) => f.columnId) ?? []), [filters]);
  const sortedColumnIds = useMemo(() => new Set(sorts?.map((s) => s.columnId) ?? []), [sorts]);

  // Column definitions
  const columnHelper = createColumnHelper<RowData>();

  const tableColumns = useMemo<ColumnDef<RowData, unknown>[]>(() => {
    const cols: ColumnDef<RowData, unknown>[] = [
      columnHelper.display({
        id: "_rowNum",
        header: () => {
          const allSelected = rows.length > 0 && selectedRows.size === rows.length;
          return (
            <div className="w-11 h-8 flex items-center justify-center pl-3">
              <RowCheckbox
                checked={allSelected}
                onClick={() => setSelectedRows(allSelected ? new Set() : new Set(rows.map((r) => r.id)))}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          const isSelected = selectedRows.has(row.original.id);
          const toggle = () =>
            setSelectedRows((prev) => {
              const next = new Set(prev);
              if (isSelected) next.delete(row.original.id);
              else next.add(row.original.id);
              return next;
            });
          return (
            <div className="w-8 h-8 flex items-center justify-center ml-3">
              <span className={`select-none text-xs text-gray-500 tabular-nums ${isSelected ? "hidden" : "group-hover/row:hidden"}`}>
                {row.index + 1}
              </span>
              <div className={`${isSelected ? "flex" : "hidden group-hover/row:flex"}`}>
                <RowCheckbox checked={isSelected} onClick={toggle} />
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
      const colIsFiltered = filteredColumnIds.has(col.id);
      const colIsSorted = sortedColumnIds.has(col.id);
      cols.push(
        columnHelper.accessor((row) => row.values[col.id] ?? "", {
          id: col.id,
          header: () => (
            <ColumnHeaderCell
              col={col}
              columns={columns}
              tableId={tableId}
              isFirstCol={isFirstCol}
              editingColumnId={editingColumnId}
              setEditingColumnId={setEditingColumnId}
              onCreateColumn={(input) => columnMutations.create.mutate(input)}
              onUpdateColumn={(input) => columnMutations.update.mutate(input)}
              onDeleteColumn={(input) => columnMutations.remove.mutate(input)}
              onAddSort={onAddSort}
              onAddFilter={onAddFilter}
              onHideColumn={onHideColumn}
            />
          ),
          cell: (info) => {
            const activeMatch = searchMatches.length > 0 && searchMatchIndex != null
              ? searchMatches[searchMatchIndex % searchMatches.length]
              : null;
            const isActive = activeMatch?.rowIndex === info.row.index && activeMatch?.columnId === col.id;
            return (
              <EditableCell
                tableId={tableId}
                rowId={info.row.original.id}
                columnId={col.id}
                columnType={col.type}
                initialValue={String(info.getValue())}
                isFirstCol={isFirstCol}
                isLastCol={isLastCol}
                isFirstRow={info.row.index === 0}
                search={search}
                isActiveSearchMatch={isActive}
                isFiltered={colIsFiltered}
                isSorted={colIsSorted}
              />
            );
          },
          size: 180,
        }) as ColumnDef<RowData, unknown>,
      );
    }

    // Button to add another column
    cols.push(
      columnHelper.display({
        id: "_addCol",
        header: () => (
          <Popover open={addColumnOpen} onOpenChange={setAddColumnOpen}>
            <PopoverTrigger asChild>
              <div className="flex items-center justify-center w-23.5 h-8 cursor-pointer hover:bg-gray-100">
                <Plus className="h-4 w-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-3 flex flex-col gap-3">
              <ColumnFieldForm
                defaultName={`Field ${columns.length + 1}`}
                onSave={(name, type) => {
                  columnMutations.create.mutate({ tableId, name, type });
                  setAddColumnOpen(false);
                }}
                onCancel={() => setAddColumnOpen(false)}
              />
            </PopoverContent>
          </Popover>
        ),
        cell: () => null,
        size: 94,
      }) as ColumnDef<RowData, unknown>,
    );

    return cols;
  }, [columns, columnHelper, tableId, selectedRows, columnMutations, rows, onAddFilter, onAddSort, onHideColumn, editingColumnId, addColumnOpen, search, searchMatches, searchMatchIndex, filteredColumnIds, sortedColumnIds]);

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

  scrollToRowRef.current = (index: number) => rowVirtualizer.scrollToIndex(index, { align: "center" });

  const virtualizerContextValue = useMemo<TableVirtualizerContextValue>(() => ({
    scrollToIndex: (index: number) => rowVirtualizer.scrollToIndex(index, { align: "auto" }),
    rowCount: tableRows.length,
    queryInput,
  }), [rowVirtualizer, tableRows.length, queryInput]);

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
    <TableVirtualizerContext.Provider value={virtualizerContextValue}>
    <div className="flex flex-col justify-between h-full w-full bg-[#f6f8fc]">
      <div
        ref={tableContainerRef}
        onScroll={(e) => fetchMoreOnBottomReached(e.currentTarget)}
        className="flex-1 min-w-0 overflow-auto relative"
      >
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }}>
        <table style={{ display: "grid", flexShrink: 0 }} className="text-sm">
          {/* Header */}
          <thead
            style={{ display: "grid" }}
            className="sticky top-0 z-1 bg-[#fbfcfe]"
          >
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} style={{ display: "flex", width: "100%" }}>
                {headerGroup.headers.map((header) => {
                  const colId = header.column.id;
                  const headerBg = filteredColumnIds.has(colId) || sortedColumnIds.has(colId) ? "#fff2ea" : undefined;
                  return (
                    <th
                      key={header.id}
                      className="border-r border-b border-(--colors-border-default) overflow-hidden shrink-0 p-0 hover:bg-gray-50 bg-white"
                      style={{ display: "flex", width: header.getSize(), height: ROW_HEIGHT, ...(headerBg && { backgroundColor: headerBg }) }}
                    >
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  );
                })}
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
                  className={`group/row ${isSelected ? "bg-[#fbfcfe]" : "hover:bg-gray-50/80"} bg-[#f6f8fc] focus-within:z-10`}
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
                      className={`border-b ${cell.id ? 'border-r' : ''} border-(--colors-border-default) focus-within:border-transparent shrink-0 ${colIndex === 0 ? "p-0 overflow-hidden" : "flex items-center px-1.5"} ${isSelected ? "bg-[#fbfcfe] focus-within:bg-white" : "bg-white"} relative`}
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
          style={{ height: ROW_HEIGHT, width: dataColumnsWidth, flexShrink: 0 }}
          onClick={() => createRow.mutate({ tableId })}
        >
          <div className="shrink-0 border-r border-(--colors-border-default) h-full w-21">
            <div className="w-8 h-8 flex items-center justify-center ml-3">
              <Plus className="h-4 w-4 text-black" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {isFetchingNextPage && (
          <div className="py-2 text-center text-xs text-gray-400">Loading more...</div>
        )}

        {/* Filler to extend row number column border to bottom of container */}
        <div className="flex flex-1 border-r w-21"/>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex items-center shrink-0 border-t border-(--colors-border-default) bg-white text-xs text-gray-500 h-7">
        <div className="shrink-0 border-r border-(--colors-border-default) h-full w-21" />
        <span className="px-3 tabular-nums">{Number(rowCount).toLocaleString()} {rowCount === 1 ? "record" : "records"}</span>
        <BulkCreateInput queryInput={queryInput} />
      </div>

    </div>
    </TableVirtualizerContext.Provider>
  );
}
