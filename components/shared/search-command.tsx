"use client";

import { cn } from "@/lib/utils";
import { navigation } from "@/config/navigation";
import { mockCustomers } from "@/lib/mock/customers";
import { mockOrders } from "@/lib/mock/orders";
import { mockProducts } from "@/lib/mock/products";
import {
  BarChart3,
  FolderTree,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Star,
  Ticket,
  Users,
  Warehouse,
  type LucideIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SearchResult {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  group: string;
}

function buildPageResults(): SearchResult[] {
  return navigation.flatMap((group) =>
    group.items.map((item) => ({
      id: `page-${item.href}`,
      label: item.title,
      description: `Go to ${item.title}`,
      href: item.href,
      icon: item.icon,
      group: "Pages",
    }))
  );
}

function buildProductResults(query: string): SearchResult[] {
  return mockProducts
    .filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
    )
    .slice(0, 5)
    .map((p) => ({
      id: `product-${p.id}`,
      label: p.name,
      description: p.sku,
      href: `/products/${p.id}/edit`,
      icon: Package,
      group: "Products",
    }));
}

function buildOrderResults(query: string): SearchResult[] {
  return mockOrders
    .filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(query) ||
        o.customerName.toLowerCase().includes(query)
    )
    .slice(0, 5)
    .map((o) => ({
      id: `order-${o.id}`,
      label: o.orderNumber,
      description: o.customerName,
      href: `/orders/${o.id}`,
      icon: ShoppingCart,
      group: "Orders",
    }));
}

function buildCustomerResults(query: string): SearchResult[] {
  return mockCustomers
    .filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
    )
    .slice(0, 5)
    .map((c) => ({
      id: `customer-${c.id}`,
      label: c.name,
      description: c.email,
      href: `/customers/${c.id}`,
      icon: Users,
      group: "Customers",
    }));
}

interface SearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchCommand({ open, onOpenChange }: SearchCommandProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return buildPageResults();

    const pages = buildPageResults().filter(
      (r) =>
        r.label.toLowerCase().includes(q) ||
        r.description?.toLowerCase().includes(q)
    );
    const products = buildProductResults(q);
    const orders = buildOrderResults(q);
    const customers = buildCustomerResults(q);

    return [...pages, ...products, ...orders, ...customers];
  }, [query]);

  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    for (const r of results) {
      const arr = map.get(r.group) ?? [];
      arr.push(r);
      map.set(r.group, arr);
    }
    return map;
  }, [results]);

  const select = useCallback(
    (result: SearchResult) => {
      router.push(result.href);
      onOpenChange(false);
      setQuery("");
      setActiveIndex(0);
    },
    [router, onOpenChange]
  );

  // Reset index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [results]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[activeIndex]) {
        e.preventDefault();
        select(results[activeIndex]);
      } else if (e.key === "Escape") {
        onOpenChange(false);
      }
    },
    [activeIndex, results, select, onOpenChange]
  );

  // Scroll active item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  if (!open) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={() => onOpenChange(false)}
      />

      {/* Dialog */}
      <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-lg -translate-x-1/2">
        <div
          className="overflow-hidden rounded-xl bg-popover shadow-2xl ring-1 ring-foreground/10"
          onKeyDown={handleKeyDown}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search pages, products, orders, customers..."
              className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <kbd className="hidden shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
            {results.length === 0 ? (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                No results found for &quot;{query}&quot;
              </p>
            ) : (
              Array.from(grouped.entries()).map(([group, items]) => (
                <div key={group} className="mb-1">
                  <p className="px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {group}
                  </p>
                  {items.map((item) => {
                    flatIndex++;
                    const idx = flatIndex;
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.id}
                        data-index={idx}
                        onClick={() => select(item)}
                        onMouseEnter={() => setActiveIndex(idx)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm transition-colors",
                          activeIndex === idx
                            ? "bg-primary/10 text-foreground"
                            : "text-foreground/80 hover:bg-muted"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <span className="font-medium">{item.label}</span>
                          {item.description && (
                            <span className="ml-2 text-xs text-muted-foreground">
                              {item.description}
                            </span>
                          )}
                        </div>
                        {activeIndex === idx && (
                          <span className="text-xs text-muted-foreground">
                            ↵
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">
                ↑↓
              </kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">
                ↵
              </kbd>
              Open
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1 py-0.5 text-[10px] font-medium">
                esc
              </kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
