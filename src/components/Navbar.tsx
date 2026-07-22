import { useState } from "react";
import { Bell, Search } from "lucide-react";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;

    if (!["light", "dark", "system"].includes(selectedTheme)) {
      return;
    }

    switch (selectedTheme) {
      case "light":
        setTheme("light");
        break;
      case "dark":
        setTheme("dark");
        break;
      case "system":
        setTheme("system");
        break;
      default:
        setTheme("light");
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white">
      <div className="flex h-20 items-center justify-between px-8">
        {/* Left */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Welcome back, Deepkanwar 👋
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="hidden items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 md:flex">
            <Search
              size={18}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-56 bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Theme */}
          <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
            <select
              value={theme}
              onChange={handleThemeChange}
              className="bg-transparent text-sm font-medium text-gray-700 outline-none"
            >
              <option value="light">🌞 Light</option>
              <option value="dark">🌙 Dark</option>
              <option value="system">💻 System</option>
            </select>
          </div>

          {/* Notification */}
          <button className="rounded-xl border border-gray-200 p-2.5 transition-colors hover:bg-gray-100">
            <Bell
              size={18}
              className="text-gray-600"
            />
          </button>

          {/* Profile */}
          <div className="flex cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-100">
            <img
              src="https://i.pravatar.cc/100"
              alt="Profile"
              className="h-10 w-10 rounded-full"
            />

            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                Deepkanwar
              </p>

              <p className="text-xs text-gray-500">
                Software Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;