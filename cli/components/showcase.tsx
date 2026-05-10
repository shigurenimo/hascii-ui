import { useEffect, useState } from "react"
import { HasciiAccordion } from "@/registry/ui/hascii/accordion"
import { HasciiAccordionItem } from "@/registry/ui/hascii/accordion-item"
import { HasciiAlertDialog } from "@/registry/ui/hascii/alert-dialog"
import { HasciiBadge } from "@/registry/ui/hascii/badge"
import { HasciiBanner } from "@/registry/ui/hascii/banner"
import type { BannerFont } from "@/registry/ui/hascii/banner"
import { HasciiBarChart } from "@/registry/ui/hascii/bar-chart"
import { HasciiCalendar } from "@/registry/ui/hascii/calendar"
import { HasciiCode } from "@/registry/ui/hascii/code"
import { HasciiDiff } from "@/registry/ui/hascii/diff"
import { HasciiCanvas } from "@/registry/ui/hascii/canvas"
import { HasciiCanvasCell } from "@/registry/ui/hascii/canvas-cell"
import { HasciiCanvasPixel } from "@/registry/ui/hascii/canvas-pixel"
import { HasciiCanvasPixelCell } from "@/registry/ui/hascii/canvas-pixel-cell"
import { useHasciiCanvas } from "@/registry/hooks/hascii/use-hascii-canvas"
import { useHasciiCanvasPixel } from "@/registry/hooks/hascii/use-hascii-canvas-pixel"
import { HasciiGauge } from "@/registry/ui/hascii/gauge"
import { HasciiMarkdown } from "@/registry/ui/hascii/markdown"
import { HasciiPalette } from "@/registry/ui/hascii/palette"
import { HasciiPaletteItem } from "@/registry/ui/hascii/palette-item"
import { HasciiBreadcrumb } from "@/registry/ui/hascii/breadcrumb"
import { HasciiButton } from "@/registry/ui/hascii/button"
import { HasciiCard } from "@/registry/ui/hascii/card"
import { HasciiCardContent } from "@/registry/ui/hascii/card-content"
import { HasciiCardDescription } from "@/registry/ui/hascii/card-description"
import { HasciiCardFooter } from "@/registry/ui/hascii/card-footer"
import { HasciiCardHeader } from "@/registry/ui/hascii/card-header"
import { HasciiCardTitle } from "@/registry/ui/hascii/card-title"
import { HasciiCheckbox } from "@/registry/ui/hascii/checkbox"
import { HasciiCommand } from "@/registry/ui/hascii/command"
import { HasciiDialog } from "@/registry/ui/hascii/dialog"
import { HasciiDialogContent } from "@/registry/ui/hascii/dialog-content"
import { HasciiDialogDescription } from "@/registry/ui/hascii/dialog-description"
import { HasciiDialogFooter } from "@/registry/ui/hascii/dialog-footer"
import { HasciiDialogHeader } from "@/registry/ui/hascii/dialog-header"
import { HasciiDialogTitle } from "@/registry/ui/hascii/dialog-title"
import { HasciiFileTree } from "@/registry/ui/hascii/file-tree"
import { HasciiFormItem } from "@/registry/ui/hascii/form-item"
import { HasciiInput } from "@/registry/ui/hascii/input"
import { HasciiInputOtp } from "@/registry/ui/hascii/input-otp"
import { HasciiPagination } from "@/registry/ui/hascii/pagination"
import { HasciiProgress } from "@/registry/ui/hascii/progress"
import { HasciiSelect } from "@/registry/ui/hascii/select"
import { HasciiSeparator } from "@/registry/ui/hascii/separator"
import { HasciiSidebar } from "@/registry/ui/hascii/sidebar"
import { HasciiSidebarContent } from "@/registry/ui/hascii/sidebar-content"
import { HasciiSidebarMenuItem } from "@/registry/ui/hascii/sidebar-menu-item"
import { HasciiSkeleton } from "@/registry/ui/hascii/skeleton"
import { HasciiSlider } from "@/registry/ui/hascii/slider"
import { HasciiSparkline } from "@/registry/ui/hascii/sparkline"
import { HasciiSpinner, SPINNER_KINDS } from "@/registry/ui/hascii/spinner"
import type { SpinnerKind } from "@/registry/ui/hascii/spinner"
import { HasciiStepper } from "@/registry/ui/hascii/stepper"
import { HasciiSwitch } from "@/registry/ui/hascii/switch"
import { HasciiTable } from "@/registry/ui/hascii/table"
import { HasciiTabs } from "@/registry/ui/hascii/tabs"
import { HasciiTextarea } from "@/registry/ui/hascii/textarea"
import { HasciiToggleGrid } from "@/registry/ui/hascii/toggle-grid"
import { HasciiToggleGridItem } from "@/registry/ui/hascii/toggle-grid-item"
import { HasciiToggleGroup } from "@/registry/ui/hascii/toggle-group"
import { HasciiToggleGroupItem } from "@/registry/ui/hascii/toggle-group-item"
import { HasciiTree } from "@/registry/ui/hascii/tree"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

const COMPONENTS = [
  "accordion",
  "alert-dialog",
  "badge",
  "banner",
  "bar-chart",
  "breadcrumb",
  "button",
  "calendar",
  "canvas",
  "canvas-cell",
  "canvas-pixel",
  "canvas-pixel-cell",
  "card",
  "checkbox",
  "code",
  "command",
  "dialog",
  "diff",
  "file-tree",
  "form-item",
  "gauge",
  "input",
  "input-otp",
  "markdown",
  "pagination",
  "palette",
  "progress",
  "select",
  "separator",
  "skeleton",
  "slider",
  "sparkline",
  "spinner",
  "stepper",
  "switch",
  "table",
  "tabs",
  "textarea",
  "toggle-group",
  "tree",
] as const

