#!/usr/bin/env bun
import { init } from "@/cli/init"
import { app } from "@/cli/routes"
import { startRegistryServer } from "@/cli/serve-registry"
import { toRequest } from "@/cli/utils/to-request"

const HELP = `hascii-ui — Terminal UI components powered by OpenTUI

usage: hascii-ui [command] [options]

commands:
  (no args)                  launch the interactive component showcase
  init [--force]             create components.json so shadcn add works without TailwindCSS
  components <name>          render the named component centered in the terminal
  serve [--port <n>]         serve the local registry over HTTP

options:
  --help, -h                 show this help

run hascii-ui components --help to list components.`

const args = process.argv.slice(2)

if (args[0] === "--help" || args[0] === "-h" || args[0] === "help") {
  process.stdout.write(`${HELP}\n`)
  process.exit(0)
}

if (args[0] === "init") {
  const force = args.includes("--force")
  const result = init({ cwd: process.cwd(), force })

  if (result instanceof Error) {
    process.stderr.write(`error: ${result.message}\n`)
    process.exit(1)
  }

  process.stdout.write(`created components.json\n`)
  process.stdout.write(`next: npx shadcn@latest add @hascii/button\n`)
  process.exit(0)
}

if (args[0] === "serve") {
  const portFlagIndex = args.indexOf("--port")
  const portArg = portFlagIndex >= 0 ? args[portFlagIndex + 1] : undefined
  const port = portArg ? Number.parseInt(portArg, 10) : 4445

  if (Number.isNaN(port) || port <= 0) {
    process.stderr.write(`error: invalid --port value\n`)
    process.exit(1)
  }

  const url = startRegistryServer(port)
  process.stdout.write(`hascii-ui registry serving at ${url}\n`)
  process.stdout.write(`add a single component:\n`)
  process.stdout.write(`  npx shadcn@latest add ${url}/button.json\n`)
  process.stdout.write(`add every component:\n`)
  process.stdout.write(`  npx shadcn@latest add ${url}/all.json\n`)
  process.stdout.write(`press Ctrl+C to stop.\n`)

  await new Promise<never>(() => {})
}

if (args.length === 0) {
  const showcaseRes = await app.request("/ui", { method: "GET" })

  if (!showcaseRes.ok) {
    process.stderr.write(`${await showcaseRes.text()}\n`)
    process.exit(1)
  }

  const showcaseText = await showcaseRes.text()
  if (showcaseText) process.stdout.write(showcaseText)
  process.exit(0)
}

const request = toRequest(args)

const parsed = new URL(request.url)

if (parsed.searchParams.has("help")) {
  const helpRes = await app.request(request.url, { method: request.method })
  process.stdout.write(await helpRes.text())
  process.stdout.write("\n")
  process.exit(helpRes.ok ? 0 : 1)
}

const res = await app.request(request.url, { method: request.method })

if (res.ok === false) {
  process.stderr.write(`${await res.text()}\n`)
  process.exit(1)
}

const text = await res.text()

if (text) {
  process.stdout.write(text)
}
