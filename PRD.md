# E-Commerce Frontend Dashboard — Product Requirements Document

## 1. Project Overview

**Product Name:** Open Dimension E-Commerce Dashboard
**Type:** Admin/Seller frontend dashboard for managing an e-commerce platform
**Tech Stack:** Next.js 15 (App Router), TypeScript, Tailwind CSS 4, shadcn/ui, Zustand, TanStack Query, Recharts, React Hook Form + Zod

---

## 2. Goals & Objectives

- Provide a modern, responsive admin dashboard for e-commerce operations
- Enable product, order, customer, and inventory management from a single interface
- Deliver actionable analytics and reporting
- Support role-based access (Super Admin, Admin, Seller, Support)
- Achieve fast load times (<2s initial, <200ms navigations) with optimized bundle

---

## 3. User Roles & Permissions

| Role        | Products | Orders | Customers | Analytics | Settings | Users |
|-------------|----------|--------|-----------|-----------|----------|-------|
| Super Admin | CRUD     | CRUD   | CRUD      | Full      | Full     | CRUD  |
| Admin       | CRUD     | CRUD   | Read      | Full      | Limited  | Read  |
| Seller      | Own CRUD | Own    | —         | Own       | Own      | —     |
| Support     | Read     | Update | Read      | —         | —        | —     |

---

## 4. Information Architecture & Pages

### 4.1 Authentication
- `/login` — Email/password login with "remember me"
- `/forgot-password` — Password reset flow
- `/reset-password/[token]` — Set new password

### 4.2 Dashboard Home (`/dashboard`)
- KPI cards: Total Revenue, Orders, Customers, Conversion Rate
- Revenue chart (line/bar, filterable by 7d/30d/90d/1y)
- Recent orders table (last 10)
- Top selling products (top 5)
- Low stock alerts
- Activity feed / notifications

### 4.3 Products (`/dashboard/products`)
- **List** — Searchable, filterable (category, status, price range), sortable table with pagination
- **Create/Edit** (`/dashboard/products/new`, `/dashboard/products/[id]/edit`)
  - Name, slug, description (rich text editor)
  - SKU, barcode
  - Price, compare-at price, cost price
  - Category & subcategory (nested select)
  - Tags (multi-select/creatable)
  - Images (drag & drop upload, reorder, max 10)
  - Variants (size, color, material — dynamic variant matrix)
  - Inventory: stock quantity, low stock threshold, track inventory toggle
  - SEO: meta title, meta description, URL handle
  - Status: Draft, Active, Archived
- **Bulk actions** — Delete, change status, export CSV

### 4.4 Categories (`/dashboard/categories`)
- Tree view of nested categories
- Create/Edit modal: name, slug, parent category, image, description
- Drag-and-drop reordering

### 4.5 Orders (`/dashboard/orders`)
- **List** — Filterable by status (Pending, Processing, Shipped, Delivered, Cancelled, Refunded), date range, payment status
- **Detail** (`/dashboard/orders/[id]`)
  - Order summary (items, quantities, prices)
  - Customer info + shipping address
  - Payment info & status
  - Order timeline / status history
  - Actions: Update status, add tracking number, issue refund, add internal note
  - Print invoice / packing slip

### 4.6 Customers (`/dashboard/customers`)
- **List** — Search by name/email, filter by registration date, total spent
- **Detail** (`/dashboard/customers/[id]`)
  - Profile info
  - Order history
  - Total spent, average order value
  - Addresses on file
  - Notes / tags

### 4.7 Analytics (`/dashboard/analytics`)
- **Sales Analytics**
  - Revenue over time (line chart)
  - Orders over time (bar chart)
  - Average order value trend
  - Sales by category (pie/donut chart)
- **Product Analytics**
  - Top products by revenue / units sold
  - Product views vs purchases (conversion)
- **Customer Analytics**
  - New vs returning customers
  - Customer acquisition over time
  - Geographic distribution (map or table)
- Date range picker (preset: today, 7d, 30d, 90d, 1y, custom)
- Export reports as CSV/PDF

