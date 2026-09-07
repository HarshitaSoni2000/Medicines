# THOCK MEDICINE

Premium B2B wholesale medicine distribution platform — built for medical stores, pharmacies and clinics to browse, bulk-order and manage wholesale medicine purchases.

## Tech Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- React Router v6
- React Hook Form + Zod
- TanStack Query
- Recharts (admin analytics)
- Lucide icons

## Getting Started

```bash
npm install
npm run dev       # start dev server
npm run build      # production build
npm run preview    # preview production build
```

## What's included

**Public site** — Home, Medicine Catalog (search/filter/sort/pagination), Categories,
Product Detail, Quick Order (spreadsheet-style bulk ordering), Cart, 4-step Checkout,
Login/Register/Forgot Password, About, Contact, How It Works.

**Customer Dashboard** (`/dashboard`) — Overview, Orders + Order Detail (status timeline,
reorder, invoice), Wishlist, Saved Carts, Addresses, Business Profile, Documents,
Notifications, Support tickets.

**Admin Panel** (`/admin`) — Dashboard with sales/order charts, Orders management,
Product CRUD, Categories, Customers, Inventory (batch/expiry tracking + alerts),
Suppliers, Pricing, Offers, Reports, Support, Settings.

## Notes

- All data is mock data in `src/data/` — no backend yet. A `src/services/` API
  abstraction layer can be added to swap mock data for real REST calls.
- Cart, wishlist, saved carts and auth state persist to `localStorage` for the demo.
- This is a first full-breadth pass — every route works end to end, but is intentionally
  "basic level" per the build plan. Visual polish, richer validation, and deeper admin
  features (bulk actions, image upload, batch-level editing) are natural next passes.
