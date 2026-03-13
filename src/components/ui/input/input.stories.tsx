import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "./input"

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "Enter text...",
  },
}

export default meta

type Story = StoryObj<typeof Input>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}

export const Email: Story = {
  args: {
    type: "email",
    placeholder: "Enter your email",
  },
}

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "Enter password",
  },
}