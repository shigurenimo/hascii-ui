/** Button that writes `getText()` to the clipboard and flashes a confirmation label. */
export function createCopyButton(getText: () => string): HTMLButtonElement {
  const button = document.createElement("button")
  button.type = "button"
  button.className =
    "shrink-0 border border-zinc-700 bg-zinc-900 px-3 text-xs text-zinc-300 hover:border-zinc-500 hover:text-zinc-50"
  button.textContent = "copy"

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(getText())
      button.textContent = "copied"
    } catch {
      button.textContent = "failed"
    }

    setTimeout(() => {
      button.textContent = "copy"
    }, 1500)
  })

  return button
}
