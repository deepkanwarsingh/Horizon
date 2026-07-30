import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Workspace from "../../components/WorkSpace";

import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/reduxHooks";

import {
  dashboardTabs,
  createTabChangeHandler,
} from "./DashboardTabs";

import { fetchDashboardData } from "./DashboardApi";

import {
  setActiveTab,
} from "../../features/dashboard/dashboardSlice";
import NavigationHistory from "./NavigationHistory";

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

const fetchDashboard = async () => {
  setLoading(true);

  const { data, error } = await fetchDashboardData();

  setDashboard(data);
  setError(error);

  setLoading(false);
};

  useEffect(() => {
    fetchDashboard();
  }, []);

const tabs = dashboardTabs;

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

const throttledTabChange = useMemo(
  () =>
    createTabChangeHandler(
      activeTab,
      dispatch,
      setSearchParams
    ),
  [activeTab, dispatch, setSearchParams]
);

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
        <div className="flex flex-col items-center justify-center gap-5 rounded-xl border border-red-200 bg-red-50 p-8">
          <h2 className="text-2xl font-semibold text-red-600">
            Unable to Load Dashboard
          </h2>

          <p className="text-center text-gray-700">
            {error}
          </p>

          <button
            onClick={fetchDashboard}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Retry
          </button>
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
  throttledTabChange(tab.id)
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

<NavigationHistory
  navigationHistory={navigationHistory}
  historyIndex={historyIndex}
  isDarkMode={isDarkMode}
/>
      <div className="w-full">
        {activeCard?.content}
      </div>
    </Workspace>
  );
};

export default Dashboard;