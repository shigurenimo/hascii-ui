import { existsSync, writeFileSync } from "node:fs"
import { resolve } from "node:path"

const COMPONENTS_JSON = {
  $schema: "https://ui.shadcn.com/schema.json",
  style: "default",
  rsc: false,
  tsx: true,
  tailwind: {
    config: "",
    css: "",
    baseColor: "neutral",
    cssVariables: false,
    prefix: "",
  },
  aliases: {
    components: "@/components",
    utils: "@/lib/utils",
    lib: "@/lib",
    hooks: "@/hooks",
    ui: "@/components/ui",
  },
}

type Props = {
  cwd: string
  force: boolean
}

/** Write a hascii-ui flavored components.json so shadcn add can run without `shadcn init` (which requires TailwindCSS). */
export function init(props: Props): Error | null {
  const target = resolve(props.cwd, "components.json")

  if (existsSync(target) && props.force === false) {
    return new Error(`components.json already exists at ${target}. pass --force to overwrite.`)
  }

  writeFileSync(target, `${JSON.stringify(COMPONENTS_JSON, null, 2)}\n`)

  return null
}
