import { useState, useCallback, useMemo } from "react"
import type { FormEvent, ChangeEvent } from "react"

import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"

import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"

import type { Field, FormData } from "./types"

type DynamicFormProps = {
  formConfig: Field[]
  onSubmit?: (data: FormData) => void
}

function DynamicForm({ formConfig, onSubmit }: DynamicFormProps) {

  const initialState = useMemo(() => {
    return formConfig.reduce((acc, field) => {
      acc[field.name] = field.type === "checkbox" ? false : ""
      return acc
    }, {} as FormData)
  }, [formConfig])

  const [formData, setFormData] = useState<FormData>(initialState)
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number"
          ? Number(value)
          : type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }))
  }, [])

  const handleSelectChange = useCallback((name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }, [])

  const handleCheckboxChange = useCallback((name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }, [])

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log("Form Data:", formData)

    onSubmit?.(formData)

    setSubmitted(true)
  }

  const renderField = (field: Field) => {
    const value = formData[field.name]

    switch (field.type) {
      case "select":
        return (
          <Select
            value={value as string}
            onValueChange={(val) => handleSelectChange(field.name, val)}
          >
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
        )

      case "checkbox":
        return (
          <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 transition">
            <Checkbox
              checked={value as boolean}
              onCheckedChange={(checked) =>
                handleCheckboxChange(field.name, checked as boolean)
              }
            />
            <Label className="cursor-pointer text-sm font-medium">
              {field.label}
            </Label>
          </div>
        )

      default:
        return (
          <Input
            type={field.type}
            name={field.name}
            value={value as string | number}
            onChange={handleInputChange}
            placeholder={`Enter ${field.label}`}
            required={field.required}
            className="focus-visible:ring-2 focus-visible:ring-indigo-500"
          />
        )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 w-full"
    >

      {submitted && (
        <Alert className="border-green-500 bg-green-50 text-green-800">
          <AlertTitle>Success 🎉</AlertTitle>
          <AlertDescription>
            Form submitted successfully!
          </AlertDescription>
        </Alert>
      )}

      {formConfig.map((field) => (
        <div key={field.name} className="space-y-2">

          {field.type !== "checkbox" && (
            <Label
              htmlFor={field.name}
              className="text-sm font-medium text-gray-700"
            >
              {field.label}
            </Label>
          )}

          {renderField(field)}

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