"use client";

import { useState, useRef, useEffect } from "react";
import { DashboardCard } from "./DashboardCard";
import { OmniIcon } from "./Omni";
import { Grid2x2Icon, Table, ArrowUp, ChevronDown, Menu, Grid2X2, Star, Ellipsis, Pencil, Copy, ArrowRight, Users, Palette, Trash2 } from "lucide-react";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";

const BASE_COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-rose-600",
  "bg-amber-600", "bg-cyan-600", "bg-indigo-600", "bg-pink-600",
  "bg-teal-600", "bg-orange-600",
];

function baseColor(id: string) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return BASE_COLORS[Math.abs(hash) % BASE_COLORS.length];
}

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
  const months = Math.floor(days / 30);
  return `${months} month${months > 1 ? 's' : ''} ago`;
}

export function Dashboard() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const { data: bases, isLoading } = api.base.getAll.useQuery();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const utils = api.useUtils();
  const renameBase = api.base.update.useMutation({
    onMutate: async ({ id, name }) => {
      await utils.base.getAll.cancel();
      const prev = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) => old?.map((b) => b.id === id ? { ...b, name } : b));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.base.getAll.setData(undefined, ctx.prev);
    },
    onSettled: () => void utils.base.getAll.invalidate(),
  });
  const deleteBase = api.base.delete.useMutation({
    onMutate: async ({ id }) => {
      await utils.base.getAll.cancel();
      const prev = utils.base.getAll.getData();
      utils.base.getAll.setData(undefined, (old) => old?.filter((b) => b.id !== id));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) utils.base.getAll.setData(undefined, ctx.prev);
    },
    onSettled: () => void utils.base.getAll.invalidate(),
  });

  return (
    <div className="mx-12 mt-8">
      <h1 className="text-3xl font-bold pb-6 leading-tight">Home</h1>
      <div className="flex gap-4">
        <DashboardCard title="Start with Omni" description="Use AI to build a custom app tailored to your workflow" icon={OmniIcon} color="rgb(221, 4, 168)"/>
        <DashboardCard title="Start with templates" description="Select a template to get started and customize as you go." icon={Grid2x2Icon} color="purple"/>
        <DashboardCard title="Quickly upload" description="Easily migrate your existing projects in just a few minutes." icon={ArrowUp} color="green"/>
        <DashboardCard title="Build an app on your own" description="Start with a blank app and build your ideal workflow." icon={Table} color="blue"/>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-4 text-gray-500">
          <div className="flex flex-row cursor-pointer hover:text-black">
            <p className="text-sm">Opened anytime</p>
            <ChevronDown className="ml-1 h-4 w-4" strokeWidth={1.25}/>
          </div>

          <div className="flex flex-row gap-0">
            <button
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${viewMode === "list" ? "bg-gray-200" : "hover:bg-gray-100"}`}
              onClick={() => setViewMode("list")}
            >
              <Menu className="h-5 w-5" />
            </button>
            <button
              className={`p-1.5 rounded-full cursor-pointer transition-colors ${viewMode === "grid" ? "bg-gray-200" : "hover:bg-gray-100"}`}
              onClick={() => setViewMode("grid")}
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div>
            <div className="grid grid-cols-[1.5fr_1fr_1fr] py-2">
              <Skeleton className="h-3 w-10 rounded" />
              <Skeleton className="h-3 w-20 rounded" />
              <Skeleton className="h-3 w-18 rounded" />
            </div>
            <div className="border-t border-gray-200" />
            <div className="mt-6 space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="grid grid-cols-[1.5fr_1fr_1fr] items-center py-3 pl-2">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 shrink-0 rounded-md" />
                    <Skeleton className="h-3 rounded" style={{ width: `${80 + i * 20}px` }} />
                  </div>
                  <Skeleton className="h-3 w-24 rounded" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
              ))}
            </div>
          </div>
        ) : bases && bases.length > 0 ? (
          <div>
            <div className="grid grid-cols-[1.5fr_1fr_1fr] py-2 text-xs font-medium text-gray-600">
              <span>Name</span>
              <span>Last opened</span>
              <span>Workspace</span>
            </div>
            <div className="border-t border-gray-200" />
            <div className="mt-6">
              {bases.map((base) => (
                <div key={base.id} className="group grid grid-cols-[1.5fr_1fr_1fr] items-center py-3 hover:bg-gray-200 cursor-pointer transition-colors rounded" onClick={() => router.push(`/${base.id}`)}>
                    <div className="flex items-center gap-3 pl-2">
                      <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${baseColor(base.id)} text-white text-[10px] font-semibold`}>
                        {base.name.charAt(0).toUpperCase()}{base.name.charAt(1)?.toLowerCase() ?? ""}
                      </div>
                      {renamingId === base.id ? (
                        <RenameInput
                          defaultValue={base.name}
                          onSubmit={(name) => {
                            if (name && name !== base.name) renameBase.mutate({ id: base.id, name, color: null });
                            setRenamingId(null);
                          }}
                        />
                      ) : (
                        <span className="text-sm font-normal truncate">{base.name}</span>
                      )}
                      <span className="text-xs text-gray-400 hidden group-hover:inline">Open data</span>
                    </div>
                    <div className="relative flex items-center">
                      <div className={`absolute -left-14 items-center gap-0.5 flex transition-opacity ${openMenuId === base.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                        <button className="p-1 rounded hover:bg-gray-300 text-gray-400" onClick={(e) => e.preventDefault()}>
                          <Star className="h-3.5 w-3.5" />
                        </button>
                        <DropdownMenu onOpenChange={(open) => setOpenMenuId(open ? base.id : null)}>
                          <DropdownMenuTrigger asChild>
                            <button className="p-1 rounded hover:bg-gray-300 text-gray-400" onClick={(e) => e.preventDefault()}>
                              <Ellipsis className="h-3.5 w-3.5" />
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="bottom" align="start" className="w-56">
                            <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setRenamingId(base.id); }}>
                              <Pencil className="h-4 w-4" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Copy className="h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <ArrowRight className="h-4 w-4" />
                              Move
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Users className="h-4 w-4" />
                              Go to workspace
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                              <Palette className="h-4 w-4" />
                              Customize appearance
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                if (confirm(`Delete "${base.name}"? This will delete all tables and data.`)) {
                                  deleteBase.mutate({ id: base.id });
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <span className="text-sm text-gray-500">Opened {timeAgo(new Date(base.lastOpenedAt))}</span>
                    </div>
                    <span className="text-sm text-gray-500"></span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex justify-center text-center mt-45">
            <div className="flex flex-col gap-2 justify-center items-center ">
              <h2 className="text-xl">You haven&apos;t opened anything recently</h2>
              <p className="text-muted-foreground text-xs">Apps that you have recently opened will appear here.</p>
              <Button className="w-40 text-muted-foreground mt-5 text-xs"> Go to all workspaces</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function RenameInput({ defaultValue, onSubmit }: { defaultValue: string; onSubmit: (name: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  return (
    <input
      ref={inputRef}
      defaultValue={defaultValue}
      className="text-sm font-normal border border-blue-500 rounded px-1 py-0.5 outline-none w-48"
      onClick={(e) => e.stopPropagation()}
      onBlur={(e) => onSubmit(e.currentTarget.value.trim())}
      onKeyDown={(e) => {
        e.stopPropagation();
        if (e.key === "Enter") onSubmit(e.currentTarget.value.trim());
        if (e.key === "Escape") onSubmit(defaultValue);
      }}
    />
  );
}
