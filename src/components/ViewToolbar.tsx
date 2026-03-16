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
  GripVertical,
  ALargeSmall,
  Hash,
} from "lucide-react";
import type React from "react";
import type { ColDef } from "~/types/Props";

function ColumnTypeIcon({ type, className }: { type: string; className?: string }) {
  if (type === "NUMBER") return <Hash className={className} />;
  return <ALargeSmall className={className} />;
}

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
        <button
          className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded-sm transition-colors"
          style={filters.length > 0
            ? { backgroundColor: "#cff5d1", color: "#000" }
            : { color: "#6b7280" }}
        >
          <ListFilter className="h-4 w-4" />
          <span className="ml-1">
            {filters.length > 0
              ? `Filtered by ${[...new Set(filters.map((f) => columns.find((c) => c.id === f.columnId)?.name ?? "field"))].join(", ")}`
              : "Filter"}
          </span>
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
        <button
          className="flex items-center px-2 py-1 mr-2 text-sm hover:bg-gray-100 rounded-sm transition-colors"
          style={sorts.length > 0
            ? { backgroundColor: "#ffe0cc", color: "#000" }
            : { color: "#6b7280" }}
        >
          <ArrowDownUp className="h-4 w-4" />
          <span className="ml-1">
            {sorts.length > 0
              ? `Sorted by ${sorts.length} field${sorts.length > 1 ? "s" : ""}`
              : "Sort"}
          </span>
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
  const [fieldSearch, setFieldSearch] = useState("");
  const hiddenSet = new Set(hiddenColumns);
  const filteredColumns = columns.filter((c) =>
    c.name.toLowerCase().includes(fieldSearch.toLowerCase()),
  );

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
        <button
          className="flex items-center px-2 py-1 mr-2 text-sm hover:bg-gray-100 rounded-sm transition-colors"
          style={hiddenColumns.length > 0
            ? { backgroundColor: "#c4ecff", color: '#000' }
            : { color: "#6b7280" }}
        >
          <EyeOff className="h-4 w-4" />
          <span className="ml-1">
            {hiddenColumns.length > 0
              ? `${hiddenColumns.length} hidden field${hiddenColumns.length > 1 ? "s" : ""}`
              : "Hide fields"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-0">
        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200">
          <input
            type="text"
            value={fieldSearch}
            onChange={(e) => setFieldSearch(e.target.value)}
            placeholder="Find a field"
            className="flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400"
          />
        </div>

        {/* Field list */}
        <div className="max-h-64 overflow-y-auto py-1">
          {filteredColumns.map((col) => {
            const isVisible = !hiddenSet.has(col.id);
            return (
              <div
                key={col.id}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50"
              >
                <Switch
                  size="sm"
                  checked={isVisible}
                  onCheckedChange={() => toggle(col.id)}
                />
                <ColumnTypeIcon type={col.type} className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-sm truncate flex-1">{col.name}</span>
                <GripVertical className="h-4 w-4 text-gray-300 shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={hideAll}
            className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-50 border-r border-gray-200"
          >
            Hide all
          </button>
          <button
            onClick={showAll}
            className="flex-1 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Show all
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

/* ─── Toolbar Button ─── */

export function ToolbarButton({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="flex items-center px-2 py-1 mr-2 text-sm text-gray-500 hover:bg-gray-100 rounded-sm transition-colors">
      <Icon className="h-4 w-4 flex-none" />
      <span className="hidden lg:inline ml-1">{label}</span>
    </button>
  );
}
