"use client";

import { Icon } from "./icons/Icon";
import { RowHeightIcon, GridFeatureIcon } from "./icons";
import { SearchBar, FilterPopover, SortPopover, HideFieldsPopover, ToolbarButton } from "./ViewToolbar";
import type { ColDef } from "~/types/Props";
import type { FilterConfig, SortConfig } from "./ViewToolbar";

interface ViewsToolbarProps {
  activeViewName: string;
  onToggleViewsSidebar: () => void;
  columns: ColDef[];
  search: string;
  onSearchChange: (v: string) => void;
  searchMatchCount: number;
  currentSearchMatch: number;
  onSearchNext: () => void;
  onSearchPrev: () => void;
  filters: FilterConfig[];
  onFiltersChange: (f: FilterConfig[]) => void;
  sorts: SortConfig[];
  onSortsChange: (s: SortConfig[]) => void;
  hiddenColumns: string[];
  onHiddenColumnsChange: (h: string[]) => void;
}

export function ViewsToolbar({
  activeViewName,
  onToggleViewsSidebar,
  columns,
  search,
  onSearchChange,
  searchMatchCount,
  currentSearchMatch,
  onSearchNext,
  onSearchPrev,
  filters,
  onFiltersChange,
  sorts,
  onSortsChange,
  hiddenColumns,
  onHiddenColumnsChange,
}: ViewsToolbarProps) {
  return (
    <div className="flex flex-none gap-2 h-[47px] items-center border-b border-(--colors-border-default) shrink-0">
      <div className="pl-3 pr-2 flex flex-auto items-center">
        <button className="h-8 w-8 rounded-sm hover:bg-gray-100 mr-1 flex items-center justify-center cursor-pointer" style={{ padding: 0 }} onClick={onToggleViewsSidebar}>
          <Icon name="List" className="h-4 w-4" style={{ color: "var(--colors-foreground-subtle)" }} />
        </button>
        <button className="flex items-center px-2 py-0 h-6.5 text-sm hover:bg-gray-100 rounded-sm">
          <GridFeatureIcon className="h-4 w-4" style={{ color: "rgb(22, 110, 225)" }} />
          <span className="flex-auto mx-2 font-medium">
            {activeViewName}
          </span>
          <Icon name="ChevronDown" className="mt-1 flex-none h-4 w-4" style={{ color: "var(--colors-foreground-subtle)" }} />
        </button>
      </div>

      <div className="flex flex-auto justify-end items-center h-full pr-2">
        <div className="flex items-center px-2 grow justify-end">
          <div className="flex flex-row mr-2">
            <HideFieldsPopover columns={columns} hiddenColumns={hiddenColumns} onHiddenColumnsChange={onHiddenColumnsChange} />
            <FilterPopover columns={columns} filters={filters} onFiltersChange={onFiltersChange} />
          </div>
          <div className="flex items-center">
            <ToolbarButton icon="Group" label="Group" />
            <SortPopover columns={columns} sorts={sorts} onSortsChange={onSortsChange} />
          </div>
          <div className="">
            <ToolbarButton icon="PaintBucket" label="Color" />
          </div>
          <div className="flex iterms-center px-2 py-1 mr-2" style={{ color: "var(--colors-foreground-subtle)" }}>
            <RowHeightIcon className="h-4 w-4 flex-none" />
          </div>
          <div className="flex items-center">
            <ToolbarButton icon="ArrowSquareOut" label="Share and sync" />
          </div>
        </div>
        <div className="flex items-center justify-center cursor-pointer">
          <SearchBar
            value={search}
            onChange={onSearchChange}
            matchCount={searchMatchCount}
            currentMatch={currentSearchMatch}
            onNext={onSearchNext}
            onPrev={onSearchPrev}
          />
        </div>
      </div>
    </div>
  );
}
