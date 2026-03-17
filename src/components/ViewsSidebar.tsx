"use client";

import { useState } from "react";
import { Icon } from "./icons/Icon";
import { GridFeatureIcon } from "./icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { ViewsSidebarProps } from "~/types/Props";

export function ViewsSidebar({
  views,
  activeViewId,
  onSelectView,
  onCreateView,
  onRenameView,
  onDeleteView,
  isCreating,
}: ViewsSidebarProps) {
  const [renamingViewId, setRenamingViewId] = useState<string | null>(null);

  return (
    // sidebar
    <div className="shrink-0 border-r border-(--colors-border-default) flex flex-col px-2 py-2.5" style={{ width: 280 }}>
      {/* top part */}
      <div className="flex-none flex flex-col justify-start pb-2">
        <button
          className="w-full items-center flex justify-start h-8 px-3 text-sm rounded-md hover:bg-(--colors-background-selected-hover) cursor-pointer transition-colors"
          onClick={onCreateView}
          disabled={isCreating}
        >
          <Icon name="Plus" className="h-4 w-4 shrink-0 flex-none mr-2" />
          <span className="truncate">Create new...</span>
        </button>

        <div className="flex-none mt-1">
          <div className="relative focus-within:rounded-md focus-within:shadow-[inset_0_0_0_2px_rgb(22,110,225)]">
            <Icon name="MagnifyingGlass" className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Find a view"
              className="h-8 py-1.5 pl-9 pr-7.5 w-full text-sm outline-none bg-transparent placeholder:text-gray-400 focus:border-red-600"
            />
            <div className="h-4 w-7 flex items-center justify-center absolute right-1 top-1/2 -translate-y-1/2">
              <Icon name="Cog" className="h-4 w-4 text-black cursor-pointer transform" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        <ul role="listbox">
          {views.map((v) => (
            <li
              key={v.id}
              role="option"
              aria-selected={v.id === activeViewId}
              onClick={() => onSelectView(v.id)}
              className={`group relative flex items-center rounded-sm px-3 py-2 cursor-pointer transition-colors ${
                v.id === activeViewId
                  ? "bg-(--colors-background-selected)"
                  : "hover:bg-(--colors-background-selected-hover)"
              }`}
            >
              <div className="flex flex-1 items-center gap-2 min-w-0">
                <GridFeatureIcon className="h-4 w-4 shrink-0" style={{ color: "rgb(22, 110, 225)" }} />
                {renamingViewId === v.id ? (
                  <input
                    autoFocus
                    defaultValue={v.name}
                    className="flex-1 min-w-0 text-sm outline-none bg-transparent border-2 border-blue-500 rounded px-1 -mx-1"
                    onBlur={(e) => {
                      const val = e.currentTarget.value.trim();
                      if (val && val !== v.name) onRenameView(v.id, val);
                      setRenamingViewId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                      if (e.key === "Escape") setRenamingViewId(null);
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <span className={`truncate text-sm font-medium leading-[1.25]`}>
                    {v.name}
                  </span>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="invisible group-hover:visible flex items-center justify-center h-4 w-4 rounded shrink-0 hover:bg-black/10 cursor-pointer">
                    <Icon name="DotsThree" className="h-4 w-4" style={{ color: "rgb(29, 31, 37)" }} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="bottom" align="start" className="w-56">
                  <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                    <Icon name="Star" className="h-4 w-4" />
                    Add to &apos;My favorites&apos;
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" onClick={() => setRenamingViewId(v.id)}>
                    <Icon name="Pencil" className="h-4 w-4" />
                    Rename view
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
                    <Icon name="Copy" className="h-4 w-4" />
                    Duplicate view
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer gap-3 px-3 py-2 text-red-600 focus:text-red-600"
                    disabled={views.length <= 1}
                    onClick={() => onDeleteView(v.id)}
                  >
                    <Icon name="Trash" className="h-4 w-4" />
                    Delete view
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
