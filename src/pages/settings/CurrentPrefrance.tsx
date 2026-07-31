import React from "react";

type CurrentPreferencesProps = {
  theme: "light" | "dark";
  language: string;
  fontSize: string;
  isSettingsValid: boolean;
  isDarkMode: boolean;
};

const CurrentPreferences: React.FC<
  CurrentPreferencesProps
> = ({
  theme,
  language,
  fontSize,
  isSettingsValid,
  isDarkMode,
}) => {
  return (
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
            theme === "dark"
              ? "Dark"
              : "Light"
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
  );
};

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

export default CurrentPreferences;