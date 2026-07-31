import SettingItem from "./SettingsItem";


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

type Props = {
  theme: "light" | "dark";
  language: typeof LANGUAGES[number];
  fontSize: typeof FONT_SIZES[number];
  isDarkMode: boolean;

  onThemeChange: (
    value: "light" | "dark"
  ) => void;

  onLanguageChange: (
    value: typeof LANGUAGES[number]
  ) => void;

  onFontSizeChange: (
    value: typeof FONT_SIZES[number]
  ) => void;
};

const SettingsActions = ({
  theme,
  language,
  fontSize,
  isDarkMode,
  onThemeChange,
  onLanguageChange,
  onFontSizeChange,
}: Props) => {
  const dropdownStyle = `
    w-full
    rounded-xl
    px-4
    py-3
    text-sm
    ${
      isDarkMode
        ? "border border-gray-700 bg-gray-800 text-white"
        : "border border-gray-200 bg-gray-50 text-gray-900"
    }
  `;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <SettingItem
        title="Theme"
        description="Switch between Light and Dark mode."
        isDarkMode={isDarkMode}
      >
        <div className="flex items-center justify-between">
          <span>
            {theme === "dark"
              ? "Dark"
              : "Light"}
          </span>

          <button
            type="button"
            onClick={() =>
              onThemeChange(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className={`relative h-7 w-14 rounded-full ${
              isDarkMode
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white ${
                isDarkMode
                  ? "translate-x-7"
                  : ""
              }`}
            />
          </button>
        </div>
      </SettingItem>

      <SettingItem
        title="Language"
        description="Select your preferred language."
        isDarkMode={isDarkMode}
      >
        <select
          value={language}
          className={dropdownStyle}
          onChange={(e) =>
            onLanguageChange(
              e.target
                .value as typeof LANGUAGES[number]
            )
          }
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

      <SettingItem
        title="Font Size"
        description="Adjust text readability."
        isDarkMode={isDarkMode}
      >
        <select
          value={fontSize}
          className={dropdownStyle}
          onChange={(e) =>
            onFontSizeChange(
              e.target
                .value as typeof FONT_SIZES[number]
            )
          }
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
  );
};

export default SettingsActions;