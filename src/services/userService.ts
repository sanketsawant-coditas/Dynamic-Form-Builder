import axios from "axios"
import type { User } from "../components/form/types"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get("/users")
  return response.data
}

export const updateUser = async (id: number, data: Record<string, string | number | boolean>): Promise<User> => {
  const response = await api.put(`/users/${id}`, data)
  return response.data
}

export const createUser = async (data: Record<string, string | number | boolean>): Promise<User> => {
  const response = await api.post("/users", data)  
  return response.data
}