type ComponentName = (typeof COMPONENTS)[number]

type PreviewLayout = "center" | "stretch"

/** Per-component preview layout. Defaults to "center" — components that need full canvas room override to "stretch". */
const PREVIEW_LAYOUTS: Partial<Record<ComponentName, PreviewLayout>> = {
  canvas: "stretch",
  "canvas-pixel": "stretch",
}

const previewLayoutFor = (name: ComponentName): PreviewLayout => PREVIEW_LAYOUTS[name] ?? "center"

const COMPONENTS_WITH_CONTROLS = new Set<ComponentName>([
  "accordion",
  "badge",
  "banner",
  "button",
  "canvas-pixel",
  "checkbox",
  "file-tree",
  "input",
  "input-otp",
  "progress",
  "spinner",
  "stepper",
  "tree",
])

type ButtonControls = {
  variant: "default" | "secondary" | "outline" | "ghost" | "destructive"
  size: "sm" | "default" | "lg"
}

type BadgeControls = {
  variant: "default" | "secondary" | "outline" | "destructive"
}

type InputControls = {
  variant: "default" | "outline"
}

type InputOtpControls = {
  length: 4 | 6 | 8
}

type ProgressMode = "0" | "25" | "50" | "75" | "100" | "loop"

type ProgressControls = {
  mode: ProgressMode
}

type StepperControls = {
  current: 0 | 1 | 2
}

type AccordionMode = "single" | "multiple"

type CheckboxType = "ballot" | "square"

type CheckboxControls = {
  type: CheckboxType
}

type BannerControls = {
  font: BannerFont
}

type CanvasPixelSize = "8x8" | "16x16" | "32x32"

type CanvasSize = "8x16" | "12x24" | "16x32"

type StampCategory = "basic" | "blocks" | "arrows" | "alpha" | "digit"

const STAMP_CHARS: Record<StampCategory, string[]> = {
  basic: ["@", "#", "*", "+", ".", "·", "~", "-", "_"],
  blocks: ["▀", "▄", "▌", "▐", "▘", "▝", "▖", "▗"],
  arrows: ["←", "→", "↑", "↓", "↖", "↗", "↘", "↙"],
  alpha: "abcdefghijklmnopqrstuvwxyz".split(""),
  digit: "0123456789".split(""),
}

// Braille bit positions per the Unicode standard:
//   1 4
//   2 5
//   3 6
//   7 8
const BRAILLE_LEFT_BITS = [0, 1, 2, 6] as const
const BRAILLE_RIGHT_BITS = [3, 4, 5, 7] as const
const BRAILLE_LABELS: Record<number, string> = {
  0: "1",
  1: "2",
  2: "3",
  6: "7",
  3: "4",
  4: "5",
  5: "6",
  7: "8",
}

const BANNER_FONTS: BannerFont[] = ["tiny", "block", "shade", "slick", "huge", "grid", "pallet"]

type TreeIndent = 2 | 4

type TreeControls = {
  indent: TreeIndent
}

const SAMPLE_OPTIONS = [
  { name: "Default", description: "primary fill", value: "default" },
  { name: "Secondary", description: "muted slate", value: "secondary" },
  { name: "Outline", description: "transparent fill", value: "outline" },
  { name: "Ghost", description: "no border", value: "ghost" },
]

const TAB_ITEMS = [
  { value: "overview", label: "Overview" },
  { value: "settings", label: "Settings" },
  { value: "logs", label: "Logs" },
]

const BREADCRUMB_ITEMS = [
  { label: "home" },
  { label: "docs" },
  { label: "components" },
  { label: "breadcrumb" },
]

const STEPPER_ITEMS = [{ label: "account" }, { label: "profile" }, { label: "confirm" }]

const SPARKLINE_VALUES = [3, 5, 4, 7, 8, 6, 9, 7, 10, 8, 6, 9, 11, 10, 12, 9, 7, 8, 10, 11]

const BAR_CHART_ITEMS = [
  { label: "swift", value: 142 },
  { label: "rust", value: 98 },
  { label: "go", value: 76 },
  { label: "typescript", value: 64 },
  { label: "python", value: 51 },
  { label: "elixir", value: 22 },
]

const TODAY_DATE = new Date()
const CALENDAR_TODAY = {
  year: TODAY_DATE.getFullYear(),
  month: TODAY_DATE.getMonth() + 1,
  day: TODAY_DATE.getDate(),
}

const CODE_SAMPLE = `import { HasciiButton } from "@/components/ui/hascii/button"

export function App() {
  return <HasciiButton>Hello</HasciiButton>
}`

const MARKDOWN_SAMPLE = `# hascii-ui

Terminal UI components for **OpenTUI**.

- shadcn registry compatible
- DESIGN.md driven theme

\`\`\`ts
import { HasciiButton } from "@/components/ui/hascii/button"
\`\`\``

const DIFF_SAMPLE = `--- a/button.tsx
+++ b/button.tsx
@@ -1,5 +1,6 @@
 import { useKeyboard } from "@opentui/react"
-import { useState } from "react"
+import { useId, useState } from "react"
 import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"
+import { useHasciiFormItem } from "@/registry/lib/hascii/form-item-context"
 import { usePressable } from "@/registry/hooks/hascii/use-pressable"`

