import { createFactory } from "hono/factory"

export type Env = Record<string, never>

export const factory = createFactory<Env>()
