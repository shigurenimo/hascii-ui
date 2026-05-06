/** Returns the longest registered name that prefixes `name` followed by a hyphen. */
export function findParentComponent(name: string, names: ReadonlySet<string>): string | null {
  let longest: string | null = null

  for (const candidate of names) {
    if (candidate === name) continue
    if (!name.startsWith(`${candidate}-`)) continue
    if (longest === null || candidate.length > longest.length) longest = candidate
  }

  return longest
}
