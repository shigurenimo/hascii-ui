import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { createElement } from "react"
import type { ReactNode } from "react"
import { Center } from "@/cli/components/center-component"
import { HasciiThemeProvider } from "@/registry/lib/hascii/theme-context"

/** Boots an OpenTUI renderer, wraps the node in HasciiThemeProvider + Center, and parks until exit. */
export const renderComponent = async (node: ReactNode): Promise<never> => {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    useMouse: true,
    enableMouseMovement: true,
    clearOnShutdown: true,
  })

  const root = createRoot(renderer)

  root.render(createElement(HasciiThemeProvider, null, createElement(Center, null, node)))

  return new Promise<never>(() => {})
}
