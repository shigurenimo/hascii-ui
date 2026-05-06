/** @jsxImportSource @opentui/react */
import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { createElement } from "react"
import type { ReactNode } from "react"
import { FullScreen } from "@/cli/components/fullscreen-component"
import { HasciiThemeProvider } from "@/registry/lib/hascii/theme-context"

/** Boots an OpenTUI renderer, wraps the node in HasciiThemeProvider + FullScreen, and parks until exit. */
export const renderFullscreen = async (node: ReactNode): Promise<never> => {
  const renderer = await createCliRenderer({
    exitOnCtrlC: true,
    useMouse: true,
    enableMouseMovement: true,
    clearOnShutdown: true,
  })

  const root = createRoot(renderer)

  root.render(createElement(HasciiThemeProvider, null, createElement(FullScreen, null, node)))

  return new Promise<never>(() => {})
}
