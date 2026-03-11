import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
  changePercent?: number;
  comparison?: string;
}

export function StatCard({
  title,
  value,
  icon: Icon,
  trend = "neutral",
  changePercent,
  comparison,
}: StatCardProps) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="mt-2">
          <p className="text-2xl font-bold">{value}</p>
          {changePercent !== undefined && (
            <div className="mt-1 flex items-center gap-1 text-xs">
              <TrendIcon
                className={cn(
                  "h-3 w-3",
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  trend === "up" && "text-success",
                  trend === "down" && "text-destructive",
                  trend === "neutral" && "text-muted-foreground"
                )}
              >
                {changePercent > 0 ? "+" : ""}
                {changePercent.toFixed(1)}%
              </span>
              {comparison && (
                <span className="text-muted-foreground">{comparison}</span>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
