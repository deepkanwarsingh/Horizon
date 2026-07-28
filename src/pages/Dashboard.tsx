import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Workspace from "../components/WorkSpace";

import ProjectsCard from "../components/workspace/ProjectCard";
import TasksCard from "../components/workspace/TaskCard";
import RevenueCard from "../components/workspace/RevenueCard";
import VisitorsCard from "../components/workspace/VistorsCard";

import api from "../api/axios";

import {
  useAppDispatch,
  useAppSelector,
} from "../hooks/reduxHooks";

import {
  setActiveTab,
  addNavigationHistory,
} from "../features/dashboard/dashboardSlice";

interface DashboardResponse {
  revenue: {
    total: number;
    growth: number;
  };
  visitors: {
    total: number;
    growth: number;
  };
}

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const {
    activeTab,
    navigationHistory,
    historyIndex,
  } = useAppSelector(
    (state) => state.dashboard
  );

  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  const [dashboard, setDashboard] =
    useState<DashboardResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchDashboard =
      async () => {
        const start =
          performance.now();

        try {
          setLoading(true);

          const response =
            await api.get("/dashboard");

          setDashboard(response.data);

          const end =
            performance.now();

          console.log(
            "========= Dashboard API ========="
          );
          console.log(
            "Endpoint:",
            "/dashboard"
          );
          console.log(
            "Status:",
            response.status
          );
          console.log(
            "Response Time:",
            `${(
              end - start
            ).toFixed(2)} ms`
          );
          console.log(
            "Payload Size:",
            `${JSON.stringify(
              response.data
            ).length} bytes`
          );
          console.log(
            "================================="
          );
        } catch (err) {
          console.error(err);
          setError(
            "Failed to load dashboard."
          );
        } finally {
          setLoading(false);
        }
      };

    fetchDashboard();
  }, []);

  const tabs = useMemo(
    () => [
      {
        id: "projects",
        label: "Projects",
        content: <ProjectsCard />,
      },
      {
        id: "tasks",
        label: "Tasks",
        content: <TasksCard />,
      },
      {
        id: "revenue",
        label: "Revenue",
        content: <RevenueCard />,
      },
      {
        id: "visitors",
        label: "Visitors",
        content: <VisitorsCard />,
      },
    ],
    [dashboard]
  );

  useEffect(() => {
    const tab =
      searchParams.get("tab");

    if (!tab) {
      setSearchParams({
        tab: activeTab,
      });

      return;
    }

    if (tab !== activeTab) {
      dispatch(
        setActiveTab(tab)
      );
    }
  }, [
    searchParams,
    activeTab,
    setSearchParams,
    dispatch,
  ]);

  const activeCard =
    tabs.find(
      (tab) =>
        tab.id === activeTab
    ) ?? tabs[0];

  const handleTabChange = (
    tabId: string
  ) => {
    if (tabId === activeTab)
      return;

    dispatch(
      setActiveTab(tabId)
    );

    dispatch(
      addNavigationHistory(tabId)
    );

    setSearchParams({
      tab: tabId,
    });
  };

  if (loading) {
    return (
      <Workspace
        subtitle="Workspace"
        title="Dashboard"
        description="Loading dashboard..."
      >
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </Workspace>
    );
  }

  if (error) {
    return (
      <Workspace
        subtitle="Workspace"
        title="Dashboard"
        description="Dashboard"
      >
        <div className="rounded-xl bg-red-100 p-6 text-red-600">
          {error}
        </div>
      </Workspace>
    );
  }

  return (
    <Workspace
      subtitle="Workspace"
      title="Dashboard"
      description="Welcome back. Here's an overview of your workspace."
    >
      <div className="mb-8">
        <div
          className={`no-scrollbar flex gap-3 overflow-x-auto rounded-2xl p-2 ${
            isDarkMode
              ? "bg-gray-800"
              : "bg-gray-100"
          }`}
        >
          {tabs.map((tab) => {
            const isActive =
              activeTab ===
              tab.id;

            return (
              <button
                key={tab.id}
                onClick={() =>
                  handleTabChange(
                    tab.id
                  )
                }
                className={`relative flex-shrink-0 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? isDarkMode
                      ? "bg-gray-700 text-blue-400 shadow-md"
                      : "bg-white text-blue-600 shadow-md shadow-blue-100"
                    : isDarkMode
                    ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "text-gray-600 hover:bg-white hover:text-gray-900"
                }`}
              >
                {tab.label}

                {isActive && (
                  <span className="absolute inset-x-4 -bottom-2 h-1 rounded-full bg-blue-600" />
                )}
              </button>
            );
          })}
        </div>
      </div>

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
          <strong>
            History Index:
          </strong>{" "}
          {historyIndex}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {navigationHistory.map(
            (
              item,
              index
            ) => (
              <span
                key={`${item}-${index}`}
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  isDarkMode
                    ? "bg-blue-900 text-blue-200"
                    : "bg-blue-100 text-blue-700"
                }`}
              >
                {index + 1}.{" "}
                {item}
              </span>
            )
          )}
        </div>
      </div>

      <div className="w-full">
        {activeCard?.content}
      </div>
    </Workspace>
  );
};

export default Dashboard;