import { Controller } from "react-hook-form"
import type { Control, UseFormRegister } from "react-hook-form"
import { Input } from "@/components/ui/input/input"
import { Checkbox } from "@/components/ui/checkbox/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select/select"
import { Label } from "@/components/ui/label/label"
import type { Field, FormData } from "@components/form/types"

type FormComponentProps = {
  field: Field
  control: Control<FormData>
  register: UseFormRegister<FormData>
}

const FormComponents = ({ field, control, register }: FormComponentProps) => {
  switch (field.type) {
    case "select":
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <Select value={f.value as string} onValueChange={f.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${field.label}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options?.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      )

    case "checkbox":
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: f }) => (
            <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition">
              <Checkbox
                checked={f.value as boolean}
                onCheckedChange={f.onChange}
              />
              <Label className="cursor-pointer text-sm font-medium">
                {field.label}
              </Label>
            </div>
          )}
        />
      )
      default:
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              {field.label} 
            </Label>
            <Input
              type={field.type}
              {...register(field.name, { 
                required: field.required,
                valueAsNumber: field.type === "number" 
              })}
              placeholder={`Enter ${field.label}`}
              className="focus-visible:ring-2 focus-visible:ring-indigo-500"
            />
          </div>
        )
  }
}

export default FormComponents