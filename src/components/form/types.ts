export type FieldType = "text" | "number" | "checkbox" | "select"

type BaseField = {
  label: string
  name: string
  required?: boolean
}

type TextField = BaseField & {
  type: "text" | "number" | "checkbox"
}

type SelectField = BaseField & {
  type: "select"
  options: string[]
}

export type Field = TextField | SelectField

export type DynamicFormProps = {
  formConfig: Field[]
  onSubmit?: (data: FormData) => void
  initialData? :FormData 
}

export type FormData = Record<string, string | number | boolean>


export type PageForm = {
  selectedUserId: string  
}

export type User = {
  id: number
  email: string
  username: string
  name: { firstname: string; lastname: string }
  phone: string
}