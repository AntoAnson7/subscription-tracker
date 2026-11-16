# Repository Rules & Architecture Guide

Welcome to the Subwise codebase. All contributors and AI agents must strictly adhere to the following architectural standards, linting constraints, and file organization rules.

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

## 3. Accessibility is Priority 1 (A11y Standard)

- **Top Priority**: Accessibility (a11y) is a first-class requirement across every component, form, modal, and interactive control.
- **Keyboard Navigation & Focus Rings**: Every focusable element (inputs, custom selects, buttons, dropdown items) must have a high-contrast, accessible focus ring on `:focus-visible` (e.g. `outline: 2px solid`, `outlineColor: accent.primary`, `outlineOffset: 2px`).
- **Escape Key Handling**: Pressing `Escape` must close any open modal, dialog, autocomplete panel, or dropdown.
- **Reduced Motion Support**: All animations and transitions throughout the application must respect `prefers-reduced-motion: reduce`. When reduced motion is enabled, disable or minimize animations to zero duration.
- **ARIA & Semantics**: Use proper ARIA attributes (`aria-expanded`, `aria-haspopup`, `aria-label`, `role="dialog"`, `role="listbox"`, `role="option"`, `tabIndex`).

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

---

## 7. Design Tokens & Sizing Rules (Consistency Standard)

All colors, sizing, spacing, and border radii used throughout the application must be declared as Panda CSS tokens in `panda.config.ts` to ensure 100% visual consistency and automatic light/dark mode adaptation.

### Semantic Color Tokens

Always reference semantic tokens instead of hardcoded hex or rgba values:

```typescript
// Good: Automatically adapts to light/dark themes
background: 'bg.primary',
color: 'text.primary',
borderColor: 'border.subtle',

// Avoid: Hardcoded colors
background: '#FFFFFF',
color: '#1D1D1F',
```

Available semantic tokens:

- **Backgrounds**: `bg.canvas`, `bg.primary`, `bg.secondary`, `bg.tertiary`, `bg.hover`, `bg.muted`
- **Text**: `text.primary`, `text.secondary`, `text.tertiary`, `text.inverse`
- **Borders**: `border.subtle`, `border.default`, `border.strong`
- **Accent**: `accent.primary`, `accent.subtle`, `accent.border`
- **Status**: `status.danger`, `status.dangerBg`, `status.dangerBorder`, `status.warning`, `status.warningBg`, `status.warningBorder`, `status.success`, `status.successBg`, `status.successBorder`

### Sizing & Spacing Scale

- **Scale Rule**: Tokens are defined in steps of `50` up to `500`, where **each 100 equals 8px** (e.g. `'100'` = 8px, `'150'` = 12px, `'200'` = 16px).
- Sizing applies uniformly to `width`, `height`, `padding`, `margin`, and `gap`.
- **Beyond 500**: Use explicit pixel strings (e.g. `'1200px'`, `'360px'`).

| Token   | Pixels         | Common Use Cases                               |
| :------ | :------------- | :--------------------------------------------- |
| `'0'`   | `0px`          | Zero spacing / resets                          |
| `'50'`  | `4px`          | Micro gaps, badge vertical padding             |
| `'100'` | `8px`          | Tight gap, small padding                       |
| `'150'` | `12px`         | Icon sizes, medium button padding              |
| `'200'` | `16px`         | Standard element gap, card inner padding       |
| `'250'` | `20px`         | Large padding, icon containers                 |
| `'300'` | `24px`         | Section gap, header spacing                    |
| `'350'` | `28px`         | Large card padding                             |
| `'400'` | `32px`         | Layout spacing                                 |
| `'450'` | `36px`         | Extra spacious padding                         |
| `'500'` | `40px`         | Maximum tokenized spacing/height               |
| `> 500` | Ex: `'1200px'` | Max container widths, explicit hero dimensions |

### Border Radius Tokens

Always use radii tokens for corners:

- Semantic scale: `'sm'` (`8px`), `'md'` (`12px`), `'lg'` (`16px`), `'xl'` (`22px`), `'2xl'` (`28px`), `'pill'` or `'full'` (`9999px`)
- Numeric scale: `'50'` (`4px`), `'100'` (`8px`), `'150'` (`12px`), `'200'` (`16px`), `'250'` (`20px`), etc.

Usage in recipes:

```typescript
borderRadius: 'xl',
borderRadius: 'pill',
borderRadius: 'md',
```

### Gradient Tokens

Gradients are defined in `src/theme/gradientTokens.ts` and configured as Panda CSS semantic gradient tokens with automatic light and dark mode values:

- `ambientMesh`: Full page atmospheric background mesh
- `heroCard`: Titanium / Apple Card translucent glass hero background
- `brandIcon`: Subtle brand icon background gradient

Usage in recipes:

```typescript
bgGradient: 'ambientMesh',
bgGradient: 'heroCard',
bgGradient: 'brandIcon',
```

### Gradient Tokens

Gradients are defined in `src/theme/gradientTokens.ts` and configured as Panda CSS semantic gradient tokens with automatic light and dark mode values:

- `ambientMesh`: Full page atmospheric background mesh
- `heroCard`: Titanium / Apple Card translucent glass hero background
- `brandIcon`: Subtle brand icon background gradient

Usage in recipes:

```typescript
bgGradient: 'ambientMesh',
bgGradient: 'heroCard',
bgGradient: 'brandIcon',
```
