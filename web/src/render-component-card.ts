import { renderInstallRow } from "@/web/src/render-install-row"
import { renderPreviewRow } from "@/web/src/render-preview-row"

type Props = {
  name: string
  title: string | undefined
}

/** Card with the component title plus copyable install and preview commands. */
export function renderComponentCard(props: Props): HTMLLIElement {
  const card = document.createElement("li")
  card.className = "flex flex-col gap-2 border border-zinc-800 px-4 py-3"

  const title = document.createElement("div")
  title.className = "text-sm text-zinc-50"
  title.textContent = props.title ?? props.name
  card.appendChild(title)

  card.appendChild(renderInstallRow(props.name))
  card.appendChild(renderPreviewRow(props.name))

  return card
}
