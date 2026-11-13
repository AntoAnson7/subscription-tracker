# Repository Rules & Architecture Guide

Welcome to the SubTrack codebase. All contributors and AI agents must strictly adhere to the following architectural standards, linting constraints, and file organization rules.

---

## 1. Core Code Quality & Linting Constraints

### File Size Limits

- **Max 150 lines per file** (strictly enforced as a lint error via Oxlint).
- If a file approaches 150 lines, decompose it by extracting hooks, recipes, sub-components, or utility functions.

### Component Design

- **Only one component per file.** Never declare multiple React components in a single file.
- **Follow Single Responsibility Principle (SRP)**: Each file must have one clear, focused responsibility.

### Strict TypeScript Rules

- **No `any` or `as unknown as any`**: Strict type safety is mandatory (enforced via Oxlint `typescript/no-explicit-any`).
- **No mixed nullable types**: Avoid ambiguous types like `prop?: null` (`undefined | null`).
  - If a value can be null, declare it explicitly as `type: Type | null` (not optional `?`).
  - Keep optional props (`prop?: Type`) distinct from nullable props (`prop: Type | null`).

---

## 2. General Engineering Principles

- **Prioritize readability over cleverness.** Code is read far more often than it is written.
- **Prefer composition over inheritance.**
- **Write maintainable, production-quality code.**
- **Follow existing project patterns instead of inventing new ones.**
- **Never introduce unnecessary abstractions.**
- **If unsure, match the surrounding codebase.**
- **Prefer consistency over personal preference.**

---

## 3. Directory & Module Organization

All feature modules and reusable domain code live under `src/modules/`.

```
src/
├── modules/
│   ├── common/                  # Shared cross-module foundation
│   │   ├── components/          # Generic atomic UI components (Button, Modal, Badge, etc.)
│   │   ├── recipes/             # Shared Panda CSS recipes & slot recipes (sva, cva)
│   │   ├── types/               # Global / shared types (Currency, BillingCycle, BaseEntity)
│   │   ├── utils/               # Shared pure utility functions (currency, formatting, a11y)
│   │   └── hooks/               # Shared custom hooks (useTheme, useMediaQuery, etc.)
│   │
│   ├── subscriptions/           # Subscriptions domain module
│   │   ├── components/          # SubscriptionCard, SubscriptionList, SubscriptionTable, etc.
│   │   ├── recipes/             # Panda CSS recipes for subscription UI
│   │   ├── types/               # Subscription, SubscriptionFilter, SubscriptionFormData
│   │   ├── utils/               # Subscription math, next billing calculation, icon resolver
│   │   └── hooks/               # useSubscriptions, useSubscriptionFilter, useSubscriptionForm
│   │
│   ├── dashboard/               # Run-Rate Hero & KPI summary module
│   │   ├── components/
│   │   ├── recipes/
│   │   ├── types/
│   │   ├── utils/
│   │   └── hooks/
│   │
│   ├── calendar/                # Monthly renewal calendar module
│   │   ├── components/
│   │   ├── recipes/
│   │   ├── types/
│   │   ├── utils/
│   │   └── hooks/
│   │
│   └── analytics/               # Visual charts & cash-flow projection module
│       ├── components/
│       ├── recipes/
│       ├── types/
│       ├── utils/
│       └── hooks/
```

- Each module folder contains only the subfolders it requires (`components`, `recipes`, `types`, `utils`, `hooks`).
- Cross-cutting or shared logic must be placed in `src/modules/common/`.

---

## 4. Custom Hooks & Separation of Concerns

**All business logic belongs inside hooks.** Never put business logic, complex data derivations, or side effects directly inside component bodies.

### Logic belonging in hooks:

- API & database interactions
- Form state & submission flows
- Validation & error handling
- Pagination, filtering, & sorting
- Event handlers & mutations
- Derived financial computations & memoization
- Navigation logic

### Component Responsibilities:

A component should primarily:

1. **Call hooks** to obtain state and handlers.
2. **Render UI** using typed classes and slots.

---

## 5. Styling Rules with Panda CSS

- Always prefer `sva()` (slot recipes), `cva()` (component recipes), and `css()` declared in dedicated `recipes/` files.
- Keep style definitions separated from component rendering logic.

### Pattern:

```typescript
// in src/modules/<feature>/recipes/<name>.recipe.ts
import { sva } from 'styled-system/css';

export const dashboardStyles = sva({
  slots: ['root', 'header', 'content', 'statCard'],
  base: {
    root: {
      position: 'relative',
      p: '6',
      borderRadius: '24px',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    content: {
      mt: '4',
    },
    statCard: {
      p: '4',
      bg: 'white',
      borderRadius: '16px',
    },
  },
});
```

### Component Usage:

```tsx
// in src/modules/<feature>/components/<Component>.tsx
import { dashboardStyles } from '@/modules/<feature>/recipes/<name>.recipe';

export function Dashboard() {
  const classes = dashboardStyles();

  return (
    <section className={classes.root}>
      <header className={classes.header}>...</header>
      <div className={classes.content}>...</div>
    </section>
  );
}
```

---

## 6. Imports & Exports

- **Prefer absolute imports**: Always use `@/...` path aliases (e.g. `@/modules/subscriptions/hooks/useSubscriptions`).
- **Prefer named exports**: Avoid default exports except where required by specific frameworks/lazy loading.
  ```typescript
  // Recommended
  export function SubscriptionCard() { ... }

  // Avoid
  export default function SubscriptionCard() { ... }
  ```
