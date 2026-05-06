type Props = {
  flag: string
  values: readonly string[]
  defaultValue: string
  onChange: (value: string) => void
}

/** Labelled dropdown for one CLI option. The flag name labels the select. */
export function createOptionSelect(props: Props): HTMLLabelElement {
  const label = document.createElement("label")
  label.className = "flex items-center gap-1 text-xs text-zinc-400"

  const text = document.createTextNode(`${props.flag}`)
  label.appendChild(text)

  const select = document.createElement("select")
  select.className =
    "border border-zinc-700 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 hover:border-zinc-500 hover:text-zinc-50"
  select.value = props.defaultValue

  for (const value of props.values) {
    const option = document.createElement("option")
    option.value = value
    option.textContent = value
    if (value === props.defaultValue) option.selected = true
    select.appendChild(option)
  }

  select.addEventListener("change", () => props.onChange(select.value))

  label.appendChild(select)
  return label
}
