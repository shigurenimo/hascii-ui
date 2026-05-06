import { renderInstallRow } from "@/web/src/render-install-row"
import { renderPreviewRow } from "@/web/src/render-preview-row"

type Props = {
  name: string
  title: string | undefined
}

/** Component entry: heading plus copyable install and preview commands. */
export function renderComponentItem(props: Props): HTMLLIElement {
  const item = document.createElement("li")
  item.className = "flex flex-col gap-2"

  const title = document.createElement("h3")
  title.className = "text-sm text-zinc-50"
  title.textContent = props.title ?? props.name
  item.appendChild(title)

  item.appendChild(renderInstallRow(props.name))
  item.appendChild(renderPreviewRow(props.name))

  return item
}
