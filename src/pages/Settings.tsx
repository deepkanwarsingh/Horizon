import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  setTheme,
  setLanguage,
  setFontSize,
} from "../features/settings/settingsSlice";

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

  const dropdownStyle = `
    w-full
    cursor-pointer
    appearance-none
    rounded-xl
    px-4
    py-3
    text-sm
    font-medium
    shadow-sm
    outline-none
    transition-all
    duration-300
    ${
      isDarkMode
        ? "border border-gray-700 bg-gray-800 text-white hover:bg-gray-700 focus:border-blue-500 focus:bg-gray-700"
        : "border border-gray-200 bg-gray-50 text-gray-800 hover:bg-white focus:border-gray-400 focus:bg-white"
    }
  `;

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Theme */}

          <SettingItem
            title="Theme"
            description="Switch between Light and Dark mode."
            isDarkMode={isDarkMode}
          >
            <div className="flex items-center justify-between">
              <span
                className={`text-sm font-medium ${
                  isDarkMode
                    ? "text-gray-200"
                    : "text-gray-700"
                }`}
              >
                {isDarkMode ? "Dark" : "Light"}
              </span>

              <button
                type="button"
                role="switch"
                aria-checked={isDarkMode}
                onClick={() =>
                  dispatch(
                    setTheme(
                      isDarkMode
                        ? "light"
                        : "dark"
                    )
                  )
                }
                className={`relative h-7 w-14 rounded-full transition-colors duration-500 ${
                  isDarkMode
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              >
                <span
                  className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-500 ${
                    isDarkMode
                      ? "translate-x-7"
                      : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </SettingItem>

          {/* Language */}

          <SettingItem
            title="Language"
            description="Select your preferred language."
            isDarkMode={isDarkMode}
          >
            <select
              value={language}
              onChange={(e) =>
                dispatch(
                  setLanguage(
                    LANGUAGES.includes(
                      e.target
                        .value as (typeof LANGUAGES)[number]
                    )
                      ? (e.target
                          .value as (typeof LANGUAGES)[number])
                      : "English"
                  )
                )
              }
              className={dropdownStyle}
            >
              {LANGUAGES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </SettingItem>

          {/* Font Size */}

          <SettingItem
            title="Font Size"
            description="Adjust text readability."
            isDarkMode={isDarkMode}
          >
            <select
              value={fontSize}
              onChange={(e) =>
                dispatch(
                  setFontSize(
                    FONT_SIZES.includes(
                      e.target
                        .value as (typeof FONT_SIZES)[number]
                    )
                      ? (e.target
                          .value as (typeof FONT_SIZES)[number])
                      : "Medium"
                  )
                )
              }
              className={dropdownStyle}
            >
              {FONT_SIZES.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </SettingItem>
        </div>

        {/* Current Preferences */}

        <div
          className={`mt-8 rounded-2xl p-6 shadow-sm transition-all duration-300 ${
            isDarkMode
              ? "border border-gray-700 bg-gray-800"
              : "border border-gray-200 bg-white"
          }`}
        >
          <h2
            className={`mb-5 text-lg font-semibold ${
              isDarkMode
                ? "text-white"
                : "text-gray-900"
            }`}
          >
            Current Preferences
          </h2>

          <div
            className={`space-y-3 text-sm ${
              isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            <PreferenceRow
              label="Theme"
              value={
                isDarkMode ? "Dark" : "Light"
              }
              isDarkMode={isDarkMode}
            />

            <PreferenceRow
              label="Language"
              value={language}
              isDarkMode={isDarkMode}
            />

            <PreferenceRow
              label="Font Size"
              value={fontSize}
              isDarkMode={isDarkMode}
            />

            <PreferenceRow
              label="Status"
              value={
                isSettingsValid
                  ? "Valid"
                  : "Invalid"
              }
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
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