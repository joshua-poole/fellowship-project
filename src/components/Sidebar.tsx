"use client";

import {
  House,
  Star,
  Share2,
  Users,
  BookOpen,
  ShoppingBag,
  Globe,
  Plus,
} from "lucide-react";
import { Separator } from "~/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "~/components/ui/tooltip";

function SidebarItem({ icon: Icon, label, strokeWidth = 1.5, className = "h-4 w-4" }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; label: string; strokeWidth?: number; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-gray-100 transition-colors">
          <Icon className={`${className} text-gray-600`} strokeWidth={strokeWidth} />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>{label}</TooltipContent>
    </Tooltip>
  );
}

export function Sidebar() {
  return (
    <TooltipProvider delayDuration={200}>
      <aside className="fixed left-0 top-12 bottom-0 z-40 flex w-12 flex-col items-center justify-between bg-white border-r border-gray-200 py-3">
        <div className="flex flex-col items-center gap-1">
          <SidebarItem icon={House} label="Home" strokeWidth={1.75} className="h-5 w-5" />
          <SidebarItem icon={Star} label="Favorites" strokeWidth={1.75} className="h-5 w-5" />
          <SidebarItem icon={Share2} label="Shared" strokeWidth={1.75} className="h-5 w-5" />
          <SidebarItem icon={Users} label="People" strokeWidth={1.75} className="h-5 w-5" />
          <Separator className="mb-3 w-6" />
        </div>

        <div className="flex flex-col items-center">
          <Separator className="mb-3 w-6" />
          <div className="flex flex-col items-center gap-1">
            <SidebarItem icon={BookOpen} label="Templates" strokeWidth={1.25} />
            <SidebarItem icon={ShoppingBag} label="Marketplace" strokeWidth={1.25} />
            <SidebarItem icon={Globe} label="Universe" strokeWidth={1.25} />
            <SidebarItem icon={Plus} label="Create" strokeWidth={1.25} />
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
