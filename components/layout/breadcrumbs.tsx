"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Fragment } from "react";

export function Breadcrumbs() {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, arr) => {
      const href = "/" + arr.slice(0, index + 1).join("/");
      const label = segment
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
      const isLast = index === arr.length - 1;
      return { href, label, isLast };
    });

  if (segments.length <= 1) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
      {segments.map((segment) => (
        <Fragment key={segment.href}>
          {segment.href !== "/" + segments[0].label.toLowerCase() && (
            <ChevronRight className="h-3.5 w-3.5" />
          )}
          {segment.isLast ? (
            <span className="font-medium text-foreground">{segment.label}</span>
          ) : (
            <Link
              href={segment.href}
              className="hover:text-foreground transition-colors"
            >
              {segment.label}
            </Link>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
