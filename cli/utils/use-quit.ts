import { useRenderer } from "@opentui/react"

/** Returns a callback that tears down the OpenTUI renderer and exits the process. */
export function useQuit(): () => void {
  const renderer = useRenderer()

  return () => {
    renderer.destroy()
    process.exit(0)
  }
}
