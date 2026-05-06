import { buildPreviewCommand } from "@/web/src/build-preview-command"
import { componentOptions } from "@/web/src/component-options"
import { createCopyButton } from "@/web/src/create-copy-button"
import { createOptionSelect } from "@/web/src/create-option-select"

/** Preview command row. Adds a labelled select for every option declared in component-options. */
export function renderPreviewRow(name: string): HTMLDivElement {
  const options = componentOptions[name] ?? []
  const state: Record<string, string> = {}
  for (const option of options) state[option.flag] = option.defaultValue

  const getCommand = (): string =>
    buildPreviewCommand({
      name,
      options: options.map((option) => ({
        flag: option.flag,
        value: state[option.flag] ?? option.defaultValue,
        defaultValue: option.defaultValue,
      })),
    })

  const container = document.createElement("div")
  container.className = "flex flex-col gap-2"

  const commandRow = document.createElement("div")
  commandRow.className = "flex items-stretch gap-2"

  const code = document.createElement("code")
  code.className =
    "min-w-0 flex-1 overflow-x-auto border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300"
  code.textContent = getCommand()
  commandRow.appendChild(code)
  commandRow.appendChild(createCopyButton(getCommand))
  container.appendChild(commandRow)

  if (options.length === 0) return container

  const optionRow = document.createElement("div")
  optionRow.className = "flex flex-wrap items-center gap-3"

  for (const option of options) {
    optionRow.appendChild(
      createOptionSelect({
        flag: option.flag,
        values: option.values,
        defaultValue: option.defaultValue,
        onChange: (value) => {
          state[option.flag] = value
          code.textContent = getCommand()
        },
      }),
    )
  }

  container.appendChild(optionRow)
  return container
}
