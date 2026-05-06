import { factory } from "@/cli/factory"
import { Showcase } from "@/cli/components/showcase"
import { renderFullscreen } from "@/cli/render-fullscreen"

export const uiHandler = factory.createHandlers(async (c) => {
  await renderFullscreen(<Showcase />)
  return c.text("")
})
