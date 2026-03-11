# E-Commerce Dashboard — Task List

> Each task is atomic and implementable in a single session.
> Dependencies are noted with `→ requires: #task-id`

---

## Phase 1 — Foundation

### 1.1 Project Initialization
- [ ] **T-001** Initialize Next.js 15 project with TypeScript, App Router, `src/` directory
- [ ] **T-002** Install & configure Tailwind CSS 4 (`globals.css`, theme tokens) → requires: T-001
- [ ] **T-003** Install & initialize shadcn/ui (CLI init, set base style/colors) → requires: T-002
- [ ] **T-004** Install core dependencies: zustand, @tanstack/react-query, @tanstack/react-table, react-hook-form, zod, recharts, lucide-react, date-fns, next-themes, nuqs → requires: T-001
- [ ] **T-005** Scaffold folder structure: `components/{ui,layout,dashboard,products,orders,customers,analytics,shared}`, `hooks/`, `lib/`, `stores/`, `types/`, `validators/`, `config/` → requires: T-001

### 1.2 Design System & Theme
- [ ] **T-006** Configure theme: CSS variables for light/dark, brand colors, semantic status colors (success/warning/error/info) → requires: T-003
- [ ] **T-007** Set up `next-themes` ThemeProvider in root layout, add theme toggle component → requires: T-006
- [ ] **T-008** Install shadcn/ui base components: Button, Input, Label, Card, Badge, Dialog, DropdownMenu, Separator, Skeleton, Tooltip, Sheet, Tabs, Select, Table, Popover, Command, Avatar, Sonner (toast) → requires: T-003

### 1.3 Type Definitions
- [ ] **T-009** Define core TypeScript types: `User`, `Role`, `Product`, `ProductVariant`, `Category`, `Order`, `OrderItem`, `Customer`, `Address`, `Review`, `Discount`, `InventoryItem`, `Notification` → requires: T-005

### 1.4 Config & Utilities
- [ ] **T-010** Create navigation config (`config/navigation.ts`): sidebar menu items with icons, labels, paths, role permissions, grouping → requires: T-005
- [ ] **T-011** Create API client (`lib/api.ts`): base fetch wrapper with auth header injection, error handling, base URL config → requires: T-005
- [ ] **T-012** Create mock data files: `lib/mock/products.ts`, `orders.ts`, `customers.ts`, `analytics.ts`, `categories.ts`, `reviews.ts`, `discounts.ts` with realistic sample data → requires: T-009

### 1.5 Layout Components
- [ ] **T-013** Build `Sidebar` component: collapsible (icon-only mode), grouped nav sections, active route highlighting, logo at top, collapse toggle, responsive (sheet on mobile) → requires: T-008, T-010
- [ ] **T-014** Build `Header` component: breadcrumbs, search trigger button (Cmd+K), notification bell with count badge, user avatar dropdown (profile, settings, theme toggle, logout) → requires: T-008
- [ ] **T-015** Build `Breadcrumbs` component: auto-generate from current pathname segments, last segment non-linked → requires: T-008
- [ ] **T-016** Create dashboard layout (`app/(dashboard)/layout.tsx`): compose Sidebar + Header + scrollable content area with max-width container → requires: T-013, T-014

### 1.6 Shared Components (Batch 1)
- [ ] **T-017** Build `StatCard` component: icon, title, value, trend (up/down with percentage), optional comparison text → requires: T-008
- [ ] **T-018** Build `StatusBadge` component: variant-based color pill (pending=yellow, processing=blue, shipped=purple, delivered=green, cancelled=red, refunded=gray, draft=gray, active=green, archived=gray) → requires: T-008
- [ ] **T-019** Build `EmptyState` component: illustration/icon, title, description, action button → requires: T-008
- [ ] **T-020** Build `ConfirmDialog` component: title, description, confirm/cancel buttons, destructive variant, loading state → requires: T-008

### 1.7 Authentication Pages
- [ ] **T-021** Create auth layout (`app/(auth)/layout.tsx`): centered card on gradient/pattern background → requires: T-008
- [ ] **T-022** Build Login page (`app/(auth)/login/page.tsx`): email/password fields, "remember me" checkbox, submit button, forgot password link, form validation with Zod → requires: T-021
- [ ] **T-023** Build Forgot Password page (`app/(auth)/forgot-password/page.tsx`): email input, submit, success message → requires: T-021
- [ ] **T-024** Build Reset Password page (`app/(auth)/reset-password/[token]/page.tsx`): new password + confirm password, validation → requires: T-021

