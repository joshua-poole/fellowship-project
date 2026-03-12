"use client";

import { Fragment } from "react";
import {
  ChevronDown,
  Plus,
  ArrowUpCircle,
  Pencil,
  EyeOff,
  SlidersHorizontal,
  Copy,
  GanttChart,
  Info,
  Lock,
  X,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import type { TableTabsBarProps } from "~/types/Props";

/** Derive a very light tint from a hex color (e.g. #407c4a -> #e6fce8) */
function lightTint(hex: string, lightness = 0.92): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const mix = (c: number) => Math.round((c * (1 - lightness) + lightness) * 255);
  return `#${[mix(r), mix(g), mix(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function TableTabsBar({
  tables,
  activeTableId,
  baseColor,
  onSelectTable,
  onCreateTable,
  onDeleteTable,
  isCreating,
}: TableTabsBarProps) {
  const tableBarBg = baseColor ? lightTint(baseColor) : "#f1f5ff";

  return (
    <div className="relative flex items-center justify-between shrink-0 border-b border-t border-(--colors-border-default) w-full" style={{ height: 34, backgroundColor: tableBarBg }}>
      <div className="flex items-stretch h-full overflow-visible -ml-px">
        {tables.map((t, index) => {
          const isActive = t.id === activeTableId;
          const prevActive = index > 0 && tables[index - 1]?.id === activeTableId;
          const showDividerBefore = index > 0 && !isActive && !prevActive;
          return (
            <Fragment key={t.id}>
              {showDividerBefore && (
                <div className="flex items-center self-center">
                  <div style={{ height: 12, width: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" }} />
                </div>
              )}
              {isActive ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className={`relative flex items-center text-sm transition-colors cursor-pointer bg-white font-medium rounded-tr-sm ${index > 0 ? "rounded-tl-sm" : ""} border-x border-t border-(--colors-border-default) -mt-px z-10`}
                      style={{ paddingLeft: 12, paddingRight: 32, marginBottom: -1, paddingBottom: 1 }}
                    >
                      {t.name}
                      <div className="absolute top-0 bottom-0 flex items-center" style={{ right: 12 }}>
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" side="bottom" sideOffset={8} className="p-3 w-83! h-108.5! max-h-108.5!">
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><ArrowUpCircle className="h-4 w-4 mr-2" />Import data<ChevronDown className="h-4 w-4 -rotate-90" /></DropdownMenuItem>
                    <DropdownMenuSeparator className="m-2 opacity-50" />
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Pencil className="h-4 w-4 mr-2" />Rename table</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><EyeOff className="h-4 w-4 mr-2" />Hide table</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><SlidersHorizontal className="h-4 w-4 mr-2" />Manage fields</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Copy className="h-4 w-4 mr-2" />Duplicate table</DropdownMenuItem>
                    <DropdownMenuSeparator className="m-2 opacity-50" />
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><GanttChart className="h-4 w-4 mr-2" />Configure date dependencies</DropdownMenuItem>
                    <DropdownMenuSeparator className="m-2 opacity-50" />
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Info className="h-4 w-4 mr-2" />Edit table description</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Lock className="h-4 w-4 mr-2" />Edit table permissions</DropdownMenuItem>
                    <DropdownMenuSeparator className="m-2 opacity-50" />
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><X className="h-4 w-4 mr-2" />Clear data</DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0" onClick={() => onDeleteTable(t.id, t.name)}><Trash2 className="h-4 w-4 mr-2" />Delete table</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <button
                  onClick={() => onSelectTable(t.id)}
                  className="relative flex items-center text-sm transition-colors cursor-pointer text-gray-500 hover:text-black"
                  style={{ paddingLeft: 12, paddingRight: 12 }}
                >
                  {t.name}
                </button>
              )}
            </Fragment>
          );
        })}
        {tables[tables.length - 1]?.id !== activeTableId && (
          <div className="flex items-center self-center">
            <div style={{ height: 12, width: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" }} />
          </div>
        )}
        <button className="h-8 flex flex-none justify-center items-center gap-1 transition-colors px-3 cursor-pointer">
          <ChevronDown className="h-4 w-4 text-gray-500" strokeWidth={1}/>
        </button>

        <button
          className="group flex items-center px-3 transition-colors cursor-pointer gap-0"
          onClick={onCreateTable}
          disabled={isCreating}
          style={{ height: 32 }}
        >
          <Plus className="h-4 w-4 flex-none my-1 text-gray-500 group-hover:text-black transition-colors" strokeWidth={1.5}/>
          <span className="text-sm text-gray-500 group-hover:text-black ml-2 transition-colors leading-tight">Add or import</span>
        </button>
      </div>

      <div className="flex items-center px-3 ml-2 mr-1">
        <button className="flex items-center text-sm text-gray-500 h-8 pr-1">
          Tools
        </button>
        <ChevronDown className="h-4 w-4 flex-none" strokeWidth={1}/>
      </div>
    </div>
  );
}
