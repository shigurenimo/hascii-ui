import { HasciiCard } from "@/registry/ui/hascii/card"
import { HasciiMainView } from "@/registry/ui/hascii/main-view"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  title: string
  body: string
  status: string
}

/** Card / MainView / Card stack preview. */
export function LayoutPreview(props: Props) {
  const theme = useHasciiTheme()

  return (
    <box flexGrow={1} flexDirection="column">
      <HasciiCard>
        <text fg={theme.color.cardForeground}>{props.title}</text>
      </HasciiCard>
      <HasciiMainView>
        <text fg={theme.color.foreground}>{props.body}</text>
      </HasciiMainView>
      <HasciiCard>
        <text fg={theme.color.cardForeground}>{props.status}</text>
      </HasciiCard>
    </box>
  )
}