### 1.8 Auth Logic
- [ ] **T-025** Create auth store (`stores/auth-store.ts`): user state, login/logout actions, token management, persist to cookies → requires: T-005
- [ ] **T-026** Create auth middleware (`middleware.ts`): protect `/dashboard/*` routes, redirect unauthenticated users to `/login`, redirect authenticated users away from auth pages → requires: T-025

---

## Phase 2 — Dashboard Home & Products

### 2.1 Dashboard Home
- [ ] **T-027** Build Dashboard Home page (`app/(dashboard)/page.tsx`): 4 KPI StatCards (revenue, orders, customers, conversion rate) using mock data → requires: T-016, T-017, T-012
- [ ] **T-028** Build `RevenueChart` component: line/bar chart with Recharts, period toggle (7d/30d/90d/1y), responsive, wrapped in ChartCard → requires: T-008, T-012
- [ ] **T-029** Build `RecentOrdersTable`: last 10 orders mini-table with status badges, customer name, amount, date, "view all" link → requires: T-018, T-012
- [ ] **T-030** Build `TopProductsWidget`: top 5 products list with image thumbnail, name, units sold, revenue → requires: T-012
- [ ] **T-031** Build `LowStockAlerts` widget: products below threshold with stock count, colored indicator, link to product → requires: T-012
- [ ] **T-032** Build `ActivityFeed` widget: recent activity list (new order, stock change, new customer) with timestamp and icon → requires: T-012
- [ ] **T-033** Compose Dashboard Home: arrange all widgets in responsive grid layout (2-col on desktop, 1-col on mobile) → requires: T-027 through T-032

### 2.2 DataTable
- [ ] **T-034** Build `DataTable` component: integrate @tanstack/react-table with shadcn Table, support column definitions, sorting (click header), row selection (checkbox) → requires: T-008
- [ ] **T-035** Add DataTable features: pagination (page size selector, prev/next/first/last), column visibility toggle → requires: T-034
- [ ] **T-036** Add DataTable toolbar: search input (debounced), faceted filter dropdowns, active filter tags, clear filters button, view toggle (optional) → requires: T-034
- [ ] **T-037** Add DataTable bulk actions bar: appears when rows selected, shows count, action buttons (delete, status change, export) → requires: T-034

### 2.3 Products
- [ ] **T-038** Build Products List page (`app/(dashboard)/products/page.tsx`): DataTable with columns (image, name, status, category, price, stock, actions dropdown), filters (status, category), search by name/SKU → requires: T-034, T-035, T-036, T-037, T-012, T-018
- [ ] **T-039** Build `FileUploader` component: drag & drop zone, file preview thumbnails, upload progress, remove button, reorder via drag, max file count/size validation → requires: T-008
- [ ] **T-040** Build `RichTextEditor` component: integrate Tiptap with toolbar (bold, italic, headings, lists, links, images), output HTML → requires: T-004
- [ ] **T-041** Build product Zod validators (`validators/product.ts`): create/edit schema covering all product fields, variant validation, SEO fields → requires: T-009
- [ ] **T-042** Build Product Form — Basic Info section: name (auto-slug), description (RichTextEditor), status select → requires: T-040, T-041
- [ ] **T-043** Build Product Form — Pricing section: price, compare-at price, cost price fields with currency formatting → requires: T-041
- [ ] **T-044** Build Product Form — Organization section: category select (nested), tags multi-select (creatable), SKU, barcode → requires: T-008, T-041
- [ ] **T-045** Build Product Form — Media section: FileUploader integration for product images → requires: T-039
- [ ] **T-046** Build Product Form — Variants section: add option types (size/color/custom), add option values, auto-generate variant matrix table with per-variant price/SKU/stock → requires: T-041
- [ ] **T-047** Build Product Form — Inventory section: track inventory toggle, stock quantity, low stock threshold → requires: T-041
- [ ] **T-048** Build Product Form — SEO section: meta title, meta description (char counter), URL handle (editable slug) → requires: T-041
- [ ] **T-049** Compose Product Create page (`app/(dashboard)/products/new/page.tsx`): assemble all form sections with React Hook Form, submit handler, sticky save/discard bar → requires: T-042 through T-048
- [ ] **T-050** Build Product Edit page (`app/(dashboard)/products/[id]/edit/page.tsx`): same form pre-filled with existing data, update handler → requires: T-049, T-012

### 2.4 Categories
- [ ] **T-051** Build `CategoryTree` component: recursive tree view, expand/collapse, drag-and-drop reordering, add/edit/delete actions per node → requires: T-008, T-012
- [ ] **T-052** Build Category form modal: name, auto-slug, parent category select, image upload, description textarea → requires: T-008, T-039
- [ ] **T-053** Build Categories page (`app/(dashboard)/categories/page.tsx`): CategoryTree + add root category button, compose with modal → requires: T-051, T-052

