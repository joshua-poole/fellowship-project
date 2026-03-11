"use client";

import { useState, useRef } from "react";
import {
  ChevronDown,
  MoreHorizontal,
  Pencil,
  Star,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const BASE_COLOR_GRID = [
  ["#fce4ec", "#fbe9e7", "#fff3e0", "#f1f8e9", "#e0f2f1", "#e0f7fa", "#e3f2fd", "#fce4ec", "#f3e5f5", "#eceff1"],
  ["#e53935", "#e64a19", "#f9a825", "#2e7d32", "#00897b", "#00bcd4", "#1565c0", "#d81b60", "#7b1fa2", "#616161"],
  ["#880e4f", "#bf360c", "#f57f17", "#1b5e20", "#004d40", "#006064", "#0d47a1", "#ad1457", "#4a148c", "#424242"],
];

interface BasePopoverPanelProps {
  base: { name: string };
  selectedColor: string | null;
  onRename: (name: string) => void;
  onColorChange: (color: string) => void;
  onDelete: () => void;
}

export function BasePopoverPanel({ base, selectedColor, onRename, onColorChange, onDelete }: BasePopoverPanelProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [appearanceOpen, setAppearanceOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(true);

  return (
    <div className="max-h-[80vh] overflow-y-auto">
      <div className="flex items-center gap-2 px-5 pt-5 pb-3">
        <input
          ref={inputRef}
          defaultValue={base.name}
          className="flex-1 text-xl font-bold outline-none bg-transparent rounded px-1 -mx-1 border-2 border-transparent focus:border-blue-500 transition-colors"
          onBlur={(e) => {
            const val = e.currentTarget.value.trim();
            if (val && val !== base.name) onRename(val);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.currentTarget.blur();
          }}
        />
        <button className="p-1 rounded hover:bg-gray-100">
          <Star className="h-5 w-5 text-gray-400" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="p-1 rounded hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-48">
            <DropdownMenuItem onClick={() => inputRef.current?.focus()}>
              <Pencil className="h-4 w-4" />
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border-t border-gray-200 mx-5" />

      <div className="px-5 py-3">
        <button
          className="flex items-center gap-2 w-full cursor-pointer"
          onClick={() => setAppearanceOpen(!appearanceOpen)}
        >
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${appearanceOpen ? "" : "-rotate-90"}`} />
          <span className="text-base font-bold">Appearance</span>
        </button>

        {appearanceOpen && (
          <div className="mt-3">
            <div className="flex gap-4 mb-3 border-b border-gray-200">
              <span className="text-sm font-medium pb-2 border-b-2 border-blue-600 cursor-pointer">Color</span>
              <span className="text-sm text-gray-400 pb-2 cursor-pointer hover:text-gray-600">Icon</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {BASE_COLOR_GRID.map((row, ri) => (
                <div key={ri} className="flex gap-1.5">
                  {row.map((color, ci) => (
                    <button
                      key={ci}
                      className={`h-6 w-6 rounded cursor-pointer hover:ring-2 hover:ring-gray-300 transition-all shrink-0 ${selectedColor === color ? "ring-2 ring-blue-600" : ""}`}
                      style={{ backgroundColor: color }}
                      onClick={() => onColorChange(color)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 mx-5" />

      <div className="px-5 py-3 pb-5">
        <button
          className="flex items-center gap-2 w-full cursor-pointer"
          onClick={() => setGuideOpen(!guideOpen)}
        >
          <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${guideOpen ? "" : "-rotate-90"}`} />
          <span className="text-base font-bold">Base guide</span>
        </button>

        {guideOpen && (
          <div className="mt-3 text-sm text-gray-500 space-y-3">
            <p>Use this space to share the goals and details of your base with your team.</p>
            <p>Start by outlining your goal.</p>
            <p>Next, share details about key information in your base:</p>
            <p>This table contains...</p>
            <p>This view shows...</p>
            <p>This link contains...</p>
            <p>Teammates will see this guide when they first open the base and can find it anytime by clicking the down arrow on the top of their screen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
