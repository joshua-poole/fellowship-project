"use client";

import React, { useState, useMemo, useCallback, useRef, createContext, useContext } from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  createColumnHelper,
  useReactTable,
} from "@tanstack/react-table";
import { Skeleton } from "~/components/ui/skeleton";
import { EditableCell, setActiveCell } from "~/components/EditableCell";
import { ColumnHeaderCell } from "~/components/ColumnHeaderCell";
import { ColumnFieldForm } from "~/components/ColumnFieldForm";
import { BulkCreateInput } from "~/components/BulkCreateInput";
import { Icon } from "./icons/Icon";
import { RowCheckbox } from "~/components/RowCheckbox";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { useOptimisticRows } from "~/hooks/useOptimisticRows";
import { useSearchMatches } from "~/hooks/useSearchMatches";
import { useRowMutations } from "~/hooks/useRowMutations";
import { useColumnMutations } from "~/hooks/useColumnMutations";
import type { RowData, TableQueryInput, TableVirtualizerContextValue, VirtualizedTableProps } from "~/types/Props";
import { ROW_HEIGHT, PAGE_SIZE } from "~/lib/constants";
import { useRowVirtualizer } from "~/hooks/useRowVirtualizer";

const TableVirtualizerContext = createContext<TableVirtualizerContextValue | null>(null);

export function useTableVirtualizer() {
  return useContext(TableVirtualizerContext);
}

