"use client";

import { useState } from "react";
import {
  ChevronDown,
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
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "~/components/ui/popover";
import { ColumnFieldForm } from "./ColumnFieldForm";
import type { ColumnTypeValue } from "./ColumnFieldForm";
import type { ColDef } from "~/types/Props";

interface ColumnHeaderCellProps {
  col: ColDef;
  columns: ColDef[];
  tableId: string;
  isFirstCol: boolean;
  editingColumnId: string | null;
  setEditingColumnId: (id: string | null) => void;
  onCreateColumn: (input: { tableId: string; name: string; type: "TEXT" | "NUMBER"; order?: number }) => void;
  onUpdateColumn: (input: { id: string; name: string; type: "TEXT" | "NUMBER" }) => void;
  onDeleteColumn: (input: { id: string }) => void;
  onAddSort?: (columnId: string, direction: "asc" | "desc") => void;
  onAddFilter?: (columnId: string) => void;
  onHideColumn?: (columnId: string) => void;
  onSelectColumn?: (columnId: string) => void;
}

export function ColumnHeaderCell({
  col,
  columns,
  tableId,
  isFirstCol,
  editingColumnId,
  setEditingColumnId,
  onCreateColumn,
  onUpdateColumn,
  onDeleteColumn,
  onAddSort,
  onAddFilter,
  onHideColumn,
  onSelectColumn,
}: ColumnHeaderCellProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Don't select column if clicking the chevron button
    if ((e.target as HTMLElement).closest("[data-chevron-trigger]")) return;
    onSelectColumn?.(col.id);
    // Focus the first cell in this column to show the border
    requestAnimationFrame(() => {
      const firstInput = document.querySelector<HTMLInputElement>(`input[data-col-id="${col.id}"]`);
      if (firstInput) firstInput.focus();
    });
  };

  return (
    <Popover open={editingColumnId === col.id} onOpenChange={(open) => { if (!open) setEditingColumnId(null); }}>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <PopoverAnchor asChild>
          <div
            className="group/header relative flex items-center w-full h-full overflow-hidden px-2 cursor-pointer"
            onClick={handleHeaderClick}
          >
            <div className="absolute left-0 top-1.75 right-5.5 h-4 leading-4 flex items-center">
              <div className="absolute top-0 left-1.25 w-4 h-4">
                {col.type === "NUMBER"
                  ? <Hash className="h-4 w-4 shrink-0 text-black" strokeWidth={1.25}/>
                  : <ALargeSmall className="h-4 w-4 shrink-0 text-black" strokeWidth={1.25}/>
                }
              </div>
              <span className="truncate font-medium text-sm text-black absolute left-6.5 -top-0.5">{col.name}</span>
            </div>
            <DropdownMenuTrigger asChild>
              <button
                data-chevron-trigger
                className="invisible group-hover/header:visible absolute right-1 top-1/2 -translate-y-1/2 flex items-center justify-center shrink-0 h-5 w-5 rounded hover:bg-black/10"
                onClick={(e) => e.stopPropagation()}
              >
                <ChevronDown className="h-3 w-3 text-gray-500" />
              </button>
            </DropdownMenuTrigger>
          </div>
        </PopoverAnchor>
        <DropdownMenuContent align="start" side="bottom" className="w-60">
          <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2" onClick={() => requestAnimationFrame(() => setEditingColumnId(col.id))}>
            <Pencil className="h-4 w-4" /> Edit field
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer gap-3 px-3 py-2">
            <Copy className="h-4 w-4" /> Duplicate field
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-3 px-3 py-2"
            disabled={isFirstCol}
            onClick={() => onCreateColumn({ tableId, name: `Field ${columns.length + 1}`, type: "TEXT", order: col.order })}
          >
            <ArrowLeft className="h-4 w-4" /> Insert left
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer gap-3 px-3 py-2"
            onClick={() => onCreateColumn({ tableId, name: `Field ${columns.length + 1}`, type: "TEXT", order: col.order + 1 })}
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
            disabled={isFirstCol}
            onClick={() => onDeleteColumn({ id: col.id })}
          >
            <Trash2 className="h-4 w-4" /> Delete field
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <PopoverContent align="start" className="w-64 p-3 flex flex-col gap-3">
        <ColumnFieldForm
          defaultName={col.name}
          defaultType={col.type as ColumnTypeValue}
          onSave={(name, type) => {
            onUpdateColumn({ id: col.id, name, type });
            setEditingColumnId(null);
          }}
          onCancel={() => setEditingColumnId(null)}
        />
      </PopoverContent>
    </Popover>
  );
}
