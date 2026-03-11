"use client";

import { useState } from "react";
import { ChevronDown, History, Link as LinkIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "~/components/ui/popover";
import { LogoIcon } from "./Logo";
import { BasePopoverPanel } from "./BasePopoverPanel";
import type { BaseNavbarProps } from "~/types/Props";

const BASE_COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-rose-600",
  "bg-amber-600", "bg-cyan-600", "bg-indigo-600", "bg-pink-600",
  "bg-teal-600", "bg-orange-600",
];

function hashColor(id: string, colors: string[]) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return colors[Math.abs(hash) % colors.length]!;
}

const TABS = ["Data", "Automations", "Interfaces", "Forms"] as const;

export function BaseNavbar({ base, baseId, baseColor, activeTab, onTabChange, onRenameBase, onColorChange, onDeleteBase }: BaseNavbarProps) {
  const [basePopoverOpen, setBasePopoverOpen] = useState(false);

  return (
    <div className="flex items-center justify-between border-b border-(--colors-border-default) pl-4 shrink-0 w-full" style={{ height: 56 }}>
      <div className="flex items-center gap-2">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-[6px] [&_path]:fill-white! border border-(--colors-border-default) ${baseColor ? "" : hashColor(baseId, BASE_COLORS)}`}
          style={baseColor ? { backgroundColor: baseColor } : undefined}
        >
          <span className="[&_svg]:w-6 [&_svg]:h-[20.4px]"><LogoIcon /></span>
        </div>
        <Popover open={basePopoverOpen} onOpenChange={setBasePopoverOpen}>
          <PopoverTrigger asChild>
            <button className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1 -ml-1 transition-colors">
              <span className="truncate" style={{ lineHeight: "24px", fontWeight: 700, fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-heading-small)", minWidth: 0, flex: "0 1 auto" }}>{base.name}</span>
              <ChevronDown className="h-4 w-4 text-gray-400 shrink-0" />
            </button>
          </PopoverTrigger>
          <PopoverContent side="bottom" align="start" className="w-96 p-0">
            <BasePopoverPanel
              base={base}
              selectedColor={baseColor}
              onRename={(name) => { onRenameBase(name); setBasePopoverOpen(false); }}
              onColorChange={onColorChange}
              onDelete={onDeleteBase}
            />
          </PopoverContent>
        </Popover>
      </div>

      <ul className="relative flex items-stretch justify-center gap-4 px-2 bg-(--colors-background-default) self-stretch">
        {TABS.map((tab) => (
          <li key={tab}>
            <a className="relative flex h-full items-center cursor-pointer" onClick={() => onTabChange(tab)}>
              <p className={`font-sans text-sm leading-4 font-semibold py-2 ${tab === activeTab ? "text-(--colors-foreground-default)" : "text-gray-500 hover:text-black"}`}>
                {tab}
              </p>
              <div
                className="absolute right-0 left-0 bg-blue-600 transition-all"
                style={{ bottom: -1, height: tab === activeTab ? 2 : 0 }}
              />
            </a>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 pr-4">
        <div className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
          <History className="h-4 w-4 text-gray-600" />
        </div>
        <Button variant="outline" className="border border-(--colors-border-default) h-7 px-2! flex-none gap-1 hover:bg-white">
          <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
            <path fillRule="evenodd" d="M13.5 2.5c.546 0 1 .454 1 1v4a.5.5 0 0 1-1 0v-4H6v9h2.5a.5.5 0 0 1 0 1h-6c-.546 0-1-.454-1-1v-9c0-.546.454-1 1-1h11Zm-11 1v9H5v-9H2.5Z M11.124 8.67a.5.5 0 0 1 .653-.086l3 2a.5.5 0 0 1 0 .832l-3 2A.5.5 0 0 1 11 13V9a.5.5 0 0 1 .124-.33Z" />
          </svg>
          Launch
        </Button>
        <Button variant="outline" className="border border-(--colors-border-default) w-7 h-7 hover:bg-white">
          <LinkIcon className="h-3.5! w-3.5! flex-none" />
        </Button>
        <Button
          className="h-7 px-3 text-white border-0 rounded-[6px]"
          style={{ backgroundColor: baseColor ?? "#3b66a3" }}
        >Share</Button>
      </div>
    </div>
  );
}
