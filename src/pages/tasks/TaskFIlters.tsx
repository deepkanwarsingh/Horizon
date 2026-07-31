import { Search, Filter, X } from "lucide-react";
import React from "react";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white";

const formatOption = (value: string) =>
  value
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

interface TaskFiltersProps {
  isDarkMode: boolean;
  filteredCount: number;
  search: string;
  priority: string;
  status: string;
  clearQuery: () => void;
  onSearchChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const TaskFilters = ({
  isDarkMode,
  filteredCount,
  search,
  priority,
  status,
  clearQuery,
  onSearchChange,
  onPriorityChange,
  onStatusChange,
}: TaskFiltersProps) => {
  const filters = [
    {
      key: "search",
      label: "Search",
      value: search,
      type: "search",
      placeholder: "Search tasks...",
      onChange: onSearchChange,
    },
    {
      key: "priority",
      label: "Priority",
      value: priority,
      options: ["all", "high", "medium", "low"],
      onChange: onPriorityChange,
    },
    {
      key: "status",
      label: "Status",
      value: status,
      options: ["all", "in-progress", "pending", "completed"],
      onChange: onStatusChange,
    },
  ];

  return (
    <div
      className={`mb-8 rounded-2xl p-6 shadow-sm transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="mb-5 flex items-center">
        <div
          className={`rounded-xl p-2 ${
            isDarkMode
              ? "bg-blue-900/30 text-blue-400"
              : "bg-blue-100 text-blue-600"
          }`}
        >
          <Filter size={18} />
        </div>

        <div className="ml-3">
          <h2
            className={`font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Task Filters
          </h2>

          <p
            className={`text-xs ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Find tasks instantly
          </p>
        </div>

        <Badge
          className={`ml-auto ${
            isDarkMode
              ? "bg-blue-900/30 text-blue-300"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {filteredCount} Tasks
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {filters.map((filter) => (
          <div key={filter.key}>
            <label
              className={`mb-2 block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {filter.label}
            </label>

            {filter.type === "search" ? (
              <div className="relative">
                <Search
                  size={18}
                  className={`absolute left-3 top-3.5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />

                <input
                  value={filter.value}
                  placeholder={filter.placeholder}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className={`${inputClass} pl-10 ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                      : ""
                  }`}
                />
              </div>
            ) : (
              <select
                value={filter.value}
                onChange={(e) => filter.onChange(e.target.value)}
                className={`${inputClass} ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-900 text-white"
                    : ""
                }`}
              >
                {filter.options?.map((option) => (
                  <option key={option} value={option}>
                    {formatOption(option)}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={clearQuery}
        className={`mt-5 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
          isDarkMode
            ? "border-gray-700 text-gray-200 hover:bg-gray-700"
            : "border-gray-300 hover:bg-gray-100"
        }`}
      >
        <X size={16} />
        Clear Filters
      </button>
    </div>
  );
};

export default TaskFilters;