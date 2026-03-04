"use client";

import { api } from "~/trpc/react";
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { ArrowLeft, Plus, Table, Trash2 } from "lucide-react";
import Link from "next/link";

export function BaseView({ baseId }: { baseId: string }) {
  const {
    data: base,
    isLoading,
    refetch,
  } = api.base.getById.useQuery({ id: baseId });

  const createTable = api.table.create.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteTable = api.table.delete.useMutation({
    onSuccess: () => refetch(),
  });

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (!base) {
    return (
      <div className="p-8">
        <p className="text-muted-foreground">Base not found.</p>
        <Link href="/">
          <Button variant="link" className="mt-2 px-0">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">{base.name}</h1>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Tables ({base.tables.length})
        </h2>
        <Button
          size="sm"
          onClick={() => createTable.mutate({ baseId })}
          disabled={createTable.isPending}
        >
          <Plus className="mr-1 h-4 w-4" /> Add table
        </Button>
      </div>

      {base.tables.length > 0 ? (
        <div className="space-y-2">
          {base.tables.map((table) => (
            <Link key={table.id} href={`/${baseId}/${table.id}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <Table className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{table.name}</p>
                      <p className="text-xs text-muted-foreground font-mono">
                        {table.id}
                      </p>
                    </div>
                  </div>
                  <button
                    className="p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      deleteTable.mutate({ id: table.id });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No tables yet — create one to get started.
        </p>
      )}
    </div>
  );
}
