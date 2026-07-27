import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DashboardState {
  activeTab: string;
  navigationHistory: string[];
  historyIndex: number;
}

const initialState: DashboardState = {
  activeTab: "projects",
  navigationHistory: ["projects"],
  historyIndex: 0,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },

    addNavigationHistory: (
      state,
      action: PayloadAction<string>
    ) => {
      state.navigationHistory.push(action.payload);
      state.historyIndex++;
    },

    setNavigationHistory: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.navigationHistory = action.payload;
    },

    setHistoryIndex: (
      state,
      action: PayloadAction<number>
    ) => {
      state.historyIndex = action.payload;
    },

    resetHistory: (state) => {
      state.navigationHistory = ["projects"];
      state.historyIndex = 0;
    },
  },
});

export const {
  setActiveTab,
  addNavigationHistory,
  setNavigationHistory,
  setHistoryIndex,
  resetHistory,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;