---

## Phase 3 — Orders & Customers

### 3.1 Orders
- [ ] **T-054** Build Orders List page (`app/(dashboard)/orders/page.tsx`): DataTable with columns (order#, customer, date, status, payment status, total, actions), filters (status, payment status, date range) → requires: T-034, T-018, T-012
- [ ] **T-055** Build `DateRangePicker` component: popover with calendar, preset ranges (today, 7d, 30d, 90d, custom), used for filtering → requires: T-008
- [ ] **T-056** Build `OrderTimeline` component: vertical timeline showing status changes with timestamps, user who changed, notes → requires: T-008
- [ ] **T-057** Build Order Detail — Summary section: items table (image, name, variant, qty, price, subtotal), subtotal/shipping/tax/discount/total breakdown → requires: T-008, T-012
- [ ] **T-058** Build Order Detail — Customer & Shipping section: customer info card, shipping address card, billing address card → requires: T-008
- [ ] **T-059** Build Order Detail — Actions: update status dropdown, add tracking number input, issue refund dialog, add internal note textarea → requires: T-020, T-008
- [ ] **T-060** Build Order Detail — Print: generate printable invoice and packing slip layouts (print-friendly CSS) → requires: T-057
- [ ] **T-061** Compose Order Detail page (`app/(dashboard)/orders/[id]/page.tsx`): assemble all sections in 2-column layout (summary+timeline left, customer+actions right) → requires: T-056 through T-060

### 3.2 Customers
- [ ] **T-062** Build Customers List page (`app/(dashboard)/customers/page.tsx`): DataTable with columns (avatar, name, email, orders count, total spent, joined date, actions), search, filters → requires: T-034, T-012
- [ ] **T-063** Build Customer Detail — Profile section: avatar, name, email, phone, joined date, tags → requires: T-008, T-012
- [ ] **T-064** Build Customer Detail — Stats: total spent, order count, average order value, displayed as stat cards → requires: T-017
- [ ] **T-065** Build Customer Detail — Order History: mini table of past orders with status, date, total → requires: T-018, T-012
- [ ] **T-066** Build Customer Detail — Addresses: list of saved addresses, mark default → requires: T-008
- [ ] **T-067** Build Customer Detail — Notes section: add/view internal notes with timestamps → requires: T-008
- [ ] **T-068** Compose Customer Detail page (`app/(dashboard)/customers/[id]/page.tsx`): assemble all sections → requires: T-063 through T-067

---

## Phase 4 — Analytics & Inventory

### 4.1 Analytics
- [ ] **T-069** Build `ChartCard` wrapper: title, optional subtitle, date range filter, loading skeleton, responsive → requires: T-008, T-055
- [ ] **T-070** Build Sales Analytics section: revenue line chart, orders bar chart, AOV trend line chart, sales by category donut chart → requires: T-069, T-012
- [ ] **T-071** Build Product Analytics section: top products by revenue horizontal bar chart, product conversion funnel chart → requires: T-069, T-012
- [ ] **T-072** Build Customer Analytics section: new vs returning stacked bar chart, acquisition line chart, geographic table (country, orders, revenue) → requires: T-069, T-012
- [ ] **T-073** Build report export: CSV and PDF generation from analytics data, download buttons → requires: T-070, T-071, T-072
- [ ] **T-074** Compose Analytics page (`app/(dashboard)/analytics/page.tsx`): tabbed layout (Sales, Products, Customers) with global date range picker, arrange charts in grid → requires: T-070, T-071, T-072, T-073

### 4.2 Inventory
- [ ] **T-075** Build Inventory List page (`app/(dashboard)/inventory/page.tsx`): DataTable with columns (product image, name, SKU, current stock, status badge), color-coded rows (green/yellow/red) → requires: T-034, T-018, T-012
- [ ] **T-076** Build bulk stock update: inline editable stock quantity cells, save all changes button → requires: T-075
- [ ] **T-077** Build stock movement history: expandable row or modal showing stock in/out history per product with dates and reasons → requires: T-012
- [ ] **T-078** Build low stock alerts config: set global default threshold, per-product override, alert delivery preferences → requires: T-008

---

## Phase 5 — Discounts, Reviews & Settings

### 5.1 Discounts & Coupons
- [ ] **T-079** Build Discount Zod validators (`validators/discount.ts`): code, type, value, min order, max cap, usage limits, date range, applicable items → requires: T-009
- [ ] **T-080** Build Discount form: code (with auto-generate), type select, value, min order, max cap, usage limits, date range picker, product/category/customer selector → requires: T-079, T-055, T-008
- [ ] **T-081** Build Discounts List page (`app/(dashboard)/discounts/page.tsx`): tabs (Active, Scheduled, Expired), DataTable with columns (code, type, value, usage, status, dates, actions) → requires: T-034, T-018, T-012
- [ ] **T-082** Build Discount Create/Edit pages → requires: T-080

### 5.2 Reviews
- [ ] **T-083** Build Reviews List page (`app/(dashboard)/reviews/page.tsx`): DataTable with columns (product, customer, rating stars, excerpt, status, date), filters (rating, status), approve/reject actions → requires: T-034, T-018, T-012
- [ ] **T-084** Build Review Detail/Reply: expandable row or modal with full review text, reply textarea, submit reply → requires: T-008

### 5.3 Settings
- [ ] **T-085** Build Settings layout (`app/(dashboard)/settings/layout.tsx`): side tab navigation (General, Payments, Shipping, Taxes, Notifications, Users) → requires: T-008
- [ ] **T-086** Build General Settings page: store name, logo upload, currency select, timezone select, contact info form → requires: T-039, T-008
- [ ] **T-087** Build Payments Settings page: display connected payment gateways, status indicators, config links → requires: T-008
- [ ] **T-088** Build Shipping Settings page: shipping zones table (CRUD), rate rules per zone (flat rate, weight-based, free threshold) → requires: T-008
- [ ] **T-089** Build Tax Settings page: tax rates table by region, create/edit/delete tax rules → requires: T-008
- [ ] **T-090** Build Notification Settings page: toggle switches for email notifications (new order, low stock, new review, new customer), email template previews → requires: T-008
- [ ] **T-091** Build Users & Roles page (`app/(dashboard)/settings/users/page.tsx`): users DataTable (name, email, role, status, last active), invite user modal (email, role select), edit role, deactivate user → requires: T-034, T-008

---

## Phase 6 — Global Features & Polish

### 6.1 Global Features
- [ ] **T-092** Build `SearchCommand` (Cmd+K palette): global search across products, orders, customers, pages; keyboard navigation, recent searches → requires: T-008, T-012
- [ ] **T-093** Build notification system: notification store, notification dropdown in header with unread count, mark as read, notification list page → requires: T-025, T-014
- [ ] **T-094** Build role-based UI gating: `usePermission` hook, `<RoleGate>` wrapper component, hide/disable UI elements per role → requires: T-025, T-010

### 6.2 Responsive & Accessibility
- [ ] **T-095** Responsive audit: test all pages at 360px/768px/1024px/1440px, fix layout breaks, ensure touch targets ≥ 44px → requires: all page tasks
- [ ] **T-096** Accessibility audit: keyboard navigation on all interactive elements, focus management for modals/dialogs, ARIA labels, skip-to-content link, screen reader testing → requires: all page tasks

### 6.3 Loading & Error States
- [ ] **T-097** Add skeleton loaders: create skeleton variants for StatCard, DataTable rows, chart area, product form, order detail → requires: T-008
- [ ] **T-098** Add error boundaries: global error boundary (`app/error.tsx`), per-page error states, not-found pages (`not-found.tsx`) → requires: T-016
- [ ] **T-099** Add loading states: route-level `loading.tsx` files for each dashboard section with appropriate skeletons → requires: T-097

### 6.4 Performance
- [ ] **T-100** Performance optimization: analyze bundle with `@next/bundle-analyzer`, lazy load heavy components (RichTextEditor, Charts), optimize images, verify code splitting → requires: all feature tasks

### 6.5 Integration Prep
- [ ] **T-101** Create TanStack Query hooks: `useProducts`, `useOrders`, `useCustomers`, `useAnalytics`, `useCategories`, `useDiscounts`, `useReviews`, `useInventory` — each with list/detail/create/update/delete, currently backed by mock data → requires: T-011, T-012
- [ ] **T-102** Create Zod validators for all remaining forms: order status update, customer notes, settings forms, review reply → requires: T-009

---

## Summary

| Phase | Tasks     | Focus                          |
|-------|-----------|--------------------------------|
| 1     | T-001–026 | Foundation, layout, auth       |
| 2     | T-027–053 | Dashboard home, products, categories |
| 3     | T-054–068 | Orders, customers              |
| 4     | T-069–078 | Analytics, inventory           |
| 5     | T-079–091 | Discounts, reviews, settings   |
| 6     | T-092–102 | Global features, polish        |

**Total: 102 tasks**
