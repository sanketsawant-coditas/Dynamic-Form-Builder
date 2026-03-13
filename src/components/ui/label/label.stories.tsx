import type { Meta, StoryObj } from "@storybook/react"
import { Label } from "./label"
import { Input } from "../input/input"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => <Label>Email Address</Label>,
}

export const WithInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <Label htmlFor="email">Email</Label>
      <Input id="email" placeholder="Enter your email" />
    </div>
  ),
}

export const DisabledInput: Story = {
  render: () => (
    <div className="flex flex-col gap-2 max-w-sm">
      <Label htmlFor="username">Username</Label>
      <Input id="username" disabled placeholder="Disabled input" />
    </div>
  ),
}