import type { Meta, StoryObj } from "@storybook/react"
import { Alert, AlertTitle, AlertDescription, AlertAction } from "./alert"
import { Button } from "./button"

const meta: Meta<typeof Alert> = {
  title: "UI/Alert",
  component: Alert,
  tags: ["autodocs"],
}

export default meta

type Story = StoryObj<typeof Alert>

export const Default: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        This is a default alert message.
      </AlertDescription>
    </Alert>
  ),
}

export const Destructive: Story = {
  render: () => (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Something went wrong. Please try again.
      </AlertDescription>
    </Alert>
  ),
}

export const WithAction: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        A new version of the application is available.
      </AlertDescription>
      <AlertAction>
        <Button size="sm">Update</Button>
      </AlertAction>
    </Alert>
  ),
}