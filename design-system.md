# WhereToPayLessTax Design System

> "Compare taxes. Move smarter."
> Professional, trustworthy financial comparison site for digital nomads.

---

## Design Principles

1. **Trust & Authority** -- Financial data demands credibility. Blue-dominant palette, clean typography, ample whitespace.
2. **5-Second Comprehension** -- Users must understand the value proposition instantly. Clear hierarchy, scannable tables, bold numbers.
3. **Mobile-First** -- Digital nomads are mobile. Every component must work on small screens first.
4. **Data-Dense but Clean** -- Show meaningful data without overwhelming. Progressive disclosure for detail.
5. **Accessible** -- WCAG AA minimum. High contrast, readable fonts, proper semantic HTML.

---

## Color Palette

### Primary (Trust Blue)
| Token              | Hex       | Usage                              |
|--------------------|-----------|-------------------------------------|
| `primary-50`       | `#EFF6FF` | Lightest tint, hover backgrounds    |
| `primary-100`      | `#DBEAFE` | Light backgrounds, selected states  |
| `primary-200`      | `#BFDBFE` | Borders, dividers                   |
| `primary-300`      | `#93C5FD` | Secondary icons                     |
| `primary-400`      | `#60A5FA` | Links on dark backgrounds           |
| `primary-500`      | `#3B82F6` | Secondary actions, links            |
| `primary-600`      | `#2563EB` | **Primary brand color**             |
| `primary-700`      | `#1D4ED8` | Primary hover state                 |
| `primary-800`      | `#1E40AF` | Dark headers, nav background        |
| `primary-900`      | `#1E3A8A` | Darkest blue, text on light bg      |
| `primary-950`      | `#172554` | Near-black blue                     |

### Secondary (Slate)
| Token              | Hex       | Usage                              |
|--------------------|-----------|-------------------------------------|
| `slate-50`         | `#F8FAFC` | Page background (light mode)        |
| `slate-100`        | `#F1F5F9` | Card backgrounds, table alt rows    |
| `slate-200`        | `#E2E8F0` | Borders, dividers                   |
| `slate-300`        | `#CBD5E1` | Disabled states, placeholders       |
| `slate-400`        | `#94A3B8` | Muted text, secondary labels        |
| `slate-500`        | `#64748B` | Body text (secondary)               |
| `slate-600`        | `#475569` | Body text (primary)                 |
| `slate-700`        | `#334155` | Strong body text                    |
| `slate-800`        | `#1E293B` | Headings                            |
| `slate-900`        | `#0F172A` | **Primary text / Dark mode bg**     |
| `slate-950`        | `#020617` | Darkest background                  |

### Accent (Amber -- CTA & Highlights)
| Token              | Hex       | Usage                              |
|--------------------|-----------|-------------------------------------|
| `accent-400`       | `#FBBF24` | Star ratings, badges                |
| `accent-500`       | `#F59E0B` | **Primary CTA**, highlights         |
| `accent-600`       | `#D97706` | CTA hover state                     |
| `accent-700`       | `#B45309` | CTA active/pressed                  |

### Semantic Colors
| Token              | Hex       | Usage                              |
|--------------------|-----------|-------------------------------------|
| `success-50`       | `#F0FDF4` | Success background                  |
| `success-500`      | `#22C55E` | Low tax rate, positive indicator    |
| `success-600`      | `#16A34A` | Success text on light bg            |
| `success-700`      | `#15803D` | Success dark                        |
| `warning-50`       | `#FFFBEB` | Warning background                  |
| `warning-500`      | `#F59E0B` | Medium tax rate, caution            |
| `warning-600`      | `#D97706` | Warning text                        |
| `danger-50`        | `#FEF2F2` | Danger/error background             |
| `danger-500`       | `#EF4444` | High tax rate, error                |
| `danger-600`       | `#DC2626` | Error text on light bg              |
| `info-50`          | `#EFF6FF` | Info background                     |
| `info-500`         | `#3B82F6` | Info indicator                      |

### Dark Mode Overrides
| Token              | Light       | Dark        |
|--------------------|-------------|-------------|
| Background         | `#F8FAFC`   | `#0F172A`   |
| Surface            | `#FFFFFF`   | `#1E293B`   |
| Surface elevated   | `#FFFFFF`   | `#334155`   |
| Border             | `#E2E8F0`   | `#334155`   |
| Text primary       | `#0F172A`   | `#F8FAFC`   |
| Text secondary     | `#475569`   | `#94A3B8`   |
| Text muted         | `#94A3B8`   | `#64748B`   |

