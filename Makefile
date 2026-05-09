.PHONY: dev serve web build build-cli registry tokens

dev:
	bun run --watch cli/index.ts

serve: registry
	bun run --watch cli/index.ts serve

web: registry
	bunx portless run vite

build: tokens registry build-cli
	bunx vite build

build-cli:
	bun run build:cli

registry: tokens
	bunx shadcn build --output web/public/r

tokens:
	npx --yes "@google/design.md" export DESIGN.md --format tailwind > registry/lib/hascii/tokens.json
