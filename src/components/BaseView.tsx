"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import { authClient } from "~/server/better-auth/client";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { OmniBaseView } from "./icons/OmniBaseView";
import { LogoIcon } from "./Logo";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  CircleQuestionMark,
  EyeOff,
  Filter,
  Group,
  ArrowUpDown,
  Paintbrush,
  Rows3,
  Share2,
  Search,
  Menu,
  Plus,
  Link as LinkIcon,
  History,
  Wrench,
  Settings,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
  type ColumnDef,
} from "@tanstack/react-table";

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

/* ─── types ─── */
type RowData = { id: string; order: number; values: Record<string, string | number> };
type ColDef = { id: string; name: string; type: string; order: number };

/* ─── component ─── */
export function BaseView({ baseId, tableId }: { baseId: string; tableId?: string }) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const { data: base, isLoading: baseLoading } = api.base.getById.useQuery({ id: baseId });

  const [activeTableId, setActiveTableId] = useState<string | undefined>(tableId);
  const [activeTab, setActiveTab] = useState("Data");

  // Set initial active table when base loads
  useEffect(() => {
    if (!activeTableId && base?.tables?.[0]) {
      setActiveTableId(base.tables[0].id);
    }
  }, [base, activeTableId]);

  const { data: tableData } = api.table.getById.useQuery(
    { id: activeTableId! },
    { enabled: !!activeTableId },
  );

  const { data: rowData, refetch: refetchRows } = api.row.getByTable.useQuery(
    { tableId: activeTableId!, limit: 500 },
    { enabled: !!activeTableId },
  );

  const utils = api.useUtils();

  const createTable = api.table.create.useMutation({
    onSuccess: () => utils.base.getById.invalidate({ id: baseId }),
  });

  const createRow = api.row.create.useMutation({
    onSuccess: () => refetchRows(),
  });

  const rows: RowData[] = rowData?.rows ?? [];
  const columns: ColDef[] = useMemo(() => tableData?.columns ?? [], [tableData?.columns]);

  /* ─── TanStack Table ─── */
  const columnHelper = createColumnHelper<RowData>();

  const tableColumns = useMemo<ColumnDef<RowData, unknown>[]>(() => {
    const cols: ColumnDef<RowData, unknown>[] = [
      columnHelper.display({
        id: "_checkbox",
        header: () => <input type="checkbox" className="h-3.5 w-3.5 accent-blue-500" />,
        cell: () => <input type="checkbox" className="h-3.5 w-3.5 accent-blue-500" />,
        size: 36,
      }) as ColumnDef<RowData, unknown>,
      columnHelper.display({
        id: "_rowNum",
        header: () => null,
        cell: ({ row }) => (
          <span className="text-gray-400 text-xs tabular-nums">{row.index + 1}</span>
        ),
        size: 48,
      }) as ColumnDef<RowData, unknown>,
    ];

    for (const col of columns) {
      cols.push(
        columnHelper.accessor((row) => row.values[col.id] ?? "", {
          id: col.id,
          header: () => col.name,
          cell: (info) => <span>{String(info.getValue())}</span>,
          size: 180,
        }) as ColumnDef<RowData, unknown>,
      );
    }

    // "+" column at end for adding new columns (placeholder)
    cols.push(
      columnHelper.display({
        id: "_addCol",
        header: () => <Plus className="h-4 w-4 text-gray-400" />,
        cell: () => null,
        size: 48,
      }) as ColumnDef<RowData, unknown>,
    );

    return cols;
  }, [columns, columnHelper]);

  const table = useReactTable({
    data: rows,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

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

  const activeView = tableData?.views?.[0];

  return (
    <main className="h-screen w-screen flex">
      {/* ═══ Sidebar ═══ */}
      <aside className="flex shrink-0 flex-col items-center justify-between bg-white border-r border-(--colors-border-default) py-2 px-2" style={{ width: 55 }}>
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
          <div className={`flex h-7 w-7 items-center justify-center rounded-full ${hashColor(session?.user?.id ?? "", AVATAR_COLORS)} cursor-pointer text-xs font-medium`}>
            {session?.user?.name?.charAt(0).toUpperCase()}
          </div>
        </div>
      </aside>

      {/* ═══ Main Area ═══ */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* ─── Navbar ─── */}
        <div className="flex items-center justify-between border-b border-(--colors-border-default) px-3 shrink-0" style={{ height: 56 }}>
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 items-center justify-center rounded-md ${hashColor(baseId, BASE_COLORS)} [&_path]:fill-white! border border-(--colors-border-default)`}>
              <span className="[&_svg]:h-5 [&_svg]:w-5"><LogoIcon /></span>
            </div>
            <span className="text-sm font-semibold">{base.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </div>

          <ul className="relative flex items-stretch justify-center gap-2 px-1 bg-(--colors-background-default)">
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

          <div className="flex items-center gap-2">
            <SidebarIcon icon={History} />
            <Button size="xs">
              <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M13.5 2.5c.546 0 1 .454 1 1v4a.5.5 0 0 1-1 0v-4H6v9h2.5a.5.5 0 0 1 0 1h-6c-.546 0-1-.454-1-1v-9c0-.546.454-1 1-1h11Zm-11 1v9H5v-9H2.5Z M11.124 8.67a.5.5 0 0 1 .653-.086l3 2a.5.5 0 0 1 0 .832l-3 2A.5.5 0 0 1 11 13V9a.5.5 0 0 1 .124-.33Z" />
              </svg>
              Launch
            </Button>
            <Button size="xs" variant="outline" className="border border-(--colors-border-default)">
              <LinkIcon className="h-3.5 w-3.5" />
            </Button>
            <Button size="xs" className="px-3 text-white bg-[#3b66a3] hover:bg-[#325889]" style={{ height: 28 }}>Share</Button>
          </div>
        </div>

        {/* ─── Table Tabs Bar ─── */}
        <div className="flex h-8 items-center justify-between border-b border-(--colors-border-default) bg-gray-50 px-2 shrink-0">
          <div className="flex items-center gap-0.5">
            {base.tables.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTableId(t.id)}
                className={`px-3 py-1 text-xs rounded-t-sm transition-colors ${
                  t.id === activeTableId
                    ? "bg-white font-medium border-x border-t border-(--colors-border-default)"
                    : "text-gray-500 hover:text-black hover:bg-gray-100"
                }`}
              >
                {t.name}
              </button>
            ))}
            <button
              className="px-1.5 py-1 text-gray-400 hover:text-black hover:bg-gray-100 rounded-sm transition-colors"
              onClick={() => createTable.mutate({ baseId })}
              disabled={createTable.isPending}
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1 px-2 py-1 text-xs text-gray-500 hover:bg-gray-100 rounded-sm">
              <Wrench className="h-3 w-3" /> Tools <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* ─── Views Bar ─── */}
        <div className="flex h-9 items-center justify-between border-b border-(--colors-border-default) px-2 shrink-0">
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-sm hover:bg-gray-100">
              <Menu className="h-4 w-4 text-gray-500" />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded-sm">
              {activeView?.name ?? "Grid view"} <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-0.5">
            <ToolbarButton icon={EyeOff} label="Hide fields" />
            <ToolbarButton icon={Filter} label="Filter" />
            <ToolbarButton icon={Group} label="Group" />
            <ToolbarButton icon={ArrowUpDown} label="Sort" />
            <ToolbarButton icon={Paintbrush} label="Color" />
            <ToolbarButton icon={Rows3} label="Row height" />
            <ToolbarButton icon={Share2} label="Share and sync" />
            <button className="p-1.5 rounded-sm hover:bg-gray-100">
              <Search className="h-3.5 w-3.5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* ─── Views Sidebar + Grid ─── */}
        <div className="flex flex-1 min-h-0">
          {/* Views Sidebar */}
          <div className="w-44 shrink-0 border-r border-(--colors-border-default) bg-gray-50 flex flex-col">
            <div className="p-2">
              <Button size="xs" className="w-full justify-start gap-1.5 text-xs">
                <Plus className="h-3 w-3" /> Create...
              </Button>
            </div>
            <div className="px-2 pb-2">
              <div className="flex items-center gap-1 rounded-sm border border-(--colors-border-default) bg-white px-2 py-1">
                <Search className="h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Find a view"
                  className="flex-1 bg-transparent text-xs outline-none placeholder:text-gray-400"
                />
                <Settings className="h-3 w-3 text-gray-400 cursor-pointer" />
              </div>
            </div>
            <div className="flex-1 overflow-auto px-1">
              {tableData?.views?.map((v) => (
                <div
                  key={v.id}
                  className={`px-2 py-1.5 text-xs rounded-sm cursor-pointer transition-colors ${
                    v.id === activeView?.id ? "bg-white font-medium shadow-sm" : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {v.name}
                </div>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="flex-1 flex flex-col min-w-0 overflow-auto">
            {!tableData ? (
              <div className="p-4 space-y-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full" />
                ))}
              </div>
            ) : (
              <table className="w-full text-sm border-collapse">
                <thead className="sticky top-0 z-10 bg-gray-100">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="text-left px-3 py-1.5 text-xs font-medium text-gray-600 border-b border-r border-(--colors-border-default)"
                          style={{ width: header.getSize() }}
                        >
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="hover:bg-blue-50/50 transition-colors">
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-3 py-1 border-b border-r border-(--colors-border-default) text-sm"
                          style={{ width: cell.column.getSize() }}
                        >
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* Add row */}
                  <tr
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => {
                      if (activeTableId) createRow.mutate({ tableId: activeTableId });
                    }}
                  >
                    <td className="px-3 py-1 border-b border-r border-(--colors-border-default)" />
                    <td className="px-3 py-1 border-b border-r border-(--colors-border-default)">
                      <Plus className="h-3.5 w-3.5 text-gray-400" />
                    </td>
                    <td
                      colSpan={columns.length + 1}
                      className="px-3 py-1 border-b border-(--colors-border-default)"
                    />
                  </tr>
                </tbody>
              </table>
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
