"use client";

import { useState } from "react";
import { Icon } from "./icons/Icon";
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
    // bar
    <div className="grid grid-cols-[minmax(48px,1fr)_1fr_1fr] grid-rows-1 w-full gap-2 h-14.25 border-b border-(--colors-border-default)">
      {/* logo + base name */}
      <div className="flex pl-4">
        <div className="w-full flex-none flex items-center justify-start gap-2">
          <div className="flex shrink-none items-center justify-center rounded-[6px] h-8 w-8 border border-(--colors-border-default)" style={{ backgroundColor: baseColor ?? '#000' }}>
            <span className={`[&_svg]:w-6 [&_svg]:h-[20.4px]  [&_path]:fill-white! ${baseColor ? "" : hashColor(baseId, BASE_COLORS)}`}><LogoIcon /></span>
          </div>
          <Popover open={basePopoverOpen} onOpenChange={setBasePopoverOpen}>
            <PopoverTrigger asChild>
              <button className="flex items-center cursor-pointer hover:bg-gray-100 rounded transition-colors">
                <span className="truncate" style={{ lineHeight: "24px", fontWeight: 675, fontFamily: "var(--font-family-heading)", fontSize: 17, minWidth: 0, flex: "0 1 auto", WebkitFontSmoothing: "antialiased", MozOsxFontSmoothing: "grayscale", letterSpacing: "-.01rem" }}>{base.name}</span>
                <Icon name="ChevronDown" className="h-4 w-4 text-gray-400 shrink-0 flex-none ml-1" />
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
      </div>

      {/* mid section */}
      <ul className="relative flex items-stretch justify-center gap-4 px-2 bg-(--colors-background-default)">
        {TABS.map((tab) => (
          <li key={tab}>
            <a className="relative flex h-full items-center cursor-pointer" onClick={() => onTabChange(tab)}>
              <p className={`font-sans text-sm leading-4 py-2 font-medium ${tab === activeTab ? "text-(--colors-foreground-default)" : "text-gray-500 hover:text-black"}`}>
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

      {/* right section */}
      <div className="flex items-center justify-end pr-4">
        <div className="flex-inline items-center gap-2">
          <div className="flex-none flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
              <Icon name="ClockCounterClockwise" className="h-4 w-4 text-gray-600" />
            </div>
            <Button variant="outline" className="border-0 h-7 px-2! py-0 gap-0 flex-none hover:bg-white" style={{ boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)", fontSize: 13, lineHeight: "22px", fontWeight: 400 }}>
              <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" className="flex-none mr-1">
                <path fillRule="evenodd" d="M13.5 2.5c.546 0 1 .454 1 1v4a.5.5 0 0 1-1 0v-4H6v9h2.5a.5.5 0 0 1 0 1h-6c-.546 0-1-.454-1-1v-9c0-.546.454-1 1-1h11Zm-11 1v9H5v-9H2.5Z M11.124 8.67a.5.5 0 0 1 .653-.086l3 2a.5.5 0 0 1 0 .832l-3 2A.5.5 0 0 1 11 13V9a.5.5 0 0 1 .124-.33Z" />
              </svg>
              <span style={{ transform: "translateY(-0.5px)" }}>Launch</span>
            </Button>
            <Button variant="outline" className="flex shrink-0 items-center justify-center border-0 w-7 h-7 hover:bg-white" style={{ boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)" }}>
              <Icon name="Link" className="h-4 w-4 flex-none" />
            </Button>
            <Button
              className="h-7 px-3 py-0 text-white border-0 rounded-[6px]"
              style={{ backgroundColor: baseColor ?? "#3b66a3", boxShadow: "0px 0px 1px rgba(0,0,0,0.32), 0px 0px 2px rgba(0,0,0,0.08), 0px 1px 3px rgba(0,0,0,0.08)", fontSize: 13, lineHeight: "22px", fontWeight: 500 }}
            >Share</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
