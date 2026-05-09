hascii-ui ships a shadcn-registry-compatible set of OpenTUI terminal components. The CLI (Hono), the component sources, and the documentation site all live in one package.

## Layout

```
registry.json              shadcn registry manifest (edit this)
public/                    Vite build output (gitignore, deploy target, never edit by hand)
web/                       documentation site source (Vite + TailwindCSS)
  index.html
  src/style.css
  public/CNAME             custom domain
  public/r/                shadcn build output (gitignore, served in dev too)
registry/
  ui/hascii/               component sources (registry:ui)
  lib/hascii/              theme (with tokens.json) / theme-context / input-focus-context (registry:lib)
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

Add an entry to `registry.json` `items`.

Run `make registry` to regenerate `web/public/r/<name>.json` (this depends on `make tokens`, so DESIGN.md is also re-exported).

## Theme

`DESIGN.md` (google-labs-code/design.md spec) is the single source of truth for color tokens. `make tokens` runs `npx @google/design.md export DESIGN.md --format tailwind` to produce `registry/lib/hascii/tokens.json`. `theme.ts` imports that JSON and validates it with zod, then maps kebab-case keys to the camelCase `HasciiTheme` shape.

To add or change a color, edit `DESIGN.md`, then `make tokens && make registry`.

## Makefile

`make dev` watches and runs the CLI.

`make web` boots the documentation site. portless maps it to `https://ui.hascii.sh.localhost`. registry is rebuilt first, then the vite dev server starts.

`make build` runs `tokens`, `registry`, `build-cli`, then `vite build`, producing `public/`.

`make registry` runs `make tokens` then `bunx shadcn build --output web/public/r` to regenerate per-item JSON.

`make tokens` regenerates `registry/lib/hascii/tokens.json` from `DESIGN.md`.

## Rules

Coding conventions live under `.claude/rules/`.

```
.claude/rules/ts.md          TypeScript general
.claude/rules/ts.react.md    React / hooks / TailwindCSS
.claude/rules/git.md         commit messages
.claude/rules/md.md          Markdown
```
