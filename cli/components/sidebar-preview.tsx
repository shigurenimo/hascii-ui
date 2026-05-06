/** @jsxImportSource @opentui/react */
import { useState } from "react"
import { HasciiSidebar } from "@/registry/ui/hascii/sidebar"
import { HasciiSidebarContent } from "@/registry/ui/hascii/sidebar-content"
import { HasciiSidebarHeader } from "@/registry/ui/hascii/sidebar-header"
import { HasciiSidebarMenuItem } from "@/registry/ui/hascii/sidebar-menu-item"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  title: string
  items: string[]
  initialActive: number
  width: number
}

/** Sidebar preview that tracks the active item with useState and reflects it in the main view. */
export function SidebarPreview(props: Props) {
  const theme = useHasciiTheme()

  const activeState = useState(props.initialActive)
  const active = activeState[0]
  const setActive = activeState[1]

  const activeLabel = props.items[active] ?? ""

  return (
    <box flexGrow={1} flexDirection="row">
      <HasciiSidebar width={props.width}>
        <HasciiSidebarHeader>
          <text>{props.title}</text>
        </HasciiSidebarHeader>
        <HasciiSidebarContent>
          {props.items.map((label, index) => (
            <HasciiSidebarMenuItem
              key={`${label}-${index}`}
              isActive={index === active}
              onPress={() => setActive(index)}
            >
              {label}
            </HasciiSidebarMenuItem>
          ))}
        </HasciiSidebarContent>
      </HasciiSidebar>
      <box
        flexGrow={1}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        backgroundColor={theme.color.background}
      >
        <text fg={theme.color.foreground}>{activeLabel}</text>
      </box>
    </box>
  )
}
