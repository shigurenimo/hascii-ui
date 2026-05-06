Terminal UI components for [OpenTUI](https://opentui.com), distributed as a shadcn-compatible registry. Theming is split between `registry/lib/hascii/theme.ts` (semantic tokens) and `registry/lib/hascii/tw-token.ts` (Tailwind primitives).

```
█ █  ▄▀▄  ▄▀▀  ▄▀▀  █  █
█▀█  █▀█  ▀▀▄  █    █  █
▀ ▀  ▀ ▀  ▀▀▘  ▀▀▘  ▀  ▀
```

## Install

Add a single component through shadcn.

```bash
npx shadcn@latest add https://ui.hascii.sh/r/button.json
```

Install everything at once.

```bash
npx shadcn@latest add https://ui.hascii.sh/r/all.json
```

## Consumer setup

`shadcn init` requires TailwindCSS, so it fails on TUI-only projects. Drop a minimal `components.json` at the project root and `shadcn add` will skip the init step.

`bunx @hascii/ui init` writes one for you (bun is required since the CLI ships as a TypeScript entry with `#!/usr/bin/env bun`).

```bash
bunx @hascii/ui init       # fails if components.json exists. pass --force to overwrite
```

Generated content:

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "",
    "baseColor": "neutral",
    "cssVariables": false,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "lib": "@/lib",
    "hooks": "@/hooks",
    "ui": "@/components/ui"
  }
}
```

Components import via `@/` absolute paths, so make sure `tsconfig.json` exposes the `@/*` alias.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

## Keyboard focus

To cycle focus across multiple focusable elements with Tab, wrap them in `HasciiFocusGroup`. Give each child a `focusId`, and pass the order to `ids` on the group. Tab moves forward; Shift+Tab moves back.

```tsx
<HasciiFocusGroup ids={["save", "cancel"] as const} defaultId="save">
  <HasciiButton focusId="save">Save</HasciiButton>
  <HasciiButton focusId="cancel" variant="secondary">
    Cancel
  </HasciiButton>
</HasciiFocusGroup>
```

A child with `focusId` does not need `props.isFocused` inside the group — the group manages focus state automatically.

## CLI

A CLI for previewing components in the terminal ships with the package. With bun installed, `bunx @hascii/ui` is enough (use `bun link` instead during local development).

Run with no arguments to launch an interactive showcase that lists every component.

```bash
bunx @hascii/ui
```

Render a single component with the `components` subcommand. Options are zod-validated.

```bash
bunx @hascii/ui components button --variant outline --size lg --label "save"
bunx @hascii/ui components badge  --variant destructive --label removed
bunx @hascii/ui components input  --label Email --placeholder you@example.com
bunx @hascii/ui components card   --heading hascii --description hello@hascii.sh
bunx @hascii/ui components select --options Default,Outline,Ghost,Destructive
```

Press `q` or `Esc` to quit. `--help` lists components and options.

To serve the registry locally over HTTP, use `serve`.

```bash
bunx @hascii/ui serve --port 4445
```

After it starts, you can install components from the local URL: `npx shadcn@latest add http://localhost:4445/button.json`.

## Layout

```
registry.json              shadcn registry manifest
public/                    Vite build output (gitignore). deploy target
  index.html, assets/      vite build output
  r/, CNAME                copied from web/public by vite
web/                       documentation site source (Vite + TailwindCSS)
  index.html
  src/main.ts
  src/style.css
  public/CNAME             custom domain
  public/r/                shadcn build output (gitignore, served in dev)
registry/
  ui/hascii/               component sources (registry:ui)
  lib/hascii/              tw-token, theme, theme-context (registry:lib)
  hooks/hascii/            use-pressable (registry:hook)
cli/                       Hono app + CLI entry
  index.ts                 CLI entry
  init.ts                  components.json generator
  factory.ts               createFactory<Env>
  routes/index.ts          root router (mount via COMPONENT_NAMES)
  routes/components/       per-component handler with zod schema
  routes/ui.tsx            showcase route
  components/              React components for the showcase
  utils/                   to-request, custom-validator, use-quit
  render-component.tsx     centers a single component on screen
  render-fullscreen.tsx    fullscreen runner
  serve-registry.ts        local registry HTTP server
```

## Adding a component

Add the source at `registry/ui/hascii/<name>.tsx`. Read theme tokens via `@/registry/lib/hascii/theme-context`.

Add a zod-validated handler at `cli/routes/components/<name>.tsx`.

Append the name to `COMPONENT_NAMES` in `cli/routes/index.ts` and mount it with `components.get("/<name>", ...)`.

Add an entry to `registry.json` and run `make registry`. `make web` and `make build` already depend on `registry`, so the rebuild happens automatically inside the dev / publish flows.

## Makefile

`make dev` watches and runs the CLI.

`make web` boots the documentation site. portless maps it to `https://ui.hascii.sh.localhost` (first run prompts for sudo and CA trust). registry is rebuilt first, then the vite dev server starts.

`make build` runs registry then vite build, producing `public/` (vite copies `web/public/r/*.json` and `web/public/CNAME` into `public/`).

`make registry` runs `bunx shadcn build --output web/public/r` to regenerate per-item JSON.

`vp test` runs vitest. `vp lint` and `vp fmt` run on the same toolchain.

## shadcn registry

Each component ships as JSON conforming to the shadcn registry-item schema. The official `shadcn build` reads `registry.json` and writes `web/public/r/<name>.json`; vite copies those into `public/r/<name>.json` for deployment. Once `public/` is served at the public URL, consumers install with:

```bash
npx shadcn@latest add https://ui.hascii.sh/r/<name>.json
```

`hascii-tw-token`, `hascii-theme`, and `hascii-theme-context` are the shared lib items every component pulls in via `registryDependencies`.

## Deploy

`.github/workflows/deploy.yml` runs `make build` on every push to `main` and uploads `public/` to GitHub Pages. `web/public/CNAME` pins the custom domain to `ui.hascii.sh`. In repository Settings → Pages, set the source to `GitHub Actions`, then point the `ui.hascii.sh` CNAME at `<owner>.github.io` in DNS.
