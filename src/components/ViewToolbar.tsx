"use client";

import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Switch } from "~/components/ui/switch";
import {
  Search,
  ListFilter,
  ArrowDownUp,
  EyeOff,
  X,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import type { ColDef } from "~/types/Props";

export type FilterConfig = {
  columnId: string;
  operator: string;
  value: string | null;
};

export type SortConfig = {
  columnId: string;
  direction: "asc" | "desc";
};

/* ─── operator definitions ─── */

const TEXT_OPERATORS = [
  { value: "contains", label: "contains" },
  { value: "not_contains", label: "does not contain" },
  { value: "equals", label: "is" },
  { value: "is_empty", label: "is empty" },
  { value: "is_not_empty", label: "is not empty" },
];

const NUMBER_OPERATORS = [
  { value: "equals", label: "=" },
  { value: "gt", label: ">" },
  { value: "lt", label: "<" },
  { value: "is_empty", label: "is empty" },
  { value: "is_not_empty", label: "is not empty" },
];

const NO_VALUE_OPERATORS = new Set(["is_empty", "is_not_empty"]);

function getOperators(columns: ColDef[], columnId: string) {
  const col = columns.find((c) => c.id === columnId);
  return col?.type === "NUMBER" ? NUMBER_OPERATORS : TEXT_OPERATORS;
}

/* ─── Search Bar ─── */

export function SearchBar({
  value,
  onChange,
  matchCount,
  currentMatch,
  onNext,
  onPrev,
}: {
  value: string;
  onChange: (v: string) => void;
  matchCount: number;
  currentMatch: number;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 0);
  }, [isOpen]);

  return (
    <Popover open={isOpen} onOpenChange={(open) => {
      setIsOpen(open);
      if (!open) onChange("");
    }}>
      <PopoverTrigger asChild>
        <button
          className={`w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 ${isOpen ? "bg-gray-100" : ""}`}
        >
          <Search className="h-4 w-4 text-gray-500" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={4}
        className="w-auto p-0 rounded-md shadow-md border border-gray-200"
      >
        <div className="flex items-center gap-1 px-2 py-1.5">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) { onPrev(); } else { onNext(); }
              }
              if (e.key === "Escape") setIsOpen(false);
            }}
            placeholder="Find in view"
            className="text-sm outline-none bg-transparent w-36"
          />
          {value && (
            <span className="text-sm text-gray-400 tabular-nums whitespace-nowrap shrink-0">
              {matchCount > 0 ? `${currentMatch} of ${matchCount}` : "0 of 0"}
            </span>
          )}
          <button
            onClick={onPrev}
            disabled={matchCount === 0}
            className="shrink-0 p-0.5 rounded hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronUp className="h-4 w-4 text-gray-500" />
          </button>
          <button
            onClick={onNext}
            disabled={matchCount === 0}
            className="shrink-0 p-0.5 rounded hover:bg-gray-100 disabled:opacity-30"
          >
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="shrink-0 p-0.5 rounded hover:bg-gray-100"
          >
            <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Filter Popover ─── */