const TABLE_COLUMNS = [
  { key: "name", label: "name" },
  { key: "role", label: "role" },
  { key: "status", label: "status" },
  { key: "joined", label: "joined", align: "right" as const },
]

const TABLE_ROWS = [
  { name: "ada", role: "engineer", status: "active", joined: "2024-01-12" },
  { name: "linus", role: "ops", status: "active", joined: "2024-04-30" },
  { name: "grace", role: "design", status: "away", joined: "2024-09-04" },
  { name: "alan", role: "research", status: "active", joined: "2025-02-18" },
]

const TREE_NODES = [
  {
    id: "Main",
    label: "Main",
    children: [
      { id: "Main/hello.py", label: "hello.py" },
      { id: "Main/test.py", label: "test.py" },
    ],
  },
  {
    id: "Text",
    label: "Text",
    children: [{ id: "Text/world.txt", label: "world.txt" }],
  },
]

const COMMAND_ITEMS = [
  { id: "open-file", label: "Open File", hint: "Cmd O" },
  { id: "open-folder", label: "Open Folder", hint: "Cmd Shift O" },
  { id: "open-recent", label: "Open Recent" },
  { id: "new-file", label: "New File", hint: "Cmd N" },
  { id: "new-window", label: "New Window", hint: "Cmd Shift N" },
  { id: "save", label: "Save", hint: "Cmd S" },
  { id: "save-all", label: "Save All", hint: "Cmd Alt S" },
  { id: "close-window", label: "Close Window", hint: "Cmd W" },
  { id: "go-to-line", label: "Go to Line", hint: "Cmd G" },
  { id: "go-to-symbol", label: "Go to Symbol", hint: "Cmd Shift O" },
  { id: "find", label: "Find in File", hint: "Cmd F" },
  { id: "find-in-files", label: "Find in Files", hint: "Cmd Shift F" },
  { id: "replace", label: "Replace", hint: "Cmd Alt F" },
  { id: "format-document", label: "Format Document", hint: "Alt Shift F" },
  { id: "toggle-sidebar", label: "Toggle Sidebar", hint: "Cmd B" },
  { id: "toggle-terminal", label: "Toggle Terminal", hint: "Ctrl `" },
  { id: "toggle-theme", label: "Toggle Theme" },
  { id: "settings", label: "Open Settings", hint: "Cmd ," },
  { id: "keybindings", label: "Open Keybindings" },
  { id: "reload-window", label: "Reload Window", hint: "Cmd R" },
  { id: "quit", label: "Quit", hint: "Cmd Q" },
]

const PALETTE_COLORS = [
  { color: "#000000", label: "01" },
  { color: "#cc0000", label: "02" },
  { color: "#00cc00", label: "03" },
  { color: "#cccc00", label: "04" },
  { color: "#0000cc", label: "05" },
  { color: "#cc00cc", label: "06" },
  { color: "#00cccc", label: "07" },
  { color: "#cccccc", label: "08" },
]

type PixelSizePreset = { rows: number; cols: number; pixelWidth: number; pixelHeight: number }

const PIXEL_SIZE_PRESETS: Record<CanvasPixelSize, PixelSizePreset> = {
  "8x8": { rows: 8, cols: 8, pixelWidth: 4, pixelHeight: 2 },
  "16x16": { rows: 16, cols: 16, pixelWidth: 2, pixelHeight: 1 },
  "32x32": { rows: 32, cols: 32, pixelWidth: 1, pixelHeight: 1 },
}

/** Palette-driven pixel canvas with selectable grid size. */
function CanvasPixelPreviewBlock(props: { size: CanvasPixelSize }) {
  const activeState = useState(1)
  const active = activeState[0]
  const setActive = activeState[1]

  const preset = PIXEL_SIZE_PRESETS[props.size]
  const canvas = useHasciiCanvasPixel({
    rows: preset.rows,
    cols: preset.cols,
    brush: PALETTE_COLORS[active]?.color,
  })

  return (
    <box flexDirection="column" gap={1} alignItems="center">
      <HasciiPalette>
        {PALETTE_COLORS.map((entry, index) => (
          <HasciiPaletteItem
            key={entry.label}
            color={entry.color}
            label={entry.label}
            isActive={index === active}
            onPress={() => {
              setActive(index)
              canvas.setBrush(entry.color)
            }}
          />
        ))}
      </HasciiPalette>
      <HasciiCanvasPixel
        state={canvas}
        pixelWidth={preset.pixelWidth}
        pixelHeight={preset.pixelHeight}
      />
    </box>
  )
}

type CanvasSizePreset = { rows: number; cols: number }

const CANVAS_SIZE_PRESETS: Record<CanvasSize, CanvasSizePreset> = {
  "8x16": { rows: 8, cols: 16 },
  "12x24": { rows: 12, cols: 24 },
  "16x32": { rows: 16, cols: 32 },
}

type BrushType = "pen" | "bucket" | "line" | "eraser" | "eyedrop"
type CharKind = StampCategory | "shade" | "braille"
type LineStyleChoice = "single" | "double" | "heavy" | "rounded"
type ShadeLevelChoice = 1 | 2 | 3 | 4

const SHADE_CHARS: Record<ShadeLevelChoice, string> = {
  1: "░",
  2: "▒",
  3: "▓",
  4: "█",
}

type CharPickerProps = { chars: string[]; value: string; onChange: (char: string) => void }

/** Char grid built on HasciiToggleGrid. Each cell is a 3x1 filled rectangle. */
function CharPicker(props: CharPickerProps) {
  return (
    <HasciiToggleGrid type="single" value={props.value} onChange={props.onChange}>
      {props.chars.map((char) => (
        <HasciiToggleGridItem key={char} value={char}>
          {char}
        </HasciiToggleGridItem>
      ))}
    </HasciiToggleGrid>
  )
}

