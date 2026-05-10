import { z } from "zod"
import { HasciiDiff } from "@/registry/ui/hascii/diff"
import { factory } from "@/cli/factory"
import { renderComponent } from "@/cli/render-component"
import { customValidator } from "@/cli/utils/custom-validator"

const help = `usage: hascii-ui components diff [options]

options:
  --view      unified | split   (default: unified)
  --help, -h                    show this help`

const schema = z.object({
  view: z.enum(["unified", "split"]).default("unified"),
})

const SAMPLE = `--- a/button.tsx
+++ b/button.tsx
@@ -1,5 +1,6 @@
 import { useKeyboard } from "@opentui/react"
-import { useState } from "react"
+import { useId, useState } from "react"
 import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"
+import { useHasciiFormItem } from "@/registry/lib/hascii/form-item-context"
 import { usePressable } from "@/registry/hooks/hascii/use-pressable"`

export const diffHandler = factory.createHandlers(
  customValidator("query", schema, help),
  async (c) => {
    const query = c.req.valid("query")

    await renderComponent(
      <HasciiDiff diff={SAMPLE} view={query.view} filetype="typescript" width={64} height={10} />,
    )

    return c.text("")
  },
)
