import DynamicForm from "../components/form/DynamicForm"
import type { Field } from "../components/form/types"

function FormPage() {

  const formConfig: Field[] = [
    { label: "Name", type: "text", name: "name", required: true },
    { label: "Age", type: "number", name: "age" },
    {
      label: "Gender",
      type: "select",
      name: "gender",
      options: ["Male", "Female", "Other"],
    },
    {
      label: "Subscribe",
      type: "checkbox",
      name: "subscribe",
    },
  ]

  const handleSubmit = (data: Record<string, string | number | boolean>) => {
    console.log("Form Output:", data)
  }

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">

      <div className="text-center">
        <h1 className="text-2xl font-bold">Dynamic Form Builder</h1>
        <p className="text-gray-500 text-sm">
          Fill the form below and submit
        </p>
      </div>

      <DynamicForm formConfig={formConfig} onSubmit={handleSubmit} />

    </div>
  )
}

export default FormPage