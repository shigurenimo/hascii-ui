type Option = {
  flag: string
  values: readonly string[]
  defaultValue: string
}

/** Per-component CLI option metadata. Mirrors the zod schemas in cli/routes/components/. */
export const componentOptions: Record<string, readonly Option[]> = {
  badge: [
    {
      flag: "variant",
      values: ["default", "secondary", "outline", "destructive"],
      defaultValue: "default",
    },
  ],
  button: [
    {
      flag: "variant",
      values: ["default", "secondary", "outline", "ghost", "destructive"],
      defaultValue: "default",
    },
    {
      flag: "size",
      values: ["default", "sm", "lg"],
      defaultValue: "default",
    },
  ],
  dialog: [
    {
      flag: "variant",
      values: ["default", "outline"],
      defaultValue: "default",
    },
  ],
  "form-item": [
    {
      flag: "direction",
      values: ["column", "row"],
      defaultValue: "column",
    },
  ],
  input: [
    {
      flag: "variant",
      values: ["default", "outline"],
      defaultValue: "default",
    },
  ],
  separator: [
    {
      flag: "orientation",
      values: ["horizontal", "vertical"],
      defaultValue: "horizontal",
    },
  ],
  snackbar: [
    {
      flag: "variant",
      values: ["default", "secondary", "destructive"],
      defaultValue: "default",
    },
  ],
  spinner: [
    {
      flag: "variant",
      values: ["braille", "dots", "line", "noise", "pipe", "block", "growVert", "toggle"],
      defaultValue: "braille",
    },
  ],
}
