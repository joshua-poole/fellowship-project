"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { api } from "~/trpc/react";
import { authClient, signOut } from "~/server/better-auth/client";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Menu,
  ChevronDown,
  Group,
  PaintBucket,
  ExternalLink,
} from "lucide-react";
import { RowHeightIcon, GridFeatureIcon } from "./icons";
import { VirtualizedTable } from "./VirtualizedTable";
import { SearchBar, FilterPopover, SortPopover, HideFieldsPopover } from "./ViewToolbar";
import { AppSidebar } from "./AppSidebar";
import { BaseNavbar } from "./BaseNavbar";
import { TableTabsBar } from "./TableTabsBar";
import { ViewsSidebar } from "./ViewsSidebar";
import { useBaseMutations } from "~/hooks/useBaseMutations";
import { useTableMutations } from "~/hooks/useTableMutations";
import { useViewMutations } from "~/hooks/useViewMutations";
import { useViewConfig } from "~/hooks/useViewConfig";

export function BaseView({ baseId, tableId }: { baseId: string; tableId?: string }) {
  const { data: session } = authClient.useSession();
  const { data: base, isLoading: baseLoading } = api.base.getById.useQuery({ id: baseId });

  // Active table state
  const [activeTableId, setActiveTableIdState] = useState<string | undefined>(tableId);
  const [activeTab, setActiveTab] = useState("Data");
  const [viewsSidebarOpen, setViewsSidebarOpen] = useState(true);

  const setActiveTableId = useCallback((id: string | undefined) => {
    setActiveTableIdState(id);
  }, []);

  // Auto-select first table when base loads
  useEffect(() => {
    if (!activeTableId && base?.tables?.[0]) {
      setActiveTableId(base.tables[0].id);
    }
  }, [base, activeTableId, setActiveTableId]);

  // Table data query (skip temp IDs from optimistic updates)
  const isRealTableId = !!activeTableId && !activeTableId.startsWith("tbl_tmp_");
  const { data: tableData } = api.table.getById.useQuery(
    { id: activeTableId! },
    { enabled: isRealTableId },
  );

  // Active view state
  const [activeViewId, setActiveViewId] = useState<string | undefined>(undefined);
  const activeView = tableData?.views?.find((v) => v.id === activeViewId) ?? tableData?.views?.[0];

  useEffect(() => {
    if (tableData?.views?.length && !tableData.views.some((v) => v.id === activeViewId)) {
      setActiveViewId(tableData.views[0]!.id);
    }
  }, [tableData?.views, activeViewId]);

  // URL sync
  useEffect(() => {
    if (activeTableId && activeView) {
      window.history.replaceState(null, "", `/${baseId}/${activeTableId}/${activeView.id}`);
    } else if (activeTableId) {
      window.history.replaceState(null, "", `/${baseId}/${activeTableId}`);
    }
  }, [activeTableId, activeView, baseId]);

  // Mutations
  const baseMutations = useBaseMutations(baseId);
  const tableMutations = useTableMutations(baseId, activeTableId, setActiveTableId);
  const viewMutations = useViewMutations(activeTableId, setActiveViewId);

  // View config (search, filters, sorts, hidden columns)
  const columns = useMemo(() => tableData?.columns ?? [], [tableData?.columns]);
  const viewConfig = useViewConfig(
    activeView,
    (update) => viewMutations.update.mutate(update),
    columns,
  );

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

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

  const color: string = base.color ?? '#1565c0';

  return (
    <main className="h-screen w-screen flex overflow-hidden">
      <AppSidebar session={session} onSignOut={handleSignOut} />

      <div className="flex flex-1 flex-col min-w-0">
        <BaseNavbar
          base={base}
          baseId={baseId}
          baseColor={color}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onRenameBase={(name) => baseMutations.rename.mutate({ id: baseId, name, color: color})}
          onColorChange={(color) => baseMutations.rename.mutate({ id: baseId, name: base.name, color })}
          onDeleteBase={() => {
            if (confirm(`Delete "${base.name}"? This will delete all tables and data.`)) {
              baseMutations.remove.mutate({ id: baseId });
            }
          }}
        />

        <TableTabsBar
          tables={base.tables}
          activeTableId={activeTableId}
          baseColor={color}
          onSelectTable={setActiveTableId}
          onCreateTable={() => tableMutations.create.mutate({ baseId })}
          onDeleteTable={(id, name) => {
            if (confirm(`Delete "${name}"? All data in this table will be lost.`)) {
              tableMutations.remove.mutate({ id });
            }
          }}
          isCreating={tableMutations.create.isPending}
        />

        {/* Views Bar */}
        <div className="flex h-12 items-center justify-between border-b border-(--colors-border-default) shrink-0">
          <div className="pl-3 pr-2 flex items-center">
            <button className="h-8 w-8 rounded-sm hover:bg-gray-100 mr-1 flex items-center justify-center cursor-pointer" style={{ padding: 0 }} onClick={() => setViewsSidebarOpen((o) => !o)}>
              <Menu className="h-4 w-4 text-gray-500" />
            </button>
            <button className="flex items-center gap-1 px-2 py-1 text-sm hover:bg-gray-100 rounded-sm">
              <GridFeatureIcon className="h-4 w-4" style={{ color: "rgb(22, 110, 225)" }} />
              {activeView?.name ?? "Grid view"} <ChevronDown className="h-3 w-3 text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-0.5 pr-2">
            <HideFieldsPopover columns={columns} hiddenColumns={viewConfig.hiddenColumns} onHiddenColumnsChange={viewConfig.handleHiddenColumnsChange} />
            <FilterPopover columns={columns} filters={viewConfig.filters} onFiltersChange={viewConfig.handleFiltersChange} />
            <ToolbarButton icon={Group} label="Group" />
            <SortPopover columns={columns} sorts={viewConfig.sorts} onSortsChange={viewConfig.handleSortsChange} />
            <ToolbarButton icon={PaintBucket} label="Color" />
            <ToolbarButton icon={RowHeightIcon} label="" />
            <ToolbarButton icon={ExternalLink} label="Share and sync" />
            <SearchBar value={viewConfig.search} onChange={viewConfig.handleSearchChange} />
          </div>
        </div>

        {/* Views Sidebar + Grid */}
        <div className="flex flex-1 min-h-0 min-w-0">
          {viewsSidebarOpen && (
            <ViewsSidebar
              views={tableData?.views ?? []}
              activeViewId={activeView?.id}
              onSelectView={setActiveViewId}
              onCreateView={() => {
                if (activeTableId) {
                  const existingCount = tableData?.views?.length ?? 0;
                  const name = existingCount === 0 ? "Grid view" : `Grid ${existingCount + 1}`;
                  viewMutations.create.mutate({ tableId: activeTableId, name });
                }
              }}
              onRenameView={(id, name) => viewMutations.update.mutate({ id, name })}
              onDeleteView={(id) => viewMutations.remove.mutate({ id })}
              isCreating={viewMutations.create.isPending}
            />
          )}

          <div className="h-full min-w-0 flex-1">
            {isRealTableId && (
              <VirtualizedTable
                tableId={activeTableId}
                columns={viewConfig.visibleColumns}
                search={viewConfig.search || undefined}
                filters={viewConfig.filters}
                sorts={viewConfig.sorts}
                onAddSort={(columnId, direction) => {
                  const next = [...viewConfig.sorts.filter((s) => s.columnId !== columnId), { columnId, direction }];
                  viewConfig.handleSortsChange(next);
                }}
                onAddFilter={(columnId) => {
                  if (!viewConfig.filters.some((f) => f.columnId === columnId)) {
                    viewConfig.handleFiltersChange([...viewConfig.filters, { columnId, operator: "contains", value: null }]);
                  }
                }}
                onHideColumn={(columnId) => {
                  if (!viewConfig.hiddenColumns.includes(columnId)) {
                    viewConfig.handleHiddenColumnsChange([...viewConfig.hiddenColumns, columnId]);
                  }
                }}
              />
            )}
          </div>
        </div>
      </div>
    </main>
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
