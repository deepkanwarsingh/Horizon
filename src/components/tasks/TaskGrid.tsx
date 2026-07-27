import React from "react";
import {
  User,
  Flag,
  CircleDot,
} from "lucide-react";

import { useAppSelector } from "../../hooks/reduxHooks";

export type Task = {
  id: number;
  title: string;
  priority: "High" | "Medium" | "Low";
  status: "Completed" | "Pending" | "In Progress";
  assignee: string;
};

type Props = {
  tasks: Task[];
};

const priorityColors = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

const statusColors = {
  Completed: "bg-green-100 text-green-700",
  Pending: "bg-orange-100 text-orange-700",
  "In Progress": "bg-blue-100 text-blue-700",
};

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${className}`}
  >
    {children}
  </span>
);

export default function TaskGrid({
  tasks,
}: Props) {
  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task, index) => {
        const row = Math.floor(index / 3) + 1;
        const column = (index % 3) + 1;

        return (
          <div
            key={task.id}
            className={`
              group
              rounded-2xl
              p-6
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-xl
              ${
                isDarkMode
                  ? "border border-gray-700 bg-gray-800 hover:border-blue-500"
                  : "bg-white hover:border-blue-300"
              }
            `}
          >
            {/* Header */}
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h3
                  className={`text-lg font-bold transition ${
                    isDarkMode
                      ? "text-white group-hover:text-blue-400"
                      : "text-gray-800 group-hover:text-blue-600"
                  }`}
                >
                  {task.title}
                </h3>

                <div
                  className={`mt-2 flex items-center gap-2 text-sm ${
                    isDarkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  <User size={15} />
                  {task.assignee}
                </div>
              </div>

              <Badge
                className={
                  isDarkMode
                    ? "bg-gray-700 text-gray-200"
                    : "bg-gray-100 text-gray-700"
                }
              >
                #{task.id}
              </Badge>
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  <Flag size={15} />
                  Priority
                </div>

                <Badge
                  className={
                    priorityColors[
                      task.priority as keyof typeof priorityColors
                    ]
                  }
                >
                  {task.priority}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center gap-2 text-sm ${
                    isDarkMode
                      ? "text-gray-400"
                      : "text-gray-500"
                  }`}
                >
                  <CircleDot size={15} />
                  Status
                </div>

                <Badge
                  className={
                    statusColors[
                      task.status as keyof typeof statusColors
                    ]
                  }
                >
                  {task.status}
                </Badge>
              </div>
            </div>

            {/* Footer */}
            <div
              className={`mt-6 rounded-xl p-4 ${
                isDarkMode
                  ? "bg-gray-900"
                  : "bg-gray-50"
              }`}
            >
              <p
                className={`mb-2 text-xs font-semibold uppercase tracking-wide ${
                  isDarkMode
                    ? "text-gray-400"
                    : "text-gray-500"
                }`}
              >
                Panel Position
              </p>

              <div
                className={`flex justify-between text-sm ${
                  isDarkMode
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                <span>
                  <strong>Row:</strong> {row}
                </span>

                <span>
                  <strong>Column:</strong> {column}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}