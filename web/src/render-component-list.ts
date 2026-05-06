import registry from "@/registry.json"
import { groupComponentItems } from "@/web/src/group-component-items"
import { renderComponentItem } from "@/web/src/render-component-item"

/** Populates the Components list with entries grouped by parent component. */
export function renderComponentList(): void {
  const list = document.querySelector<HTMLUListElement>("#component-list")

  if (list === null) return

  const uiItems = registry.items
    .filter((item) => item.type === "registry:ui")
    .map((item) => ({ name: item.name, title: item.title }))

  const grouped = groupComponentItems(uiItems)

  for (const item of grouped.topLevel) {
    const node = renderComponentItem({ name: item.name, title: item.title, isChild: false })
    const children = grouped.childrenByParent.get(item.name) ?? []

    if (children.length > 0) {
      const subList = document.createElement("ul")
      subList.className = "mt-4 space-y-4 border-l border-zinc-800 pl-4"

      for (const child of children) {
        subList.appendChild(
          renderComponentItem({ name: child.name, title: child.title, isChild: true }),
        )
      }

      node.appendChild(subList)
    }

    list.appendChild(node)
  }
}
