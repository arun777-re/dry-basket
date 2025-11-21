![GitHub License](https://img.shields.io/github/license/arun777-re/dry-basket)
![GitHub Stars](https://img.shields.io/github/stars/arun777-re/dry-basket)
![GitHub Forks](https://img.shields.io/github/forks/arun777-re/dry-basket)
![GitHub Last Commit](https://img.shields.io/github/last-commit/arun777-re/dry-basket)
![GitHub Repo Size](https://img.shields.io/github/repo-size/arun777-re/dry-basket)


# E-Commerce Frontend — Modern Full-Stack (Next.js)

Tech: Next.js (App Router) · TypeScript · Redux Toolkit · TailwindCSS · Framer Motion · Embla · Axios - React Hot Toast - shadcn/ui - radixui.


## Project Overview

A modular, production-ready e-commerce frontend built with Next.js App Router. Focus is on performance, maintainability, and real-world UX: guest + authenticated carts, robust checkout, pagination, graceful error handling, and a reusable component system.
Note: All UI components are implemented as client components except purely type/logic assets (DTOs, Redux slices, validation schemas, utils, middlewares) which remain server-neutral.
I use a custom loader for fallback states (empty data, delays) and gracefully handle runtime errors and pagination.



## Core Highlights

- Modular architecture following SOLID ideas

- Next.js App Router (client components for UI)

- DTO-based request/response typing (TypeScript)

- Redux Toolkit + Redux Persist (cart, user, product state)

- Custom hooks using useRef for concurrency safety (race conditions fixed)

- Custom loader / skeletons + graceful runtime fallback UIs

- Pagination (cursor & page-based where applicable)

- TailwindCSS + ShadCN/Radix patterns for consistent UI

- Framer Motion for polished animations

- Embla for product carousels

- Image optimization (Next <Image />) & prefetching

- SEO and accessibility best practices


## Project Structure (recommended / what this repo uses)

```
src/
├── app/                      # App Router pages (all client components)
│   ├── components/           # smaller reusable UI components
│   │   ├── Button/
│   │   ├── cards/
│   │   └── forms/
│   │
│   └── Components/           # large reusable UI components used inside pages
│
├── constants/                # App constants & routes
├── data/                     # Static seed or stub data
├── hooks/                    # Custom client hooks (useRef concurrency-safe)
├── lib/                      # Utility helpers (shared)
├── redux/                    # slices, store config (DTOs + slices are server-neutral)
├── services/                 # API service functions (axios wrappers)
├── types/                    # DTOs (request/response types)
├── validation/               # yup schemas for outgoing POST request validation
├── public/                   # Static assets (images/icons)
└── styles/                   # Tailwind + global css
```


## 🧩 High-Level Design (HLD)

                   ┌───────────────┐
                   │   Next.js UI  │   (All Client Components)
                   └───────┬───────┘
                           │
                           ▼
                   ┌────────────────┐
                   │  Custom Hooks  │   (Concurrency-safe: useRef token pattern)
                   └───────┬────────┘
                           │
                           ▼
                   ┌────────────────┐
                   │  Redux Store   │
                   │ (Slices + RTK) │
                   └───────┬────────┘
                           │
                           ▼
               ┌────────────────────────┐
               │     Service Layer      │
               │ (Axios fetchers + DTO) │
               └──────────┬─────────────┘
                          │
                          ▼
              ┌────────────────────────────┐
              │       REST API Backend     │
              └────────────────────────────┘



## Engineering Decisions (why / how)

1) Client-first UI (no server components)

You requested everything be client components for UI — that simplifies hydration assumptions and makes it easier to use client-side libraries (Embla, Framer Motion). We keep DTOs, slices, validation and utilities separate to preserve typing and testability.

2) Concurrency safety with custom hooks

Pattern:

const requestRef = useRef(0);
async function fetchData() {
  const token = ++requestRef.current;
  const res = await apiCall();
  if (token !== requestRef.current) return; // stale result ignored
  setState(res);
}


This prevents race conditions when multiple requests fire (search, filters, pagination).

3) Dual cart + optimistic updates

Guest cart persisted to localStorage + Redux Persist.

On login: merge guest cart with server cart (conflict resolution rules: merge quantities, latest timestamp wins).

Optimistic add/remove with rollback on API error.

4) Custom loader & graceful fallback

Central useLoader component that shows skeletons, empty states, error UI.

Handles API pending, empty data, and runtime exceptions uniformly.

5) Pagination

Cursor-based for large lists (infinite scroll) and page-based for SEO-heavy category pages.

Query-string sync (?page=2 / ?cursor=abc) so pages are linkable and shareable.

6) DTO-driven API contracts

All API calls use typed request/response DTOs. This reduces runtime bugs and makes backend integration safer.


## Key Features & Pages

- Home, Category, Product (/product/[slug], /products/[category])
- 
- Cart (guest + user) with auto-merge
- 
- Checkout & Payment redirect (Stripe / Razorpay integration hooks)
- 
- User Dashboard / Orders / Update Password / Verify Email
- 
- Blogs, Contact, FAQ, Policies
- 
- Search + Filters + Sorting + Pagination
- 
- Product Quickview, Carousel, Reviews
- 
- Toast notifications, accessible modals, and keyboard nav


🔧 Getting Started

Prereqs: Node.js, Yarn (or npm)

# install deps
yarn install

# dev
npm run dev

# build
npm run build
# compiled output: .next/

## Credits

- React (https://reactjs.org/)
- Next.js (https://nextjs.org/)
- Redux (https://redux.js.org/)
- Redux Toolkit (https://redux-toolkit.js.org/rtk-query)
- Redux Persist (https://react-redux-firebase.com/docs/integrations/redux-persist.html)
- TailwindCSS (https://tailwindcss.com/)
- Formik + Yup (https://formik.org/)
- Framer Motion (https://motion.dev/)
- AOS Animations (https://michalsnik.github.io/aos/)
- React Hot Toast (https://react-hot-toast.com/)
- Shadcn UI (https://ui.shadcn.com/docs/components/carousel)
- Radix UI (https://www.radix-ui.com/)


