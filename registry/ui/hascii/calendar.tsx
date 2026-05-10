import { useState } from "react"
import { useHasciiTheme } from "@/registry/lib/hascii/theme-context"
import { usePressable } from "@/registry/hooks/hascii/use-pressable"

export type Props = {
  year: number
  month: number
  selected?: { year: number; month: number; day: number } | null
  today?: { year: number; month: number; day: number }
  onSelect?: (date: { year: number; month: number; day: number }) => void
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const daysInMonth = (year: number, month: number): number => new Date(year, month, 0).getDate()

const firstWeekday = (year: number, month: number): number => new Date(year, month - 1, 1).getDay()

type CellProps = {
  day: number
  isSelected: boolean
  isToday: boolean
  onPress: () => void
}

function HasciiCalendarCell(props: CellProps) {
  const theme = useHasciiTheme()
  const press = usePressable({ onPress: props.onPress })

  const bg = props.isSelected
    ? theme.color.primary
    : press.isPressed
      ? theme.color.secondaryActive
      : press.isHovered
        ? theme.color.secondaryHover
        : undefined

  const fg = props.isSelected
    ? theme.color.primaryForeground
    : props.isToday
      ? theme.color.foreground
      : theme.color.mutedForeground

  const label = String(props.day).padStart(2, " ")

  return (
    <box width={2} height={1} alignItems="center" backgroundColor={bg} {...press.bind}>
      <text fg={fg}>{label}</text>
    </box>
  )
}

const isSameDate = (
  a: { year: number; month: number; day: number } | null | undefined,
  b: { year: number; month: number; day: number } | null | undefined,
): boolean =>
  a !== null &&
  a !== undefined &&
  b !== null &&
  b !== undefined &&
  a.year === b.year &&
  a.month === b.month &&
  a.day === b.day

/** Month grid with selectable days. Today gets a brighter foreground; the selected day fills with primary. */
export function HasciiCalendar(props: Props) {
  const theme = useHasciiTheme()

  const internalState = useState<{ year: number; month: number; day: number } | null>(
    props.selected ?? null,
  )
  const internal = internalState[0]
  const setInternal = internalState[1]

  const selected = props.selected !== undefined ? props.selected : internal

  const select = (day: number) => {
    const date = { year: props.year, month: props.month, day }
    if (props.selected === undefined) setInternal(date)
    props.onSelect?.(date)
  }

  const total = daysInMonth(props.year, props.month)
  const offset = firstWeekday(props.year, props.month)

  type Cell = { type: "blank" } | { type: "day"; day: number }
  const cells: Cell[] = []
  for (let index = 0; index < offset; index++) cells.push({ type: "blank" })
  for (let day = 1; day <= total; day++) cells.push({ type: "day", day })

  const rows: Cell[][] = []
  for (let index = 0; index < cells.length; index += 7) {
    rows.push(cells.slice(index, index + 7))
  }

  const lastRow = rows[rows.length - 1]
  if (lastRow !== undefined) {
    while (lastRow.length < 7) lastRow.push({ type: "blank" })
  }

  return (
    <box flexDirection="column" gap={0}>
      <box paddingLeft={1} paddingRight={1} height={1}>
        <text fg={theme.color.foreground}>{`${MONTH_NAMES[props.month - 1]} ${props.year}`}</text>
      </box>
      <box flexDirection="row" paddingLeft={1} paddingRight={1} height={1} gap={1}>
        {WEEKDAYS.map((label) => (
          <box key={label} width={2} alignItems="center">
            <text fg={theme.color.mutedForeground}>{label}</text>
          </box>
        ))}
      </box>
      {rows.map((row, rowIndex) => (
        <box
          key={`row-${rowIndex}`}
          flexDirection="row"
          paddingLeft={1}
          paddingRight={1}
          height={1}
          gap={1}
        >
          {row.map((cell, cellIndex) => {
            if (cell.type === "blank") {
              return <box key={`blank-${rowIndex}-${cellIndex}`} width={2} height={1} />
            }
            const date = { year: props.year, month: props.month, day: cell.day }
            return (
              <HasciiCalendarCell
                key={`day-${cell.day}`}
                day={cell.day}
                isSelected={isSameDate(selected, date)}
                isToday={isSameDate(props.today, date)}
                onPress={() => select(cell.day)}
              />
            )
          })}
        </box>
      ))}
    </box>
  )
}
