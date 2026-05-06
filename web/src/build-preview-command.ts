type FilledOption = {
  flag: string
  value: string
  defaultValue: string
}

type Props = {
  name: string
  options: readonly FilledOption[]
}

/** Builds `bunx @hascii/ui components <name>` and appends `--<flag> <value>` for any non-default option. */
export function buildPreviewCommand(props: Props): string {
  const parts = ["bunx @hascii/ui components", props.name]

  for (const option of props.options) {
    if (option.value !== option.defaultValue) {
      parts.push(`--${option.flag} ${option.value}`)
    }
  }

  return parts.join(" ")
}
