import { describe, expect, test } from "vitest"
import { hasciiTheme } from "@/registry/lib/hascii/theme"

describe("hasciiTheme", () => {
  test("background and foreground sit at opposite ends of the zinc ramp", () => {
    expect(hasciiTheme.color.background).toBe("#09090B")
    expect(hasciiTheme.color.foreground).toBe("#FAFAFA")
  })

  test("destructive progresses from rest to active in red", () => {
    expect(hasciiTheme.color.destructive).toBe("#7F1D1D")
    expect(hasciiTheme.color.destructiveHover).toBe("#991B1B")
    expect(hasciiTheme.color.destructiveActive).toBe("#B91C1C")
  })

  test("hover-active is the bright zinc-500 used for active+hover rows", () => {
    expect(hasciiTheme.color.hoverActive).toBe("#71717A")
  })
})
