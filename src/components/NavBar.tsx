"use client";

import Link from "next/link";
import { authClient, signOut } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import { Logo } from "./Logo";
import { Bell, CircleQuestionMark, Menu, Book, Globe, MessageSquare, Mail, Laptop, Play, Gift, CircleStar, Code, User, Users, Languages, Palette, LinkIcon, Wrench, Trash2, LogOut } from "lucide-react";
import Search from "./ui/search";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

const AVATAR_COLORS = [
  "bg-teal-300",
  "bg-rose-300",
  "bg-violet-300",
  "bg-sky-300",
  "bg-amber-300",
  "bg-emerald-300",
  "bg-indigo-300",
  "bg-pink-300",
  "bg-cyan-300",
  "bg-orange-300",
];

function getAvatarColor(userId: string) {
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

export function NavBar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-2 fixed top-0 left-0 right-0 z-50 bg-white h-12 border-b border-gray-200">
      <div className="flex items-center gap-5 pr-6">
        <Menu className="h-5 w-5 cursor-pointer" />
          <Link href="/">
            <Logo/>
          </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Search/>
      </div>

      <div className="flex items-center gap-4 pl-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer rounded-full p-1.5 hover:bg-gray-100 transition-colors">
              <CircleQuestionMark className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="text-xs text-gray-400">Support</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Book/> Help center</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Globe/> Ask the community</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><MessageSquare/> Message support</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Mail/> Contact sales</DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-400">Education</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Laptop/> Keyboard shortcuts</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Play/> Webinars</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Gift/> Whats&apos;s new</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Code/> API documentation</DropdownMenuItem>
            <DropdownMenuItem className="text-xs text-gray-400">Upgrade</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><CircleStar/> Plans and pricing</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="rounded-full border border-gray-200 p-1.5 cursor-pointer hover:bg-gray-100 transition-colors">
              <Bell className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <div className="px-2 py-3 text-center text-sm text-muted-foreground">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className={`flex h-7 w-7 items-center justify-center rounded-full ${getAvatarColor(session?.user?.id ?? "")} cursor-pointer select-none`}>
              <span className="text-sm font-medium text-black">{session?.user?.name?.charAt(0).toUpperCase()}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-76 p-5">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">{session?.user?.email}</p>
            </div>
            <DropdownMenuSeparator className="my-3"/>
            <DropdownMenuItem className="cursor-pointer"><User/>Account</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Users/>Manage groups</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Bell/>Notification preferences</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Languages/>Language preferences</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Palette/>Appearance</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3"/>
            <DropdownMenuItem className="cursor-pointer text-sm"><Mail/>Contact sales</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><CircleStar/>Upgrade</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Mail/>Tell a friend</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3"/>
            <DropdownMenuItem className="cursor-pointer text-sm"><LinkIcon/>Integrations</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm"><Wrench/>Builder hub</DropdownMenuItem>
            <DropdownMenuSeparator className="my-3"/>
            <DropdownMenuItem className="cursor-pointer text-sm"><Trash2/>Trash</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-sm" onClick={handleSignOut}><LogOut/>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
