import { findParentComponent } from "@/web/src/find-parent-component"

type Item = {
  name: string
  title: string | undefined
}

type Grouped = {
  topLevel: Item[]
  childrenByParent: Map<string, Item[]>
}

/** Groups items so name-prefixed entries (e.g. card-header) nest under their parent. */
export function groupComponentItems(items: ReadonlyArray<Item>): Grouped {
  const names = new Set<string>()
  for (const item of items) names.add(item.name)

  const childrenByParent = new Map<string, Item[]>()
  const topLevel: Item[] = []

  for (const item of items) {
    const parentName = findParentComponent(item.name, names)

    if (parentName === null) {
      topLevel.push(item)
      continue
    }

    const existing = childrenByParent.get(parentName) ?? []
    existing.push(item)
    childrenByParent.set(parentName, existing)
  }

  return { topLevel, childrenByParent }
}
