"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";

interface ChartCardProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  children: (dimensions: { width: number; height: number }) => React.ReactNode;
  height?: string;
}

export function ChartCard({
  title,
  description,
  action,
  children,
  height = "h-80",
}: ChartCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {description}
            </p>
          )}
        </div>
        {action}
      </CardHeader>
      <CardContent className="pb-4">
        <div ref={containerRef} className={`${height} w-full`}>
          {dimensions.width > 0 &&
            dimensions.height > 0 &&
            children(dimensions)}
        </div>
      </CardContent>
    </Card>
  );
}
