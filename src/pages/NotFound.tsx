import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const NotFound = () => {
  const navigate = useNavigate();
const theme = useAppSelector(
  (state) => state.settings?.theme ?? "light"
);

const isDarkMode = theme === "dark";

  return (
    <div
      className={`flex min-h-screen flex-col items-center justify-center px-6 ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      <h1
        className={`text-7xl font-bold ${
          isDarkMode ? "text-blue-400" : "text-blue-600"
        }`}
      >
        404
      </h1>

      <h2
        className={`mt-4 text-3xl font-semibold ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Page Not Found
      </h2>

      <p
        className={`mt-3 max-w-md text-center ${
          isDarkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        The page you're looking for doesn't exist or you don't have permission
        to access it.
      </p>

      <button
        type="button"
        onClick={() => navigate("/")}
        className={`mt-8 rounded-lg px-6 py-3 font-medium text-white transition ${
          isDarkMode ? "bg-blue-500 hover:bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default NotFound;