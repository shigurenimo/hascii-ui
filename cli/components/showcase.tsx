import { useEffect, useState } from "react"
import { HasciiAccordion } from "@/registry/ui/hascii/accordion"
import { HasciiAccordionItem } from "@/registry/ui/hascii/accordion-item"
import { HasciiAlertDialog } from "@/registry/ui/hascii/alert-dialog"
import { HasciiBadge } from "@/registry/ui/hascii/badge"
import { HasciiBreadcrumb } from "@/registry/ui/hascii/breadcrumb"
import { HasciiButton } from "@/registry/ui/hascii/button"
import { HasciiCard } from "@/registry/ui/hascii/card"
import { HasciiCardContent } from "@/registry/ui/hascii/card-content"
import { HasciiCardDescription } from "@/registry/ui/hascii/card-description"
import { HasciiCardFooter } from "@/registry/ui/hascii/card-footer"
import { HasciiCardHeader } from "@/registry/ui/hascii/card-header"
import { HasciiCardTitle } from "@/registry/ui/hascii/card-title"
import { HasciiCheckbox } from "@/registry/ui/hascii/checkbox"
import { HasciiCommand } from "@/registry/ui/hascii/command"
import { HasciiDialog } from "@/registry/ui/hascii/dialog"
import { HasciiDialogContent } from "@/registry/ui/hascii/dialog-content"
import { HasciiDialogDescription } from "@/registry/ui/hascii/dialog-description"
import { HasciiDialogFooter } from "@/registry/ui/hascii/dialog-footer"
import { HasciiDialogHeader } from "@/registry/ui/hascii/dialog-header"
import { HasciiDialogTitle } from "@/registry/ui/hascii/dialog-title"
import { HasciiFileTree } from "@/registry/ui/hascii/file-tree"
import { HasciiInput } from "@/registry/ui/hascii/input"
import { HasciiInputOtp } from "@/registry/ui/hascii/input-otp"
import { HasciiPagination } from "@/registry/ui/hascii/pagination"
import { HasciiProgress } from "@/registry/ui/hascii/progress"
import { HasciiSelect } from "@/registry/ui/hascii/select"
import { HasciiSeparator } from "@/registry/ui/hascii/separator"
import { HasciiSidebar } from "@/registry/ui/hascii/sidebar"
import { HasciiSidebarContent } from "@/registry/ui/hascii/sidebar-content"
import { HasciiSidebarMenuItem } from "@/registry/ui/hascii/sidebar-menu-item"
import { HasciiSkeleton } from "@/registry/ui/hascii/skeleton"
import { HasciiSlider } from "@/registry/ui/hascii/slider"
import { HasciiSparkline } from "@/registry/ui/hascii/sparkline"
import { HasciiSpinner, SPINNER_KINDS } from "@/registry/ui/hascii/spinner"
import type { SpinnerKind } from "@/registry/ui/hascii/spinner"
import { HasciiStepper } from "@/registry/ui/hascii/stepper"
import { HasciiSwitch } from "@/registry/ui/hascii/switch"
import { HasciiTable } from "@/registry/ui/hascii/table"
import { HasciiTabs } from "@/registry/ui/hascii/tabs"
import { HasciiToggleGroup } from "@/registry/ui/hascii/toggle-group"
import { HasciiToggleGroupItem } from "@/registry/ui/hascii/toggle-group-item"
import { HasciiTree } from "@/registry/ui/hascii/tree"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

