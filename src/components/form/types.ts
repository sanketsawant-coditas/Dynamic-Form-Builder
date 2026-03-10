export type FieldType = "text" | "number" | "checkbox" | "select"

export type Field = {
  label: string
  type: FieldType
  name: string
  required?: boolean
  options?: string[]
}

export type FormData = Record<string, string | number | boolean>