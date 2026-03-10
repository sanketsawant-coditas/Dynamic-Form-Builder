import { useState, useCallback } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Input } from "../ui/input";

export type FieldType = "text" | "number" | "checkbox" | "select";

export type Field = {
  label: string;
  type: FieldType;
  name: string;
  options?: string[];
};

type DynamicFormProps = {
  formConfig: Field[];
};

type FormData = Record<string, string | number | boolean>;

function DynamicForm({ formConfig }: DynamicFormProps) {

  // Create initial state dynamically
  const initialState = formConfig.reduce((acc, field) => {
    acc[field.name] = field.type === "checkbox" ? false : "";
    return acc;
  }, {} as FormData);

  const [formData, setFormData] = useState<FormData>(initialState);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

      const { name, value, type } = e.target;

      setFormData((prev) => ({
        ...prev,
        [name]:
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : value,
      }));
    },
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    alert("Form Submitted Successfully!");

    console.log("Form Data:", formData);
  };

  const renderField = (field: Field) => {

    const value = formData[field.name];

    switch (field.type) {

      case "select":
        return (
          <select
            name={field.name}
            value={value as string}
            onChange={handleChange}
          >
            <option value="">Select</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "checkbox":
        return (
          <Input
            type="checkbox"
            name={field.name}
            checked={value as boolean}
            onChange={handleChange}
          />
        );

      default:
        return (
          <input
            type={field.type}
            name={field.name}
            value={value as string | number}
            onChange={handleChange}
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit}>

      {formConfig.map((field) => (
        <div key={field.name} style={{ marginBottom: "12px" }}>
          <label htmlFor={field.name}>{field.label}</label>
          <br />
          {renderField(field)}
        </div>
      ))}

      <button type="submit">Submit</button>

    </form>
  );
}

export default DynamicForm;