"use client";

import { useState, useRef, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Icon } from "./icons/Icon";
import { OmniIcon } from "./icons/OmniIcon";
import type { ColDef } from "~/types/Props";

function ColumnTypeIcon({ type, className }: { type: string; className?: string }) {
  if (type === "NUMBER") return <Icon name="HashStraight" className={className} />;
  return <Icon name="TextAlt" className={className} />;
}

export type FilterConfig = {
  columnId: string;
  operator: string;
  value: string | null;
  conjunction?: "and" | "or";
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
    <>
      <button
        className={`w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 ${isOpen ? "bg-gray-100" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name="MagnifyingGlass" className="h-4 w-4" style={{ color: "var(--colors-foreground-subtle)" }} />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 bg-white flex flex-col rounded-b-lg"
          style={{
            top: "calc(100% + 12px)",
            zIndex: 6,
            width: 370,
            borderWidth: "0px 2px 2px",
            borderStyle: "solid",
            borderColor: "var(--colors-border-default, #d4d4d8)",
          }}
        >
          <div className="flex items-center">
            <input
              ref={inputRef}
              type="search"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  if (e.shiftKey) { onPrev(); } else { onNext(); }
                }
                if (e.key === "Escape") { setIsOpen(false); onChange(""); }
              }}
              placeholder="Find in view..."
              autoComplete="off"
              className="flex-auto p-2 text-sm outline-none bg-transparent"
              style={{ border: "2px solid transparent" }}
            />
            {value && (
              <div className="flex items-center flex-none pr-2 text-xs text-gray-400" style={{ fontVariantNumeric: "tabular-nums" }}>
                {matchCount > 0 ? `${currentMatch} of ${matchCount}` : "0 of 0"}
              </div>
            )}
            <div className="flex py-2 flex-none gap-0.5">
              <button
                onClick={onPrev}
                className="flex flex-none items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100"
                style={{ width: 20 }}
              >
                <Icon name="ChevronUp" className="h-3 w-3" />
              </button>
              <button
                onClick={onNext}
                className="flex flex-none items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100"
                style={{ width: 20 }}
              >
                <Icon name="ChevronDown" className="h-3 w-3" />
              </button>
            </div>
            <button
              className="flex-none self-center mx-0.5 px-2 rounded-lg text-white text-xs font-semibold cursor-pointer"
              style={{ backgroundColor: "#333", height: 24 }}
            >
              Ask Omni
            </button>
            <button
              onClick={() => { setIsOpen(false); onChange(""); }}
              className="flex items-center justify-center flex-none rounded-lg cursor-pointer hover:bg-gray-100 my-2 mr-2 ml-0.5"
              style={{ width: 20 }}
            >
              <Icon name="X" className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}
    </>
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
      { columnId: col.id, operator: ops[0]?.value ?? "contains", value: "", conjunction: filters.length > 0 ? "and" : undefined },
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

  const activeFilterCount = filters.filter((f) => {
    if (f.operator === "is_empty" || f.operator === "is_not_empty") return true;
    return f.value != null && f.value !== "";
  }).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center px-2 py-1 text-sm hover:bg-gray-100 rounded-sm transition-colors"
          style={activeFilterCount > 0
            ? { backgroundColor: "#cff5d1", color: "#000" }
            : { color: "var(--colors-foreground-subtle)" }}
        >
          <Icon name="FunnelSimple" className="h-4 w-4" />
          <span className="ml-1">
            {activeFilterCount > 0
              ? `Filtered by ${[...new Set(filters.filter((f) => { if (f.operator === "is_empty" || f.operator === "is_not_empty") return true; return f.value != null && f.value !== ""; }).map((f) => columns.find((c) => c.id === f.columnId)?.name ?? "field"))].join(", ")}`
              : "Filter"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="p-0 overflow-hidden border-none"
        style={{
          width: filters.length > 0 ? 590 : 543.234,
          minHeight: 164.25,
          maxWidth: 975.336,
          borderRadius: 3,
          boxShadow: "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-4">
          <h3 className="text-xs font-semibold text-gray-500">Filter</h3>
        </div>

        {/* AI prompt */}
        <div className="px-4 py-2">
          <div className="flex items-center border border-gray-200 px-1" style={{ borderRadius: 6, height: 32 }}>
            <div className="shrink-0 flex items-center ml-1">
              <OmniIcon />
            </div>
            <input
              type="text"
              placeholder="Describe what you want to see"
              className="flex-auto px-2 text-sm bg-transparent outline-none border-none"
              readOnly
            />
          </div>
        </div>

        {/* Conditions */}
        {filters.length === 0 ? (
          <div className="flex px-4 pt-4 text-sm text-gray-400">
            <span>No filter conditions are applied</span>
            <Icon name="Question" className="h-4 w-4 text-gray-400 ml-1 shrink-0" />
          </div>
        ) : (
          <>
            <div className="px-4 pt-3 text-sm text-gray-500">In this view, show records</div>
            <div className="px-4 pt-2 space-y-2">
              {filters.map((filter, i) => {
                const operators = getOperators(columns, filter.columnId);
                const needsValue = !NO_VALUE_OPERATORS.has(filter.operator);
                return (
                  <div key={i} className="flex items-center gap-2 whitespace-nowrap">
                    <div className="shrink-0 w-16">
                      {i === 0 ? (
                        <span className="text-sm text-gray-700 pl-2">Where</span>
                      ) : (
                        <select
                          className="text-sm border border-gray-200 rounded px-2 py-1.5 outline-none w-full bg-white"
                          value={filter.conjunction ?? "and"}
                          onChange={(e) => updateFilter(i, { conjunction: e.target.value as "and" | "or" })}
                        >
                          <option value="and">and</option>
                          <option value="or">or</option>
                        </select>
                      )}
                    </div>
                    {/* Connected bar: column + operator + value */}
                    <div className="flex flex-1 min-w-0">
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
                        className="text-sm border border-gray-200 rounded-l px-2 py-1.5 outline-none min-w-24 bg-white -mr-px"
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
                        className={`text-sm border border-gray-200 px-2 py-1.5 outline-none min-w-24 bg-white -mr-px ${needsValue ? "" : "rounded-r"}`}
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
                          className="text-sm border border-gray-200 rounded-r px-2 py-1.5 outline-none flex-1 min-w-20"
                        />
                      )}
                    </div>
                    <button
                      onClick={() => removeFilter(i)}
                      className="shrink-0 p-1 rounded hover:bg-gray-100"
                    >
                      <Icon name="Trash" className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                    <div className="shrink-0 p-1 text-gray-300 cursor-grab">
                      <Icon name="DotsSixVertical" className="h-4 w-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* Bottom actions */}
        <div className="flex items-center justify-between px-4 pb-4 pt-4">
          <div className="flex items-center flex-wrap mr-4" style={{ width: "max-content", maxWidth: "100%" }}>
            <button
              onClick={addFilter}
              className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer mr-4"
            >
              <Icon name="Plus" className="h-3 w-3 mr-0.5 shrink-0" />
              Add condition
            </button>
            <div className="flex items-center">
              <button className="flex items-center text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer">
                <Icon name="Plus" className="h-3 w-3 mr-0.5 shrink-0" />
                Add condition group
              </button>
              <Icon name="Question" className="h-4 w-4 text-gray-400 ml-2 shrink-0" />
            </div>
          </div>
          <span className="ml-4 text-sm font-semibold text-gray-500 hover:text-gray-900 cursor-pointer whitespace-nowrap">Copy from another view</span>
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
  const [fieldSearch, setFieldSearch] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const addSort = (columnId: string) => {
    onSortsChange([...sorts, { columnId, direction: "asc" }]);
    setShowPicker(false);
    setFieldSearch("");
  };

  const updateSort = (index: number, update: Partial<SortConfig>) => {
    onSortsChange(
      sorts.map((s, i) => (i === index ? { ...s, ...update } : s)),
    );
  };

  const removeSort = (index: number) => {
    onSortsChange(sorts.filter((_, i) => i !== index));
  };

  const usedIds = new Set(sorts.map((s) => s.columnId));
  const availableColumns = columns.filter((c) => !usedIds.has(c.id));
  const filteredColumns = availableColumns.filter((c) =>
    c.name.toLowerCase().includes(fieldSearch.toLowerCase()),
  );

  const showFieldPicker = sorts.length === 0;

  return (
    <Popover onOpenChange={(open) => { if (!open) { setShowPicker(false); setFieldSearch(""); } }}>
      <PopoverTrigger asChild>
        <button
          className="flex items-center px-2 py-1 mr-2 text-sm hover:bg-gray-100 rounded-sm transition-colors"
          style={sorts.length > 0
            ? { backgroundColor: "#ffe0cc", color: "#000" }
            : { color: "var(--colors-foreground-subtle)" }}
        >
          <Icon name="ArrowsDownUp" className="h-4 w-4" />
          <span className="ml-1">
            {sorts.length > 0
              ? `Sorted by ${sorts.length} field${sorts.length > 1 ? "s" : ""}`
              : "Sort"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        alignOffset={-8}
        className="p-0 border-none"
        style={{
          width: showFieldPicker ? 320 : 452,
          minWidth: 320,
          minHeight: showFieldPicker ? undefined : 180.5,
          borderRadius: 3,
          boxShadow: "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)",
        }}
      >
        {showFieldPicker ? (
          <div className="p-3">
            {/* Header */}
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center">
                <p className="text-sm font-semibold text-gray-500">Sort by</p>
                <Icon name="Question" className="h-4 w-4 text-gray-400 ml-1 shrink-0" />
              </div>
              <span className="text-xs text-gray-500 cursor-pointer hover:text-gray-900">Copy from a view</span>
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-200 mx-2 my-2" />

            {/* Search */}
            <div className="flex items-center px-2 py-1">
              <Icon name="MagnifyingGlass" className="h-4 w-4 shrink-0" style={{ color: searchFocused ? "#176ee1" : "var(--colors-foreground-quietest, #d4d4d8)" }} />
              <input
                type="text"
                value={fieldSearch}
                onChange={(e) => setFieldSearch(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Find a field"
                className="flex-auto pl-3 text-sm bg-transparent outline-none border-none placeholder:text-gray-400"
              />
            </div>

            {/* Field list */}
            <div className="overflow-auto" style={{ minHeight: 100, maxHeight: "calc(100vh - 380px)" }}>
              {filteredColumns.map((col) => (
                <div
                  key={col.id}
                  role="option"
                  tabIndex={0}
                  className="flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => addSort(col.id)}
                >
                  <ColumnTypeIcon type={col.type} className="h-4 w-4 text-gray-400 mr-3 shrink-0" />
                  <span className="text-sm">{col.name}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center" style={{ padding: "16px 16px 0" }}>
              <p className="text-sm font-semibold text-gray-500">Sort by</p>
              <Icon name="Question" className="h-4 w-4 text-gray-400 ml-1 shrink-0" />
            </div>

            {/* Divider */}
            <hr className="border-t border-gray-200" style={{ margin: "8px 16px" }} />

            {/* Sort rows */}
            <div className="space-y-2" style={{ padding: "4px 16px 8px" }}>
              {sorts.map((sort, i) => {
                const col = columns.find((c) => c.id === sort.columnId);
                const colType = col?.type ?? "TEXT";
                return (
                  <div key={i} className="flex items-center">
                    <select
                      value={sort.columnId}
                      onChange={(e) => updateSort(i, { columnId: e.target.value })}
                      className="text-sm border border-gray-200 rounded px-2 outline-none bg-white cursor-pointer mr-3"
                      style={{ width: 240, height: 28 }}
                    >
                      {columns.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                    <select
                      value={sort.direction}
                      onChange={(e) => updateSort(i, { direction: e.target.value as "asc" | "desc" })}
                      className="text-sm border border-gray-200 rounded px-2 outline-none bg-white cursor-pointer mr-3"
                      style={{ width: 120, height: 28 }}
                    >
                      <option value="asc">{sortDirectionLabel(colType, "asc")}</option>
                      <option value="desc">{sortDirectionLabel(colType, "desc")}</option>
                    </select>
                    <button
                      onClick={() => removeSort(i)}
                      className="shrink-0 flex items-center justify-center rounded hover:bg-gray-100 text-gray-400 hover:text-gray-600"
                      style={{ width: 28, height: 28 }}
                    >
                      <Icon name="X" className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Add another sort */}
            <div style={{ padding: "0 16px" }}>
              <button
                onClick={() => { setShowPicker(!showPicker); setFieldSearch(""); }}
                className="flex items-center text-sm text-gray-500 hover:text-gray-900 cursor-pointer"
                style={{ height: 36 }}
              >
                <Icon name="Plus" className="h-4 w-4 mr-3 shrink-0" />
                Add another sort
              </button>

              {showPicker && (
                <div className="border border-gray-200 rounded overflow-hidden mb-2" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <input
                    type="text"
                    value={fieldSearch}
                    onChange={(e) => setFieldSearch(e.target.value)}
                    placeholder="Find a field"
                    className="w-full px-3 py-2 text-sm bg-transparent outline-none border-b border-gray-200 placeholder:text-gray-400"
                  />
                  <div className="overflow-auto" style={{ maxHeight: "calc(100vh - 400px)" }}>
                    {filteredColumns.length > 0 ? (
                      filteredColumns.map((col) => (
                        <div
                          key={col.id}
                          className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-100"
                          onClick={() => addSort(col.id)}
                        >
                          <ColumnTypeIcon type={col.type} className="h-4 w-4 text-gray-400 mr-2 shrink-0" />
                          <span className="text-sm">{col.name}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-400">No results</div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Automatically sort records */}
            <div className="flex items-center px-2 border-t" style={{ minHeight: 44, backgroundColor: "var(--colors-background-subtle, #f5f5f5)", borderColor: "var(--colors-border-subtle, #e5e5e5)" }}>
              <div className="flex items-center cursor-pointer p-2">
                <div
                  className="flex flex-none rounded-full items-center mx-2"
                  style={{ height: 12, width: 19.2, padding: 2, backgroundColor: "var(--colors-background-checked-control, #2d7ff9)", justifyContent: "flex-end" }}
                >
                  <div className="flex-none rounded-full bg-white" style={{ width: 8, height: 8 }} />
                </div>
                <span className="text-sm">Automatically sort records</span>
              </div>
            </div>
          </div>
        )}
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
    c.order !== 0 && c.name.toLowerCase().includes(fieldSearch.toLowerCase()),
  );

  const toggle = (colId: string) => {
    const next = new Set(hiddenSet);
    if (next.has(colId)) next.delete(colId);
    else next.add(colId);
    onHiddenColumnsChange([...next]);
  };

  const showAll = () => onHiddenColumnsChange([]);
  const hideAll = () => onHiddenColumnsChange(columns.filter((c) => c.order !== 0).map((c) => c.id));

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className="flex items-center px-2 py-1 mr-2 text-sm hover:bg-gray-100 rounded-sm transition-colors"
          style={hiddenColumns.length > 0
            ? { backgroundColor: "#c4ecff", color: '#000' }
            : { color: "var(--colors-foreground-subtle)" }}
        >
          <Icon name="EyeSlash" className="h-4 w-4" />
          <span className="ml-1">
            {hiddenColumns.length > 0
              ? `${hiddenColumns.length} hidden field${hiddenColumns.length > 1 ? "s" : ""}`
              : "Hide fields"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" alignOffset={-8} className="p-0 border-none" style={{ width: 320, minHeight: 186, borderRadius: 3, boxShadow: "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)" }}>
        {/* Search */}
        <div className="mt-2 mx-4 border-b-2 border-gray-200 flex items-center">
          <input
            type="text"
            value={fieldSearch}
            onChange={(e) => setFieldSearch(e.target.value)}
            placeholder="Find a field"
            className="flex-auto px-0 py-2 bg-transparent outline-none border-0 placeholder:text-gray-400"
            style={{ fontSize: 12 }}
          />
          <Icon name="Question" className="h-4 w-4 shrink-0" style={{ color: "rgb(97, 102, 112)" }} />
        </div>

        {/* Field list */}
        <div className="overflow-auto px-4 pt-2 pb-2" style={{ minHeight: 100, maxHeight: "calc(-380px + 100vh)" }}>
          {filteredColumns.map((col) => {
            const isVisible = !hiddenSet.has(col.id);
            return (
              <div key={col.id} className="mt-2 mb-1 flex items-center">
                <div
                  role="checkbox"
                  tabIndex={0}
                  aria-checked={isVisible}
                  onClick={() => toggle(col.id)}
                  onKeyDown={(e) => { if (e.key === " " || e.key === "Enter") { e.preventDefault(); toggle(col.id); } }}
                  className="flex items-center flex-auto px-1 rounded cursor-pointer hover:bg-gray-100"
                >
                  <div
                    className="flex shrink-0 items-center rounded-full"
                    style={{
                      height: 8,
                      width: 12.8,
                      padding: 2,
                      backgroundColor: isVisible
                        ? "var(--colors-background-checked-control, #2d7ff9)"
                        : "var(--colors-background-unchecked-control, #ccc)",
                      justifyContent: isVisible ? "flex-end" : "flex-start",
                    }}
                  >
                    <div className="shrink-0 rounded-full bg-white" style={{ width: 4, height: 4 }} />
                  </div>
                  <ColumnTypeIcon type={col.type} className="h-4 w-4 shrink-0 ml-4 mr-2 text-gray-500" />
                  <div className="flex-auto truncate text-sm">{col.name}</div>
                </div>
                <div role="button" tabIndex={0} className="flex items-center text-gray-300 hover:text-gray-500 cursor-grab">
                  <Icon name="DotsSixVertical" className="h-4 w-4" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom actions */}
        {!fieldSearch && <div className="my-2">
          <div className="flex px-4 my-2 -mx-2" style={{ fontSize: 11, fontWeight: 500 }}>
            <button
              onClick={hideAll}
              className="flex-1 mx-2 py-1 rounded text-center bg-gray-100 hover:bg-gray-200"
              style={{ color: "rgb(29, 31, 37)", opacity: 0.75 }}
            >
              Hide all
            </button>
            <button
              onClick={showAll}
              className="flex-1 mx-2 py-1 rounded text-center bg-gray-100 hover:bg-gray-200"
              style={{ color: "rgb(29, 31, 37)", opacity: 0.75 }}
            >
              Show all
            </button>
          </div>
        </div>}
      </PopoverContent>
    </Popover>
  );
}

/* ─── Toolbar Button ─── */

export function ToolbarButton({ icon, label }: { icon: string; label: string }) {
  return (
    <button className="flex items-center px-2 py-1 mr-2 text-sm hover:bg-gray-100 rounded-sm transition-colors" style={{ color: "var(--colors-foreground-subtle)" }}>
      <Icon name={icon} className="h-4 w-4 flex-none" />
      <span className="hidden lg:inline ml-1">{label}</span>
    </button>
  );
}
