import { createCopyButton } from "@/web/src/create-copy-button"

const HOST = "https://ui.hascii.sh"

/** Row that shows the shadcn add command for a component with a copy button. */
export function renderInstallRow(name: string): HTMLDivElement {
  const command = `npx shadcn@latest add ${HOST}/r/${name}.json`

  const row = document.createElement("div")
  row.className = "flex items-stretch gap-2"

  const code = document.createElement("code")
  code.className =
    "min-w-0 flex-1 overflow-x-auto border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-300"
  code.textContent = command

  row.appendChild(code)
  row.appendChild(createCopyButton(() => command))

  return row
}
