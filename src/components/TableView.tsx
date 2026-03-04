"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Skeleton } from "~/components/ui/skeleton";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Plus, Layers } from "lucide-react";
import Link from "next/link";

export function TableView({
  baseId,
  tableId,
}: {
  baseId: string;
  tableId: string;
}) {
  const { data: table, isLoading: tableLoading } =
    api.table.getById.useQuery({ id: tableId });

  const {
    data: rowData,
    isLoading: rowsLoading,
    refetch: refetchRows,
  } = api.row.getByTable.useQuery(
    { tableId, limit: 500 },
    { enabled: !!table },
  );

  const [bulkCount, setBulkCount] = useState(1000);

  const createRow = api.row.create.useMutation({
    onSuccess: () => refetchRows(),
  });

  const bulkCreate = api.row.bulkCreate.useMutation({
    onSuccess: () => refetchRows(),
  });

  if (tableLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!table) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Table not found.</p>
        <Link href={`/${baseId}`}>
          <Button variant="link" className="mt-2 px-0">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to base
          </Button>
        </Link>
      </div>
    );
  }

  const rows = rowData?.rows ?? [];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center gap-3">
          <Link href={`/${baseId}`}>
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-lg font-semibold">{table.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => createRow.mutate({ tableId })}
            disabled={createRow.isPending}
          >
            <Plus className="mr-1 h-4 w-4" /> Add row
          </Button>
          <div className="flex items-center gap-1">
            <select
              className="h-8 rounded-md border bg-background px-2 text-sm"
              value={bulkCount}
              onChange={(e) => setBulkCount(Number(e.target.value))}
            >
              <option value={100}>100</option>
              <option value={1000}>1,000</option>
              <option value={10000}>10,000</option>
              <option value={100000}>100,000</option>
            </select>
            <Button
              size="sm"
              variant="outline"
              onClick={() => bulkCreate.mutate({ tableId, count: bulkCount })}
              disabled={bulkCreate.isPending}
            >
              <Layers className="mr-1 h-4 w-4" />
              {bulkCreate.isPending ? "Adding..." : "Add bulk"}
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {rowsLoading ? (
          <div className="p-4 space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-8 w-full" />
            ))}
          </div>
        ) : (
          <table className="w-full text-sm border-collapse">
            <thead className="bg-muted/50 sticky top-0">
              <tr>
                <th className="text-left px-3 py-2 font-medium text-muted-foreground border-b border-r w-12">
                  #
                </th>
                {table.columns.map((col) => (
                  <th
                    key={col.id}
                    className="text-left px-3 py-2 font-medium border-b border-r"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.id} className="hover:bg-muted/30">
                  <td className="px-3 py-1.5 text-muted-foreground border-b border-r tabular-nums">
                    {i + 1}
                  </td>
                  {table.columns.map((col) => (
                    <td key={col.id} className="px-3 py-1.5 border-b border-r">
                      {row.values[col.id] ?? ""}
                    </td>
                  ))}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={table.columns.length + 1}
                    className="px-3 py-8 text-center text-muted-foreground"
                  >
                    No rows yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
