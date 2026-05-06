/** @jsxImportSource @opentui/react */
import { useKeyboard, useRenderer } from "@opentui/react"
import type { ReactNode } from "react"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  children: ReactNode
}

/** Fills the terminal with its child and exits cleanly on q, Esc, or Ctrl+C. */
export function FullScreen(props: Props) {
  const renderer = useRenderer()
  const theme = useHasciiTheme()

  useKeyboard((key) => {
    const isQuit = key.name === "q" || key.name === "escape" || (key.ctrl && key.name === "c")

    if (!isQuit) return

    renderer.destroy()
    process.exit(0)
  })

  return (
    <box flexGrow={1} flexDirection="column" backgroundColor={theme.color.background}>
      {props.children}
    </box>
  )
}
