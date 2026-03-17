"use client";

import { Icon } from "./icons/Icon";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";
import { Button } from "./ui/button";

function SidebarItem({ icon, className = "h-4 w-4" }: { icon: string; className?: string }) {
  return (
    <div className="flex items-center justify-center rounded-md p-2 cursor-pointer hover:bg-gray-100 transition-colors" onClick={() => {console.log("create")}}>
      <Icon name={icon} className={`${className} text-gray-600`} />
    </div>
  );
}

export function Sidebar() {
  const utils = api.useUtils();
  const createBase = api.base.create.useMutation({
    onSuccess: () => utils.base.getAll.invalidate(),
  });

  return (
      <aside className="fixed left-0 top-12 bottom-0 z-40 flex w-12 flex-col items-center justify-between bg-white border-r border-gray-200 pt-2">
        <div className="flex flex-col items-center gap-1 mt-3">
          <SidebarItem icon="House" className="h-5 w-5" />
          <SidebarItem icon="Star" className="h-5 w-5" />
          <SidebarItem icon="Share" className="h-5 w-5" />
          <SidebarItem icon="Users" className="h-5 w-5" />
          <Separator className="mb-3 w-6" />
        </div>

        <div className="flex flex-col items-center">
          <Separator className="mb-3 w-6" />
          <div className="flex flex-col items-center gap-1">
            <SidebarItem icon="BookOpen" />
            <SidebarItem icon="ShoppingBagOpen" />
            <SidebarItem icon="Globe" />
            <Button className="cursor-pointer bg-white text-gray-500 hover:bg-gray-200 rounded-sm w-6 h-6 mt-2" onClick={() => createBase.mutate({ name: "Untitled Base" })}>
              <Icon name="Plus" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </aside>
  );
}
