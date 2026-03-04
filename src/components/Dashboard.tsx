"use client";

import { DashboardCard } from "./DashboardCard";
import { OmniIcon } from "./dashboardIcons/Omni";
import { Grid2x2Icon, Table, ArrowUp, Trash2 } from "lucide-react";
import { api } from "~/trpc/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

function timeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function Dashboard() {
  const { data: bases, isLoading, refetch } = api.base.getAll.useQuery();

  const createBase = api.base.create.useMutation({
    onSuccess: () => refetch(),
  });

  const deleteBase = api.base.delete.useMutation({
    onSuccess: () => refetch(),
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

      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Recent bases</h2>
          <Button
            size="sm"
            onClick={() => createBase.mutate({ name: "Untitled Base" })}
            disabled={createBase.isPending}
          >
            + Create base
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
        ) : bases && bases.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {bases.map((base) => (
              <Link key={base.id} href={`/${base.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{base.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {timeAgo(new Date(base.lastOpenedAt))}
                      </p>
                    </div>
                    <button
                      className="ml-2 p-1 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteBase.mutate({ id: base.id });
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
          <p className="text-muted-foreground">No bases yet — create one to get started</p>
        )}
      </div>
    </div>
  );
}
