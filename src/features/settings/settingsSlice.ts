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

// ----------------------
// Local Storage Helpers
// ----------------------

const getStoredTheme = (): Theme => {
  const theme = localStorage.getItem("theme");

  return theme === "dark" || theme === "light"
    ? theme
    : "light";
};

const getStoredLanguage = (): Language => {
  const language = localStorage.getItem("language");

  return language === "English" ||
    language === "Spanish" ||
    language === "French"
    ? language
    : "English";
};

const getStoredFontSize = (): FontSize => {
  const fontSize = localStorage.getItem("fontSize");

  return fontSize === "Small" ||
    fontSize === "Medium" ||
    fontSize === "Large"
    ? fontSize
    : "Medium";
};

const getStoredSidebar = (): boolean => {
  return localStorage.getItem("sidebarCollapsed") === "true";
};

// ----------------------
// Initial State
// ----------------------

const initialState: SettingsState = {
  theme: getStoredTheme(),
  language: getStoredLanguage(),
  fontSize: getStoredFontSize(),
  sidebarCollapsed: getStoredSidebar(),
};

// ----------------------
// Slice
// ----------------------

const settingsSlice = createSlice({
  name: "settings",
  initialState,

  reducers: {
    setTheme: (
      state,
      action: PayloadAction<Theme>
    ) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },

    toggleTheme: (state) => {
      state.theme =
        state.theme === "light"
          ? "dark"
          : "light";

      localStorage.setItem("theme", state.theme);
    },

    setLanguage: (
      state,
      action: PayloadAction<Language>
    ) => {
      state.language = action.payload;

      localStorage.setItem(
        "language",
        action.payload
      );
    },

    setFontSize: (
      state,
      action: PayloadAction<FontSize>
    ) => {
      state.fontSize = action.payload;

      localStorage.setItem(
        "fontSize",
        action.payload
      );
    },

    setSidebarCollapsed: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.sidebarCollapsed = action.payload;

      localStorage.setItem(
        "sidebarCollapsed",
        String(action.payload)
      );
    },

    resetSettings: (state) => {
      state.theme = "light";
      state.language = "English";
      state.fontSize = "Medium";
      state.sidebarCollapsed = false;

      localStorage.setItem("theme", "light");
      localStorage.setItem(
        "language",
        "English"
      );
      localStorage.setItem(
        "fontSize",
        "Medium"
      );
      localStorage.setItem(
        "sidebarCollapsed",
        "false"
      );
    },
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