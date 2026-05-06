import registry from "@/registry.json"
import { renderComponentItem } from "@/web/src/render-component-item"

/** Populates the Components list with one entry per registry:ui item. */
export function renderComponentList(): void {
  const list = document.querySelector<HTMLUListElement>("#component-list")

  if (list === null) return

  for (const item of registry.items) {
    if (item.type !== "registry:ui") continue
    list.appendChild(renderComponentItem({ name: item.name, title: item.title }))
  }
}
