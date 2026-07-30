interface NavigationHistoryProps {
  navigationHistory: string[];
  historyIndex: number;
  isDarkMode: boolean;
}

const NavigationHistory = ({
  navigationHistory,
  historyIndex,
  isDarkMode,
}: NavigationHistoryProps) => {
  return (
    <div
      className={`mb-6 rounded-lg p-4 ${
        isDarkMode
          ? "border border-gray-700 bg-gray-800"
          : "bg-gray-50"
      }`}
    >
      <h3
        className={`mb-2 font-semibold ${
          isDarkMode
            ? "text-white"
            : "text-gray-800"
        }`}
      >
        Navigation History
      </h3>

      <p
        className={`text-sm ${
          isDarkMode
            ? "text-gray-300"
            : "text-gray-600"
        }`}
      >
        <strong>History Index:</strong> {historyIndex}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {navigationHistory.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              isDarkMode
                ? "bg-blue-900 text-blue-200"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {index + 1}. {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NavigationHistory;