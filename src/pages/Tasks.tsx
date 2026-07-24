import { useMemo } from "react";
import { Search, Filter, X } from "lucide-react";

import Workspace from "../components/WorkSpace";
import useValidatedRoute from "../hooks/useValidateRoute";
import TaskGrid, { type Task } from "../components/tasks/TaskGrid";

const TASKS: Task[] = [
  {
    id: 1,
    title: "Design Dashboard UI",
    priority: "High",
    status: "In Progress",
    assignee: "John",
  },
  {
    id: 2,
    title: "API Integration",
    priority: "Medium",
    status: "Pending",
    assignee: "Alice",
  },
  {
    id: 3,
    title: "Authentication Module",
    priority: "High",
    status: "Completed",
    assignee: "David",
  },
  {
    id: 4,
    title: "Testing",
    priority: "Low",
    status: "In Progress",
    assignee: "Emma",
  },
  {
    id: 5,
    title: "Documentation",
    priority: "Low",
    status: "Completed",
    assignee: "Sophia",
  },
  {
    id: 6,
    title: "Performance Optimization",
    priority: "Medium",
    status: "Pending",
    assignee: "Chris",
  },
];

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white";

const formatOption = (value: string) =>
  value.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

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

const Tasks = () => {
  const { search, priority, status, updateQuery } =
    useValidatedRoute();

  const clearQuery = () => {
    updateQuery("q", "");
    updateQuery("priority", "all");
    updateQuery("status", "all");
  };

  const filterFields = [
    {
      key: "q",
      label: "Search",
      value: search,
      type: "search",
      placeholder: "Search tasks...",
    },
    {
      key: "priority",
      label: "Priority",
      value: priority,
      options: ["all", "high", "medium", "low"],
    },
    {
      key: "status",
      label: "Status",
      value: status,
      options: [
        "all",
        "in-progress",
        "pending",
        "completed",
      ],
    },
  ];

  const filteredTasks = useMemo(
    () =>
      TASKS.filter((task) => {
        const searchMatch =
          task.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          task.assignee
            .toLowerCase()
            .includes(search.toLowerCase());

        const priorityMatch =
          priority === "all" ||
          task.priority.toLowerCase() ===
            priority.toLowerCase();

        const statusMatch =
          status === "all" ||
          task.status
            .toLowerCase()
            .replace(/\s/g, "-") === status;

        return (
          searchMatch &&
          priorityMatch &&
          statusMatch
        );
      }),
    [search, priority, status]
  );

  return (
    <Workspace
      subtitle="Workspace"
      title="Task Manager"
      description="Manage, search and filter workspace tasks."
    >
      <div className="mb-8 rounded-2xl  bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center">
          <div className="rounded-xl bg-blue-100 p-2 text-blue-600">
            <Filter size={18} />
          </div>

          <div className="ml-3">
            <h2 className="font-semibold">
              Task Filters
            </h2>

            <p className="text-xs text-gray-500">
              Find tasks instantly
            </p>
          </div>

          <Badge className="ml-auto bg-blue-100 text-blue-700">
            {filteredTasks.length} Tasks
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {filterFields.map((field) => (
            <div key={field.key}>
              <label className="mb-2 block text-sm font-medium">
                {field.label}
              </label>

              {field.type === "search" ? (
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-400"
                  />

                  <input
                    value={field.value}
                    placeholder={field.placeholder}
                    onChange={(e) =>
                      updateQuery(
                        field.key,
                        e.target.value
                      )
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>
              ) : (
                <select
                  value={field.value}
                  onChange={(e) =>
                    updateQuery(
                      field.key,
                      e.target.value
                    )
                  }
                  className={inputClass}
                >
                  {field.options?.map((option) => (
                    <option
                      key={option}
                      value={option}
                    >
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
          className="mt-5 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:bg-gray-100"
        >
          <X size={16} />
          Clear Filters
        </button>
      </div>
            {/* Task Grid */}
      <TaskGrid tasks={filteredTasks} />

      {filteredTasks.length === 0 && (
        <div className="mt-10 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <h3 className="text-lg font-semibold text-gray-700">
            No tasks found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Try changing your search or filters.
          </p>

          <button
            onClick={clearQuery}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      )}
    </Workspace>
  );
};

export default Tasks;