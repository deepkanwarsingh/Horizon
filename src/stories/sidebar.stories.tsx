import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import { LayoutProvider } from "../context/LayoutContext";
import { store } from "../app/store";

const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <Provider store={store}>
        <MemoryRouter>
          <LayoutProvider>
            <div className="h-screen">
              <Story />
            </div>
          </LayoutProvider>
        </MemoryRouter>
      </Provider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {};

export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const Desktop: Story = {
  parameters: {
    viewport: {
      defaultViewport: "responsive",
    },
  },
};