type DotPickerProps = { bits: number; onChange: (bits: number) => void }

function BrailleDotPicker(props: DotPickerProps) {
  const selectedBits: string[] = []
  for (let bit = 0; bit < 8; bit += 1) {
    if ((props.bits & (1 << bit)) !== 0) selectedBits.push(String(bit))
  }

  const handleChange = (next: string[]) => {
    let nextBits = 0
    for (const entry of next) {
      const bit = Number(entry)
      nextBits |= 1 << bit
    }
    props.onChange(nextBits)
  }

  return (
    <box flexDirection="row" gap={1}>
      <HasciiToggleGrid
        type="multiple"
        value={selectedBits}
        onChange={handleChange}
        direction="column"
      >
        {BRAILLE_LEFT_BITS.map((bit) => (
          <HasciiToggleGridItem key={`L${bit}`} value={String(bit)}>
            {BRAILLE_LABELS[bit] ?? "?"}
          </HasciiToggleGridItem>
        ))}
      </HasciiToggleGrid>
      <HasciiToggleGrid
        type="multiple"
        value={selectedBits}
        onChange={handleChange}
        direction="column"
      >
        {BRAILLE_RIGHT_BITS.map((bit) => (
          <HasciiToggleGridItem key={`R${bit}`} value={String(bit)}>
            {BRAILLE_LABELS[bit] ?? "?"}
          </HasciiToggleGridItem>
        ))}
      </HasciiToggleGrid>
    </box>
  )
}

