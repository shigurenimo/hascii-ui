hascii-ui ships a shadcn-registry-compatible set of OpenTUI terminal components. The CLI (Hono), the component sources, and the documentation site all live in one package.

## Layout

```
registry.json              shadcn registry manifest (edit this)
public/                    Vite build output (gitignore, deploy target, never edit by hand)
web/                       documentation site source (Vite + TailwindCSS)
  index.html
  src/main.ts
  src/style.css
  public/CNAME             custom domain
  public/r/                shadcn build output (gitignore, served in dev too)
registry/
  ui/hascii/               component sources (registry:ui)
  lib/hascii/              tw-token / theme / theme-context (registry:lib)
  hooks/hascii/            use-pressable (registry:hook)
cli/
  index.ts                 CLI entry (init / components / serve)
  init.ts                  writes components.json (bypasses shadcn init)
  factory.ts               Hono createFactory<Env>
  routes/index.ts          root router. add a name to COMPONENT_NAMES to mount
  routes/components/       per-component handler (zod schema + render)
  routes/ui.tsx            showcase route
  components/              React components used by the showcase
  utils/                   to-request / custom-validator / use-quit
  render-component.tsx     centers a single component on screen
  render-fullscreen.tsx    fullscreen runner
  serve-registry.ts        local registry HTTP server
```

## Adding a component

Add `registry/ui/hascii/<name>.tsx`. Read colors via `useHasciiTheme` from `@/registry/lib/hascii/theme-context`.

Add `cli/routes/components/<name>.tsx` with a zod-validated handler.

Append the name to `COMPONENT_NAMES` in `cli/routes/index.ts` and mount it with `components.get("/<name>", ...)`.

Add an entry to `registry.json` `items`, and append it to the `all` item's `registryDependencies`.

Run `make registry` to regenerate `web/public/r/<name>.json`.

## Makefile

`make dev` watches and runs the CLI.

`make web` boots the documentation site. portless maps it to `https://ui.hascii.sh.localhost`. registry is rebuilt first, then the vite dev server starts.

`make build` runs registry then vite build, producing `public/`.

`make registry` runs `bunx shadcn build --output web/public/r` to regenerate per-item JSON.

## Rules

Coding conventions live under `.claude/rules/`.

```
.claude/rules/ts.md          TypeScript general
.claude/rules/ts.react.md    React / hooks / TailwindCSS
.claude/rules/git.md         commit messages
.claude/rules/md.md          Markdown
```
