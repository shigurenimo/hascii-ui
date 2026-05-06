import { HTTPException } from "hono/http-exception"
import { factory } from "@/cli/factory"
import { badgeHandler } from "@/cli/routes/components/badge"
import { buttonHandler } from "@/cli/routes/components/button"
import { cardHandler } from "@/cli/routes/components/card"
import { dialogHandler } from "@/cli/routes/components/dialog"
import { formItemHandler } from "@/cli/routes/components/form-item"
import { inputHandler } from "@/cli/routes/components/input"
import { inputOtpHandler } from "@/cli/routes/components/input-otp"
import { mainViewHandler } from "@/cli/routes/components/main-view"
import { paginationHandler } from "@/cli/routes/components/pagination"
import { progressHandler } from "@/cli/routes/components/progress"
import { selectHandler } from "@/cli/routes/components/select"
import { separatorHandler } from "@/cli/routes/components/separator"
import { sidebarHandler } from "@/cli/routes/components/sidebar"
import { skeletonHandler } from "@/cli/routes/components/skeleton"
import { snackbarHandler } from "@/cli/routes/components/snackbar"
import { spinnerHandler } from "@/cli/routes/components/spinner"
import { tabsHandler } from "@/cli/routes/components/tabs"
import { uiHandler } from "@/cli/routes/ui"

export const COMPONENT_NAMES = [
  "badge",
  "button",
  "card",
  "dialog",
  "form-item",
  "input",
  "input-otp",
  "main-view",
  "pagination",
  "progress",
  "select",
  "separator",
  "sidebar",
  "skeleton",
  "snackbar",
  "spinner",
  "tabs",
] as const

export type ComponentName = (typeof COMPONENT_NAMES)[number]

const groupHelp = `usage: hascii-ui components <name> [options]

components:
${COMPONENT_NAMES.map((name) => `  ${name}`).join("\n")}

run hascii-ui components <name> --help for component-specific options.`

const components = factory
  .createApp()
  .get("/", (c) => c.text(groupHelp))
  .get("/badge", ...badgeHandler)
  .get("/button", ...buttonHandler)
  .get("/card", ...cardHandler)
  .get("/dialog", ...dialogHandler)
  .get("/form-item", ...formItemHandler)
  .get("/input", ...inputHandler)
  .get("/input-otp", ...inputOtpHandler)
  .get("/main-view", ...mainViewHandler)
  .get("/pagination", ...paginationHandler)
  .get("/progress", ...progressHandler)
  .get("/select", ...selectHandler)
  .get("/separator", ...separatorHandler)
  .get("/sidebar", ...sidebarHandler)
  .get("/skeleton", ...skeletonHandler)
  .get("/snackbar", ...snackbarHandler)
  .get("/spinner", ...spinnerHandler)
  .get("/tabs", ...tabsHandler)

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
