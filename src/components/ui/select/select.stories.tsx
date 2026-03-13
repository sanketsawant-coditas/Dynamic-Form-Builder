import type { Meta, StoryObj } from "@storybook/react"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select"

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
}