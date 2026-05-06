import { existsSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { Hono } from "hono"

const ROOT = resolve(import.meta.dir, "..")
const REGISTRY_DIR = join(ROOT, "web", "public", "r")

type RegistryItem = {
  registryDependencies?: string[]
} & Record<string, unknown>

const rewriteDeps = (json: RegistryItem, origin: string): RegistryItem => {
  if (!Array.isArray(json.registryDependencies)) return json

  const rewritten = json.registryDependencies.map((dep) => {
    if (dep.startsWith("http://") || dep.startsWith("https://")) return dep
    return `${origin}/${dep}.json`
  })

  return { ...json, registryDependencies: rewritten }
}

const app = new Hono()

app.get("*", (c) => {
  const raw = c.req.path
  const trimmed = raw.startsWith("/") ? raw.slice(1) : raw
  const filename = trimmed === "" ? "index.json" : trimmed
  const filePath = join(REGISTRY_DIR, filename)

  if (!filePath.startsWith(REGISTRY_DIR)) return c.text("forbidden", 403)
  if (!existsSync(filePath)) return c.text("not found", 404)

  const content = readFileSync(filePath, "utf8")
  const parsed = JSON.parse(content) as RegistryItem
  const url = new URL(c.req.url)
  const origin = `${url.protocol}//${url.host}`

  return c.json(rewriteDeps(parsed, origin))
})

/** Boots a local HTTP server that serves the prebuilt registry JSON artifacts. */
export const startRegistryServer = (port: number): string => {
  const server = Bun.serve({ port, fetch: app.fetch })
  return `http://localhost:${server.port}`
}
