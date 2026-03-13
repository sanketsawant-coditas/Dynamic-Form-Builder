import { useForm } from "react-hook-form"        
import { Button } from "@/components/ui/button/button"
import type { FormData, DynamicFormProps } from "./types"
import FormComponents from "@components/form/FormComponents"    



const DynamicForm = ({ formConfig, onSubmit, initialData  }: DynamicFormProps) => {
  const { register, handleSubmit, control } = useForm<FormData>({
    values: initialData ?? formConfig.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : "" 
      return acc
    }, {} as FormData)
  })

  const onFormSubmit = (data: FormData) => {
    console.log("Form Data:", data)
    onSubmit?.(data)
  }

  return (                                        
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 w-full">
      {formConfig.map((field) => (
      <div key={field.name}>
           <FormComponents field={field} control={control} register={register} />
       </div>
      ))}

      <Button
        type="submit"
        className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium"
      >
        Submit
      </Button>

    </form>
  )
}

export default DynamicForm