/** Full ASCII canvas: brush row on top, value row, centered canvas, palette below. */
function CanvasPreviewBlock() {
  const theme = useHasciiTheme()

  const charState = useState("@")
  const char = charState[0]
  const setChar = charState[1]

  const charKindState = useState<CharKind>("basic")
  const charKind = charKindState[0]
  const setCharKind = charKindState[1]

  const fgIndexState = useState(0)
  const fgIndex = fgIndexState[0]
  const setFgIndex = fgIndexState[1]

  const bgIndexState = useState<number | null>(null)
  const bgIndex = bgIndexState[0]
  const setBgIndex = bgIndexState[1]

  const brushTypeState = useState<BrushType>("pen")
  const brushType = brushTypeState[0]
  const setBrushType = brushTypeState[1]

  const lineStyleState = useState<LineStyleChoice>("single")
  const lineStyle = lineStyleState[0]
  const setLineStyle = lineStyleState[1]

  const brailleBitsState = useState(0b00000111) // dots 1, 2, 3 by default
  const brailleBits = brailleBitsState[0]
  const setBrailleBits = brailleBitsState[1]

  const shadeLevelState = useState<ShadeLevelChoice>(2)
  const shadeLevel = shadeLevelState[0]
  const setShadeLevel = shadeLevelState[1]

  const fg = PALETTE_COLORS[fgIndex]?.color ?? "#fafafa"
  const bg = bgIndex === null ? null : (PALETTE_COLORS[bgIndex]?.color ?? null)

  const handleEyedrop = (cell: { char: string; fg: string; bg?: string | null } | null) => {
    if (!cell) return
    setChar(cell.char)
    const matchedFg = PALETTE_COLORS.findIndex((entry) => entry.color === cell.fg)
    if (matchedFg >= 0) setFgIndex(matchedFg)
    if (cell.bg) {
      const matchedBg = PALETTE_COLORS.findIndex((entry) => entry.color === cell.bg)
      setBgIndex(matchedBg >= 0 ? matchedBg : null)
    } else {
      setBgIndex(null)
    }
  }

  const stampCategory: StampCategory | null =
    charKind === "shade" || charKind === "braille" ? null : charKind

  const paintChar =
    charKind === "shade"
      ? SHADE_CHARS[shadeLevel]
      : charKind === "braille"
        ? String.fromCharCode(0x2800 + brailleBits)
        : char

  const brush =
    brushType === "pen"
      ? { type: "stamp" as const, char: paintChar, fg, bg }
      : brushType === "bucket"
        ? { type: "bucket" as const, char: paintChar, fg, bg }
        : brushType === "line"
          ? { type: "line" as const, style: lineStyle, fg, bg }
          : brushType === "eyedrop"
            ? { type: "eyedrop" as const, onPick: handleEyedrop }
            : { type: "erase" as const }

  const canvas = useHasciiCanvas({ rows: 16, cols: 32 })

  const showColors = brushType !== "eraser" && brushType !== "eyedrop"
  const showCharKind = brushType === "pen" || brushType === "bucket"
  const showCharPicker = showCharKind && charKind !== "shade" && charKind !== "braille"
  const showShade = showCharKind && charKind === "shade"
  const showBraille = showCharKind && charKind === "braille"
  const showLine = brushType === "line"
  const hasValueRow = showCharPicker || showShade || showBraille || showLine

  return (
    <box flexDirection="column" gap={1} flexGrow={1}>
      <HasciiCard>
        <box flexDirection="column" gap={1}>
          <HasciiToggleGroup
            type="single"
            value={brushType}
            onChange={(value) => setBrushType(value as BrushType)}
          >
            <HasciiToggleGroupItem value="pen">pen</HasciiToggleGroupItem>
            <HasciiToggleGroupItem value="bucket">bucket</HasciiToggleGroupItem>
            <HasciiToggleGroupItem value="line">line</HasciiToggleGroupItem>
            <HasciiToggleGroupItem value="eraser">eraser</HasciiToggleGroupItem>
            <HasciiToggleGroupItem value="eyedrop">eyedrop</HasciiToggleGroupItem>
          </HasciiToggleGroup>

          {showCharKind ? (
            <HasciiToggleGroup
              type="single"
              value={charKind}
              onChange={(value) => {
                const next = value as CharKind
                setCharKind(next)
                if (next !== "shade" && next !== "braille") {
                  const first = STAMP_CHARS[next][0]
                  if (first) setChar(first)
                }
              }}
            >
              <HasciiToggleGroupItem value="basic">basic</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="blocks">blocks</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="arrows">arrows</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="alpha">a-z</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="digit">0-9</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="shade">shade</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="braille">braille</HasciiToggleGroupItem>
            </HasciiToggleGroup>
          ) : null}

          {hasValueRow ? (
            <box flexDirection="row" gap={2} alignItems="flex-start">
              {showCharPicker && stampCategory ? (
                <CharPicker chars={STAMP_CHARS[stampCategory]} value={char} onChange={setChar} />
              ) : null}
              {showLine ? (
                <HasciiToggleGroup
                  type="single"
                  value={lineStyle}
                  onChange={(value) => setLineStyle(value as LineStyleChoice)}
                >
                  <HasciiToggleGroupItem value="single">─</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="rounded">╭</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="double">═</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="heavy">━</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}
              {showBraille ? (
                <BrailleDotPicker bits={brailleBits} onChange={setBrailleBits} />
              ) : null}
              {showShade ? (
                <HasciiToggleGroup
                  type="single"
                  value={String(shadeLevel)}
                  onChange={(value) => setShadeLevel(Number(value) as ShadeLevelChoice)}
                >
                  <HasciiToggleGroupItem value="1">1</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="2">2</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="3">3</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="4">4</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}
            </box>
          ) : null}

          {brushType === "eyedrop" ? (
            <text fg={theme.color.mutedForeground}>
              click a cell to copy its char and colors into the active brush
            </text>
          ) : null}

          {brushType === "eraser" ? (
            <text fg={theme.color.mutedForeground}>click or drag to clear cells</text>
          ) : null}
        </box>
      </HasciiCard>

      <box flexGrow={1} alignItems="center" justifyContent="center">
        <HasciiCanvas state={canvas} brush={brush} />
      </box>

      {showColors ? (
        <HasciiCard>
          <box flexDirection="column" gap={0}>
            <HasciiPalette>
              {PALETTE_COLORS.map((entry, index) => (
                <HasciiPaletteItem
                  key={`fg-${entry.label}`}
                  color={entry.color}
                  label={entry.label}
                  isActive={index === fgIndex}
                  onPress={() => setFgIndex(index)}
                />
              ))}
            </HasciiPalette>
            <HasciiPalette>
              <HasciiPaletteItem
                color="#0a0a0a"
                label="--"
                isActive={bgIndex === null}
                onPress={() => setBgIndex(null)}
              />
              {PALETTE_COLORS.map((entry, index) => (
                <HasciiPaletteItem
                  key={`bg-${entry.label}`}
                  color={entry.color}
                  label={entry.label}
                  isActive={index === bgIndex}
                  onPress={() => setBgIndex(index)}
                />
              ))}
            </HasciiPalette>
          </box>
        </HasciiCard>
      ) : null}
    </box>
  )
}

/** Wrapper around HasciiPalette that tracks the active swatch internally. */
function PalettePreviewBlock() {
  const activeState = useState(0)
  const active = activeState[0]
  const setActive = activeState[1]

  return (
    <HasciiPalette>
      {PALETTE_COLORS.map((entry, index) => (
        <HasciiPaletteItem
          key={entry.label}
          color={entry.color}
          label={entry.label}
          isActive={index === active}
          onPress={() => setActive(index)}
        />
      ))}
    </HasciiPalette>
  )
}

/** Interactive showcase. Sidebar lists components; the main view renders the selected component with a footer for variant controls. */
export function Showcase() {
  const theme = useHasciiTheme()

  const componentState = useState<ComponentName>("button")
  const component = componentState[0]
  const setComponent = componentState[1]

  const buttonState = useState<ButtonControls>({
    variant: "default",
    size: "default",
  })
  const buttonControls = buttonState[0]
  const setButtonControls = buttonState[1]

  const badgeState = useState<BadgeControls>({ variant: "default" })
  const badgeControls = badgeState[0]
  const setBadgeControls = badgeState[1]

  const inputState = useState<InputControls>({ variant: "default" })
  const inputControls = inputState[0]
  const setInputControls = inputState[1]

  const spinnerState = useState<SpinnerKind>("braille")
  const spinnerVariant = spinnerState[0]
  const setSpinnerVariant = spinnerState[1]

  const otpState = useState<InputOtpControls>({ length: 6 })
  const otpControls = otpState[0]
  const setOtpControls = otpState[1]

  const progressState = useState<ProgressControls>({ mode: "loop" })
  const progressControls = progressState[0]
  const setProgressControls = progressState[1]

  const animatedState = useState(0)
  const animatedProgress = animatedState[0]
  const setAnimatedProgress = animatedState[1]

  const stepperState = useState<StepperControls>({ current: 1 })
  const stepperControls = stepperState[0]
  const setStepperControls = stepperState[1]

  const accordionModeState = useState<AccordionMode>("single")
  const accordionMode = accordionModeState[0]
  const setAccordionMode = accordionModeState[1]

  const checkboxState = useState<CheckboxControls>({ type: "ballot" })
  const checkboxControls = checkboxState[0]
  const setCheckboxControls = checkboxState[1]

  const bannerState = useState<BannerControls>({ font: "tiny" })
  const bannerControls = bannerState[0]
  const setBannerControls = bannerState[1]

  const canvasPixelSizeState = useState<CanvasPixelSize>("8x8")
  const canvasPixelSize = canvasPixelSizeState[0]
  const setCanvasPixelSize = canvasPixelSizeState[1]

  const treeState = useState<TreeControls>({ indent: 2 })
  const treeControls = treeState[0]
  const setTreeControls = treeState[1]

  const fileTreeState = useState<TreeControls>({ indent: 2 })
  const fileTreeControls = fileTreeState[0]
  const setFileTreeControls = fileTreeState[1]

  // useEffect is necessary for time-based progress animation in a TUI loop.
  useEffect(() => {
    if (progressControls.mode !== "loop") return

    const id = setInterval(() => {
      setAnimatedProgress((current) => (current + 0.02) % 1.02)
    }, 80)

    return () => clearInterval(id)
  }, [progressControls.mode])

  const progressValue =
    progressControls.mode === "loop"
      ? Math.min(1, animatedProgress)
      : Number(progressControls.mode) / 100

  return (
    <box flexGrow={1} flexDirection="row">
      <HasciiSidebar width={22}>
        <HasciiSidebarContent>
          {COMPONENTS.map((name) => (
            <HasciiSidebarMenuItem
              key={name}
              isActive={component === name}
              onPress={() => setComponent(name)}
            >
              {name}
            </HasciiSidebarMenuItem>
          ))}
        </HasciiSidebarContent>
      </HasciiSidebar>

      <box flexGrow={1} flexDirection="column">
        <box
          backgroundColor={theme.color.accentHover}
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          <text fg={theme.color.foreground}>@hascii/ui · {component}</text>
        </box>

        <box
          flexGrow={1}
          flexShrink={1}
          alignItems={previewLayoutFor(component) === "stretch" ? "stretch" : "center"}
          justifyContent={previewLayoutFor(component) === "stretch" ? "flex-start" : "center"}
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          {component === "accordion" ? (
            <box width={48}>
              {accordionMode === "multiple" ? (
                <HasciiAccordion type="multiple" defaultValue={["first"]}>
                  <HasciiAccordionItem value="first" title="What is hascii-ui?">
                    A shadcn-registry-compatible set of OpenTUI terminal components.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="second" title="How do I install it?">
                    Run bunx shadcn add against the published registry URL.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="third" title="Can I theme it?">
                    Yes — wrap the tree in HasciiThemeProvider with your tokens.
                  </HasciiAccordionItem>
                </HasciiAccordion>
              ) : (
                <HasciiAccordion type="single" defaultValue="first">
                  <HasciiAccordionItem value="first" title="What is hascii-ui?">
                    A shadcn-registry-compatible set of OpenTUI terminal components.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="second" title="How do I install it?">
                    Run bunx shadcn add against the published registry URL.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="third" title="Can I theme it?">
                    Yes — wrap the tree in HasciiThemeProvider with your tokens.
                  </HasciiAccordionItem>
                </HasciiAccordion>
              )}
            </box>
          ) : null}
          {component === "alert-dialog" ? (
            <HasciiAlertDialog
              width={48}
              title="Are you sure?"
              description="This action cannot be undone. Please confirm to proceed."
              okText="Confirm"
              cancelText="Cancel"
              onOk={() => undefined}
              onCancel={() => undefined}
              onClose={() => undefined}
            />
          ) : null}
          {component === "badge" ? (
            <HasciiBadge variant={badgeControls.variant}>badge</HasciiBadge>
          ) : null}
          {component === "banner" ? (
            <HasciiBanner text="HASCII" font={bannerControls.font} />
          ) : null}
          {component === "bar-chart" ? <HasciiBarChart items={BAR_CHART_ITEMS} width={48} /> : null}
          {component === "breadcrumb" ? <HasciiBreadcrumb items={BREADCRUMB_ITEMS} /> : null}
          {component === "button" ? (
            <HasciiButton variant={buttonControls.variant} size={buttonControls.size}>
              Button
            </HasciiButton>
          ) : null}
          {component === "calendar" ? (
            <HasciiCalendar
              year={CALENDAR_TODAY.year}
              month={CALENDAR_TODAY.month}
              today={CALENDAR_TODAY}
            />
          ) : null}
          {component === "canvas" ? <CanvasPreviewBlock /> : null}
          {component === "canvas-cell" ? (
            <box flexDirection="row" gap={1}>
              <HasciiCanvasCell char="█" fg="#ef4444" />
              <HasciiCanvasCell char="▓" fg="#f97316" />
              <HasciiCanvasCell char="@" fg="#22c55e" bg="#0a0a0a" />
              <HasciiCanvasCell char="#" fg="#0ea5e9" />
              <HasciiCanvasCell char="*" fg="#a855f7" />
            </box>
          ) : null}
          {component === "canvas-pixel" ? <CanvasPixelPreviewBlock size={canvasPixelSize} /> : null}
          {component === "canvas-pixel-cell" ? (
            <box flexDirection="row" gap={1}>
              <HasciiCanvasPixelCell color="#ef4444" width={6} height={3} />
              <HasciiCanvasPixelCell color="#f97316" width={6} height={3} showCursor />
              <HasciiCanvasPixelCell color="#22c55e" width={6} height={3} />
              <HasciiCanvasPixelCell color="#0ea5e9" width={6} height={3} />
              <HasciiCanvasPixelCell color="#a855f7" width={6} height={3} />
            </box>
          ) : null}
          {component === "card" ? (
            <HasciiCard width={48}>
              <HasciiCardHeader>
                <HasciiCardTitle>hascii</HasciiCardTitle>
                <HasciiCardDescription>hello@hascii.sh</HasciiCardDescription>
              </HasciiCardHeader>
              <HasciiCardContent>
                <text>Profile details and account preferences live here.</text>
              </HasciiCardContent>
              <HasciiCardFooter>
                <HasciiButton variant="secondary" size="sm">
                  Cancel
                </HasciiButton>
                <HasciiButton variant="default" size="sm">
                  Save
                </HasciiButton>
              </HasciiCardFooter>
            </HasciiCard>
          ) : null}
          {component === "checkbox" ? (
            <box flexDirection="column" gap={1} alignItems="flex-start">
              <HasciiCheckbox type={checkboxControls.type} defaultChecked={true}>
                accept terms
              </HasciiCheckbox>
              <HasciiCheckbox type={checkboxControls.type}>send weekly digest</HasciiCheckbox>
              <HasciiCheckbox type={checkboxControls.type} isDisabled>
                disabled
              </HasciiCheckbox>
            </box>
          ) : null}
          {component === "code" ? (
            <HasciiCode content={CODE_SAMPLE} filetype="typescript" width={56} height={9} />
          ) : null}
          {component === "command" ? <HasciiCommand items={COMMAND_ITEMS} /> : null}
          {component === "dialog" ? (
            <HasciiDialog width={48} onClose={() => undefined}>
              <HasciiDialogHeader>
                <HasciiDialogTitle>Are you sure?</HasciiDialogTitle>
                <HasciiDialogDescription>
                  This action cannot be undone. Please confirm to proceed.
                </HasciiDialogDescription>
              </HasciiDialogHeader>
              <HasciiDialogContent>
                <text>Removing this entry will free up its slot immediately.</text>
              </HasciiDialogContent>
              <HasciiDialogFooter>
                <HasciiButton variant="secondary" size="default">
                  Cancel
                </HasciiButton>
                <HasciiButton variant="default" size="default">
                  Confirm
                </HasciiButton>
              </HasciiDialogFooter>
            </HasciiDialog>
          ) : null}
          {component === "form-item" ? (
            <box flexDirection="column" gap={1}>
              <HasciiFormItem label="Email">
                <HasciiInput placeholder="you@example.com" />
              </HasciiFormItem>
              <HasciiFormItem label="Password">
                <HasciiInput placeholder="••••••••" />
              </HasciiFormItem>
            </box>
          ) : null}
          {component === "input" ? (
            <HasciiInput variant={inputControls.variant} placeholder="you@example.com" />
          ) : null}
          {component === "input-otp" ? <HasciiInputOtp length={otpControls.length} /> : null}
          {component === "pagination" ? <HasciiPagination page={1} pageCount={10} /> : null}
          {component === "palette" ? <PalettePreviewBlock /> : null}
          {component === "progress" ? <HasciiProgress value={progressValue} /> : null}
          {component === "select" ? (
            <HasciiSelect options={SAMPLE_OPTIONS} width={36} height={14} />
          ) : null}
          {component === "separator" ? <HasciiSeparator length={32} /> : null}
          {component === "skeleton" ? (
            <box flexDirection="column" gap={1}>
              <HasciiSkeleton width={8} height={4} />
              <HasciiSkeleton width={32} height={1} />
              <HasciiSkeleton width={24} height={1} />
              <HasciiSkeleton width={28} height={1} />
            </box>
          ) : null}
          {component === "slider" ? <HasciiSlider defaultValue={50} width={32} /> : null}
          {component === "sparkline" ? (
            <box flexDirection="column" gap={1}>
              <HasciiSparkline values={SPARKLINE_VALUES} width={32} />
              <HasciiSparkline
                values={SPARKLINE_VALUES.slice().reverse()}
                width={32}
                color={theme.color.mutedForeground}
              />
            </box>
          ) : null}
          {component === "spinner" ? <HasciiSpinner variant={spinnerVariant} /> : null}
          {component === "stepper" ? (
            <HasciiStepper steps={STEPPER_ITEMS} current={stepperControls.current} />
          ) : null}
          {component === "switch" ? (
            <box flexDirection="column" gap={1} alignItems="flex-start">
              <HasciiSwitch defaultChecked={true} />
              <HasciiSwitch />
              <HasciiSwitch isDisabled />
            </box>
          ) : null}
          {component === "table" ? <HasciiTable columns={TABLE_COLUMNS} rows={TABLE_ROWS} /> : null}
          {component === "tabs" ? <HasciiTabs items={TAB_ITEMS} defaultValue="overview" /> : null}
          {component === "textarea" ? (
            <HasciiTextarea placeholder="write something…" width={48} height={8} />
          ) : null}
          {component === "toggle-group" ? (
            <HasciiToggleGroup type="single" defaultValue="left">
              <HasciiToggleGroupItem value="left">Left</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="center">Center</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="right">Right</HasciiToggleGroupItem>
            </HasciiToggleGroup>
          ) : null}
          {component === "tree" ? (
            <HasciiTree nodes={TREE_NODES} indent={treeControls.indent} />
          ) : null}
          {component === "diff" ? (
            <HasciiDiff
              diff={DIFF_SAMPLE}
              view="unified"
              filetype="typescript"
              width={64}
              height={10}
            />
          ) : null}
          {component === "file-tree" ? (
            <HasciiFileTree
              nodes={TREE_NODES}
              defaultExpanded={["Main", "Text"]}
              indent={fileTreeControls.indent}
            />
          ) : null}
          {component === "gauge" ? <HasciiGauge value={65} width={32} /> : null}
          {component === "markdown" ? (
            <HasciiMarkdown content={MARKDOWN_SAMPLE} width={56} height={14} />
          ) : null}
        </box>

        {COMPONENTS_WITH_CONTROLS.has(component) ? (
          <box marginLeft={2} marginRight={2} marginBottom={1}>
            <HasciiCard>
              <box flexDirection="column" gap={1} alignItems="flex-start">
                {component === "button" ? (
                  <>
                    <HasciiToggleGroup
                      type="single"
                      value={buttonControls.variant}
                      onChange={(value) =>
                        setButtonControls({
                          ...buttonControls,
                          variant: value as ButtonControls["variant"],
                        })
                      }
                    >
                      <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                      <HasciiToggleGroupItem value="secondary">secondary</HasciiToggleGroupItem>
                      <HasciiToggleGroupItem value="outline">outline</HasciiToggleGroupItem>
                      <HasciiToggleGroupItem value="ghost">ghost</HasciiToggleGroupItem>
                      <HasciiToggleGroupItem value="destructive">destructive</HasciiToggleGroupItem>
                    </HasciiToggleGroup>
                    <HasciiToggleGroup
                      type="single"
                      value={buttonControls.size}
                      onChange={(value) =>
                        setButtonControls({
                          ...buttonControls,
                          size: value as ButtonControls["size"],
                        })
                      }
                    >
                      <HasciiToggleGroupItem value="sm">sm</HasciiToggleGroupItem>
                      <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                      <HasciiToggleGroupItem value="lg">lg</HasciiToggleGroupItem>
                    </HasciiToggleGroup>
                  </>
                ) : null}

                {component === "canvas-pixel" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={canvasPixelSize}
                    onChange={(value) => setCanvasPixelSize(value as CanvasPixelSize)}
                  >
                    <HasciiToggleGroupItem value="8x8">8x8</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="16x16">16x16</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="32x32">32x32</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "banner" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={bannerControls.font}
                    onChange={(value) => setBannerControls({ font: value as BannerFont })}
                  >
                    {BANNER_FONTS.map((font) => (
                      <HasciiToggleGroupItem key={font} value={font}>
                        {font}
                      </HasciiToggleGroupItem>
                    ))}
                  </HasciiToggleGroup>
                ) : null}

                {component === "badge" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={badgeControls.variant}
                    onChange={(value) =>
                      setBadgeControls({
                        variant: value as BadgeControls["variant"],
                      })
                    }
                  >
                    <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="secondary">secondary</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="outline">outline</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="destructive">destructive</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "input" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={inputControls.variant}
                    onChange={(value) =>
                      setInputControls({
                        variant: value as InputControls["variant"],
                      })
                    }
                  >
                    <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="outline">outline</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "input-otp" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={String(otpControls.length)}
                    onChange={(value) =>
                      setOtpControls({ length: Number(value) as InputOtpControls["length"] })
                    }
                  >
                    <HasciiToggleGroupItem value="4">4</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="6">6</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="8">8</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "progress" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={progressControls.mode}
                    onChange={(value) => setProgressControls({ mode: value as ProgressMode })}
                  >
                    <HasciiToggleGroupItem value="0">0%</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="25">25%</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="50">50%</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="75">75%</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="100">100%</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="loop">loop</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "spinner" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={spinnerVariant}
                    onChange={(value) => setSpinnerVariant(value as SpinnerKind)}
                  >
                    {Object.keys(SPINNER_KINDS).map((kind) => (
                      <HasciiToggleGroupItem key={kind} value={kind}>
                        {kind}
                      </HasciiToggleGroupItem>
                    ))}
                  </HasciiToggleGroup>
                ) : null}

                {component === "stepper" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={String(stepperControls.current)}
                    onChange={(value) =>
                      setStepperControls({ current: Number(value) as StepperControls["current"] })
                    }
                  >
                    <HasciiToggleGroupItem value="0">step 1</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="1">step 2</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="2">step 3</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "accordion" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={accordionMode}
                    onChange={(value) => setAccordionMode(value as AccordionMode)}
                  >
                    <HasciiToggleGroupItem value="single">single</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="multiple">multiple</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "checkbox" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={checkboxControls.type}
                    onChange={(value) => setCheckboxControls({ type: value as CheckboxType })}
                  >
                    <HasciiToggleGroupItem value="ballot">ballot</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="square">square</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "tree" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={String(treeControls.indent)}
                    onChange={(value) => setTreeControls({ indent: Number(value) as TreeIndent })}
                  >
                    <HasciiToggleGroupItem value="2">indent 2</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="4">indent 4</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}

                {component === "file-tree" ? (
                  <HasciiToggleGroup
                    type="single"
                    value={String(fileTreeControls.indent)}
                    onChange={(value) =>
                      setFileTreeControls({ indent: Number(value) as TreeIndent })
                    }
                  >
                    <HasciiToggleGroupItem value="2">indent 2</HasciiToggleGroupItem>
                    <HasciiToggleGroupItem value="4">indent 4</HasciiToggleGroupItem>
                  </HasciiToggleGroup>
                ) : null}
              </box>
            </HasciiCard>
          </box>
        ) : null}

        <box
          backgroundColor={theme.color.accentHover}
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          <text fg={theme.color.foreground}>esc to quit</text>
        </box>
      </box>
    </box>
  )
}
