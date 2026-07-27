import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";

import Workspace from "../components/WorkSpace";
import TaskGrid, { type Task } from "../components/tasks/TaskGrid";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import {
  setSearch,
  setPriority,
  setStatus,
  resetFilters,
} from "../features/filter/filterSlice";

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

const allowedValues = {
  priority: ["all", "high", "medium", "low"],
  status: ["all", "in-progress", "pending", "completed"],
};

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
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { search, priority, status } = useAppSelector(
    (state) => state.filter
  );

  // Read URL and initialize Redux
  useEffect(() => {
    const search = searchParams.get("q") || "";

    const priority = searchParams.get("priority") || "all";

    const status = searchParams.get("status") || "all";

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

  // Keep URL synchronized with Redux
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) {
      params.set("q", search);
    }

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
      options: ["all", "high", "medium", "low"],
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
      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">
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
                      field.onChange(e.target.value)
                    }
                    className={`${inputClass} pl-10`}
                  />
                </div>
              ) : (
                <select
                  value={field.value}
                  onChange={(e) =>
                    field.onChange(e.target.value)
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