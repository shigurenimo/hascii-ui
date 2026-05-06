import { zValidator } from "@hono/zod-validator"
import { HTTPException } from "hono/http-exception"
import type { ZodType } from "zod"

export const customValidator = <Target extends "param" | "query" | "json", T extends ZodType>(
  target: Target,
  schema: T,
  helpText?: string,
) =>
  zValidator(target, schema, (result, c) => {
    if (helpText && c.req.query("help")) {
      return c.text(helpText)
    }

    if (result.success) return

    const [issue] = result.error.issues

    if (!issue) {
      throw new HTTPException(400, { message: "invalid request" })
    }

    const path = issue.path.join(".")

    const message = path ? `${path}: ${issue.message}` : issue.message

    throw new HTTPException(400, { message })
  })
