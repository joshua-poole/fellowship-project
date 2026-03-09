"use client";

import { useState, useMemo, useEffect, useCallback, Fragment } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { authClient, signOut } from "~/server/better-auth/client";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { OmniBaseView } from "./icons/OmniBaseView";
import { RowHeightIcon, GridFeatureIcon } from "./icons";
import { LogoIcon } from "./Logo";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  CircleQuestionMark,
  EyeOff,
  ListFilter,
  Group,
  ArrowDownUp,
  PaintBucket,
  ExternalLink,
  MoreHorizontal,
  Search,
  Menu,
  Plus,
  Link as LinkIcon,
  History,
  Wrench,
  Settings,
  User,
  Users,
  Languages,
  Palette,
  Mail,
  CircleStar,
  Trash2,
  LogOut,
  Pencil,
  SlidersHorizontal,
  Copy,
  GanttChart,
  Info,
  Lock,
  X,
  ArrowUpCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { VirtualizedTable } from "./VirtualizedTable";

/* ─── color helpers ─── */
const BASE_COLORS = [
  "bg-blue-600", "bg-emerald-600", "bg-purple-600", "bg-rose-600",
  "bg-amber-600", "bg-cyan-600", "bg-indigo-600", "bg-pink-600",
  "bg-teal-600", "bg-orange-600",
];

const AVATAR_COLORS = [
  "bg-teal-300", "bg-rose-300", "bg-violet-300", "bg-sky-300",
  "bg-amber-300", "bg-emerald-300", "bg-indigo-300", "bg-pink-300",
];

function hashColor(id: string, colors: string[]) {
  let hash = 0;
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0;
  return colors[Math.abs(hash) % colors.length]!;
}

