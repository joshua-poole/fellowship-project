import { DashboardCard } from "./DashboardCard";
import { OmniIcon } from "./dashboardIcons/Omni";
import { Grid2x2Icon, Table, ArrowUp } from "lucide-react";

export function Dashboard() {
  return (
    <div className="mx-12 mt-8">
      <h1 className="text-3xl font-bold pb-6 leading-tight">Home</h1>
      <div className="flex gap-4">
        <DashboardCard title="Start with Omni" description="Use AI to build a custom app tailored to your workflow" icon={OmniIcon} color="rgb(221, 4, 168)"/>
        <DashboardCard title="Start with templates" description="Select a template to get started and customize as you go." icon={Grid2x2Icon} color="purple"/>
        <DashboardCard title="Quickly upload" description="Easily migrate your existing projects in just a few minutes." icon={ArrowUp} color="green"/>
        <DashboardCard title="Build an app on your own" description="Start with a blank app and build your ideal workflow." icon={Table} color="blue"/>
      </div>
    </div>
  );
}