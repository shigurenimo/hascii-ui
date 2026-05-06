.PHONY: dev web build registry

dev:
	bun run --watch cli/index.ts

web: registry
	bunx portless run vite

build: registry
	bunx vite build

registry:
	bunx shadcn build --output web/public/r