/* ─── component ─── */
export function BaseView({ baseId, tableId }: { baseId: string; tableId?: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  const { data: base, isLoading: baseLoading } = api.base.getById.useQuery({ id: baseId });

  const [activeTableId, setActiveTableIdState] = useState<string | undefined>(tableId);
  const [activeTab, setActiveTab] = useState("Data");

  const setActiveTableId = useCallback((id: string | undefined) => {
    setActiveTableIdState(id);
  }, []);

  // Set initial active table when base loads
  useEffect(() => {
    if (!activeTableId && base?.tables?.[0]) {
      setActiveTableId(base.tables[0].id);
    }
  }, [base, activeTableId, setActiveTableId]);

  const { data: tableData } = api.table.getById.useQuery(
    { id: activeTableId! },
    { enabled: !!activeTableId },
  );

  const activeView = tableData?.views?.[0];

  // Update URL when active table/view changes (without triggering navigation)
  useEffect(() => {
    if (activeTableId && activeView) {
      window.history.replaceState(null, "", `/${baseId}/${activeTableId}/${activeView.id}`);
    } else if (activeTableId) {
      window.history.replaceState(null, "", `/${baseId}/${activeTableId}`);
    }
  }, [activeTableId, activeView, baseId]);

  const utils = api.useUtils();

  const createTable = api.table.create.useMutation({
    onSuccess: () => utils.base.getById.invalidate({ id: baseId }),
  });

  const deleteTable = api.table.delete.useMutation({
    onSuccess: async () => {
      await utils.base.getById.invalidate({ id: baseId });
      setActiveTableId(undefined);
    },
  });

  const columns = useMemo(() => tableData?.columns ?? [], [tableData?.columns]);

  /* ─── loading ─── */
  if (baseLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <Skeleton className="h-12 w-48" />
      </div>
    );
  }

  if (!base) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <p className="text-muted-foreground">Base not found.</p>
      </div>
    );
  }

  return (
    <main className="h-screen w-screen flex">
      {/* ═══ Sidebar ═══ */}
      <aside className="flex shrink-0 flex-col items-center justify-between bg-white border-r border-(--colors-border-default) py-2 px-2" style={{ width: 56 }}>
        <div className="flex flex-col items-center gap-1">
          {/* Airtable logo / back button */}
          <div
            className="group flex h-9 w-9 items-center justify-center rounded-md cursor-pointer transition-colors hover:bg-gray-100"
            onClick={() => router.push("/")}
          >
            <span className="group-hover:hidden [&_svg]:h-6 [&_svg]:w-6 [&_path]:fill-black!">
              <LogoIcon />
            </span>
            <ArrowLeft className="h-5 w-5 hidden group-hover:block text-gray-600" />
          </div>
          {/* Omni */}
          <div className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-100">
            <OmniBaseView />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 mb-2">
          <SidebarIcon icon={CircleQuestionMark} />
          <SidebarIcon icon={Bell} />
          {/* Account avatar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className={`flex h-7 w-7 items-center justify-center rounded-full ${hashColor(session?.user?.id ?? "", AVATAR_COLORS)} cursor-pointer select-none`}>
                <span className="text-sm font-medium text-black">{session?.user?.name?.charAt(0).toUpperCase()}</span>
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
              <DropdownMenuItem className="cursor-pointer text-sm" onClick={handleSignOut}><LogOut />Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ═══ Main Area ═══ */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* ─── Navbar ─── */}
        <div className="flex items-center justify-between border-b border-(--colors-border-default) pl-4 shrink-0" style={{ height: 56 }}>
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-[6px] ${hashColor(baseId, BASE_COLORS)} [&_path]:fill-white! border border-(--colors-border-default)`}>
              <span className="[&_svg]:w-6 [&_svg]:h-[20.4px]"><LogoIcon /></span>
            </div>
            <span className="truncate" style={{ lineHeight: "24px", fontWeight: 700, fontFamily: "var(--font-family-body)", fontSize: "var(--font-size-heading-small)", minWidth: 0, flex: "0 1 auto" }}>{base.name}</span>
            <ChevronDown className="h-4 w-4 ml-1 text-gray-400" />
          </div>

          <ul className="relative flex items-stretch justify-center gap-4 px-2 bg-(--colors-background-default) self-stretch">
            {["Data", "Automations", "Interfaces", "Forms"].map((tab) => (
              <li key={tab}>
                <a className="relative flex h-full items-center cursor-pointer" onClick={() => setActiveTab(tab)}>
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
            <Button className="h-7 px-3 text-white bg-[#3b66a3] hover:bg-[#3b66a3] border-0 rounded-[6px]">Share</Button>
          </div>
        </div>

        {/* ─── Table Tabs Bar ─── */}
        <div className="relative flex items-center justify-between bg-[#f1f5ff] shrink-0 border-b border-(--colors-border-default)" style={{ height: 32 }}>
          <div className="flex items-stretch h-full overflow-visible">
            {base.tables.map((t, index) => {
              const isActive = t.id === activeTableId;
              const prevActive = index > 0 && base.tables[index - 1]?.id === activeTableId;
              const showDividerBefore = index > 0 && !isActive && !prevActive;
              return (
                <Fragment key={t.id}>
                  {showDividerBefore && (
                    <div className="flex items-center self-center">
                      <div style={{ height: 12, width: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" }} />
                    </div>
                  )}
                  {isActive ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          className={`relative flex items-center text-sm transition-colors cursor-pointer bg-white font-medium rounded-tr-sm border-x border-t border-(--colors-border-default) -mt-px z-10`}
                          style={{ paddingLeft: 12, paddingRight: 32, marginBottom: -1, paddingBottom: 1 }}
                        >
                          {t.name}
                          <div className="absolute top-0 bottom-0 flex items-center" style={{ right: 12 }}>
                            <ChevronDown className="h-4 w-4 text-gray-400" />
                          </div>
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" side="bottom" sideOffset={8} className="p-3 w-83! h-108.5! max-h-108.5!">
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><ArrowUpCircle className="h-4 w-4 mr-2" />Import data<ChevronDown className="h-4 w-4 -rotate-90" /></DropdownMenuItem>
                        <DropdownMenuSeparator className="m-2 opacity-50" />
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Pencil className="h-4 w-4 mr-2" />Rename table</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><EyeOff className="h-4 w-4 mr-2" />Hide table</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><SlidersHorizontal className="h-4 w-4 mr-2" />Manage fields</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Copy className="h-4 w-4 mr-2" />Duplicate table</DropdownMenuItem>
                        <DropdownMenuSeparator className="m-2 opacity-50" />
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><GanttChart className="h-4 w-4 mr-2" />Configure date dependencies</DropdownMenuItem>
                        <DropdownMenuSeparator className="m-2 opacity-50" />
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Info className="h-4 w-4 mr-2" />Edit table description</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><Lock className="h-4 w-4 mr-2" />Edit table permissions</DropdownMenuItem>
                        <DropdownMenuSeparator className="m-2 opacity-50" />
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0"><X className="h-4 w-4 mr-2" />Clear data</DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-sm rounded px-2 py-2 gap-0 text-red-600" onClick={() => deleteTable.mutate({ id: t.id })}><Trash2 className="h-4 w-4 mr-2" />Delete table</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <button
                      onClick={() => setActiveTableId(t.id)}
                      className="relative flex items-center text-sm transition-colors cursor-pointer text-gray-500 hover:text-black"
                      style={{ paddingLeft: 12, paddingRight: 12 }}
                    >
                      {t.name}
                    </button>
                  )}
                </Fragment>
              );
            })}
            {/* Divider after last tab */}
            {base.tables[base.tables.length - 1]?.id !== activeTableId && (
              <div className="flex items-center self-center">
                <div style={{ height: 12, width: 1, backgroundColor: "rgba(0, 0, 0, 0.1)" }} />
              </div>
            )}
            <button
              className="h-8 w-10 flex items-center gap-1 transition-colors px-3 cursor-pointer"
              onClick={() => createTable.mutate({ baseId })}
              disabled={createTable.isPending}
            >
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
            <button
              className="flex items-center gap-1 px-1.5 transition-colors cursor-pointer"
              onClick={() => createTable.mutate({ baseId })}
              disabled={createTable.isPending}
              style={{ height: 32 }}
            >
              <Plus className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-500 ml-1">Add or import</span>
            </button>
          </div>

          <div className="flex items-center">
            <button className="flex items-center gap-1 px-3 text-sm text-gray-500" style={{ height: 32 }}>
              Tools <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* ─── Views Bar ─── */}
        <div className="flex h-12 items-center justify-between border-b border-(--colors-border-default) shrink-0">
          <div className="pl-3 pr-2 flex items-center">
            <button className="h-8 w-8 rounded-sm hover:bg-gray-100 mr-1 flex items-center justify-center" style={{ padding: 0 }}>
              <Menu className="h-4 w-4 text-gray-500" />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded-sm">
              <GridFeatureIcon className="h-4 w-4" style={{ color: "rgb(22, 110, 225)" }} />
              {activeView?.name ?? "Grid view"} <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-0.5 pr-2">
            <ToolbarButton icon={EyeOff} label="Hide fields" />
            <ToolbarButton icon={ListFilter} label="Filter" />
            <ToolbarButton icon={Group} label="Group" />
            <ToolbarButton icon={ArrowDownUp} label="Sort" />
            <ToolbarButton icon={PaintBucket} label="Color" />
            <ToolbarButton icon={RowHeightIcon} label="" />
            <ToolbarButton icon={ExternalLink} label="Share and sync" />
            <button className="p-1.5 rounded-sm hover:bg-gray-100 ml-2">
              <Search className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* ─── Views Sidebar + Grid ─── */}
        <div className="flex flex-1 min-h-0">
          {/* Views Sidebar */}
          <div className="shrink-0 border-r border-(--colors-border-default) flex flex-col px-1 py-1.25" style={{ width: 280 }}>
            {/* Create button */}
            <div className="flex-none pb-1">
              <button className="w-full flex items-center gap-2 px-3 py-1.5 text-sm rounded-md hover:bg-(--colors-background-selected-hover) cursor-pointer transition-colors">
                <Plus className="h-4 w-4 shrink-0" />
                <span className="truncate">Create new...</span>
              </button>
            </div>

            {/* Search */}
            <div className="flex-none pb-1 mt-1">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Find a view"
                  className="w-full pl-7 pr-7 py-1 text-xs outline-none bg-transparent border-0 placeholder:text-gray-400"
                />
                <Settings className="absolute right-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 cursor-pointer" />
              </div>
            </div>

            {/* View list */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden">
              <ul role="listbox">
                {tableData?.views?.map((v) => (
                  <li
                    key={v.id}
                    role="option"
                    aria-selected={v.id === activeView?.id}
                    className={`group relative flex items-center rounded-sm px-3 py-2 cursor-pointer transition-colors ${
                      v.id === activeView?.id
                        ? "bg-(--colors-background-selected)"
                        : "hover:bg-(--colors-background-selected-hover)"
                    }`}
                  >
                    <div className="flex flex-1 items-center gap-2 min-w-0">
                      <GridFeatureIcon className="h-4 w-4 shrink-0" style={{ color: "rgb(22, 110, 225)" }} />
                      <span className={`truncate text-sm ${v.id === activeView?.id ? "font-semibold" : ""}`}>
                        {v.name}
                      </span>
                    </div>
                    <button className="invisible group-hover:visible flex items-center justify-center h-5 w-5 rounded shrink-0 hover:bg-black/10">
                      <MoreHorizontal className="h-3.5 w-3.5 text-gray-500" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Grid */}
          <div className="h-full w-full">
            {activeTableId && (
              <VirtualizedTable tableId={activeTableId} columns={columns} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

/* ─── small helpers ─── */
function SidebarIcon({ icon: Icon }: { icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }) {
  return (
    <div className="flex items-center justify-center p-2 rounded-md cursor-pointer hover:bg-gray-100 transition-colors">
      <Icon className="h-4 w-4 text-gray-600" strokeWidth={1.5} />
    </div>
  );
}

function ToolbarButton({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-sm transition-colors">
      <Icon className="h-3.5 w-3.5" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
}