const COMPONENTS = [
  "accordion",
  "alert-dialog",
  "badge",
  "breadcrumb",
  "button",
  "card",
  "checkbox",
  "command",
  "dialog",
  "file-tree",
  "input",
  "input-otp",
  "pagination",
  "progress",
  "select",
  "separator",
  "skeleton",
  "slider",
  "sparkline",
  "spinner",
  "stepper",
  "switch",
  "table",
  "tabs",
  "toggle-group",
  "tree",
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

type InputOtpControls = {
  length: 4 | 6 | 8
}

type ProgressMode = "0" | "25" | "50" | "75" | "100" | "loop"

type ProgressControls = {
  mode: ProgressMode
}

type StepperControls = {
  current: 0 | 1 | 2
}

type AccordionMode = "single" | "multiple"

type CheckboxType = "ballot" | "square"

type CheckboxControls = {
  type: CheckboxType
}

type TreeIndent = 2 | 4

type TreeControls = {
  indent: TreeIndent
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

const BREADCRUMB_ITEMS = [
  { label: "home" },
  { label: "docs" },
  { label: "components" },
  { label: "breadcrumb" },
]

const STEPPER_ITEMS = [{ label: "account" }, { label: "profile" }, { label: "confirm" }]

const SPARKLINE_VALUES = [3, 5, 4, 7, 8, 6, 9, 7, 10, 8, 6, 9, 11, 10, 12, 9, 7, 8, 10, 11]

const TABLE_COLUMNS = [
  { key: "name", label: "name" },
  { key: "role", label: "role" },
  { key: "status", label: "status" },
  { key: "joined", label: "joined", align: "right" as const },
]

const TABLE_ROWS = [
  { name: "ada", role: "engineer", status: "active", joined: "2024-01-12" },
  { name: "linus", role: "ops", status: "active", joined: "2024-04-30" },
  { name: "grace", role: "design", status: "away", joined: "2024-09-04" },
  { name: "alan", role: "research", status: "active", joined: "2025-02-18" },
]

const TREE_NODES = [
  {
    id: "Main",
    label: "Main",
    children: [
      { id: "Main/hello.py", label: "hello.py" },
      { id: "Main/test.py", label: "test.py" },
    ],
  },
  {
    id: "Text",
    label: "Text",
    children: [{ id: "Text/world.txt", label: "world.txt" }],
  },
]

const COMMAND_ITEMS = [
  { id: "open-file", label: "Open File", hint: "Cmd O" },
  { id: "open-folder", label: "Open Folder", hint: "Cmd Shift O" },
  { id: "open-recent", label: "Open Recent" },
  { id: "new-file", label: "New File", hint: "Cmd N" },
  { id: "new-window", label: "New Window", hint: "Cmd Shift N" },
  { id: "save", label: "Save", hint: "Cmd S" },
  { id: "save-all", label: "Save All", hint: "Cmd Alt S" },
  { id: "close-window", label: "Close Window", hint: "Cmd W" },
  { id: "go-to-line", label: "Go to Line", hint: "Cmd G" },
  { id: "go-to-symbol", label: "Go to Symbol", hint: "Cmd Shift O" },
  { id: "find", label: "Find in File", hint: "Cmd F" },
  { id: "find-in-files", label: "Find in Files", hint: "Cmd Shift F" },
  { id: "replace", label: "Replace", hint: "Cmd Alt F" },
  { id: "format-document", label: "Format Document", hint: "Alt Shift F" },
  { id: "toggle-sidebar", label: "Toggle Sidebar", hint: "Cmd B" },
  { id: "toggle-terminal", label: "Toggle Terminal", hint: "Ctrl `" },
  { id: "toggle-theme", label: "Toggle Theme" },
  { id: "settings", label: "Open Settings", hint: "Cmd ," },
  { id: "keybindings", label: "Open Keybindings" },
  { id: "reload-window", label: "Reload Window", hint: "Cmd R" },
  { id: "quit", label: "Quit", hint: "Cmd Q" },
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

  const otpState = useState<InputOtpControls>({ length: 6 })
  const otpControls = otpState[0]
  const setOtpControls = otpState[1]

  const progressState = useState<ProgressControls>({ mode: "loop" })
  const progressControls = progressState[0]
  const setProgressControls = progressState[1]

  const animatedState = useState(0)
  const animatedProgress = animatedState[0]
  const setAnimatedProgress = animatedState[1]

  const stepperState = useState<StepperControls>({ current: 1 })
  const stepperControls = stepperState[0]
  const setStepperControls = stepperState[1]

  const accordionModeState = useState<AccordionMode>("single")
  const accordionMode = accordionModeState[0]
  const setAccordionMode = accordionModeState[1]

  const checkboxState = useState<CheckboxControls>({ type: "ballot" })
  const checkboxControls = checkboxState[0]
  const setCheckboxControls = checkboxState[1]

  const treeState = useState<TreeControls>({ indent: 2 })
  const treeControls = treeState[0]
  const setTreeControls = treeState[1]

  const fileTreeState = useState<TreeControls>({ indent: 2 })
  const fileTreeControls = fileTreeState[0]
  const setFileTreeControls = fileTreeState[1]

  // useEffect is necessary for time-based progress animation in a TUI loop.
  useEffect(() => {
    if (progressControls.mode !== "loop") return

    const id = setInterval(() => {
      setAnimatedProgress((current) => (current + 0.02) % 1.02)
    }, 80)

    return () => clearInterval(id)
  }, [progressControls.mode])

  const progressValue =
    progressControls.mode === "loop"
      ? Math.min(1, animatedProgress)
      : Number(progressControls.mode) / 100

  return (
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

      <box flexGrow={1} flexDirection="column">
        <box
          backgroundColor={theme.color.accentHover}
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          <text fg={theme.color.foreground}>@hascii/ui · {component}</text>
        </box>

        <box
          flexGrow={1}
          flexShrink={1}
          alignItems="center"
          justifyContent="center"
          paddingLeft={2}
          paddingRight={2}
        >
          {component === "accordion" ? (
            <box width={48}>
              {accordionMode === "multiple" ? (
                <HasciiAccordion type="multiple" defaultValue={["first"]}>
                  <HasciiAccordionItem value="first" title="What is hascii-ui?">
                    A shadcn-registry-compatible set of OpenTUI terminal components.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="second" title="How do I install it?">
                    Run bunx shadcn add against the published registry URL.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="third" title="Can I theme it?">
                    Yes — wrap the tree in HasciiThemeProvider with your tokens.
                  </HasciiAccordionItem>
                </HasciiAccordion>
              ) : (
                <HasciiAccordion type="single" defaultValue="first">
                  <HasciiAccordionItem value="first" title="What is hascii-ui?">
                    A shadcn-registry-compatible set of OpenTUI terminal components.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="second" title="How do I install it?">
                    Run bunx shadcn add against the published registry URL.
                  </HasciiAccordionItem>
                  <HasciiAccordionItem value="third" title="Can I theme it?">
                    Yes — wrap the tree in HasciiThemeProvider with your tokens.
                  </HasciiAccordionItem>
                </HasciiAccordion>
              )}
            </box>
          ) : null}
          {component === "alert-dialog" ? (
            <HasciiAlertDialog
              width={48}
              title="Are you sure?"
              description="This action cannot be undone. Please confirm to proceed."
              okText="Confirm"
              cancelText="Cancel"
              onOk={() => undefined}
              onCancel={() => undefined}
              onClose={() => undefined}
            />
          ) : null}
          {component === "badge" ? (
            <HasciiBadge variant={badgeControls.variant}>badge</HasciiBadge>
          ) : null}
          {component === "breadcrumb" ? <HasciiBreadcrumb items={BREADCRUMB_ITEMS} /> : null}
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
          {component === "checkbox" ? (
            <box flexDirection="column" gap={1} alignItems="flex-start">
              <HasciiCheckbox type={checkboxControls.type} defaultChecked={true}>
                accept terms
              </HasciiCheckbox>
              <HasciiCheckbox type={checkboxControls.type}>send weekly digest</HasciiCheckbox>
              <HasciiCheckbox type={checkboxControls.type} isDisabled>
                disabled
              </HasciiCheckbox>
            </box>
          ) : null}
          {component === "command" ? <HasciiCommand items={COMMAND_ITEMS} /> : null}
          {component === "dialog" ? (
            <HasciiDialog width={48} onClose={() => undefined}>
              <HasciiDialogHeader>
                <HasciiDialogTitle>Are you sure?</HasciiDialogTitle>
                <HasciiDialogDescription>
                  This action cannot be undone. Please confirm to proceed.
                </HasciiDialogDescription>
              </HasciiDialogHeader>
              <HasciiDialogContent>
                <text>Removing this entry will free up its slot immediately.</text>
              </HasciiDialogContent>
              <HasciiDialogFooter>
                <HasciiButton variant="secondary" size="default">
                  Cancel
                </HasciiButton>
                <HasciiButton variant="default" size="default">
                  Confirm
                </HasciiButton>
              </HasciiDialogFooter>
            </HasciiDialog>
          ) : null}
          {component === "input" ? (
            <HasciiInput variant={inputControls.variant} placeholder="you@example.com" />
          ) : null}
          {component === "input-otp" ? <HasciiInputOtp length={otpControls.length} /> : null}
          {component === "pagination" ? <HasciiPagination page={1} pageCount={10} /> : null}
          {component === "progress" ? <HasciiProgress value={progressValue} /> : null}
          {component === "select" ? (
            <HasciiSelect options={SAMPLE_OPTIONS} width={36} height={14} />
          ) : null}
          {component === "separator" ? <HasciiSeparator length={32} /> : null}
          {component === "skeleton" ? (
            <box flexDirection="column" gap={1}>
              <HasciiSkeleton width={8} height={4} />
              <HasciiSkeleton width={32} height={1} />
              <HasciiSkeleton width={24} height={1} />
              <HasciiSkeleton width={28} height={1} />
            </box>
          ) : null}
          {component === "slider" ? <HasciiSlider defaultValue={50} width={32} /> : null}
          {component === "sparkline" ? (
            <box flexDirection="column" gap={1}>
              <HasciiSparkline values={SPARKLINE_VALUES} width={32} />
              <HasciiSparkline
                values={SPARKLINE_VALUES.slice().reverse()}
                width={32}
                color={theme.color.mutedForeground}
              />
            </box>
          ) : null}
          {component === "spinner" ? <HasciiSpinner variant={spinnerVariant} /> : null}
          {component === "stepper" ? (
            <HasciiStepper steps={STEPPER_ITEMS} current={stepperControls.current} />
          ) : null}
          {component === "switch" ? (
            <box flexDirection="column" gap={1} alignItems="flex-start">
              <HasciiSwitch defaultChecked={true} />
              <HasciiSwitch />
              <HasciiSwitch isDisabled />
            </box>
          ) : null}
          {component === "table" ? <HasciiTable columns={TABLE_COLUMNS} rows={TABLE_ROWS} /> : null}
          {component === "tabs" ? <HasciiTabs items={TAB_ITEMS} defaultValue="overview" /> : null}
          {component === "toggle-group" ? (
            <HasciiToggleGroup type="single" defaultValue="left">
              <HasciiToggleGroupItem value="left">Left</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="center">Center</HasciiToggleGroupItem>
              <HasciiToggleGroupItem value="right">Right</HasciiToggleGroupItem>
            </HasciiToggleGroup>
          ) : null}
          {component === "tree" ? (
            <HasciiTree nodes={TREE_NODES} indent={treeControls.indent} />
          ) : null}
          {component === "file-tree" ? (
            <HasciiFileTree
              nodes={TREE_NODES}
              defaultExpanded={["Main", "Text"]}
              indent={fileTreeControls.indent}
            />
          ) : null}
        </box>

        <box marginLeft={2} marginRight={2} marginBottom={1}>
          <HasciiCard>
            <box flexDirection="column" gap={1} alignItems="flex-start">
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

              {component === "input-otp" ? (
                <HasciiToggleGroup
                  type="single"
                  value={String(otpControls.length)}
                  onChange={(value) =>
                    setOtpControls({ length: Number(value) as InputOtpControls["length"] })
                  }
                >
                  <HasciiToggleGroupItem value="4">4</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="6">6</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="8">8</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}

              {component === "progress" ? (
                <HasciiToggleGroup
                  type="single"
                  value={progressControls.mode}
                  onChange={(value) => setProgressControls({ mode: value as ProgressMode })}
                >
                  <HasciiToggleGroupItem value="0">0%</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="25">25%</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="50">50%</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="75">75%</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="100">100%</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="loop">loop</HasciiToggleGroupItem>
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

              {component === "stepper" ? (
                <HasciiToggleGroup
                  type="single"
                  value={String(stepperControls.current)}
                  onChange={(value) =>
                    setStepperControls({ current: Number(value) as StepperControls["current"] })
                  }
                >
                  <HasciiToggleGroupItem value="0">step 1</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="1">step 2</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="2">step 3</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}

              {component === "accordion" ? (
                <HasciiToggleGroup
                  type="single"
                  value={accordionMode}
                  onChange={(value) => setAccordionMode(value as AccordionMode)}
                >
                  <HasciiToggleGroupItem value="single">single</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="multiple">multiple</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}

              {component === "checkbox" ? (
                <HasciiToggleGroup
                  type="single"
                  value={checkboxControls.type}
                  onChange={(value) => setCheckboxControls({ type: value as CheckboxType })}
                >
                  <HasciiToggleGroupItem value="ballot">ballot</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="square">square</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}

              {component === "tree" ? (
                <HasciiToggleGroup
                  type="single"
                  value={String(treeControls.indent)}
                  onChange={(value) => setTreeControls({ indent: Number(value) as TreeIndent })}
                >
                  <HasciiToggleGroupItem value="2">indent 2</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="4">indent 4</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}

              {component === "file-tree" ? (
                <HasciiToggleGroup
                  type="single"
                  value={String(fileTreeControls.indent)}
                  onChange={(value) => setFileTreeControls({ indent: Number(value) as TreeIndent })}
                >
                  <HasciiToggleGroupItem value="2">indent 2</HasciiToggleGroupItem>
                  <HasciiToggleGroupItem value="4">indent 4</HasciiToggleGroupItem>
                </HasciiToggleGroup>
              ) : null}
            </box>
          </HasciiCard>
        </box>

        <box
          backgroundColor={theme.color.accentHover}
          paddingTop={1}
          paddingBottom={1}
          paddingLeft={2}
          paddingRight={2}
        >
          <text fg={theme.color.foreground}>esc to quit</text>
        </box>
      </box>
    </box>
  )
}
