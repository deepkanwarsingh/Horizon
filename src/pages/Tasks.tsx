import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import api from "../api/axios";

import Workspace from "../components/WorkSpace";
import TaskGrid, {
  type Task,
} from "../components/tasks/TaskGrid";

import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/reduxHooks";

import {
  setSearch,
  setPriority,
  setStatus,
  resetFilters,
} from "../features/filter/filterSlice";



const allowedValues = {
  priority: ["all", "high", "medium", "low"],
  status: [
    "all",
    "in-progress",
    "pending",
    "completed",
  ],
};

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:bg-white";

const formatOption = (value: string) =>
  value
    .replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

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
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const { search, priority, status } =
    useAppSelector((state) => state.filter);

  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

  // Read URL -> Redux
  useEffect(() => {
    const search = searchParams.get("q") || "";

    const priority =
      searchParams.get("priority") || "all";

    const status =
      searchParams.get("status") || "all";

    dispatch(setSearch(search));

    dispatch(
      setPriority(
        allowedValues.priority.includes(priority)
          ? priority
          : "all"
      )
    );

    dispatch(
      setStatus(
        allowedValues.status.includes(status)
          ? status
          : "all"
      )
    );
  }, [dispatch, searchParams]);

  // Redux -> URL
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("q", search);

    if (priority !== "all") {
      params.set("priority", priority);
    }

    if (status !== "all") {
      params.set("status", status);
    }

    setSearchParams(params, {
      replace: true,
    });
  }, [
    search,
    priority,
    status,
    setSearchParams,
  ]);

  useEffect(() => {
  const fetchTasks = async () => {
    const startTime = performance.now();

    try {
      setLoading(true);

      const response = await api.get("/tasks");

      setTasks(response.data);

      const endTime = performance.now();

      console.log("========== API Metrics ==========");
      console.log("Endpoint:", "/api/tasks");
      console.log("Method:", "GET");
      console.log("Status:", response.status);
      console.log(
        "Response Time:",
        `${(endTime - startTime).toFixed(2)} ms`
      );
      console.log(
        "Payload Size:",
        `${JSON.stringify(response.data).length} bytes`
      );
      console.log("===============================");
    } catch (err) {
      console.error(err);
      setError("Failed to load tasks.");
    } finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, []);

  const clearQuery = () => {
    dispatch(resetFilters());

    setSearchParams({}, { replace: true });
  };

  const filterFields = [
    {
      key: "q",
      label: "Search",
      value: search,
      type: "search",
      placeholder: "Search tasks...",
      onChange: (value: string) =>
        dispatch(setSearch(value)),
    },
    {
      key: "priority",
      label: "Priority",
      value: priority,
      options: [
        "all",
        "high",
        "medium",
        "low",
      ],
      onChange: (value: string) =>
        dispatch(setPriority(value)),
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
      onChange: (value: string) =>
        dispatch(setStatus(value)),
    },
  ];

  const filteredTasks = useMemo(
    () =>
      tasks.filter((task) => {
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
    [search, priority, status,tasks]
  );

if (loading) {
  return (
    <Workspace
      subtitle="Workspace"
      title="Task Manager"
      description="Manage, search and filter workspace tasks."
    >
      <div className="flex flex-col items-center justify-center py-20">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

        <p
          className={`mt-6 text-lg ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Loading Tasks...
        </p>
      </div>
    </Workspace>
  );
}

if (error) {
  return (
    <Workspace
      subtitle="Workspace"
      title="Task Manager"
      description="Manage, search and filter workspace tasks."
    >
      <div className="flex items-center justify-center py-20">
        <p className="text-lg text-red-500">{error}</p>
      </div>
    </Workspace>
  );
}

return (
  <Workspace
    subtitle="Workspace"
    title="Task Manager"
    description="Manage, search and filter workspace tasks."
  >
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
          {filteredTasks.length} Tasks
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {filterFields.map((field) => (
          <div key={field.key}>
            <label
              className={`mb-2 block text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              {field.label}
            </label>

            {field.type === "search" ? (
              <div className="relative">
                <Search
                  size={18}
                  className={`absolute left-3 top-3.5 ${
                    isDarkMode ? "text-gray-500" : "text-gray-400"
                  }`}
                />

                <input
                  value={field.value}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    field.onChange(e.target.value)
                  }
                  className={`${inputClass} pl-10 ${
                    isDarkMode
                      ? "border-gray-700 bg-gray-900 text-white placeholder:text-gray-500"
                      : ""
                  }`}
                />
              </div>
            ) : (
              <select
                value={field.value}
                onChange={(e) =>
                  field.onChange(e.target.value)
                }
                className={`${inputClass} ${
                  isDarkMode
                    ? "border-gray-700 bg-gray-900 text-white"
                    : ""
                }`}
              >
                {field.options?.map((option) => (
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

    {filteredTasks.length > 0 ? (
      <TaskGrid tasks={filteredTasks} />
    ) : (
      <div
        className={`mt-10 rounded-2xl border border-dashed p-12 text-center transition-colors duration-300 ${
          isDarkMode
            ? "border-gray-700 bg-gray-800"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <h3
          className={`text-lg font-semibold ${
            isDarkMode ? "text-white" : "text-gray-700"
          }`}
        >
          No tasks found
        </h3>

        <p
          className={`mt-2 text-sm ${
            isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
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