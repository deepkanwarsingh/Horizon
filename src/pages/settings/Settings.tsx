import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  setTheme,
  setLanguage,
  setFontSize,
} from "../../features/settings/settingsSlice";
import SettingsActions from "./SettingsAction";
import CurrentPreferences from "./CurrentPrefrance";

const LANGUAGES = [
  "English",
  "Spanish",
  "French",
] as const;

const FONT_SIZES = [
  "Small",
  "Medium",
  "Large",
] as const;

const Settings = () => {
  const dispatch = useAppDispatch();

  const { theme, language, fontSize } =
    useAppSelector((state) => state.settings);

  const isDarkMode = theme === "dark";

  const isSettingsValid =
    LANGUAGES.includes(language) &&
    FONT_SIZES.includes(fontSize);

  return (
    <div
      className={`min-h-screen px-6 py-12 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gray-900 text-white"
          : "bg-[#f7f7f5] text-gray-900"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}

        <div className="mb-10">
          <h1
            className={`text-4xl font-bold tracking-tight transition-colors duration-300 ${
              isDarkMode
                ? "text-white hover:text-gray-200"
                : "text-gray-900 hover:text-gray-700"
            }`}
          >
            Settings
          </h1>

          <p
            className={`mt-3 ${
              isDarkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            Customize your application preferences.
          </p>
        </div>

        {/* Settings Grid */}

<SettingsActions
  isDarkMode={isDarkMode}
  theme={theme}
  language={language}
  fontSize={fontSize}
  onThemeChange={(value) =>
    dispatch(setTheme(value))
  }
  onLanguageChange={(value) =>
    dispatch(setLanguage(value))
  }
  onFontSizeChange={(value) =>
    dispatch(setFontSize(value))
  }
/>

<CurrentPreferences
  theme={theme}
  language={language}
  fontSize={fontSize}
  isSettingsValid={isSettingsValid}
  isDarkMode={isDarkMode}
/>
      </div>
    </div>
  );
};
type SettingItemProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  isDarkMode: boolean;
};

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  children,
  isDarkMode,
}) => (
  <div
    className={`rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
      isDarkMode
        ? "border border-gray-700 bg-gray-800 hover:bg-gray-700"
        : "border border-gray-100 bg-gray-50 hover:bg-gray-100"
    }`}
  >
    <div className="mb-4">
      <h3
        className={`text-sm font-semibold ${
          isDarkMode
            ? "text-white"
            : "text-gray-900"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-1 text-xs ${
          isDarkMode
            ? "text-gray-400"
            : "text-gray-500"
        }`}
      >
        {description}
      </p>
    </div>

    {children}
  </div>
);

type PreferenceRowProps = {
  label: string;
  value: string;
  isDarkMode: boolean;
};

const PreferenceRow: React.FC<
  PreferenceRowProps
> = ({
  label,
  value,
  isDarkMode,
}) => (
  <div
    className={`flex justify-between rounded-lg px-3 py-2 transition-colors duration-300 ${
      isDarkMode
        ? "hover:bg-gray-700"
        : "hover:bg-gray-100"
    }`}
  >
    <span>{label}</span>

    <span
      className={`font-medium ${
        isDarkMode
          ? "text-white"
          : "text-gray-900"
      }`}
    >
      {value}
    </span>
  </div>
);

export default Settings;