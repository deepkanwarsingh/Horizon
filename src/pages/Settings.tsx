import { useState } from "react";

const Settings = () => {
  const [displayName, setDisplayName] = useState("John Doe");
  const [theme, setTheme] = useState("Light");
  const [language, setLanguage] = useState("English");
  const [fontSize, setFontSize] = useState("Medium");
  const [notifications, setNotifications] = useState(true);

  const isDark = theme === "Dark";

  const fontClasses = {
    Small: "text-sm",
    Medium: "text-base",
    Large: "text-lg",
  };

  const labels = {
    English: {
      settings: "Settings",
      description:
        "Manage your account preferences and application appearance.",
      theme: "Theme",
      language: "Language",
      fontSize: "Font Size",
      notifications: "Notifications",
      enabled: "Enabled",
      disabled: "Disabled",
    },

    Spanish: {
      settings: "Configuración",
      description:
        "Administra tus preferencias y apariencia.",
      theme: "Tema",
      language: "Idioma",
      fontSize: "Tamaño de fuente",
      notifications: "Notificaciones",
      enabled: "Activado",
      disabled: "Desactivado",
    },

    French: {
      settings: "Paramètres",
      description:
        "Gérez vos préférences et votre apparence.",
      theme: "Thème",
      language: "Langue",
      fontSize: "Taille du texte",
      notifications: "Notifications",
      enabled: "Activé",
      disabled: "Désactivé",
    },
  };

  const text = labels[language];

  const inputStyle = `
    rounded-lg
    border
    px-4
    py-2
    outline-none
    transition
    md:w-72
    ${
      isDark
        ? "border-gray-600 bg-gray-900 text-white focus:border-white"
        : "border-gray-300 bg-white text-gray-900 focus:border-black"
    }
  `;

  const divider = isDark
    ? "border-gray-700"
    : "border-gray-200";


  return (
    <div
      className={`
        min-h-screen
        px-8
        py-12
        transition-colors
        duration-300
        ${
          isDark
            ? "bg-[#111111] text-white"
            : "bg-gray-100 text-gray-900"
        }
      `}
    >

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-12">

          <h1 className="text-4xl font-bold tracking-tight">
            {text.settings}
          </h1>

          <p
            className={`
              mt-3
              ${
                isDark
                  ? "text-gray-400"
                  : "text-gray-500"
              }
            `}
          >
            {text.description}
          </p>

          <p className="mt-5 font-medium">
            Welcome, {displayName}
          </p>

        </div>


        {/* Settings Card */}
        <div
          className={`
            overflow-hidden
            rounded-2xl
            border
            shadow-sm
            ${
              isDark
                ? "border-gray-700 bg-[#181818]"
                : "border-gray-200 bg-white"
            }
          `}
        >


          {/* Display Name */}
          <div
            className={`
              flex
              flex-col
              gap-4
              border-b
              p-6
              md:flex-row
              md:items-center
              md:justify-between
              ${divider}
            `}
          >

            <div>
              <h3 className="font-semibold">
                Display Name
              </h3>

              <p
                className={
                  isDark
                    ? "text-sm text-gray-400"
                    : "text-sm text-gray-500"
                }
              >
                Update your profile name.
              </p>
            </div>


            <input
              value={displayName}
              onChange={(e)=>setDisplayName(e.target.value)}
              className={inputStyle}
            />

          </div>



          {/* Theme */}
          <SettingRow
            title={text.theme}
            dark={isDark}
            divider={divider}
          >
            <select
              value={theme}
              onChange={(e)=>setTheme(e.target.value)}
              className={inputStyle}
            >
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </SettingRow>



          {/* Language */}
          <SettingRow
            title={text.language}
            dark={isDark}
            divider={divider}
          >
            <select
              value={language}
              onChange={(e)=>setLanguage(e.target.value)}
              className={inputStyle}
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
            </select>
          </SettingRow>



          {/* Font */}
          <SettingRow
            title={text.fontSize}
            dark={isDark}
            divider={divider}
          >
            <select
              value={fontSize}
              onChange={(e)=>setFontSize(e.target.value)}
              className={inputStyle}
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </SettingRow>



          {/* Notifications */}
          <div className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">

            <h3 className="font-semibold">
              {text.notifications}
            </h3>


            <button
              onClick={()=>setNotifications(!notifications)}
              className={`
                rounded-lg
                px-5
                py-2
                font-medium
                transition
                md:w-72
                ${
                  notifications
                    ? "bg-white text-black hover:bg-gray-200"
                    : isDark
                    ? "border border-gray-600 text-white hover:bg-gray-700"
                    : "border text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              {
                notifications
                ? text.enabled
                : text.disabled
              }
            </button>

          </div>

        </div>



        {/* Preview */}
        <div
          className={`
            mt-8
            rounded-2xl
            border
            p-6
            ${
              isDark
                ? "border-gray-700 bg-[#181818]"
                : "border-gray-200 bg-white"
            }
          `}
        >

          <h2 className="mb-4 text-xl font-semibold">
            Preview
          </h2>


          <div className={fontClasses[fontSize]}>

            <p>User: {displayName}</p>

            <p>
              Theme: {theme}
            </p>

            <p>
              Language: {language}
            </p>

            <p>
              Notifications:
              {" "}
              {
                notifications
                  ? text.enabled
                  : text.disabled
              }
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};



const SettingRow = ({
  title,
  children,
  divider,
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        gap-4
        border-b
        p-6
        md:flex-row
        md:items-center
        md:justify-between
        ${divider}
      `}
    >
      <h3 className="font-semibold">
        {title}
      </h3>

      {children}

    </div>
  );
};


export default Settings;
