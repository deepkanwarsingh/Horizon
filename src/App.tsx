import Sidebar from "./components/Sidebar";
import Drawer from "./components/Drawer";
import AppRoutes from "./routes/AppRoutes";


import { useAppSelector } from "./hooks/reduxHooks";

function App() {
const theme = useAppSelector(
  (state) => state.settings.theme
);

const isDarkMode = theme === "dark";

  return (
    <div
      className={`
        h-screen
        w-full
        grid
        grid-cols-1
        md:grid-cols-[260px_1fr]
        overflow-hidden
        transition-colors
        duration-300
        ${
          isDarkMode
            ? "bg-gray-900 text-white"
            : "bg-gray-100 text-gray-900"
        }
      `}
    >
      <Drawer />

      <Sidebar />

      <main
        className="
          min-w-0
          overflow-y-auto
          overflow-x-hidden
          p-8
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1440px]
          "
        >
          <AppRoutes />
        </div>
      </main>
    </div>
  );
}

export default App;