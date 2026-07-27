import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";
export type Language = "English" | "Spanish" | "French";
export type FontSize = "Small" | "Medium" | "Large";

export interface SettingsState {
  theme: Theme;
  language: Language;
  fontSize: FontSize;
  sidebarCollapsed: boolean;
}

const initialState: SettingsState = {
  theme: "light",
  language: "English",
  fontSize: "Medium",
  sidebarCollapsed: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setTheme: (
      state,
      action: PayloadAction<Theme>
    ) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme =
        state.theme === "light" ? "dark" : "light";
    },

    setLanguage: (
      state,
      action: PayloadAction<Language>
    ) => {
      state.language = action.payload;
    },

    setFontSize: (
      state,
      action: PayloadAction<FontSize>
    ) => {
      state.fontSize = action.payload;
    },

    setSidebarCollapsed: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.sidebarCollapsed = action.payload;
    },

    resetSettings: () => initialState,
  },
});

export const {
  setTheme,
  toggleTheme,
  setLanguage,
  setFontSize,
  setSidebarCollapsed,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer;