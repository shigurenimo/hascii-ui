---
version: alpha
name: hascii-ui
description: Terminal UI design system for OpenTUI components, distributed via shadcn registry.
colors:
  background: "#09090B"
  foreground: "#FAFAFA"
  primary: "#FAFAFA"
  primary-foreground: "#09090B"
  primary-hover: "#E4E4E7"
  primary-active: "#D4D4D8"
  secondary: "#27272A"
  secondary-foreground: "#FAFAFA"
  secondary-hover: "#3F3F46"
  secondary-active: "#52525B"
  card: "#27272A"
  card-foreground: "#FAFAFA"
  popover: "#3F3F46"
  popover-foreground: "#FAFAFA"
  muted: "#27272A"
  muted-foreground: "#A1A1AA"
  accent: "#27272A"
  accent-foreground: "#FAFAFA"
  accent-hover: "#18181B"
  accent-active: "#3F3F46"
  destructive: "#7F1D1D"
  destructive-foreground: "#FEF2F2"
  destructive-hover: "#991B1B"
  destructive-active: "#B91C1C"
  border: "#3F3F46"
  input: "#3F3F46"
  ring: "#D4D4D8"
  hover-active: "#71717A"
spacing:
  xs: 1px
  sm: 2px
  md: 4px
  lg: 8px
rounded:
  sm: 0px
  md: 0px
  lg: 0px
components:
  sidebar-menu-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
  sidebar-menu-item-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.foreground}"
  sidebar-menu-item-active:
    backgroundColor: "{colors.secondary-active}"
    textColor: "{colors.foreground}"
  sidebar-menu-item-active-hover:
    backgroundColor: "{colors.hover-active}"
    textColor: "{colors.foreground}"
  sidebar-menu-item-pressed:
    backgroundColor: "{colors.secondary-active}"
  select-item:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
  select-item-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.foreground}"
  select-item-active:
    backgroundColor: "{colors.secondary-active}"
    textColor: "{colors.foreground}"
  select-item-active-hover:
    backgroundColor: "{colors.hover-active}"
    textColor: "{colors.foreground}"
  select-item-pressed:
    backgroundColor: "{colors.secondary-active}"
  file-tree-row:
    backgroundColor: "transparent"
  file-tree-row-hover:
    backgroundColor: "{colors.secondary-hover}"
  file-tree-row-active:
    backgroundColor: "{colors.secondary-active}"
  file-tree-row-active-hover:
    backgroundColor: "{colors.hover-active}"
  file-tree-row-pressed:
    backgroundColor: "{colors.secondary-active}"
  command-row:
    backgroundColor: "transparent"
  command-row-hover:
    backgroundColor: "{colors.secondary-hover}"
  command-row-active:
    backgroundColor: "{colors.secondary-active}"
  command-row-active-hover:
    backgroundColor: "{colors.hover-active}"
  command-row-pressed:
    backgroundColor: "{colors.secondary-active}"
  accordion-header:
    backgroundColor: "transparent"
    textColor: "{colors.muted-foreground}"
  accordion-header-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.foreground}"
  accordion-header-active:
    backgroundColor: "{colors.secondary-active}"
    textColor: "{colors.foreground}"
  accordion-header-active-hover:
    backgroundColor: "{colors.hover-active}"
    textColor: "{colors.foreground}"
  accordion-body:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
  toggle-group-item:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.muted-foreground}"
  toggle-group-item-hover:
    backgroundColor: "{colors.secondary-hover}"
    textColor: "{colors.foreground}"
  toggle-group-item-active:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
  toggle-group-item-pressed:
    backgroundColor: "{colors.secondary-active}"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
  popover:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
---

## Overview

hascii-ui is a terminal UI library that runs on OpenTUI. The visual identity is **flat, dense, monochrome with a single semantic accent (red for destructive)**. Everything is built in cell units, not pixels — there is no anti-aliasing, no rounded corners, no shadows. Hierarchy comes from value (lightness) and box-drawing glyphs.

The default theme is dark. Light is intentionally not provided yet.

## Colors

The palette is a 4-step zinc ramp with a separate red ramp for destructive intent. Every interactive surface picks from the same scale so components feel cut from the same cloth.

### Surface ramp (dark → light)

| Token                                   | Hex     | Tailwind | Used for                                                     |
| :-------------------------------------- | :------ | :------- | :----------------------------------------------------------- |
| background                              | #09090B | zinc-950 | The page itself, full-screen backdrop                        |
| accent-hover                            | #18181B | zinc-900 | Header / footer strips against the page                      |
| muted, secondary, card, accent          | #27272A | zinc-800 | Cards, raised panels, default field backgrounds              |
| popover, secondary-hover, accent-active | #3F3F46 | zinc-700 | Popovers (toggle group container), hovered surfaces, borders |
| secondary-active                        | #52525B | zinc-600 | Active / pressed surfaces                                    |
| **hover-active**                        | #71717A | zinc-500 | **Active items on hover** — the brightest surface step       |
| muted-foreground                        | #A1A1AA | zinc-400 | Inactive text, helper text, indicator glyphs                 |
| primary-active                          | #D4D4D8 | zinc-300 | Pressed primary surfaces, focus ring                         |
| primary-hover                           | #E4E4E7 | zinc-200 | Hovered primary surfaces                                     |
| primary, foreground                     | #FAFAFA | zinc-50  | Active text, primary fills, thumb glyphs                     |

### Why a separate `hover-active` slot?

Most components have four interactive states (rest, hover, active, pressed). Items that can be **selected AND hovered at the same time** (sidebar menu, select option, file-tree row, command row, accordion header) need a fifth color so the user can see "I am hovering an already-selected row." That step is the `hover-active` token (`#71717A`, zinc-500). It is intentionally one step brighter than `secondary-active` so it reads as "selected, and I'm pointing at it."

### Destructive ramp

| Token                  | Hex     | Tailwind | Used for                |
| :--------------------- | :------ | :------- | :---------------------- |
| destructive            | #7F1D1D | red-900  | Destructive button rest |
| destructive-hover      | #991B1B | red-800  | Destructive hover       |
| destructive-active     | #B91C1C | red-700  | Destructive pressed     |
| destructive-foreground | #FEF2F2 | red-50   | Text on destructive     |

## Typography