### 4.8 Inventory (`/dashboard/inventory`)
- Stock levels overview with color-coded status (In Stock, Low, Out of Stock)
- Bulk stock update
- Stock movement history
- Low stock alerts configuration

### 4.9 Discounts & Coupons (`/dashboard/discounts`)
- **List** — Active, scheduled, expired tabs
- **Create/Edit**
  - Code (auto-generate or manual)
  - Type: percentage, fixed amount, free shipping
  - Value, minimum order amount, maximum discount cap
  - Usage limits (total, per customer)
  - Date range (start/end)
  - Applicable products/categories/customers

### 4.10 Reviews (`/dashboard/reviews`)
- List with star rating filter, status filter (pending, approved, rejected)
- Approve/reject actions
- Reply to review

### 4.11 Settings (`/dashboard/settings`)
- **General** — Store name, logo, currency, timezone, contact info
- **Payments** — Payment gateway configuration display
- **Shipping** — Shipping zones, rates, free shipping thresholds
- **Taxes** — Tax rates by region
- **Notifications** — Email notification preferences
- **Users & Roles** (`/dashboard/settings/users`) — Invite users, assign roles

---

## 5. Core UI Components

### 5.1 Layout
- **Sidebar** — Collapsible, icon + label nav, active state, grouped sections
- **Header** — Breadcrumbs, global search (Cmd+K), notifications bell, user avatar dropdown
- **Content area** — Max-width container with consistent padding

### 5.2 Shared Components
| Component         | Description                                          |
|--------------------|------------------------------------------------------|
| DataTable          | Sortable, filterable, paginated table with row select |
| StatCard           | KPI card with icon, value, trend indicator            |
| ChartCard          | Wrapper for Recharts with title, date filter          |
| FileUploader       | Drag-and-drop with preview, progress, reorder         |
| RichTextEditor     | Lightweight editor (Tiptap) for product descriptions  |
| ConfirmDialog      | Reusable confirmation modal                           |
| StatusBadge        | Color-coded status pill                               |
| EmptyState         | Illustration + message + CTA for empty lists          |
| SearchCommand      | Cmd+K global search palette                           |
| DateRangePicker    | Preset + custom date range selector                   |
| MultiSelect        | Searchable multi-select with tag chips                |
| Breadcrumbs        | Auto-generated from route hierarchy                   |
| NotificationToast  | Success/error/warning/info toasts                     |

---

## 6. Technical Architecture

### 6.1 Project Structure
```
src/
├── app/                        # Next.js App Router
│   ├── (auth)/                 # Auth layout group
│   │   ├── login/
│   │   ├── forgot-password/
│   │   └── reset-password/[token]/
│   ├── (dashboard)/            # Dashboard layout group
│   │   ├── layout.tsx          # Sidebar + Header layout
│   │   ├── page.tsx            # Dashboard home
│   │   ├── products/
│   │   ├── categories/
│   │   ├── orders/
│   │   ├── customers/
│   │   ├── analytics/
│   │   ├── inventory/
│   │   ├── discounts/
│   │   ├── reviews/
│   │   └── settings/
│   ├── layout.tsx              # Root layout (providers)
│   └── globals.css
├── components/
│   ├── ui/                     # shadcn/ui primitives
│   ├── layout/                 # Sidebar, Header, Breadcrumbs
│   ├── dashboard/              # Dashboard-specific widgets
│   ├── products/               # Product form, list, cards
│   ├── orders/                 # Order detail, timeline
│   ├── customers/              # Customer profile, list
│   ├── analytics/              # Chart components
│   └── shared/                 # DataTable, FileUploader, etc.
├── hooks/                      # Custom React hooks
├── lib/                        # Utilities, API client, constants
├── stores/                     # Zustand stores
├── types/                      # TypeScript type definitions
├── validators/                 # Zod schemas
└── config/                     # App config, navigation, routes
```

### 6.2 State Management
- **Server state:** TanStack Query for all API data (products, orders, etc.)
- **Client state:** Zustand for UI state (sidebar collapsed, theme, filters)
- **Form state:** React Hook Form + Zod validation

