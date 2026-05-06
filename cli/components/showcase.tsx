import { useState } from "react"
import { HasciiBadge } from "@/registry/ui/hascii/badge"
import { HasciiButton } from "@/registry/ui/hascii/button"
import { HasciiCard } from "@/registry/ui/hascii/card"
import { HasciiCardContent } from "@/registry/ui/hascii/card-content"
import { HasciiCardDescription } from "@/registry/ui/hascii/card-description"
import { HasciiCardFooter } from "@/registry/ui/hascii/card-footer"
import { HasciiCardHeader } from "@/registry/ui/hascii/card-header"
import { HasciiCardTitle } from "@/registry/ui/hascii/card-title"
import { HasciiFooter } from "@/registry/ui/hascii/footer"
import { HasciiHeader } from "@/registry/ui/hascii/header"
import { HasciiInput } from "@/registry/ui/hascii/input"
import { HasciiInputOtp } from "@/registry/ui/hascii/input-otp"
import { HasciiMainView } from "@/registry/ui/hascii/main-view"
import { HasciiPagination } from "@/registry/ui/hascii/pagination"
import { HasciiProgress } from "@/registry/ui/hascii/progress"
import { HasciiSelect } from "@/registry/ui/hascii/select"
import { HasciiSeparator } from "@/registry/ui/hascii/separator"
import { HasciiSidebar } from "@/registry/ui/hascii/sidebar"
import { HasciiSidebarContent } from "@/registry/ui/hascii/sidebar-content"
import { HasciiSidebarMenuItem } from "@/registry/ui/hascii/sidebar-menu-item"
import { HasciiSkeleton } from "@/registry/ui/hascii/skeleton"
import { HasciiSpinner, SPINNER_KINDS } from "@/registry/ui/hascii/spinner"
import type { SpinnerKind } from "@/registry/ui/hascii/spinner"
import { HasciiTabs } from "@/registry/ui/hascii/tabs"
import { HasciiToggleGroup } from "@/registry/ui/hascii/toggle-group"
import { HasciiToggleGroupItem } from "@/registry/ui/hascii/toggle-group-item"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

const COMPONENTS = [
  "badge",
  "button",
  "card",
  "input",
  "input-otp",
  "pagination",
  "progress",
  "select",
  "separator",
  "skeleton",
  "spinner",
  "tabs",
  "toggle-group",
] as const

type ComponentName = (typeof COMPONENTS)[number]

type ButtonControls = {
  variant: "default" | "secondary" | "outline" | "ghost" | "destructive"
  size: "sm" | "default" | "lg"
}

type BadgeControls = {
  variant: "default" | "secondary" | "outline" | "destructive"
}

type InputControls = {
  variant: "default" | "outline"
}

const SAMPLE_OPTIONS = [
  { name: "Default", description: "primary fill", value: "default" },
  { name: "Secondary", description: "muted slate", value: "secondary" },
  { name: "Outline", description: "transparent fill", value: "outline" },
  { name: "Ghost", description: "no border", value: "ghost" },
]

const TAB_ITEMS = [
  { value: "overview", label: "Overview" },
  { value: "settings", label: "Settings" },
  { value: "logs", label: "Logs" },
]

