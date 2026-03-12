"use client";

import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Bell,
  CircleQuestionMark,
  User,
  Users,
  Languages,
  Palette,
  Mail,
  CircleStar,
  Wrench,
  Trash2,
  LogOut,
  Link as LinkIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { OmniBaseView } from "./icons/OmniBaseView";
import { LogoIcon } from "./Logo";
import { Bell as BellIcon } from "lucide-react";
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
          <span className="group-hover:hidden [&_svg]:h-6 [&_svg]:w-6 [&_path]:fill-black! flex flex-none">
            <LogoIcon />
          </span>
          <ArrowLeft className="h-5 w-5 hidden group-hover:block text-gray-600" />
        </div>
        <div className="flex items-center h-7 justify-center px-2 rounded-md cursor-pointer hover:bg-gray-100">
          <OmniBaseView />
        </div>
      </div>

      <div className="flex flex-auto flex-col items-center justify-end gap-3">
        <SidebarIcon icon={CircleQuestionMark} />
        <SidebarIcon icon={BellIcon} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="-ml-2">
              <div className={`flex-none flex h-7 w-7 ml-2 items-center justify-center rounded-full ${hashColor(session?.user?.id ?? "", AVATAR_COLORS)} cursor-pointer select-none`}>
                <span className="text-sm font-medium text-black">{session?.user?.name?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="right" className="min-w-76 p-5">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer"><User />Account</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Users />Manage groups</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Bell />Notification preferences</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Languages />Language preferences</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Palette />Appearance</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer text-sm"><Mail />Contact sales</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><CircleStar />Upgrade</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Mail />Tell a friend</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer text-sm"><LinkIcon />Integrations</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Wrench />Builder hub</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3" />
            <DropdownMenuItem className="cursor-pointer text-sm"><Trash2 />Trash</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm" onClick={onSignOut}><LogOut />Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

function SidebarIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }) {
  return (
    <div className="flex w-7 h-7 items-center rounded-full justify-center flex-reverse cursor-pointer hover:bg-gray-100 transition-colors">
      <Icon className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
    </div>
  );
}
