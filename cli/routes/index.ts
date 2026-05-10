import { HTTPException } from "hono/http-exception"
import { factory } from "@/cli/factory"
import { accordionHandler } from "@/cli/routes/components/accordion"
import { alertDialogHandler } from "@/cli/routes/components/alert-dialog"
import { badgeHandler } from "@/cli/routes/components/badge"
import { bannerHandler } from "@/cli/routes/components/banner"
import { barChartHandler } from "@/cli/routes/components/bar-chart"
import { breadcrumbHandler } from "@/cli/routes/components/breadcrumb"
import { buttonHandler } from "@/cli/routes/components/button"
import { calendarHandler } from "@/cli/routes/components/calendar"
import { canvasHandler } from "@/cli/routes/components/canvas"
import { canvasCellHandler } from "@/cli/routes/components/canvas-cell"
import { canvasPixelHandler } from "@/cli/routes/components/canvas-pixel"
import { canvasPixelCellHandler } from "@/cli/routes/components/canvas-pixel-cell"
import { cardHandler } from "@/cli/routes/components/card"
import { checkboxHandler } from "@/cli/routes/components/checkbox"
import { codeHandler } from "@/cli/routes/components/code"
import { commandHandler } from "@/cli/routes/components/command"
import { dialogHandler } from "@/cli/routes/components/dialog"
import { diffHandler } from "@/cli/routes/components/diff"
import { fileTreeHandler } from "@/cli/routes/components/file-tree"
import { formItemHandler } from "@/cli/routes/components/form-item"
import { gaugeHandler } from "@/cli/routes/components/gauge"
import { inputHandler } from "@/cli/routes/components/input"
import { inputOtpHandler } from "@/cli/routes/components/input-otp"
import { markdownHandler } from "@/cli/routes/components/markdown"
import { paginationHandler } from "@/cli/routes/components/pagination"
import { paletteHandler } from "@/cli/routes/components/palette"
import { paletteItemHandler } from "@/cli/routes/components/palette-item"
import { progressHandler } from "@/cli/routes/components/progress"
import { selectHandler } from "@/cli/routes/components/select"
import { separatorHandler } from "@/cli/routes/components/separator"
import { sidebarHandler } from "@/cli/routes/components/sidebar"
import { skeletonHandler } from "@/cli/routes/components/skeleton"
import { sliderHandler } from "@/cli/routes/components/slider"
import { snackbarHandler } from "@/cli/routes/components/snackbar"
import { sparklineHandler } from "@/cli/routes/components/sparkline"
import { spinnerHandler } from "@/cli/routes/components/spinner"
import { stepperHandler } from "@/cli/routes/components/stepper"
import { switchHandler } from "@/cli/routes/components/switch"
import { tableHandler } from "@/cli/routes/components/table"
import { tabsHandler } from "@/cli/routes/components/tabs"
import { textareaHandler } from "@/cli/routes/components/textarea"
import { treeHandler } from "@/cli/routes/components/tree"
import { uiHandler } from "@/cli/routes/ui"

export const COMPONENT_NAMES = [
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
  "palette-item",
  "progress",
  "select",
  "separator",
  "sidebar",
  "skeleton",
  "slider",
  "snackbar",
  "sparkline",
  "spinner",
  "stepper",
  "switch",
  "table",
  "tabs",
  "textarea",
  "tree",
] as const

export type ComponentName = (typeof COMPONENT_NAMES)[number]

const groupHelp = `usage: hascii-ui components <name> [options]

components:
${COMPONENT_NAMES.map((name) => `  ${name}`).join("\n")}

run hascii-ui components <name> --help for component-specific options.`

const components = factory
  .createApp()
  .get("/", (c) => c.text(groupHelp))
  .get("/accordion", ...accordionHandler)
  .get("/alert-dialog", ...alertDialogHandler)
  .get("/badge", ...badgeHandler)
  .get("/banner", ...bannerHandler)
  .get("/bar-chart", ...barChartHandler)
  .get("/breadcrumb", ...breadcrumbHandler)
  .get("/button", ...buttonHandler)
  .get("/calendar", ...calendarHandler)
  .get("/canvas", ...canvasHandler)
  .get("/canvas-cell", ...canvasCellHandler)
  .get("/canvas-pixel", ...canvasPixelHandler)
  .get("/canvas-pixel-cell", ...canvasPixelCellHandler)
  .get("/card", ...cardHandler)
  .get("/checkbox", ...checkboxHandler)
  .get("/code", ...codeHandler)
  .get("/command", ...commandHandler)
  .get("/dialog", ...dialogHandler)
  .get("/diff", ...diffHandler)
  .get("/file-tree", ...fileTreeHandler)
  .get("/form-item", ...formItemHandler)
  .get("/gauge", ...gaugeHandler)
  .get("/input", ...inputHandler)
  .get("/input-otp", ...inputOtpHandler)
  .get("/markdown", ...markdownHandler)
  .get("/pagination", ...paginationHandler)
  .get("/palette", ...paletteHandler)
  .get("/palette-item", ...paletteItemHandler)
  .get("/progress", ...progressHandler)
  .get("/select", ...selectHandler)
  .get("/separator", ...separatorHandler)
  .get("/sidebar", ...sidebarHandler)
  .get("/skeleton", ...skeletonHandler)
  .get("/slider", ...sliderHandler)
  .get("/snackbar", ...snackbarHandler)
  .get("/sparkline", ...sparklineHandler)
  .get("/spinner", ...spinnerHandler)
  .get("/stepper", ...stepperHandler)
  .get("/switch", ...switchHandler)
  .get("/table", ...tableHandler)
  .get("/tabs", ...tabsHandler)
  .get("/textarea", ...textareaHandler)
  .get("/tree", ...treeHandler)

const base = factory.createApp()

base.onError((error, c) => {
  if (error instanceof HTTPException) {
    return c.text(`error: ${error.message}`, error.status)
  }

  const message = error instanceof Error ? error.message : String(error)
  return c.text(`error: ${message}`, 400)
})

export const app = base.route("/components", components).get("/ui", ...uiHandler)

export type AppType = typeof app
