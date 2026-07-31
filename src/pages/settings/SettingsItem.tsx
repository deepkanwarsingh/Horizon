import React from "react";

type SettingItemProps = {
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  isDarkMode: boolean;
};

const SettingItem: React.FC<SettingItemProps> = ({
  title,
  description,
  children,
  isDarkMode,
}) => {
  return (
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

        {description && (
          <p
            className={`mt-1 text-xs ${
              isDarkMode
                ? "text-gray-400"
                : "text-gray-500"
            }`}
          >
            {description}
          </p>
        )}
      </div>

      {children}
    </div>
  );
};

export default SettingItem;