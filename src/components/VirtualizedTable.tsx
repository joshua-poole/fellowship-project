"use client";

import React, { useState, useMemo, useRef, useCallback, useEffect, createContext, useContext } from "react";
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
import {
  Plus,
  ChevronDown,
  Check,
  Pencil,
  Copy,
  ArrowLeft,
  ArrowRight,
  AlignStartVertical,
  Link as LinkIcon,
  Info,
  Lock,
  ArrowDownAZ,
  ArrowUpZA,
  ListFilter,
  Group,
  GitBranch,
  EyeOff,
  Trash2,
  ALargeSmall,
  Hash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { rowId } from "~/lib/ids";
import { type RowGetByTableInputSchema } from '../types/row';
import type z from "zod";

type RowData = { id: string; order: number; values: Record<string, string | number> };
type ColDef = { id: string; name: string; type: string; order: number };

interface TableVirtualizerContextValue {
  scrollToIndex: (index: number) => void;
  rowCount: number;
  queryInput: TableQueryInput;
}

const TableVirtualizerContext = createContext<TableVirtualizerContextValue | null>(null);

export function useTableVirtualizer() {
  return useContext(TableVirtualizerContext);
}

interface ViewFilter {
  columnId: string;
  operator: string;
  value?: string | number | null;
}

interface ViewSort {
  columnId: string;
  direction: "asc" | "desc";
}

interface VirtualizedTableProps {
  tableId: string;
  columns: ColDef[];
  search?: string;
  filters?: ViewFilter[];
  sorts?: ViewSort[];
  onAddSort?: (columnId: string, direction: "asc" | "desc") => void;
  onAddFilter?: (columnId: string) => void;
  onHideColumn?: (columnId: string) => void;
}

type TableQueryInput =z.infer<typeof RowGetByTableInputSchema>;

const ROW_HEIGHT = 32;
const PAGE_LIMITS = [2000, 10000, 50000];

export function VirtualizedTable({ tableId, columns, search, filters, sorts, onAddSort, onAddFilter, onHideColumn }: VirtualizedTableProps) {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Build query input with view config
  const queryInput = useMemo<TableQueryInput>(() => {
    const input: {
      tableId: string;
      limit: number;
      search?: string;
      filters?: { columnId: string; operator: "equals" | "contains" | "not_contains" | "is_empty" | "is_not_empty" | "gt" | "lt"; value?: string | number }[];
      sorts?: { columnId: string; direction: "asc" | "desc" }[];
    } = { tableId, limit: PAGE_LIMITS[0]! };

    if (search) input.search = search;

    if (filters && filters.length > 0) {
      input.filters = filters.map((f) => ({
        columnId: f.columnId,
        operator: f.operator as "equals" | "contains" | "not_contains" | "is_empty" | "is_not_empty" | "gt" | "lt",
        ...(f.value != null && f.value !== "" ? { value: f.value } : {}),
      }));
    }

    if (sorts && sorts.length > 0) {
      input.sorts = sorts.map((s) => ({
        columnId: s.columnId,
        direction: s.direction,
      }));
    }

    return input;
  }, [tableId, search, filters, sorts]);

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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- tRPC infinite query types are unresolvable by ESLint
      return { order: lastPage.nextCursor.order, limit: nextLimit };
    },
  });

  const rows: RowData[] = useMemo(
    () => rowPages?.pages.flatMap((p) => p.rows) ?? [],
    [rowPages],
  );

  const utils = api.useUtils();

  // TODO: Add optimistic updates for row and column creation to make it instant in frontend
  const createRow = api.row.create.useMutation({
    onMutate: async ({ tableId: tid }) => {
      await utils.row.getByTable.cancel({ tableId: tid });
      const prev = utils.row.getByTable.getInfiniteData(queryInput);
      const lastPage = prev?.pages[prev.pages.length - 1];
      const lastOrder = lastPage?.rows[lastPage.rows.length - 1]?.order ?? -1;
      const optimisticRow: RowData = { id: rowId(), order: lastOrder + 1, values: {} };
      utils.row.getByTable.setInfiniteData(queryInput, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page, i) =>
          i === old.pages.length - 1 ? { ...page, rows: [...page.rows, optimisticRow] } : page
        )};
      });
      return { prev, optimisticRow };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.row.getByTable.setInfiniteData(queryInput, ctx.prev);
    },
    onSuccess: (newRow, _vars, ctx) => {
      utils.row.getByTable.setInfiniteData(queryInput, (old) => {
        if (!old) return old;
        return { ...old, pages: old.pages.map((page) => ({
          ...page,
          rows: page.rows.map((r) => r.id === ctx?.optimisticRow.id ? newRow : r),
        }))};
      });
    },
    onSettled: () => {
      void utils.row.getByTable.invalidate({ tableId });
    },
  });

  const createColumn = api.column.create.useMutation({
    onMutate: async (input) => {
      await utils.table.getById.cancel({ id: tableId });
      const prev = utils.table.getById.getData({ id: tableId });
      const existingCols = prev?.columns ?? [];
      let newOrder: number;
      if (input.order !== undefined) {
        newOrder = input.order;
      } else {
        newOrder = (existingCols[existingCols.length - 1]?.order ?? -1) + 1;
      }
      const optimisticCol = {
        id: `fld_tmp_${Date.now()}`,
        name: input.name,
        type: input.type,
        order: newOrder,
      };
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        let cols: typeof old.columns;
        if (input.order !== undefined) {
          cols = old.columns.map((c) =>
            c.order >= input.order! ? { ...c, order: c.order + 1 } : c
          );
          cols.push(optimisticCol);
        } else {
          cols = [...old.columns, optimisticCol];
        }
        cols.sort((a, b) => a.order - b.order);
        return { ...old, columns: cols };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.table.getById.setData({ id: tableId }, ctx.prev);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  const updateColumn = api.column.update.useMutation({
    onMutate: async (input) => {
      await utils.table.getById.cancel({ id: tableId });
      const prev = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return {
          ...old,
          columns: old.columns.map((c) =>
            c.id === input.id
              ? {
                  ...c,
                  ...(input.name !== undefined && { name: input.name }),
                  ...(input.type !== undefined && { type: input.type }),
                  ...(input.order !== undefined && { order: input.order }),
                }
              : c
          ),
        };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.table.getById.setData({ id: tableId }, ctx.prev);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  const deleteColumn = api.column.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.table.getById.cancel({ id: tableId });
      const prev = utils.table.getById.getData({ id: tableId });
      utils.table.getById.setData({ id: tableId }, (old) => {
        if (!old) return old;
        return { ...old, columns: old.columns.filter((c) => c.id !== id) };
      });
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.table.getById.setData({ id: tableId }, ctx.prev);
    },
    onSettled: () => {
      void utils.table.getById.invalidate({ id: tableId });
    },
  });

  const [renamingColumnId, setRenamingColumnId] = useState<string | null>(null);

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="group/header flex items-center w-full h-full overflow-hidden px-2 cursor-pointer">
                  {renamingColumnId === col.id ? (
                    <input
                      autoFocus
                      defaultValue={col.name}
                      className="flex-1 min-w-0 text-xs font-medium outline-none bg-transparent border-2 border-blue-500 rounded px-1 -mx-1"
                      onClick={(e) => e.stopPropagation()}
                      onPointerDown={(e) => e.stopPropagation()}
                      onBlur={(e) => {
                        const val = e.currentTarget.value.trim();
                        if (val && val !== col.name) updateColumn.mutate({ id: col.id, name: val });
                        setRenamingColumnId(null);
                      }}
                      onKeyDown={(e) => {
                        e.stopPropagation();
                        if (e.key === "Enter") e.currentTarget.blur();
                        if (e.key === "Escape") setRenamingColumnId(null);
                      }}
                    />
                  ) : (
                    <>
                      {col.type === "NUMBER"
                        ? <Hash className="h-3.5 w-3.5 shrink-0 text-gray-400 mr-1" />
                        : <ALargeSmall className="h-3.5 w-3.5 shrink-0 text-gray-400 mr-1" />
                      }
                      <span className="truncate font-medium text-xs text-gray-700 flex-1">{col.name}</span>
                      <button className="invisible group-hover/header:visible flex items-center justify-center shrink-0 h-5 w-5 rounded hover:bg-black/10">
                        <ChevronDown className="h-3 w-3 text-gray-500" />
                      </button>
                    </>
                  )}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" className="w-60">
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" onClick={() => requestAnimationFrame(() => setRenamingColumnId(col.id))}>
                  <Pencil className="h-4 w-4" /> Edit field
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                  <Copy className="h-4 w-4" /> Duplicate field
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-3 px-3 py-2"
                  disabled={isFirstCol}
                  onClick={() => createColumn.mutate({ tableId, name: `Field ${columns.length + 1}`, type: "TEXT", order: col.order })}
                >
                  <ArrowLeft className="h-4 w-4" /> Insert left
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-3 px-3 py-2"
                  onClick={() => createColumn.mutate({ tableId, name: `Field ${columns.length + 1}`, type: "TEXT", order: col.order + 1 })}
                >
                  <ArrowRight className="h-4 w-4" /> Insert right
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" disabled={!isFirstCol}>
                  <AlignStartVertical className="h-4 w-4" /> Change primary field
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                  <LinkIcon className="h-4 w-4" /> Copy field URL
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                  <Info className="h-4 w-4" /> Edit field description
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                  <Lock className="h-4 w-4" /> Edit field permissions
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" onClick={() => onAddSort?.(col.id, "asc")}>
                  <ArrowDownAZ className="h-4 w-4" /> Sort A → Z
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" onClick={() => onAddSort?.(col.id, "desc")}>
                  <ArrowUpZA className="h-4 w-4" /> Sort Z → A
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" onClick={() => onAddFilter?.(col.id)}>
                  <ListFilter className="h-4 w-4" /> Filter by this field
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                  <Group className="h-4 w-4" /> Group by this field
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                  <GitBranch className="h-4 w-4" /> Show dependencies
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2 text-gray-400" onClick={() => onHideColumn?.(col.id)}>
                  <EyeOff className="h-4 w-4" /> Hide field
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer gap-3 px-3 py-2 text-red-500 focus:text-red-500"
                  onClick={() => deleteColumn.mutate({ id: col.id })}
                >
                  <Trash2 className="h-4 w-4" /> Delete field
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
  }, [columns, columnHelper, tableId, selectedRows, createColumn, rows, deleteColumn, onAddFilter, onAddSort, onHideColumn, renamingColumnId, updateColumn]);

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
        <BulkCreateInput queryInput={queryInput} />
      </div>
    </div>
    </TableVirtualizerContext.Provider>
  );
}

