import { getHasciiSyntaxStyle } from "@/registry/lib/hascii/syntax-style"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"

export type Props = {
  content: string
  width?: number
  height?: number
}

/** Markdown renderer backed by @opentui/core's MarkdownRenderable. Headings, lists, code fences, tables. */
export function HasciiMarkdown(props: Props) {
  const theme = useHasciiTheme()

  return (
    <box
      width={props.width}
      height={props.height}
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      paddingRight={2}
      backgroundColor={theme.color.card}
    >
      <markdown content={props.content} syntaxStyle={getHasciiSyntaxStyle()} />
    </box>
  )
}
