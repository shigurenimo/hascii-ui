/** @jsxImportSource @opentui/react */
import { useKeyboard, useRenderer } from "@opentui/react"
import type { ReactNode } from "react"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  children: ReactNode
}

/** Centers its child in the terminal and exits cleanly on q, Esc, or Ctrl+C. */
export function Center(props: Props) {
  const renderer = useRenderer()
  const theme = useHasciiTheme()

  useKeyboard((key) => {
    const isQuit = key.name === "q" || key.name === "escape" || (key.ctrl && key.name === "c")

    if (!isQuit) return

    renderer.destroy()
    process.exit(0)
  })

  return (
    <box
      flexGrow={1}
      backgroundColor={theme.color.background}
      alignItems="center"
      justifyContent="center"
    >
      {props.children}
    </box>
  )
}
