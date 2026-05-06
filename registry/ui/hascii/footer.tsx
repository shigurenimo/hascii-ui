import type { ReactNode } from "react"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  height?: number
  children?: ReactNode
}

/** Full-width bottom bar. Sits below HasciiMainView. Uses theme.color.card to differ from sidebar. */
export function HasciiFooter(props: Props) {
  const theme = useHasciiTheme()

  return (
    <box
      width="100%"
      height={props.height ?? 3}
      backgroundColor={theme.color.card}
      paddingLeft={2}
      paddingRight={2}
      flexDirection="row"
      alignItems="center"
      gap={2}
    >
      {props.children}
    </box>
  )
}
