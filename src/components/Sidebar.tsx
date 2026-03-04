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

function SidebarItem({ icon: Icon, strokeWidth = 1.5, className = "h-4 w-4" }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; strokeWidth?: number; className?: string }) {
  return (

        <div className="flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => {console.log("create")}}>
          <Icon className={`${className} text-gray-600`} strokeWidth={strokeWidth} />
        </div>

  );
}

export function Sidebar() {
  return (
      <aside className="fixed left-0 top-12 bottom-0 z-40 flex w-12 flex-col items-center justify-between bg-white border-r border-gray-200 py-3">
        <div className="flex flex-col items-center gap-1">
          <SidebarItem icon={House} strokeWidth={1.75} className="h-5 w-5" />
          <SidebarItem icon={Star} strokeWidth={1.75} className="h-5 w-5" />
          <SidebarItem icon={Share2} strokeWidth={1.75} className="h-5 w-5" />
          <SidebarItem icon={Users} strokeWidth={1.75} className="h-5 w-5" />
          <Separator className="mb-3 w-6" />
        </div>

        <div className="flex flex-col items-center">
          <Separator className="mb-3 w-6" />
          <div className="flex flex-col items-center gap-1">
            <SidebarItem icon={BookOpen} strokeWidth={1.25} />
            <SidebarItem icon={ShoppingBag} strokeWidth={1.25} />
            <SidebarItem icon={Globe} strokeWidth={1.25} />
            <SidebarItem icon={Plus} strokeWidth={1.25}/>
          </div>
        </div>
      </aside>
  );
}