function BulkCreateInput({ queryInput }: { queryInput: TableQueryInput }) {
  const [count, setCount] = useState(1000);
  const [progress, setProgress] = useState(0);
  const [isInserting, setIsInserting] = useState(false);
  const utils = api.useUtils();

  const bulkCreate = api.row.bulkCreate.useMutation();

  const BATCH_SIZE = 10000;

  const handleBulkInsert = async () => {
    setIsInserting(true);
    setProgress(0);
    let inserted = 0;
    const start = performance.now();

    while (inserted < count) {
      const batch = Math.min(BATCH_SIZE, count - inserted);
      const batchStart = performance.now();

      await bulkCreate.mutateAsync({
        tableId: queryInput.tableId,
        count: batch
      });

      inserted += batch;
      setProgress(Math.round((inserted / count) * 100));
      console.log(`Batch ${batch} rows: ${(performance.now() - batchStart).toFixed(0)}ms`);
    }

    console.log(`Insert total: ${(performance.now() - start).toFixed(0)}ms`);
    const refetchStart = performance.now();
    await utils.row.getByTable.invalidate();
    console.log(`Refetch: ${(performance.now() - refetchStart).toFixed(0)}ms`);
    console.log(`Total: ${(performance.now() - start).toFixed(0)}ms`);
    setIsInserting(false);
  };

  return (
    <div className="flex items-center gap-1 px-2 ml-auto">
      <input
        type="number"
        min={1}
        max={100000}
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        className="w-20 px-2 py-0.5 text-xs border border-(--colors-border-default) rounded-sm outline-none"
        disabled={isInserting}
      />
      <button
        className="px-2 py-0.5 text-xs text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors whitespace-nowrap rounded-sm"
        onClick={handleBulkInsert}
        disabled={isInserting || count < 1}
      >
        {isInserting ? `Inserting... ${progress}%` : `+ rows`}
      </button>
    </div>
  );
}
