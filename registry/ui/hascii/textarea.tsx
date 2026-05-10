import type { TextareaRenderable } from "@opentui/core"
import { useKeyboard } from "@opentui/react"
import { useId, useRef, useState } from "react"
import { useHasciiFormItem } from "@/registry/lib/hascii/form-item-context"
import { useHasciiInputFocus } from "@/registry/lib/hascii/input-focus-context"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"
import { usePressable } from "@/registry/hooks/hascii/use-pressable"

type Variant = "default" | "outline"

export type Props = {
  variant?: Variant
  placeholder?: string
  initialValue?: string
  width?: number
  height?: number
  defaultFocused?: boolean
  onSubmit?: (value: string) => void
}

/** Multi-line text editor. Click to focus, Esc to blur (requires HasciiInputFocusProvider for outside-click). */
export function HasciiTextarea(props: Props) {
  const variant = props.variant ?? "default"
  const width = props.width ?? 48
  const height = props.height ?? 8
  const placeholder = props.placeholder ?? ""

  const fallbackId = useId()
  const formItem = useHasciiFormItem()
  const id = formItem?.focusId ?? fallbackId
  const focusCtx = useHasciiInputFocus()
  const fallbackState = useState(props.defaultFocused ?? false)
  const isFocused = focusCtx ? focusCtx.focusedId === id : fallbackState[0]

  const focus = (): void => {
    if (focusCtx) focusCtx.setFocusedId(id)
    else fallbackState[1](true)
  }

  const blur = (): void => {
    if (focusCtx) focusCtx.setFocusedId(null)
    else fallbackState[1](false)
  }

  const theme = useHasciiTheme()
  const press = usePressable()
  const textareaRef = useRef<TextareaRenderable | null>(null)

  const handleSubmit = (): void => {
    const value = textareaRef.current?.editBuffer.getText() ?? ""
    props.onSubmit?.(value)
  }

  useKeyboard((key) => {
    if (!isFocused) return
    if (key.name === "escape") blur()
  })

  if (variant === "outline") {
    const borderColor = press.isPressed
      ? theme.color.foreground
      : isFocused
        ? theme.color.ring
        : press.isHovered
          ? theme.color.mutedForeground
          : theme.color.input

    return (
      <box
        border
        borderStyle="rounded"
        borderColor={borderColor}
        height={height}
        width={width}
        paddingLeft={1}
        paddingRight={1}
        backgroundColor={theme.color.background}
        {...press.bind}
        onMouseDown={(event) => {
          event.stopPropagation()
          press.bind.onMouseDown()
          focus()
        }}
      >
        <textarea
          ref={textareaRef}
          focused={isFocused}
          placeholder={placeholder}
          initialValue={props.initialValue}
          textColor={theme.color.foreground}
          placeholderColor={theme.color.mutedForeground}
          onSubmit={handleSubmit}
        />
      </box>
    )
  }

  const bg = press.isPressed
    ? theme.color.secondaryActive
    : isFocused || press.isHovered
      ? theme.color.secondaryHover
      : theme.color.muted

  return (
    <box
      height={height}
      width={width}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1}
      paddingBottom={1}
      backgroundColor={bg}
      {...press.bind}
      onMouseDown={(event) => {
        event.stopPropagation()
        press.bind.onMouseDown()
        focus()
      }}
    >
      <textarea
        ref={textareaRef}
        focused={isFocused}
        placeholder={placeholder}
        initialValue={props.initialValue}
        textColor={theme.color.foreground}
        placeholderColor={theme.color.mutedForeground}
        onSubmit={handleSubmit}
      />
      {isFocused ? (
        <box position="absolute" bottom={0} left={0} right={0}>
          <text fg={theme.color.primary}>{"▁".repeat(width)}</text>
        </box>
      ) : null}
    </box>
  )
}
