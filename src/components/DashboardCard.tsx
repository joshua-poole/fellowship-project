import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function DashboardCard({ title, description, icon: Icon, color }: { title: string; description: string; icon: React.ComponentType<{ className?: string; style?: React.CSSProperties; strokeWidth?: number }>; color?: string }) {
  return (
    <Card className="min-w-60 min-h-16 py-4 gap-0 rounded-sm">
      <CardHeader className="px-4">
        <CardTitle className="flex flex-row gap-5">
          <span className="shrink-0" style={{ color }}>
            <Icon className="h-5 w-5" strokeWidth={1.25} />
          </span>
          <h2 className="text-sm font-semibold">{title}</h2>
        </CardTitle>
      </CardHeader>

      <CardContent className="px-4">
        <p className="text-sm font-light">{description}</p>
      </CardContent>
    </Card>
  );
} 
