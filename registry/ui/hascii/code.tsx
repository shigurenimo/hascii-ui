import { getHasciiSyntaxStyle } from "@/registry/lib/hascii/syntax-style"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  content: string
  filetype?: string
  width?: number
  height?: number
}

/** Code block with tree-sitter syntax highlighting (when a TreeSitterClient is registered upstream). Falls back to plain monochrome otherwise. */
export function HasciiCode(props: Props) {
  const theme = useHasciiTheme()
  const filetype = props.filetype ?? "txt"

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
      <code content={props.content} filetype={filetype} syntaxStyle={getHasciiSyntaxStyle()} />
    </box>
  )
}
