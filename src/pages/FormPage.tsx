import { useForm } from "react-hook-form"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getUsers, updateUser, createUser } from "@/services/userService"
import DynamicForm from "@/components/form/DynamicForm"
import type { Field, FormData, PageForm, User } from "@/components/form/types"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card/card"
import { Badge } from "@/components/ui/badge/badge"
import { Separator } from "@/components/ui/separator/separator"

const formConfig: Field[] = [
  { label: "Username",   type: "text", name: "username" },
  { label: "First Name", type: "text", name: "firstname", required: true },
  { label: "Last Name",  type: "text", name: "lastname" },
  { label: "Email",      type: "text", name: "email" },
  { label: "Phone",      type: "text", name: "phone" },

]

const FormPage = () => {
  const { watch, setValue } = useForm<PageForm>({
    defaultValues: { selectedUserId: "" }
  })

  const selectedUserId = watch("selectedUserId")


  const { data: users, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

const { data: selectedUser } = useQuery({
  queryKey: ["users", selectedUserId],
  queryFn: getUsers,
  enabled: !!selectedUserId,
  select: (users: User[]) => users.find(u => String(u.id) === selectedUserId),
})


const { data: initialData } = useQuery({
  queryKey: ["users", selectedUserId],
  queryFn: getUsers,
  enabled: !!selectedUserId,
  select: (users: User[]): FormData | undefined => {
    const user = users.find(u => String(u.id) === selectedUserId)
    if (!user) return undefined
    return {
      username:  user.username,
      firstname: user.name.firstname,
      lastname:  user.name.lastname,
      email:     user.email,
      phone:     user.phone,
      
    }
  },
})

const updateMutation = useMutation({
  mutationFn: (data: FormData) => {
    if (!selectedUser) throw new Error("No user selected")
    return updateUser(selectedUser.id, data)  
  },
})

  const createMutation = useMutation({
    mutationFn: (data: FormData) => createUser(data),
    onSuccess: (data) => {
      console.log("Created:", data)
      setValue("selectedUserId", "")
    },
  })

  const handleSubmit = (data: FormData) => {
    if (selectedUserId) updateMutation.mutate(data)
    else                createMutation.mutate(data)
  }

  const mode      = selectedUserId ? "edit" : "create"
  const isSuccess = updateMutation.isSuccess || createMutation.isSuccess

  if (isLoading) return <p className="p-8 text-gray-500">Loading users...</p>
  if (isError)   return <p className="p-8 text-red-500">Failed to load users.</p>

  return (
    <div className="flex justify-center p-8 min-h-screen bg-gray-50">
      <Card className="w-full max-w-md h-fit">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">User Form</CardTitle>
            <Badge variant={mode === "create" ? "default" : "secondary"}>
              {mode === "create" ? "New User" : "Editing"}
            </Badge>
          </div>

          <Select
            value={selectedUserId}
            onValueChange={(val) => setValue("selectedUserId", val)}
          >
            <SelectTrigger className="w-full mt-2">
              <SelectValue placeholder="Select a user to edit..." />
            </SelectTrigger>
            <SelectContent>
              {users?.map((user) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.name.firstname} {user.name.lastname} • @{user.username}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6 space-y-6">
          {isSuccess && (
            <p className="text-green-600 text-sm text-center bg-green-50 p-2 rounded-lg">
              {mode === "create" ? "User created!" : "User updated!"} 
            </p>
          )}

          <DynamicForm
            formConfig={formConfig}
            onSubmit={handleSubmit}
            initialData={initialData}  
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default FormPage