---

## Typography

### Font Stack
- **Headings:** Lexend (Google Fonts) -- designed for readability, corporate trust feel
- **Body:** Source Sans 3 (Google Fonts) -- excellent accessibility, professional
- **Mono:** Geist Mono (local) -- code snippets, tax numbers

### Scale
| Element        | Size         | Weight   | Line Height | Letter Spacing | Font      |
|----------------|-------------|----------|-------------|----------------|-----------|
| Display        | 3rem (48px) | 700      | 1.1         | -0.025em       | Lexend    |
| H1             | 2.25rem (36px)| 700    | 1.2         | -0.025em       | Lexend    |
| H2             | 1.875rem (30px)| 600   | 1.25        | -0.02em        | Lexend    |
| H3             | 1.5rem (24px)| 600     | 1.3         | -0.015em       | Lexend    |
| H4             | 1.25rem (20px)| 600    | 1.4         | -0.01em        | Lexend    |
| H5             | 1.125rem (18px)| 500   | 1.4         | 0              | Lexend    |
| Body Large     | 1.125rem (18px)| 400   | 1.6         | 0              | Source Sans 3 |
| Body           | 1rem (16px) | 400      | 1.6         | 0              | Source Sans 3 |
| Body Small     | 0.875rem (14px)| 400   | 1.5         | 0.01em         | Source Sans 3 |
| Caption        | 0.75rem (12px)| 400    | 1.5         | 0.02em         | Source Sans 3 |
| Mono           | 0.875rem (14px)| 400   | 1.5         | 0              | Geist Mono|
| Tax Number     | 1.5rem (24px)| 700     | 1.2         | -0.01em        | Lexend    |

---

## Spacing Scale

Using Tailwind default 4px base:

| Token | Value  | Usage                           |
|-------|--------|---------------------------------|
| `1`   | 4px    | Tight inline spacing            |
| `2`   | 8px    | Icon gaps, tight padding        |
| `3`   | 12px   | Small padding                   |
| `4`   | 16px   | Default padding, card inner     |
| `5`   | 20px   | Medium padding                  |
| `6`   | 24px   | Section inner padding           |
| `8`   | 32px   | Card padding, component gaps    |
| `10`  | 40px   | Large gaps                      |
| `12`  | 48px   | Section spacing (mobile)        |
| `16`  | 64px   | Section spacing (desktop)       |
| `20`  | 80px   | Major section spacing           |
| `24`  | 96px   | Page-level spacing              |

---

## Border Radius

| Token    | Value  | Usage                             |
|----------|--------|-----------------------------------|
| `sm`     | 4px    | Badges, small chips               |
| `DEFAULT`| 6px    | Inputs, small cards               |
| `md`     | 8px    | Buttons, medium elements          |
| `lg`     | 12px   | Cards, panels                     |
| `xl`     | 16px   | Large cards, hero elements        |
| `2xl`    | 24px   | Feature cards, comparison panels  |
| `full`   | 9999px | Pills, avatars, circular elements |

---

## Shadows

| Token     | Value                                                    | Usage                       |
|-----------|----------------------------------------------------------|-----------------------------|
| `sm`      | `0 1px 2px rgba(0,0,0,0.05)`                           | Subtle lift (badges)        |
| `DEFAULT` | `0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)` | Cards at rest            |
| `md`      | `0 4px 6px rgba(0,0,0,0.07), 0 2px 4px rgba(0,0,0,0.06)` | Cards on hover           |
| `lg`      | `0 10px 15px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)` | Elevated panels, dropdowns |
| `xl`      | `0 20px 25px rgba(0,0,0,0.1), 0 10px 10px rgba(0,0,0,0.04)` | Modals, popovers        |
| `inner`   | `inset 0 2px 4px rgba(0,0,0,0.06)`                     | Inset elements              |

---

## Component Specs

### Buttons

**Primary (CTA)**
- Background: `accent-500` (#F59E0B)
- Text: `slate-900` (#0F172A) -- dark on amber for contrast
- Hover: `accent-600` (#D97706)
- Active: `accent-700` (#B45309)
- Radius: `md` (8px)
- Padding: `12px 24px`
- Font: Lexend 600, 16px
- Shadow: `sm` at rest, `md` on hover
- Transition: 150ms ease

**Secondary**
- Background: `primary-600` (#2563EB)
- Text: white
- Hover: `primary-700`
- Radius: `md`
- Padding: `12px 24px`
- Font: Lexend 600, 16px

**Outline**
- Background: transparent
- Border: 1px `slate-300`
- Text: `slate-700`
- Hover: `slate-50` bg, `primary-600` border
- Radius: `md`

**Ghost**
- Background: transparent
- Text: `primary-600`
- Hover: `primary-50` bg

**Sizes:**
| Size | Height | Padding     | Font Size |
|------|--------|-------------|-----------|
| sm   | 32px   | 8px 16px    | 14px      |
| md   | 40px   | 12px 24px   | 16px      |
| lg   | 48px   | 16px 32px   | 18px      |

### Cards

**Default Card**
- Background: white (dark: `slate-800`)
- Border: 1px `slate-200` (dark: `slate-700`)
- Radius: `lg` (12px)
- Padding: `24px`
- Shadow: `DEFAULT`
- Hover: Shadow `md`, translateY -1px

**Comparison Card (Country)**
- Same as default, plus:
- Header area with country flag + name
- Tax rate displayed as large number (Lexend 700, 24px)
- Color-coded tax rate: green (<15%), amber (15-30%), red (>30%)
- Footer: "Compare" button

**Highlighted Card**
- Border: 2px `primary-600`
- Badge: "Best Value" / "Lowest Tax" in `accent-500`

### Tables (Comparison)

- Header row: `slate-800` bg, white text (dark: `slate-700` bg)
- Alternating rows: white / `slate-50`
- Cell padding: `12px 16px`
- Border: 1px `slate-200` between rows
- Highlighted column: `primary-50` background
- Sortable headers: chevron icon, hover `primary-600`
- Mobile: horizontal scroll with sticky first column
- Tax rate cells: color-coded (semantic colors)

### Badges

- Padding: `4px 12px`
- Radius: `full` (pill)
- Font: Source Sans 3, 12px, 600 weight
- Variants:
  - **Low tax:** `success-50` bg, `success-700` text
  - **Medium tax:** `warning-50` bg, `warning-600` text
  - **High tax:** `danger-50` bg, `danger-600` text
  - **Info:** `info-50` bg, `primary-700` text
  - **Neutral:** `slate-100` bg, `slate-600` text

### Comparison Panels

- Side-by-side layout (2-3 columns desktop, stacked mobile)
- Each panel is a card with:
  - Country header (flag + name + badge)
  - Key metrics in grid (2x2 or 2x3)
  - Metric: label (caption) + value (tax number style)
  - Color-coded values
  - Divider between sections
  - "View Details" link at bottom

### Navigation

**Desktop Header**
- Height: 64px
- Background: white (dark: `slate-900`)
- Border bottom: 1px `slate-200`
- Logo: left-aligned
- Nav links: center or right, `slate-600` text, hover `primary-600`
- Active link: `primary-600` with 2px bottom border
- CTA button: right side

**Mobile Header**
- Height: 56px
- Hamburger icon: right side
- Mobile menu: full-screen overlay or slide-in drawer
- Menu items: large touch targets (48px min height)

### Footer

- Background: `slate-900` (dark: `slate-950`)
- Text: `slate-400`
- Links: `slate-300`, hover white
- Sections: 3-4 columns desktop, stacked mobile
- Newsletter CTA: input + button inline
- Copyright bar: separated by border-top `slate-700`

---

## Responsive Breakpoints

| Name   | Min Width | Usage                    |
|--------|-----------|--------------------------|
| `sm`   | 640px     | Mobile landscape         |
| `md`   | 768px     | Tablet                   |
| `lg`   | 1024px    | Desktop                  |
| `xl`   | 1280px    | Wide desktop             |
| `2xl`  | 1536px    | Ultra-wide               |

### Container
- Max width: 1280px
- Padding: 16px (mobile), 24px (tablet), 32px (desktop)

---

## Animation & Transitions

- **Default transition:** 150ms ease
- **Hover transitions:** color, background-color, border-color, box-shadow, transform
- **Page transitions:** fade-in 200ms
- **Number animations:** count-up for tax rate reveals
- **Reduced motion:** respect `prefers-reduced-motion`

---

## Iconography

- Style: Outline (Heroicons or Lucide React)
- Size: 20px default, 16px small, 24px large
- Color: inherits text color
- Stroke width: 1.5px
