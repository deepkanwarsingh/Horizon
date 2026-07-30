import type { Meta, StoryObj } from "@storybook/react";
import Button from "../components/subComponents/Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: "Primary Button",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled Button",
    disabled: true,
  },
};

export const Submit: Story = {
  args: {
    type: "submit",
    children: "Submit",
  },
};

export const Reset: Story = {
  args: {
    type: "reset",
    children: "Reset",
  },
};

export const LongText: Story = {
  args: {
    children: "Create New Workspace",
  },
};

export const CustomWidth: Story = {
  args: {
    children: "Full Width",
    className: "w-full",
  },
};

export const Rounded: Story = {
  args: {
    children: "Rounded Button",
    className: "rounded-full",
  },
};

export const Large: Story = {
  args: {
    children: "Large Button",
    className: "px-8 py-4 text-base",
  },
};

export const Small: Story = {
  args: {
    children: "Small Button",
    className: "px-3 py-2 text-xs",
  },
};