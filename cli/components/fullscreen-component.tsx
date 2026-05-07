import { useKeyboard, useRenderer } from "@opentui/react"
import type { ReactNode } from "react"
import {
  HasciiInputFocusProvider,
  useHasciiInputFocus,
} from "@/registry/lib/hascii/input-focus-context"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  children: ReactNode
}

function Inner(props: Props) {
  const renderer = useRenderer()
  const theme = useHasciiTheme()
  const focusCtx = useHasciiInputFocus()

  useKeyboard((key) => {
    const isHardQuit = key.name === "q" || (key.ctrl && key.name === "c")
    const isEscapeQuit = key.name === "escape" && !focusCtx?.focusedId

    if (!isHardQuit && !isEscapeQuit) return

    renderer.destroy()
    process.exit(0)
  })

  return (
    <box
      flexGrow={1}
      flexDirection="column"
      backgroundColor={theme.color.background}
      onMouseDown={() => focusCtx?.setFocusedId(null)}
    >
      {props.children}
    </box>
  )
}

/** Fills the terminal with its child and exits cleanly on q, Esc, or Ctrl+C. */
export function FullScreen(props: Props) {
  return (
    <HasciiInputFocusProvider>
      <Inner>{props.children}</Inner>
    </HasciiInputFocusProvider>
  )
}