Terminal cells. There is one typeface (the user's terminal font) and one effective size (one cell). Hierarchy is communicated by:

- **Color** (foreground vs muted-foreground)
- **Position** (header strip vs body)
- **Glyphs** (`▾`, `▸`, `●`, `■`, `□`, `▣`, `─`, `│`, `├`, `└`, `▏`, `▮`, `█`)

Avoid mixing wide-character glyphs (`☐`, `☑`, `✓`) with regular text in the same `<text>` node — pad with explicit spaces between sibling boxes (`paddingLeft={1|2}`) instead of relying on `gap`.

## Layout

Everything is laid out in OpenTUI cells via yoga flexbox.

- **Spacing scale (cells):** xs=1, sm=2, md=4, lg=8.
- Use `padding{Left,Right,Top,Bottom}` for inner space, `margin*` for outer space, `gap` for flex children with reliable separation.
- For separation between two `<text>` siblings inside a flex row, prefer wrapping the second one in `<box paddingLeft={1|2}>` rather than `gap`, because some wide glyphs cancel `gap`.

### Card → Section structure

A typical screen is:

1. Page background (`background`)
2. Header strip (`accent-hover`, full width, no margin)
3. Content area (centered, padded `sm` left/right)
4. Card (`card`) for grouped content with `sm` left/right margin and `xs` bottom margin
5. Footer strip (`accent-hover`, full width, no margin)

## Shapes

Borders, corners, and rules are all done with box-drawing characters.

- Borders: `border borderStyle="rounded"` — note "rounded" still draws orthogonal corners; the visual is always 90°.
- Active rule (left edge): a vertical column of `▏` glyphs absolutely positioned at `left={0}` (`top=0 bottom=0`), drawn in `primary`. Used by `sidebar-menu-item`, `select-item`, `accordion-item`.
- Focus underline (input): an absolutely-positioned `<text>{"▁".repeat(width)}</text>` at the bottom of the focused container, drawn in `primary`.
- Dividers: `─` (horizontal) and `│` (vertical) chains.
- Tree rules: `├── │ └──` (the `tree` component renders this statically; `file-tree` renders an indented IDE-style view with `▾`/`▸` chevrons).

## Components

### Interactive-state convention

This is the most important convention in the system. **Every selectable list-row component must use this exact precedence**, top to bottom:

| Order | Condition               | Background                           |
| :---- | :---------------------- | :----------------------------------- |
| 1     | `isPressed`             | `secondary-active`                   |
| 2     | `isHovered && isActive` | `hover-active` (zinc-500)            |
| 3     | `isHovered`             | `secondary-hover`                    |
| 4     | `isActive`              | `secondary-active`                   |
| 5     | otherwise               | `transparent` (no `backgroundColor`) |

Implement this as a `pickBg` (or `pickRowBg`) helper at the top of each component file. Do not invent shorter ladders — even if a state seems impossible (e.g. "this row can never be hovered while active"), keep all five rungs so future composition still looks right.

Foreground text on the same kind of row uses:

| Condition                 | Foreground         |
| :------------------------ | :----------------- |
| `isDisabled`              | `muted-foreground` |
| `isActive` or `isHovered` | `foreground`       |
| otherwise                 | `muted-foreground` |

### Where the convention applies

- `sidebar-menu-item`
- `select-item` (inside `select`)
- `accordion-item` header (treats "open" as the active state)
- `file-tree` row
- `command` palette row
- Any future list/menu component

### Buttons and toggles

- `button` cycles `primary → primary-hover → primary-active` for the default variant; the surface variants follow the secondary ramp; `outline` is transparent fill with `border`; `ghost` has no border.
- `toggle-group-item` selects to `primary` (white surface, `primary-foreground` text). Inactive items use `popover` so they read against a `card` parent.

### Inputs

- `input` default uses `muted` rest, `secondary-hover` on hover/focused, `secondary-active` pressed. Focused state additionally renders a `▁` underline in `primary` along the bottom row.
- `input-otp` uses bordered cells; the focused cell switches to `ring`.
- Outside-click blur is provided by `HasciiInputFocusProvider` (see `lib/hascii/input-focus-context`).

### Trees

Two components, deliberate split:

|               | `tree`                                          | `file-tree`                      |
| :------------ | :---------------------------------------------- | :------------------------------- |
| Purpose       | Static documentation tree (e.g. project layout) | IDE file explorer                |
| Lines         | `├ └ │` box-drawing                             | None — depth-based indentation   |
| Folder marker | None                                            | `▾` open / `▸` collapsed         |
| Interaction   | Hover only (read-only)                          | Hover + click to select / toggle |
| `indent` prop | Cell width per level (default 2)                | Same (default 2)                 |

### Slider

Custom composition: a static `─` track behind a native `<slider>` (from `@opentui/core`'s `SliderRenderable`, registered via `extend()`) on top with a transparent background. The `viewPortSize` is computed from `thumbSize` (default 3 cells) and `range` so the thumb renders the requested width regardless of the slider's overall width. Native click + drag handles the interaction.

## Do's and Don'ts

### Do

- Reuse the five-rung interactive-state palette for every selectable row. Copy `pickRowBg` from a sibling component as a starting point.
- Pull colors from `useHasciiTheme()`. Every interactive ladder step has a theme token now, including `hoverActive`. Tokens are the only color surface — don't import any raw palette helpers.
- Pad between two sibling `<text>` elements with `<box paddingLeft={1|2}>` when one of them contains a wide glyph.
- Render active/open rules with absolutely-positioned `▏` columns at `left={0}`.

### Don't

- Don't write a 3-rung interactive ladder (rest / hover / active). It will look broken when the row is both selected and hovered.
- Don't introduce a new theme token for a one-off shade — promote it to a token only when at least two components need it.
- Don't rely on `gap` between two `<text>` nodes when wide glyphs (`☐`, `☑`, `✓`, `●`) are involved; prefer explicit `paddingLeft`.
- Don't use background fill to indicate "selected" without also adding the `▏` left rule for list items — the rule is what makes the selection legible at a glance.
- Don't add `borderStyle="rounded"` expecting actual rounded corners. It does not exist in TUI.
