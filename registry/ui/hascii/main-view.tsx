import type { ReactNode } from "react"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  children?: ReactNode
}

/** Flex-grow content region. Sits between HasciiHeader and HasciiFooter. */
export function HasciiMainView(props: Props) {
  const theme = useHasciiTheme()

  return (
    <box
      width="100%"
      flexGrow={1}
      backgroundColor={theme.color.background}
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      flexDirection="column"
      gap={1}
    >
      {props.children}
    </box>
  )
}
