"use client";

import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { authClient, signOut } from "~/server/better-auth/client";
import { Skeleton } from "~/components/ui/skeleton";
import { VirtualizedTable } from "./VirtualizedTable";
import { AppSidebar } from "./AppSidebar";
import { BaseNavbar } from "./BaseNavbar";
import { TableTabsBar } from "./TableTabsBar";
import { ViewsSidebar } from "./ViewsSidebar";
import { ViewsToolbar } from "./ViewsToolbar";
import { useBaseMutations } from "~/hooks/useBaseMutations";
import { useTableMutations } from "~/hooks/useTableMutations";
import { useViewMutations } from "~/hooks/useViewMutations";
import { useViewConfig } from "~/hooks/useViewConfig";
import { useActiveTable } from "~/hooks/useActiveTable";
import { useSearchNavigation } from "~/hooks/useSearchNavigation";

export function BaseView({ baseId, tableId }: { baseId: string; tableId?: string }) {
  const { data: session } = authClient.useSession();
  const { data: base, isLoading: baseLoading } = api.base.getById.useQuery({ id: baseId });

  const [activeTab, setActiveTab] = useState("Data");
  const [viewsSidebarOpen, setViewsSidebarOpen] = useState(true);

  const {
    activeTableId, setActiveTableId,
    setActiveViewId,
    tableData, activeView, isRealTableId,
  } = useActiveTable(baseId, tableId);

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

  // Search match navigation
  const {
    matchCount: searchMatchCount, matchIndex: searchMatchIndex,
    setMatchCount: setSearchMatchCount, currentMatch,
    goToNext: handleSearchNext, goToPrev: handleSearchPrev,
  } = useSearchNavigation(viewConfig.search);

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

        <ViewsToolbar
          activeViewName={activeView?.name ?? "Grid view"}
          viewsSidebarOpen={viewsSidebarOpen}
          onToggleViewsSidebar={() => setViewsSidebarOpen((o) => !o)}
          columns={columns}
          search={viewConfig.search}
          onSearchChange={viewConfig.handleSearchChange}
          searchMatchCount={searchMatchCount}
          currentSearchMatch={currentMatch}
          onSearchNext={handleSearchNext}
          onSearchPrev={handleSearchPrev}
          filters={viewConfig.filters}
          onFiltersChange={viewConfig.handleFiltersChange}
          sorts={viewConfig.sorts}
          onSortsChange={viewConfig.handleSortsChange}
          hiddenColumns={viewConfig.hiddenColumns}
          onHiddenColumnsChange={viewConfig.handleHiddenColumnsChange}
        />

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
                tableId={activeTableId!}
                columns={viewConfig.visibleColumns}
                rowCount={Number(tableData?.rowCount ?? 0)}
                search={viewConfig.search || undefined}
                searchMatchIndex={searchMatchIndex}
                onSearchMatchCountChange={setSearchMatchCount}
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
