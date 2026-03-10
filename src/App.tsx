import DynamicForm, { type Field } from "./components/form/DynamicForm";


function App() {
  const formConfig: Field[] = [
    { label: "Name", type: "text", name: "name" },
    { label: "Age", type: "number", name: "age" },
    {
      label: "Gender",
      type: "select",
      name: "gender",
      options: ["Male", "Female", "Other"],
    },
    { label: "Subscribe", type: "checkbox", name: "subscribe" },
  ];

  return (
    <div>
      <h2>Dynamic Form</h2>
      <DynamicForm formConfig={formConfig} />
    </div>
  );
}

export default App;