[OpenTUI](https://opentui.com) 向けのターミナル UI コンポーネント集です。shadcn registry 互換で配布されます。

```
▒ ▒ ▄▀▒ ▒▀▀ ▒▀▀ ▒ ▒
▒▀▒ ▒▀▒ ▄▄▒ ▒▄▄ ▒ ▒
```

## 使い方

セットアップから動かすまで 4 ステップ。

### components.json を用意

`shadcn init` は TailwindCSS を要求するので、TUI 専用プロジェクトでは失敗します。代わりに以下のコマンドでひな形を書き出します（既存ファイルがある場合は `--force` で上書き）。

```bash
bunx @hascii/ui init
```

生成される `components.json` には `@hascii` という名前空間が登録されているので、後段の `shadcn add @hascii/<name>` がそのまま通ります。

### tsconfig に @ エイリアス

コンポーネントは `@/` 絶対パスで import されるので、`tsconfig.json` の `paths` に対応を入れます。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

### コンポーネントを取り込む

単体で入れる場合。

```bash
npx shadcn@latest add @hascii/button
```

全部まとめて入れる場合は `all` aggregator を指定します。

```bash
npx shadcn@latest add @hascii/all
```

URL 直指定でも可。

```bash
npx shadcn@latest add https://ui.hascii.sh/r/button.json
```

### コードで使う

`HasciiThemeProvider` で囲んだ中で読みます。OpenTUI の React レンダラ前提です。

```tsx
import { createCliRenderer } from "@opentui/core"
import { createRoot } from "@opentui/react"
import { HasciiThemeProvider } from "@/registry/lib/hascii/theme-context"
import { HasciiButton } from "@/registry/ui/hascii/button"

const renderer = await createCliRenderer({ exitOnCtrlC: true, useMouse: true })
const root = createRoot(renderer)

root.render(
  <HasciiThemeProvider>
    <HasciiButton onPress={() => console.log("clicked")}>Hello</HasciiButton>
  </HasciiThemeProvider>,
)
```

## テーマのカスタマイズ

カラートークンは `DESIGN.md`（[google-labs-code/design.md](https://github.com/google-labs-code/design.md) 仕様）が単一の正本です。値を変えたら `make tokens` で `registry/lib/hascii/tokens.json` を再生成し、`theme.ts` がそれを zod で読み直します。

ランタイムで上書きしたい場合は、`HasciiThemeProvider` に `theme` を渡すと差し替わります。

```tsx
import type { HasciiTheme } from "@/registry/lib/hascii/theme"
import { hasciiTheme } from "@/registry/lib/hascii/theme"
import { HasciiThemeProvider } from "@/registry/lib/hascii/theme-context"

const customTheme: HasciiTheme = {
  color: { ...hasciiTheme.color, primary: "#22d3ee" },
}

<HasciiThemeProvider theme={customTheme}>{children}</HasciiThemeProvider>
```

## キーボードフォーカス

複数のフォーカス可能要素を Tab で循環させたい場合は `HasciiFocusGroup` で囲みます。子に `focusId` を付け、`ids` に順序を渡します。

```tsx
<HasciiFocusGroup ids={["save", "cancel"] as const} defaultId="save">
  <HasciiButton focusId="save">Save</HasciiButton>
  <HasciiButton focusId="cancel" variant="secondary">
    Cancel
  </HasciiButton>
</HasciiFocusGroup>
```

`focusId` が付いた子は `props.isFocused` を受け取らなくても、グループがフォーカス状態を管理します。

## CLI でプレビュー

`bunx @hascii/ui` で全コンポーネントを横断するインタラクティブなショーケースが起動します。

```bash
bunx @hascii/ui
```

単体プレビューは `components` サブコマンド経由。zod でバリデートされたオプションを渡せます。

```bash
bunx @hascii/ui components button --variant outline --size lg --label save
bunx @hascii/ui components badge  --variant destructive --label removed
bunx @hascii/ui components --help
```

ローカルにレジストリを HTTP で立てたい場合は `serve`。

```bash
bunx @hascii/ui serve --port 4445
```

立ち上がったら、別プロジェクトから `npx shadcn@latest add http://localhost:4445/button.json` で取り込めます。

## 開発

このリポジトリ自体を触る場合のコマンド。

```bash
make dev        # CLI を watch
make web        # ドキュメントサイトをローカル起動
make tokens     # DESIGN.md → tokens.json を再生成
make registry   # tokens を再生成してから shadcn build
make build      # 公開用の public/ を生成
```

新しいコンポーネントの追加手順は `CLAUDE.md` を参照してください。