export function VirtualizedTable({ tableId, columns, rowCount, search, searchMatchIndex, onSearchMatchCountChange, filters, sorts, onAddSort, onAddFilter, onHideColumn }: VirtualizedTableProps) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const selectedColumnRef = useRef<string | null>(null);
  const colSelectionStyleRef = useRef<HTMLStyleElement | null>(null);
  const [editingColumnId, setEditingColumnId] = useState<string | null>(null);
  const [addColumnOpen, setAddColumnOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; rowId: string } | null>(null);

  const handleRowContextMenu = useCallback((e: React.MouseEvent, rowId: string) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, rowId });
  }, []);

  // Build query input with view config (base input without offset/cursor — the hook adds those)
  const queryInput = useMemo<TableQueryInput>(() => {
    const input: TableQueryInput = { tableId, limit: PAGE_SIZE, offset: 0 };
    if (search) input.search = search;
    if (filters?.length) {
      const applicable = filters.filter((f) => {
        if (f.operator === "is_empty" || f.operator === "is_not_empty") return true;
        return f.value != null && f.value !== "";
      });
      if (applicable.length > 0) {
        input.filters = applicable.map((f) => ({
          columnId: f.columnId,
          operator: f.operator as NonNullable<TableQueryInput["filters"]>[number]["operator"],
          ...(f.value != null && f.value !== "" ? { value: f.value } : {}),
          ...(f.conjunction ? { conjunction: f.conjunction } : {}),
        }));
      }
    }
    if (sorts?.length) {
      input.sorts = sorts.map((s) => ({ columnId: s.columnId, direction: s.direction }));
    }
    return input;
  }, [tableId, search, filters, sorts]);

  // Extracted hooks
  const { getRow, saveCell: onSaveCell, totalCount, isLoading, isFetching, tableContainerRef, handleScroll, visibleFirst, visibleLast } = useOptimisticRows(queryInput, rowCount);
  const { searchMatches, scrollToRowRef } = useSearchMatches(search, getRow, totalCount, columns, visibleFirst, visibleLast, searchMatchIndex, onSearchMatchCountChange);
  const { createRow, deleteRow } = useRowMutations(tableId);
  const columnMutations = useColumnMutations(tableId);

  // Compute sets of columns with active filters/sorts for cell coloring
  const filteredColumnIds = useMemo(() => new Set(
    filters?.filter((f) => {
      if (f.operator === "is_empty" || f.operator === "is_not_empty") return true;
      return f.value != null && f.value !== "";
    }).map((f) => f.columnId) ?? []
  ), [filters]);
  const sortedColumnIds = useMemo(() => new Set(sorts?.map((s) => s.columnId) ?? []), [sorts]);

  // Column definitions
  const columnHelper = createColumnHelper<RowData>();

  // Ref for volatile render-time values — avoids rebuilding column defs on every state change
  const clearColumnSelection = useCallback(() => {
    if (!selectedColumnRef.current) return;
    selectedColumnRef.current = null;
    if (colSelectionStyleRef.current) colSelectionStyleRef.current.textContent = "";
  }, []);
  const renderRef = useRef({ selectedRows, getRow, totalCount, columnMutations, editingColumnId, addColumnOpen, search, searchMatches, searchMatchIndex, filteredColumnIds, sortedColumnIds, onAddFilter, onAddSort, onHideColumn, clearColumnSelection });
  renderRef.current = { selectedRows, getRow, totalCount, columnMutations, editingColumnId, addColumnOpen, search, searchMatches, searchMatchIndex, filteredColumnIds, sortedColumnIds, onAddFilter, onAddSort, onHideColumn, clearColumnSelection };

  const tableColumns = useMemo<ColumnDef<RowData, unknown>[]>(() => {
    const r = renderRef;
    const cols: ColumnDef<RowData, unknown>[] = [
      columnHelper.display({
        id: "_rowNum",
        header: () => {
          const { totalCount: tc, selectedRows: sel } = r.current;
          const allSelected = tc > 0 && sel.size === tc;
          return (
            <div className="w-11 h-8 flex items-center justify-center pl-3">
              <RowCheckbox
                checked={allSelected}
                onClick={() => {
                  if (allSelected) {
                    setSelectedRows(new Set());
                  } else {
                    // Select all loaded rows (can't select unloaded ones)
                    const ids = new Set<string>();
                    for (let i = 0; i < tc; i++) {
                      const row = r.current.getRow(i);
                      if (row) ids.add(row.id);
                    }
                    setSelectedRows(ids);
                  }
                }}
              />
            </div>
          );
        },
        cell: ({ row }) => {
          const isSelected = r.current.selectedRows.has(row.original.id);
          const toggle = () =>
            setSelectedRows((prev) => {
              const next = new Set(prev);
              if (isSelected) next.delete(row.original.id);
              else next.add(row.original.id);
              return next;
            });
          return (
            <div className="w-8 h-8 flex justify-center ml-3 pt-1.75">
              <span className={`select-none text-gray-500 tabular-nums font-normal ${isSelected ? "hidden" : "group-hover/row:hidden"}`} style={{ fontSize: 12, fontWeight: 400 }}>
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
      cols.push(
        columnHelper.accessor((row) => row.values[col.id] ?? "", {
          id: col.id,
          header: () => (
            <ColumnHeaderCell
              col={col}
              columns={columns}
              tableId={tableId}
              isFirstCol={isFirstCol}
              editingColumnId={r.current.editingColumnId}
              setEditingColumnId={setEditingColumnId}
              onCreateColumn={(input) => r.current.columnMutations.create.mutate(input)}
              onUpdateColumn={(input) => r.current.columnMutations.update.mutate(input)}
              onDeleteColumn={(input) => r.current.columnMutations.remove.mutate(input)}
              onAddSort={r.current.onAddSort}
              onAddFilter={r.current.onAddFilter}
              onHideColumn={r.current.onHideColumn}
              onSelectColumn={(colId) => {
                selectedColumnRef.current = colId;
                if (colSelectionStyleRef.current) {
                  const escaped = CSS.escape(colId);
                  colSelectionStyleRef.current.textContent = `
                    [data-col="${escaped}"] { background: var(--cell-background-selected) !important; }
                    div.sticky [data-col="${escaped}"] { background-color: var(--cell-background-header-selected) !important; }
                  `;
                }
              }}
            />
          ),
          cell: () => null, // Rows are rendered directly via virtualizer, not useReactTable
          size: col.type === "NUMBER" ? 183 : 180,
        }) as ColumnDef<RowData, unknown>,
      );
    }

    // Button to add another column
    cols.push(
      columnHelper.display({
        id: "_addCol",
        header: () => (
          <Popover open={r.current.addColumnOpen} onOpenChange={setAddColumnOpen}>
            <PopoverTrigger asChild>
              <div className="flex justify-center w-23.25 pt-1.75 h-8 cursor-pointer hover:bg-gray-100 border-r border-(--colors-border-default)">
                <Icon name="Plus" className="h-4 w-4" />
              </div>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-3 flex flex-col gap-3">
              <ColumnFieldForm
                defaultName={`Field ${columns.length + 1}`}
                onSave={(name, type) => {
                  r.current.columnMutations.create.mutate({ tableId, name, type });
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
  }, [columns, columnHelper, tableId]);

  // useReactTable is only used for column sizing/headers — not row data.
  // We pass an empty array because row rendering is handled directly via
  // the virtualizer + getRow().
  const emptyData = useMemo<RowData[]>(() => [], []);
  const table = useReactTable({
    data: emptyData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const allCols = table.getAllColumns();
  // Pre-compute column sizes into a Map for O(1) lookup per cell
  const colSizeMap = useMemo(() => {
    const map = new Map<string, number>();
    for (const col of allCols) map.set(col.id, col.getSize());
    return map;
  }, [allCols]);
  const rowNumWidth = colSizeMap.get("_rowNum") ?? 84;
  const dataColumnsWidth = allCols
    .filter((col) => col.id !== "_addCol")
    .reduce((sum, col) => sum + col.getSize(), 0);

  const rowVirtualizer = useRowVirtualizer({ count: totalCount, getScrollElement: () => tableContainerRef.current, overscan: 10 });

  scrollToRowRef.current = (index: number) =>
    rowVirtualizer.scrollToIndex(index, { align: "center" });

  const navigateToCell = useCallback((rowIndex: number, columnId: string) => {
    setActiveCell(rowIndex, columnId);
    rowVirtualizer.scrollToIndex(rowIndex, { align: "auto" });
  }, [rowVirtualizer]);

  const virtualizerContextValue = useMemo<TableVirtualizerContextValue>(() => ({
    scrollToIndex: (index: number) =>
      rowVirtualizer.scrollToIndex(index, { align: "auto" }),
    navigateToCell,
    rowCount: totalCount,
    queryInput,
  }), [rowVirtualizer, navigateToCell, totalCount, queryInput]);

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
    <div className="flex flex-col justify-between h-full w-full bg-[#f6f8fc] relative after:content-[''] after:absolute after:top-0 after:bottom-0 after:left-[83px] after:w-px after:bg-[#ccc] after:z-3 after:pointer-events-none">
      {/* Dynamic style for column selection — avoids React re-renders */}
      <style ref={colSelectionStyleRef} />
      <div
        ref={tableContainerRef}
        onScroll={handleScroll}
        className="min-w-0 overflow-auto relative"
        style={{ scrollPaddingTop: ROW_HEIGHT, height: "calc(100% - 34px)" }}
      >
          {/* Loading indicator moved to summary bar */}
          {/* Header — sticky so it stays visible while rows scroll */}
          <div className="sticky top-0 z-2 bg-[#fbfcfe] text-sm shrink-0" style={{ display: "flex", width: "100%" }}>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => {
                const colId = header.column.id;
                const allSelected = totalCount > 0 && selectedRows.size === totalCount;
                const isAddCol = colId === "_addCol";
                const isSpecialCol = colId === "_rowNum" || isAddCol;
                const isHeaderSearchMatch = !isSpecialCol && !!search && columns.some((c) => c.id === colId && c.name.toLowerCase().includes(search.toLowerCase()));
                const activeMatch = searchMatches.length > 0 && searchMatchIndex != null ? searchMatches[searchMatchIndex % searchMatches.length] : null;
                const isActiveHeaderMatch = isHeaderSearchMatch && activeMatch?.rowIndex === -1 && activeMatch?.columnId === colId;
                const headerBg = isSpecialCol ? undefined : isActiveHeaderMatch ? "var(--cell-background-foundCursor)" : isHeaderSearchMatch ? "var(--cell-background-found-selected)" : allSelected ? "#e7edf6" : filteredColumnIds.has(colId) ? "#ebfbec4D" : sortedColumnIds.has(colId) ? "#fff2ea4D" : undefined;
                return (
                  <div
                    key={header.id}
                    {...(!isSpecialCol ? { "data-col": colId } : {})}
                    className={`${isAddCol ? "" : "border-r"} ${colId === "_rowNum" ? "border-r-[#ccc]" : ""} border-b overflow-hidden shrink-0 p-0 ${allSelected || colId === "_rowNum" ? "" : "hover:bg-gray-50"} bg-white ${colId === "_rowNum" ? "" : "pt-px"}`}
                    style={{ display: "flex", width: header.getSize(), height: ROW_HEIGHT, ...(colId !== "_rowNum" && { borderRightColor: "var(--colors-border-default)" }), borderBottomColor: "hsl(0, 0%, 82%)", ...(headerBg && { backgroundColor: headerBg }) }}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                );
              })
            )}
          </div>

          {/* Virtualized rows */}
          <div
            className="relative w-full bg-white"
            style={{ height: `${rowVirtualizer.getTotalSize()}px`, overflow: "hidden", contain: "layout paint" }}
            onClick={clearColumnSelection}
          >
            {(() => {
              const virtualItems = rowVirtualizer.getVirtualItems();
              const firstStart = rowVirtualizer.firstItemStart;
              const useTransform = rowVirtualizer.needsWrapperTransform;
              return (
            <div
              ref={useTransform ? rowVirtualizer.rowContainerRef : undefined}
              className="absolute top-0 left-0 w-full"
            >
            {virtualItems.map((virtualRow) => {
              const rowData = getRow(virtualRow.index);
              const isPlaceholder = !rowData;
              const isSelected = rowData ? selectedRows.has(rowData.id) : false;
              const rowY = useTransform
                ? virtualRow.start - firstStart
                : virtualRow.start;

              return (
                <div
                  data-index={virtualRow.index}
                  key={virtualRow.index}
                  className={`absolute top-0 left-0 w-full group/row ${isSelected ? "bg-[#fbfcfe]" : "hover:bg-gray-50/80"} bg-[#f6f8fc] focus-within:z-10 text-sm`}
                  style={{
                    display: "flex",
                    transform: `translateY(${rowY}px)`,
                    height: ROW_HEIGHT,
                  }}
                >
                  {/* Row number / checkbox cell */}
                  <div
                    data-col="_rowNum"
                    className="border-b border-r border-(--colors-border-default) focus-within:border-transparent shrink-0 p-0 overflow-hidden bg-white group-hover/row:bg-[#f8f8f8] group-focus-within/row:bg-[#f8f8f8] focus-within:bg-white relative"
                    style={{ display: "flex", width: rowNumWidth, height: ROW_HEIGHT, borderRightColor: "#ccc" }}
                  >
                    <div className="w-8 h-8 flex justify-center ml-3 pt-1.75">
                      <span className={`select-none text-gray-500 tabular-nums font-normal ${isSelected ? "hidden" : "group-hover/row:hidden"}`} style={{ fontSize: 12, fontWeight: 400 }}>
                        {virtualRow.index + 1}
                      </span>
                      <div className={`${isSelected ? "flex" : "hidden group-hover/row:flex"}`}>
                        <RowCheckbox
                          checked={isSelected}
                          onClick={() => {
                            if (!rowData) return;
                            setSelectedRows((prev) => {
                              const next = new Set(prev);
                              if (isSelected) next.delete(rowData.id);
                              else next.add(rowData.id);
                              return next;
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Data cells */}
                  {columns.map((col, colIdx) => {
                    const isFirstCol = colIdx === 0;
                    const isLastCol = colIdx === columns.length - 1;
                    const colSize = colSizeMap.get(col.id) ?? (col.type === "NUMBER" ? 183 : 180);
                    const { searchMatches: matches, searchMatchIndex: matchIdx, search: s, filteredColumnIds: fIds, sortedColumnIds: sIds, clearColumnSelection: clearColSel } = renderRef.current;
                    const activeMatch = matches.length > 0 && matchIdx != null ? matches[matchIdx % matches.length] : null;
                    const isActive = activeMatch?.rowIndex === virtualRow.index && activeMatch?.columnId === col.id;

                    return (
                      <div
                        key={col.id}
                        data-col={col.id}
                        className={`border-b border-r border-(--colors-border-default) focus-within:border-transparent shrink-0 flex items-center px-1.5 ${isSelected ? "bg-[#f1f6ff]" : "bg-white group-hover/row:bg-[#f8f8f8] group-focus-within/row:bg-[#f8f8f8]"} focus-within:bg-white relative`}
                        style={{ display: "flex", width: colSize, height: ROW_HEIGHT }}
                        {...(rowData ? { onContextMenu: (e: React.MouseEvent) => handleRowContextMenu(e, rowData.id) } : {})}
                      >
                        {isPlaceholder ? null : (
                          <EditableCell
                            rowId={rowData.id}
                            columnId={col.id}
                            columnType={col.type}
                            initialValue={String(rowData.values[col.id] ?? "")}
                            isFirstCol={isFirstCol}
                            isLastCol={isLastCol}
                            isFirstRow={virtualRow.index === 0}
                            search={s}
                            isActiveSearchMatch={isActive}
                            isFiltered={fIds.has(col.id)}
                            isSorted={sIds.has(col.id)}
                            rowIndex={virtualRow.index}
                            rowCount={totalCount}
                            onSaveCell={onSaveCell}
                            onNavigateToCell={navigateToCell}
                            onClearColumnSelection={clearColSel}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
            </div>
              );
            })()}
          </div>

          {/* add row */}
          <div
            className="flex items-center border-b border-r border-(--colors-border-default) hover:bg-gray-50 cursor-pointer transition-colors bg-white"
            style={{ height: 31, width: dataColumnsWidth, flexShrink: 0 }}
            onClick={() => createRow.mutate({ tableId })}
          >
            <div className="shrink-0 border-r border-[#ccc] h-full w-21">
              <div className="w-8 h-8 flex items-center justify-center ml-3">
                <Icon name="Plus" className="h-4 w-4 -translate-y-px" style={{ color: "#545454" }} />
              </div>
            </div>
          </div>

          {/* Filler to extend row number column border to bottom of container */}
          <div className="flex flex-1 border-r w-21 border-[#ccc]"/>
        </div>

      {/* Summary bar */}
      <div className="relative flex items-center shrink-0 border-t border-(--colors-border-default) bg-white text-xs text-gray-500 h-8.5">
        <div className="absolute bottom-0 left-0 inline-flex border-r border-[#ccc] h-full w-21">
          <span className="h-6 pl-2 pt-1.25 pb-0.5 pr-2 text-[11px] text-black tabular-nums">
            {(() => { const count = totalCount; return `${count.toLocaleString()} ${count === 1 ? "record" : "records"}`; })()}
          </span>
        </div>
        {isFetching && (
          <div className="flex items-center gap-1.5 ml-auto mr-2">
            <div className="h-3 w-3 shrink-0 rounded-full border-[1.5px] border-gray-300 border-t-black animate-spin" />
            <span className="text-[11px] text-gray-500">Loading…</span>
          </div>
        )}
        <BulkCreateInput queryInput={queryInput} />
      </div>

    </div>

    {/* Row right-click context menu */}
    {contextMenu && (
      <>
        <div className="fixed inset-0 z-50" onClick={() => setContextMenu(null)} onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }} />
        <div
          className="fixed z-50 bg-white border border-(--colors-border-default) rounded-md shadow-md py-1 min-w-40"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            className="w-full px-3 py-1.5 text-left text-sm text-red-600 hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              deleteRow.mutate({ id: contextMenu.rowId });
              setSelectedRows((prev) => { const next = new Set(prev); next.delete(contextMenu.rowId); return next; });
              setContextMenu(null);
            }}
          >
            Delete row
          </button>
        </div>
      </>
    )}
    </TableVirtualizerContext.Provider>
  );
}
