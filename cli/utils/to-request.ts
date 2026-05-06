const SHORT_FLAGS: Record<string, string> = {
  h: "help",
}

type ParsedRequest = {
  method: "GET"
  path: string
  url: string
}

const isValue = (arg: string | undefined): arg is string =>
  typeof arg === "string" && !arg.startsWith("-")

export const toRequest = (args: string[]): ParsedRequest => {
  const segments: string[] = []
  const params = new URLSearchParams()

  let cursor = 0
  while (cursor < args.length) {
    const arg = args[cursor]

    if (arg === undefined) {
      cursor++
      continue
    }

    if (arg.startsWith("--")) {
      cursor = consumeLongFlag(arg, args, cursor, params)
      continue
    }

    if (arg.startsWith("-") && arg.length === 2) {
      cursor = consumeShortFlag(arg, args, cursor, params)
      continue
    }

    segments.push(arg)
    cursor++
  }

  const path = segments.length > 0 ? `/${segments.join("/")}` : "/"
  const query = params.size > 0 ? `?${params.toString()}` : ""

  return { method: "GET", path, url: `http://localhost${path}${query}` }
}

const consumeLongFlag = (
  arg: string,
  args: string[],
  cursor: number,
  params: URLSearchParams,
): number => {
  const eq = arg.indexOf("=")
  if (eq !== -1) {
    params.set(arg.slice(2, eq), arg.slice(eq + 1))
    return cursor + 1
  }

  const key = arg.slice(2)
  const next = args[cursor + 1]

  if (isValue(next)) {
    params.set(key, next)
    return cursor + 2
  }

  params.set(key, "true")
  return cursor + 1
}

const consumeShortFlag = (
  arg: string,
  args: string[],
  cursor: number,
  params: URLSearchParams,
): number => {
  const shortKey = arg.slice(1, 2)
  const long = SHORT_FLAGS[shortKey]

  if (!long) return cursor + 1

  const next = args[cursor + 1]
  if (isValue(next)) {
    params.set(long, next)
    return cursor + 2
  }

  params.set(long, "true")
  return cursor + 1
}
