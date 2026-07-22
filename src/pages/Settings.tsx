import React, { useState } from "react";

const LANGUAGES = ["English", "Spanish", "French"];
const FONT_SIZES = ["Small", "Medium", "Large"];

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("Medium");

  const dropdownStyle =
    "w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 shadow-sm outline-none transition-all duration-300 ease-in-out hover:bg-white focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200";

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    options: string[],
    setter: React.Dispatch<React.SetStateAction<string>>,
    defaultValue: string
  ) => {
    const { value } = e.target;
    setter(options.includes(value) ? value : defaultValue);
  };

  const isSettingsValid =
    LANGUAGES.includes(language) &&
    FONT_SIZES.includes(fontSize);

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 transition-all duration-300 ease-in-out hover:text-gray-700">
            Settings
          </h1>

          <p className="mt-3 text-gray-500">
            Customize your application preferences.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Theme Toggle */}
<SettingItem
  title="Theme"
  description="Switch between Light and Dark mode."
>
  <div className="flex items-center justify-between">
    <span className="text-sm font-medium text-gray-700">
      {isDarkMode ? "Dark" : "Light"}
    </span>

    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      onClick={() => setIsDarkMode((prev) => !prev)}
      className={`relative h-7 w-14 rounded-full transition-colors duration-500 ease-in-out ${
        isDarkMode ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-500 ease-in-out ${
          isDarkMode ? "translate-x-7" : "translate-x-0"
        }`}
      />
    </button>
  </div>
</SettingItem>
          {/* Language */}
          <SettingItem
            title="Language"
            description="Select your preferred language."
          >
            <select
              value={language}
              onChange={(e) =>
                handleChange(
                  e,
                  LANGUAGES,
                  setLanguage,
                  "English"
                )
              }
              className={dropdownStyle}
            >
              {LANGUAGES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </SettingItem>

          {/* Font Size */}
          <SettingItem
            title="Font Size"
            description="Adjust text readability."
          >
            <select
              value={fontSize}
              onChange={(e) =>
                handleChange(
                  e,
                  FONT_SIZES,
                  setFontSize,
                  "Medium"
                )
              }
              className={dropdownStyle}
            >
              {FONT_SIZES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </SettingItem>
        </div>

        {/* Current Preferences */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Current Preferences
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <PreferenceRow
              label="Theme"
              value={isDarkMode ? "Dark" : "Light"}
            />
            <PreferenceRow
              label="Language"
              value={language}
            />
            <PreferenceRow
              label="Font Size"
              value={fontSize}
            />
            <PreferenceRow
              label="Status"
              value={isSettingsValid ? "Valid" : "Invalid"}
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
};

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  children,
}) => (
  <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-gray-100 hover:shadow-md">
    <div className="mb-4">
      <h3 className="text-sm font-semibold text-gray-900">
        {title}
      </h3>

      <p className="mt-1 text-xs text-gray-500">
        {description}
      </p>
    </div>

    {children}
  </div>
);

const PreferenceRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <div className="flex justify-between rounded-lg px-3 py-2 transition-all duration-300 ease-in-out hover:bg-gray-100">
    <span>{label}</span>
    <span className="font-medium text-gray-900">
      {value}
    </span>
  </div>
);

export default Settings;