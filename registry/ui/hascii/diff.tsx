import { getHasciiSyntaxStyle } from "@/registry/lib/hascii/syntax-style"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  diff: string
  view?: "unified" | "split"
  filetype?: string
  width?: number
  height?: number
  showLineNumbers?: boolean
}

/** Diff viewer (unified or split) backed by @opentui/core's DiffRenderable. Added rows are tinted green-ish, removed rows red-ish via theme. */
export function HasciiDiff(props: Props) {
  const view = props.view ?? "unified"
  const theme = useHasciiTheme()

  return (
    <box
      width={props.width}
      height={props.height}
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      backgroundColor={theme.color.muted}
    >
      <diff
        diff={props.diff}
        view={view}
        filetype={props.filetype}
        syntaxStyle={getHasciiSyntaxStyle()}
        showLineNumbers={props.showLineNumbers ?? true}
        fg={theme.color.foreground}
        addedSignColor={theme.color.foreground}
        removedSignColor={theme.color.destructive}
      />
    </box>
  )
}