export function FilterPopover({
  columns,
  filters,
  onFiltersChange,
}: {
  columns: ColDef[];
  filters: FilterConfig[];
  onFiltersChange: (f: FilterConfig[]) => void;
}) {
  const addFilter = () => {
    const col = columns[0];
    if (!col) return;
    const ops = getOperators(columns, col.id);
    onFiltersChange([
      ...filters,
      { columnId: col.id, operator: ops[0]?.value ?? "contains", value: "" },
    ]);
  };

  const updateFilter = (index: number, update: Partial<FilterConfig>) => {
    onFiltersChange(
      filters.map((f, i) => (i === index ? { ...f, ...update } : f)),
    );
  };

  const removeFilter = (index: number) => {
    onFiltersChange(filters.filter((_, i) => i !== index));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center px-2 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-sm transition-colors">
          <ListFilter className="h-4 w-4" />
          <span className="hidden lg:inline ml-1">Filter</span>
          {filters.length > 0 && (
            <span className="bg-blue-100 text-blue-700 rounded-full px-1.5 text-[10px] font-medium">
              {filters.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto min-w-105 max-w-150 p-3">
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Filter</div>

          {filters.length === 0 && (
            <p className="text-sm text-gray-400 py-2">
              No filter conditions are applied to this view
            </p>
          )}

          {filters.map((filter, i) => {
            const operators = getOperators(columns, filter.columnId);
            const needsValue = !NO_VALUE_OPERATORS.has(filter.operator);
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-10 shrink-0">
                  {i === 0 ? "Where" : "and"}
                </span>
                <select
                  value={filter.columnId}
                  onChange={(e) => {
                    const ops = getOperators(columns, e.target.value);
                    updateFilter(i, {
                      columnId: e.target.value,
                      operator: ops[0]?.value ?? "contains",
                      value: "",
                    });
                  }}
                  className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none min-w-25"
                >
                  {columns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  value={filter.operator}
                  onChange={(e) =>
                    updateFilter(i, { operator: e.target.value })
                  }
                  className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none"
                >
                  {operators.map((op) => (
                    <option key={op.value} value={op.value}>
                      {op.label}
                    </option>
                  ))}
                </select>
                {needsValue && (
                  <input
                    type="text"
                    value={filter.value ?? ""}
                    onChange={(e) =>
                      updateFilter(i, { value: e.target.value })
                    }
                    placeholder="Enter a value"
                    className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none flex-1 min-w-20"
                  />
                )}
                <button
                  onClick={() => removeFilter(i)}
                  className="shrink-0 p-1 rounded hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            );
          })}

          <button
            onClick={addFilter}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 pt-1"
          >
            <Plus className="h-3 w-3" />
            Add filter
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Sort Popover ─── */

function sortDirectionLabel(type: string, direction: "asc" | "desc") {
  if (type === "NUMBER") return direction === "asc" ? "1 → 9" : "9 → 1";
  return direction === "asc" ? "A → Z" : "Z → A";
}

export function SortPopover({
  columns,
  sorts,
  onSortsChange,
}: {
  columns: ColDef[];
  sorts: SortConfig[];
  onSortsChange: (s: SortConfig[]) => void;
}) {
  const addSort = () => {
    const usedIds = new Set(sorts.map((s) => s.columnId));
    const available = columns.find((c) => !usedIds.has(c.id));
    if (!available) return;
    onSortsChange([...sorts, { columnId: available.id, direction: "asc" }]);
  };

  const updateSort = (index: number, update: Partial<SortConfig>) => {
    onSortsChange(
      sorts.map((s, i) => (i === index ? { ...s, ...update } : s)),
    );
  };

  const removeSort = (index: number) => {
    onSortsChange(sorts.filter((_, i) => i !== index));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center px-2 py-1 mr-2 text-sm text-gray-500 hover:bg-gray-100 rounded-sm transition-colors">
          <ArrowDownUp className="h-4 w-4" />
          <span className="hidden lg:inline ml-1">Sort</span>
          {sorts.length > 0 && (
            <span className="bg-blue-100 text-blue-700 rounded-full px-1.5 text-[10px] font-medium">
              {sorts.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto min-w-90 p-3">
        <div className="space-y-2">
          <div className="text-sm font-medium mb-2">Sort</div>

          {sorts.length === 0 && (
            <p className="text-sm text-gray-400 py-2">
              No sorts applied to this view
            </p>
          )}

          {sorts.map((sort, i) => {
            const col = columns.find((c) => c.id === sort.columnId);
            const colType = col?.type ?? "TEXT";
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="text-sm text-gray-500 w-12 shrink-0">
                  {i === 0 ? "Sort by" : "then"}
                </span>
                <select
                  value={sort.columnId}
                  onChange={(e) =>
                    updateSort(i, { columnId: e.target.value })
                  }
                  className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none min-w-25"
                >
                  {columns.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <select
                  value={sort.direction}
                  onChange={(e) =>
                    updateSort(i, {
                      direction: e.target.value as "asc" | "desc",
                    })
                  }
                  className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none"
                >
                  <option value="asc">
                    {sortDirectionLabel(colType, "asc")}
                  </option>
                  <option value="desc">
                    {sortDirectionLabel(colType, "desc")}
                  </option>
                </select>
                <button
                  onClick={() => removeSort(i)}
                  className="shrink-0 p-1 rounded hover:bg-gray-100"
                >
                  <X className="h-4 w-4 text-gray-400 hover:text-red-500" />
                </button>
              </div>
            );
          })}

          {sorts.length < columns.length && (
            <button
              onClick={addSort}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 pt-1"
            >
              <Plus className="h-3 w-3" />
              Add sort
            </button>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Hide Fields Popover ─── */

export function HideFieldsPopover({
  columns,
  hiddenColumns,
  onHiddenColumnsChange,
}: {
  columns: ColDef[];
  hiddenColumns: string[];
  onHiddenColumnsChange: (h: string[]) => void;
}) {
  const hiddenSet = new Set(hiddenColumns);

  const toggle = (colId: string) => {
    const next = new Set(hiddenSet);
    if (next.has(colId)) next.delete(colId);
    else next.add(colId);
    onHiddenColumnsChange([...next]);
  };

  const showAll = () => onHiddenColumnsChange([]);
  const hideAll = () => onHiddenColumnsChange(columns.map((c) => c.id));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center px-2 py-1 mr-2 text-sm text-gray-500 hover:bg-gray-100 rounded-sm transition-colors">
          <EyeOff className="h-4 w-4" />
          <span className="hidden lg:inline ml-1">Hide fields</span>
          {hiddenColumns.length > 0 && (
            <span className="bg-blue-100 text-blue-700 rounded-full px-1.5 text-[10px] font-medium">
              {hiddenColumns.length}
            </span>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-65 p-3">
        <div className="space-y-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Fields</span>
            <div className="flex gap-2">
              <button
                onClick={showAll}
                className="text-[10px] text-blue-600 hover:text-blue-700"
              >
                Show all
              </button>
              <button
                onClick={hideAll}
                className="text-[10px] text-blue-600 hover:text-blue-700"
              >
                Hide all
              </button>
            </div>
          </div>

          {columns.map((col) => (
            <div
              key={col.id}
              className="flex items-center justify-between py-1 px-1 rounded hover:bg-gray-50"
            >
              <span className="text-sm truncate mr-2">{col.name}</span>
              <Switch
                size="sm"
                checked={!hiddenSet.has(col.id)}
                onCheckedChange={() => toggle(col.id)}
              />
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
