"use client";

import { useState } from "react";
import { Icon } from "./icons/Icon";
import { RowHeightIcon, GridFeatureIcon } from "./icons";
import { SearchBar, FilterPopover, SortPopover, HideFieldsPopover, ToolbarButton } from "./ViewToolbar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import type { ColDef } from "~/types/Props";
import type { FilterConfig, SortConfig } from "./ViewToolbar";

const POPOVER_SHADOW = "0px 0px 1px rgba(0,0,0,0.24), 0px 0px 2px rgba(0,0,0,0.16), 0px 3px 4px rgba(0,0,0,0.06), 0px 6px 8px rgba(0,0,0,0.06), 0px 12px 16px rgba(0,0,0,0.08), 0px 18px 32px rgba(0,0,0,0.06)";

interface ViewsToolbarProps {
  activeViewId: string | undefined;
  activeViewName: string;
  viewCount: number;
  onToggleViewsSidebar: () => void;
  onRenameView: (id: string, name: string) => void;
  onDeleteView: (id: string) => void;
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
  activeViewId,
  activeViewName,
  viewCount,
  onToggleViewsSidebar,
  onRenameView,
  onDeleteView,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [renaming, setRenaming] = useState(false);

  return (
    <div className="flex flex-none gap-2 h-[47px] items-center border-b border-(--colors-border-default) shrink-0">
      <div className="pl-3 pr-2 flex flex-auto items-center">
        <button className="h-8 w-8 rounded-sm hover:bg-gray-100 mr-1 flex items-center justify-center cursor-pointer" style={{ padding: 0 }} onClick={onToggleViewsSidebar}>
          <Icon name="List" className="h-4 w-4" style={{ color: "rgb(29, 31, 37)" }} />
        </button>

        {renaming && activeViewId ? (
          <div className="flex items-center h-6.5">
            <GridFeatureIcon className="h-4 w-4 shrink-0" style={{ color: "rgb(22, 110, 225)" }} />
            <input
              aria-label="Rename view"
              type="text"
              maxLength={255}
              ref={(el) => {
                if (el) {
                  requestAnimationFrame(() => {
                    el.focus();
                    el.select();
                  });
                }
              }}
              defaultValue={activeViewName}
              className="text-sm font-semibold leading-[1.25] rounded outline-none mx-2"
              style={{
                height: 24,
                padding: "0px 2px",
                marginRight: -4,
                marginLeft: 4,
                boxShadow: "inset 0 0 0 2px var(--colors-border-default)",
              }}
              onBlur={(e) => {
                const val = e.currentTarget.value.trim();
                if (val && val !== activeViewName) onRenameView(activeViewId, val);
                setRenaming(false);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
                if (e.key === "Escape") setRenaming(false);
              }}
            />
          </div>
        ) : (
          <Popover open={menuOpen} onOpenChange={setMenuOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex items-center px-2 py-0 h-6.5 text-sm hover:bg-gray-100 rounded-sm cursor-pointer"
                onDoubleClick={(e) => {
                  e.preventDefault();
                  setMenuOpen(false);
                  setRenaming(true);
                }}
              >
                <GridFeatureIcon className="h-4 w-4" style={{ color: "rgb(22, 110, 225)" }} />
                <span className="flex-auto mx-2 font-medium">
                  {activeViewName}
                </span>
                <Icon name="ChevronDown" className="mt-1 flex-none h-4 w-4" style={{ color: "var(--colors-foreground-subtle)" }} />
              </button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              className="p-0 border-none"
              style={{ borderRadius: 8, boxShadow: POPOVER_SHADOW, width: 352, minHeight: 403 }}
            >
              <ul role="menu" style={{ padding: 12 }}>
                {/* Collaborative view */}
                <li role="presentation">
                  <div role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex flex-col px-4 py-2">
                    <div className="flex items-center w-full">
                      <Icon name="UsersThree" className="flex-none w-4 h-4 mr-2" />
                      <span className="truncate flex-auto text-sm select-none">Collaborative view</span>
                      <Icon name="ChevronDown" className="flex-none w-4 h-4 ml-2" style={{ transform: "rotate(-90deg)" }} />
                    </div>
                    <div className="select-none text-xs mt-0.5 pl-6" style={{ color: "rgb(97, 102, 112)" }}>
                      Editors and up can edit the view configuration
                    </div>
                  </div>
                </li>
                <li role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2">
                  <Icon name="ArrowRight" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Assign as personal view</span>
                </li>
                {/* Separator */}
                <li role="presentation" className="my-2 mx-4" style={{ height: 1, backgroundColor: "var(--colors-background-selected)" }} />
                <li
                  role="menuitem"
                  className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2"
                  onClick={() => { setMenuOpen(false); setRenaming(true); }}
                >
                  <Icon name="PencilSimple" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Rename view</span>
                </li>
                <li role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2">
                  <Icon name="Info" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Edit view description</span>
                </li>
                {/* Separator */}
                <li role="presentation" className="my-2 mx-4" style={{ height: 1, backgroundColor: "var(--colors-background-selected)" }} />
                <li role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2">
                  <Icon name="Copy" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Duplicate view</span>
                </li>
                <li role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2">
                  <Icon name="Cog" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Copy another view&apos;s configuration</span>
                </li>
                {/* Separator */}
                <li role="presentation" className="my-2 mx-4" style={{ height: 1, backgroundColor: "var(--colors-background-selected)" }} />
                <li role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2">
                  <Icon name="ArrowCircleDown" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Download CSV</span>
                </li>
                <li role="menuitem" className="rounded cursor-pointer hover:bg-gray-100 flex items-center p-2">
                  <Icon name="Printer" className="flex-none w-4 h-4 mr-2" />
                  <span className="truncate flex-auto text-sm select-none">Print view</span>
                </li>
                <li
                  role="menuitem"
                  className={`rounded flex items-center p-2 ${viewCount <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-100"}`}
                  onClick={() => {
                    if (viewCount <= 1 || !activeViewId) return;
                    setMenuOpen(false);
                    onDeleteView(activeViewId);
                  }}
                >
                  <Icon name="Trash" className="flex-none w-4 h-4 mr-2" style={{ color: "rgb(185, 28, 28)" }} />
                  <span className="truncate flex-auto text-sm select-none" style={{ color: "rgb(185, 28, 28)" }}>Delete view</span>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        )}
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
        <div className="relative flex items-center justify-center cursor-pointer">
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
