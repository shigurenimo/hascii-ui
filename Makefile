.PHONY: dev serve web build build-cli registry

dev:
	bun run --watch cli/index.ts

serve: registry
	bun run --watch cli/index.ts serve

web: registry
	bunx portless run vite

build: registry build-cli
	bunx vite build

build-cli:
	bun run build:cli

registry:
	bunx shadcn build --output web/public/r
