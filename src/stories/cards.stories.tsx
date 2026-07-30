import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";

import Card from "../components/subComponents/Card";
import { store } from "../app/store";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <div className="max-w-md p-6">
          <Story />
        </div>
      </Provider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 className="text-lg font-semibold">Project Overview</h3>
        <p className="mt-2 text-sm text-gray-500">
          This is a reusable card component.
        </p>
      </div>
    ),
  },
};

export const WithButton: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Workspace</h3>
        <p className="text-sm text-gray-500">
          Manage your projects and tasks.
        </p>
        <button className="rounded bg-black px-4 py-2 text-white">
          Open
        </button>
      </div>
    ),
  },
};

export const Empty: Story = {
  args: {
    children: <p>No data available.</p>,
  },
};

export const CustomPadding: Story = {
  args: {
    className: "p-10",
    children: (
      <div>
        <h3 className="text-lg font-semibold">Large Padding</h3>
        <p>This card uses custom padding.</p>
      </div>
    ),
  },
};

export const FixedHeight: Story = {
  args: {
    className: "h-64",
    children: (
      <div className="flex h-full items-center justify-center">
        Fixed Height Card
      </div>
    ),
  },
};