/** Interactive showcase. Sidebar lists components; the main view renders the selected component with a footer for variant controls. */
export function Showcase() {
  const theme = useHasciiTheme()

  const componentState = useState<ComponentName>("button")
  const component = componentState[0]
  const setComponent = componentState[1]

  const buttonState = useState<ButtonControls>({
    variant: "default",
    size: "default",
  })
  const buttonControls = buttonState[0]
  const setButtonControls = buttonState[1]

  const badgeState = useState<BadgeControls>({ variant: "default" })
  const badgeControls = badgeState[0]
  const setBadgeControls = badgeState[1]

  const inputState = useState<InputControls>({ variant: "default" })
  const inputControls = inputState[0]
  const setInputControls = inputState[1]

  const spinnerState = useState<SpinnerKind>("braille")
  const spinnerVariant = spinnerState[0]
  const setSpinnerVariant = spinnerState[1]

  return (
    <box flexGrow={1} flexDirection="column">
      <HasciiHeader>
        <text fg={theme.color.cardForeground}>@hascii/ui · {component}</text>
      </HasciiHeader>

      <box flexGrow={1} flexDirection="row">
        <HasciiSidebar width={22}>
          <HasciiSidebarContent>
            {COMPONENTS.map((name) => (
              <HasciiSidebarMenuItem
                key={name}
                isActive={component === name}
                onPress={() => setComponent(name)}
              >
                {name}
              </HasciiSidebarMenuItem>
            ))}
          </HasciiSidebarContent>
        </HasciiSidebar>

        <HasciiMainView>
          <box flexGrow={1} alignItems="center" justifyContent="center">
            {component === "badge" ? (
              <HasciiBadge variant={badgeControls.variant}>badge</HasciiBadge>
            ) : null}
            {component === "button" ? (
              <HasciiButton variant={buttonControls.variant} size={buttonControls.size}>
                Button
              </HasciiButton>
            ) : null}
            {component === "card" ? (
              <HasciiCard width={48}>
                <HasciiCardHeader>
                  <HasciiCardTitle>hascii</HasciiCardTitle>
                  <HasciiCardDescription>hello@hascii.sh</HasciiCardDescription>
                </HasciiCardHeader>
                <HasciiCardContent>
                  <text>Profile details and account preferences live here.</text>
                </HasciiCardContent>
                <HasciiCardFooter>
                  <HasciiButton variant="secondary" size="sm">
                    Cancel
                  </HasciiButton>
                  <HasciiButton variant="default" size="sm">
                    Save
                  </HasciiButton>
                </HasciiCardFooter>
              </HasciiCard>
            ) : null}
            {component === "input" ? (
              <HasciiInput
                variant={inputControls.variant}
                placeholder="you@example.com"
                isFocused
              />
            ) : null}
            {component === "input-otp" ? <HasciiInputOtp length={6} /> : null}
            {component === "pagination" ? <HasciiPagination page={1} pageCount={10} /> : null}
            {component === "progress" ? <HasciiProgress value={0.4} /> : null}
            {component === "select" ? (
              <HasciiSelect options={SAMPLE_OPTIONS} width={36} height={14} />
            ) : null}
            {component === "separator" ? <HasciiSeparator length={32} /> : null}
            {component === "skeleton" ? <HasciiSkeleton width={32} height={1} /> : null}
            {component === "spinner" ? <HasciiSpinner variant={spinnerVariant} /> : null}
            {component === "tabs" ? <HasciiTabs items={TAB_ITEMS} defaultValue="overview" /> : null}
            {component === "toggle-group" ? (
              <HasciiToggleGroup type="single" defaultValue="left">
                <HasciiToggleGroupItem value="left">Left</HasciiToggleGroupItem>
                <HasciiToggleGroupItem value="center">Center</HasciiToggleGroupItem>
                <HasciiToggleGroupItem value="right">Right</HasciiToggleGroupItem>
              </HasciiToggleGroup>
            ) : null}
          </box>

          <box
            flexDirection="column"
            paddingTop={1}
            paddingBottom={1}
            paddingLeft={2}
            paddingRight={2}
            backgroundColor={theme.color.muted}
            gap={1}
          >
            {component === "button" ? (
              <>
                <HasciiToggleGroup
                  type="single"
                  value={buttonControls.variant}
                  onChange={(value) =>
                    setButtonControls({
                      ...buttonControls,
                      variant: value as ButtonControls["variant"],
                    })
                  }
                >
                  <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="secondary">secondary</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="outline">outline</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="ghost">ghost</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="destructive">destructive</HasciiToggleGroupItem>
                </HasciiToggleGroup>
                <HasciiToggleGroup
                  type="single"
                  value={buttonControls.size}
                  onChange={(value) =>
                    setButtonControls({
                      ...buttonControls,
                      size: value as ButtonControls["size"],
                    })
                  }
                >
                  <HasciiToggleGroupItem value="sm">sm</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="lg">lg</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              </>
            ) : null}

            {component === "badge" ? (
              <HasciiToggleGroup
                type="single"
                value={badgeControls.variant}
                onChange={(value) =>
                  setBadgeControls({
                    variant: value as BadgeControls["variant"],
                  })
                }
              >
                <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                <HasciiToggleGroupItem value="secondary">secondary</HasciiToggleGroupItem>
                <HasciiToggleGroupItem value="outline">outline</HasciiToggleGroupItem>
                <HasciiToggleGroupItem value="destructive">destructive</HasciiToggleGroupItem>
              </HasciiToggleGroup>
            ) : null}

            {component === "input" ? (
              <HasciiToggleGroup
                type="single"
                value={inputControls.variant}
                onChange={(value) =>
                  setInputControls({
                    variant: value as InputControls["variant"],
                  })
                }
              >
                <HasciiToggleGroupItem value="default">default</HasciiToggleGroupItem>
                <HasciiToggleGroupItem value="outline">outline</HasciiToggleGroupItem>
              </HasciiToggleGroup>
            ) : null}

            {component === "spinner" ? (
              <HasciiToggleGroup
                type="single"
                value={spinnerVariant}
                onChange={(value) => setSpinnerVariant(value as SpinnerKind)}
              >
                {Object.keys(SPINNER_KINDS).map((kind) => (
                  <HasciiToggleGroupItem key={kind} value={kind}>
                    {kind}
                  </HasciiToggleGroupItem>
                ))}
              </HasciiToggleGroup>
            ) : null}
          </box>
        </HasciiMainView>
      </box>

      <HasciiFooter>
        <text fg={theme.color.cardForeground}>esc to quit</text>
      </HasciiFooter>
    </box>
  )
}
