import React, { useState } from "react";

const Settings = () => {
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("Medium");

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const allowedThemes = ["Light", "Dark", "System"];

    if (!allowedThemes.includes(value)) return;

    switch (value) {
      case "Light":
      case "Dark":
      case "System":
        setTheme(value);
        break;
      default:
        setTheme("Light");
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const allowedLanguages = ["English", "Spanish", "French"];

    if (allowedLanguages.includes(value)) {
      setLanguage(value);
    }
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    setFontSize(
      ["Small", "Medium", "Large"].includes(value)
        ? value
        : "Medium"
    );
  };

  const dropdownStyle =
    "w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium text-gray-800 shadow-sm outline-none transition duration-200 hover:bg-white focus:border-gray-400 focus:bg-white focus:ring-2 focus:ring-gray-200";

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-6 py-12">
      <div className="mx-auto max-w-4xl">

        <div className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Settings
          </h1>
          <p className="mt-3 text-gray-500">
            Customize your application preferences.
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:grid-cols-2">

          <SettingItem title="Theme" description="Choose how the application looks.">
            <select value={theme} onChange={handleThemeChange} className={dropdownStyle}>
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </SettingItem>

          <SettingItem title="Language" description="Select your preferred language.">
            <select value={language} onChange={handleLanguageChange} className={dropdownStyle}>
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </SettingItem>

          <SettingItem title="Font Size" description="Adjust text readability.">
            <select value={fontSize} onChange={handleFontSizeChange} className={dropdownStyle}>
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </SettingItem>

        </div>

        {/* Current Preferences */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">
            Current Preferences
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <PreferenceRow label="Theme" value={theme} />
            <PreferenceRow label="Language" value={language} />
            <PreferenceRow label="Font Size" value={fontSize} />
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
}) => {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition duration-200 hover:bg-gray-100">
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
};


const PreferenceRow = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className="font-medium text-gray-900">{value}</span>
    </div>
  );
};


export default Settings;