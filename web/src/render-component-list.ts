import registry from "@/registry.json"
import { renderComponentCard } from "@/web/src/render-component-card"

/** Populates the Components grid with one card per registry:ui item. */
export function renderComponentList(): void {
  const list = document.querySelector<HTMLUListElement>("#component-list")

  if (list === null) return

  for (const item of registry.items) {
    if (item.type !== "registry:ui") continue
    list.appendChild(renderComponentCard({ name: item.name, title: item.title }))
  }
}
