"use client";

import { useRouter } from "next/navigation";
import { Icon } from "./icons/Icon";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { OmniIcon } from "./icons/OmniIcon";
import { LogoIcon } from "./Logo";
import type { AppSidebarProps } from "~/types/Props";

const AVATAR_COLORS = [
  "bg-teal-300", "bg-rose-300", "bg-violet-300", "bg-sky-300",
  "bg-amber-300", "bg-emerald-300", "bg-indigo-300", "bg-pink-300",
];

function hashColor(id: string, colors: string[]) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return colors[Math.abs(hash) % colors.length]!;
}

export function AppSidebar({ session, onSignOut }: AppSidebarProps) {
  const router = useRouter();

  return (
    <aside className="flex shrink-0 flex-col items-center justify-between bg-white border-r border-(--colors-border-default) py-4 px-2" style={{ width: 56 }}>
      <div className="flex flex-none flex-col items-center gap-4">
        <div
          className="group flex h-6 w-6 items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-gray-100"
          onClick={() => router.push("/")}
        >
          <span className="group-hover:hidden [&_svg]:h-6 [&_svg]:w-6 [&_path]:!fill-[rgb(29,31,37)] flex flex-none">
            <LogoIcon />
          </span>
          <Icon name="ArrowLeft" className="h-5 w-5 hidden group-hover:block text-gray-600" />
        </div>
        <div className="flex items-center h-7 justify-center px-2 rounded-md cursor-pointer hover:bg-gray-100">
          <OmniIcon size={28} innerRadius={50} outerRadius={65} innerOpacity={0.2} style={{ color: "currentColor" }} />
        </div>
      </div>

      <div className="flex flex-auto flex-col items-center justify-end gap-3">
        <div className="w-7 h-7">
          <SidebarIcon icon="Question" />
        </div>
        <div className="translate-y-px">
          <SidebarIcon icon="Bell"/>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="-ml-2">
              <div className="flex items-center">
                <div className={`flex-none flex h-7 w-7 ml-2 items-center justify-center rounded-full border border-white ${hashColor(session?.user?.id ?? "", AVATAR_COLORS)} cursor-pointer select-none`}>
                  <span className="w-6.5 h-6.5 text-sm font-medium text-black text-center leading-6.5">{session?.user?.name?.charAt(0).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="min-w-76 p-5">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer"><Icon name="User" className="h-4 w-4" />Account</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Icon name="Users" className="h-4 w-4" />Manage groups</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Icon name="Bell" className="h-4 w-4" />Notification preferences</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Icon name="Translate" className="h-4 w-4" />Language preferences</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Icon name="Palette" className="h-4 w-4" />Appearance</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer text-sm"><Icon name="EnvelopeSimple" className="h-4 w-4" />Contact sales</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Icon name="Star" className="h-4 w-4" />Upgrade</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Icon name="EnvelopeSimple" className="h-4 w-4" />Tell a friend</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer text-sm"><Icon name="Link" className="h-4 w-4" />Integrations</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Icon name="Wrench" className="h-4 w-4" />Builder hub</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer text-sm"><Icon name="Trash" className="h-4 w-4" />Trash</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm" onClick={onSignOut}><Icon name="SignOut" className="h-4 w-4" />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

function SidebarIcon({ icon }: { icon: string }) {
  return (
    <div className="flex w-7 h-7 items-center rounded-full justify-center flex-reverse cursor-pointer hover:bg-gray-100 transition-colors">
      <Icon name={icon} className="h-4 w-4 color-[rgb(29, 31, 37)]" />
    </div>
  );
}
