import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";



import { fetchTasksData } from "./TasksApi";

import Workspace from "../../components/WorkSpace";
import TaskGrid, {
  type Task,
} from "./TaskGrid";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  setSearch,
  setPriority,
  setStatus,
  resetFilters,
} from "../../features/filter/filterSlice";
import TaskFilters from "./TaskFIlters";



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
  const loadTasks = async () => {
    setLoading(true);

    const { data, error } = await fetchTasksData();

    setTasks(data);
    setError(error);

    setLoading(false);
  };

  loadTasks();
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

const filteredTasks = useMemo(() => {
  const searchValue = (search ?? "").toLowerCase();
  const priorityValue = (priority ?? "").toLowerCase();

  return tasks.filter((task) => {
    const title = (task.title ?? "").toLowerCase();
    const assignee = (task.assignee ?? "").toLowerCase();
    const taskPriority = (task.priority ?? "").toLowerCase();
    const taskStatus = (task.status ?? "")
      .toLowerCase()
      .replace(/\s/g, "-");

    const searchMatch =
      title.includes(searchValue) ||
      assignee.includes(searchValue);

    const priorityMatch =
      priority === "all" ||
      taskPriority === priorityValue;

    const statusMatch =
      status === "all" ||
      taskStatus === status;

    return (
      searchMatch &&
      priorityMatch &&
      statusMatch
    );
  });
}, [tasks, search, priority, status]);

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
<TaskFilters
  isDarkMode={isDarkMode}
  filteredCount={filteredTasks.length}
  search={search}
  priority={priority}
  status={status}
  clearQuery={clearQuery}
  onSearchChange={(value) => dispatch(setSearch(value))}
  onPriorityChange={(value) => dispatch(setPriority(value))}
  onStatusChange={(value) => dispatch(setStatus(value))}
/>
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