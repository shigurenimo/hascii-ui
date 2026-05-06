import { renderInstallRow } from "@/web/src/render-install-row"
import { renderPreviewRow } from "@/web/src/render-preview-row"

type Props = {
  name: string
  title: string | undefined
  isChild: boolean
}

/** Component entry: heading plus copyable install and preview commands. */
export function renderComponentItem(props: Props): HTMLLIElement {
  const item = document.createElement("li")
  item.className = "flex flex-col gap-2"

  const heading = document.createElement(props.isChild ? "h4" : "h3")
  heading.className = props.isChild ? "text-base text-zinc-300" : "text-xl font-bold text-zinc-50"
  heading.textContent = props.title ?? props.name
  item.appendChild(heading)

  item.appendChild(renderInstallRow(props.name))
  item.appendChild(renderPreviewRow(props.name))

  return item
}
