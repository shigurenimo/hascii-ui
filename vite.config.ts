import tailwindcss from "@tailwindcss/vite"
import { resolve } from "node:path"
import { defineConfig } from "vite-plus"

export default defineConfig({
  root: "web",
  publicDir: "public",
  build: {
    outDir: "../public",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        en: resolve(import.meta.dirname, "web/index.html"),
        ja: resolve(import.meta.dirname, "web/ja/index.html"),
      },
    },
  },
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(import.meta.dirname, "."),
    },
  },
  fmt: {
    semi: false,
  },
  lint: {
    ignorePatterns: ["dist/**", "public/**", "node_modules/**", "tokens.json"],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  test: {
    root: resolve(import.meta.dirname),
    include: ["registry/**/*.{test,spec}.{ts,tsx}"],
  },
})