### 6.3 API Integration Pattern
- Centralized API client (`lib/api.ts`) with interceptors for auth tokens
- TanStack Query hooks per resource (`hooks/use-products.ts`, etc.)
- Optimistic updates for status changes
- Mock data layer for development (MSW or static JSON)

### 6.4 Authentication
- JWT-based auth with access + refresh tokens
- Middleware-based route protection (`middleware.ts`)
- Auth store persisted to cookies

### 6.5 Performance
- Route-based code splitting (automatic with App Router)
- Image optimization via `next/image`
- Virtual scrolling for large tables (TanStack Virtual)
- Debounced search inputs
- Skeleton loaders for async content

---

## 7. Design System

- **Theme:** Light mode default, dark mode support via `next-themes`
- **Colors:** Neutral base, primary brand color (configurable), semantic colors for status
- **Typography:** Inter font, scale from 12px–32px
- **Spacing:** 4px base unit (Tailwind default)
- **Border radius:** Rounded (0.5rem default)
- **Shadows:** Subtle elevation for cards and modals

---

## 8. Implementation Phases

### Phase 1 — Foundation (Core Setup)
- [x] PRD
- [ ] Next.js project setup with TypeScript, Tailwind, shadcn/ui
- [ ] Project structure scaffolding
- [ ] Theme configuration (light/dark)
- [ ] Layout: Sidebar, Header, Breadcrumbs
- [ ] Auth pages (login, forgot password) — UI only
- [ ] Route protection middleware stub

### Phase 2 — Dashboard & Products
- [ ] Dashboard home with KPI cards and charts (mock data)
- [ ] Products list page with DataTable
- [ ] Product create/edit form (all fields, variants, image upload)
- [ ] Categories management (tree view, CRUD modal)

### Phase 3 — Orders & Customers
- [ ] Orders list with filters and status badges
- [ ] Order detail page with timeline and actions
- [ ] Customers list
- [ ] Customer detail page

### Phase 4 — Analytics & Inventory
- [ ] Analytics page with all chart types
- [ ] Date range filtering for analytics
- [ ] Inventory management page
- [ ] Low stock alerts

### Phase 5 — Remaining Features
- [ ] Discounts & coupons CRUD
- [ ] Reviews management
- [ ] Settings pages (general, payments, shipping, taxes, notifications, users)
- [ ] Global search (Cmd+K)
- [ ] Notification system

### Phase 6 — Polish & Optimization
- [ ] Responsive design audit (mobile/tablet)
- [ ] Accessibility audit (keyboard nav, screen readers, ARIA)
- [ ] Performance optimization (bundle analysis, lazy loading)
- [ ] Error boundaries and fallback UI
- [ ] Loading states and skeleton screens everywhere
- [ ] E2E tests for critical flows

---

## 9. Non-Functional Requirements

| Requirement     | Target                                           |
|-----------------|--------------------------------------------------|
| Performance     | LCP < 2s, FID < 100ms, CLS < 0.1                |
| Responsiveness  | Fully usable on 360px+ screens                   |
| Accessibility   | WCAG 2.1 AA compliance                           |
| Browser Support | Chrome, Firefox, Safari, Edge (last 2 versions)  |
| Bundle Size     | < 200KB initial JS (gzipped)                     |
| Type Safety     | Strict TypeScript, no `any`                      |

---

## 10. Key Dependencies

| Package             | Purpose                        |
|---------------------|--------------------------------|
| next@15             | Framework                      |
| react@19            | UI library                     |
| typescript          | Type safety                    |
| tailwindcss@4       | Styling                        |
| shadcn/ui           | Component primitives           |
| @tanstack/react-query | Server state management     |
| @tanstack/react-table | Headless table               |
| zustand             | Client state                   |
| react-hook-form     | Form management                |
| zod                 | Schema validation              |
| recharts            | Charts                         |
| tiptap              | Rich text editor               |
| next-themes         | Dark mode                      |
| lucide-react        | Icons                          |
| date-fns            | Date utilities                 |
| nuqs                | URL query state                |
