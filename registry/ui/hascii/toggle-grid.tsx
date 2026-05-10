import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

type SelectionMode = "single" | "multiple"

type SingleProps = {
  type?: "single"
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
}

type MultipleProps = {
  type: "multiple"
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
}

export type Props = (SingleProps | MultipleProps) & {
  direction?: "row" | "column"
  columnGap?: number
  rowGap?: number
  children?: ReactNode
}

type ContextValue = {
  mode: SelectionMode
  isPressed: (value: string) => boolean
  toggle: (value: string) => void
}

const ToggleGridContext = createContext<ContextValue | null>(null)

/** Read the current ToggleGrid context. Returns null when called outside a HasciiToggleGrid. */
export function useHasciiToggleGrid(): ContextValue | null {
  return useContext(ToggleGridContext)
}

const isSingle = (props: Props): props is SingleProps & { children?: ReactNode } =>
  props.type !== "multiple"

/** Wrapping grid of HasciiToggleGridItem. Items are filled rectangular cells, similar to a braille dot pad. */
export function HasciiToggleGrid(props: Props) {
  const internalSingleState = useState<string>(isSingle(props) ? (props.defaultValue ?? "") : "")
  const internalMultipleState = useState<string[]>(
    !isSingle(props) ? (props.defaultValue ?? []) : [],
  )
  const direction = props.direction ?? "row"
  const columnGap = props.columnGap ?? (direction === "row" ? 1 : 0)
  const rowGap = props.rowGap ?? (direction === "row" ? 1 : 0)

  if (isSingle(props)) {
    const internal = internalSingleState[0]
    const setInternal = internalSingleState[1]
    const current = props.value ?? internal

    const toggle = (value: string) => {
      if (props.value === undefined) setInternal(value)
      props.onChange?.(value)
    }

    const ctx: ContextValue = {
      mode: "single",
      isPressed: (value) => value === current,
      toggle,
    }

    return (
      <ToggleGridContext.Provider value={ctx}>
        <box
          flexDirection={direction}
          flexWrap={direction === "row" ? "wrap" : "no-wrap"}
          columnGap={columnGap}
          rowGap={rowGap}
        >
          {props.children}
        </box>
      </ToggleGridContext.Provider>
    )
  }

  const internal = internalMultipleState[0]
  const setInternal = internalMultipleState[1]
  const current = props.value ?? internal

  const toggle = (value: string) => {
    const next = current.includes(value)
      ? current.filter((entry) => entry !== value)
      : [...current, value]
    if (props.value === undefined) setInternal(next)
    props.onChange?.(next)
  }

  const ctx: ContextValue = {
    mode: "multiple",
    isPressed: (value) => current.includes(value),
    toggle,
  }

  return (
    <ToggleGridContext.Provider value={ctx}>
      <box
        flexDirection={direction}
        flexWrap={direction === "row" ? "wrap" : "no-wrap"}
        columnGap={columnGap}
        rowGap={rowGap}
      >
        {props.children}
      </box>
    </ToggleGridContext.Provider>
  )
}
