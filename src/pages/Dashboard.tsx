import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Workspace from "../components/WorkSpace";

import ProjectsCard from "../components/workspace/ProjectCard";
import TasksCard from "../components/workspace/TaskCard";
import RevenueCard from "../components/workspace/RevenueCard";
import VisitorsCard from "../components/workspace/VistorsCard";
import { useData } from "../context/DataContext";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    activeTab,
    setActiveTab,
    navigationHistory,
    setNavigationHistory,
    historyIndex,
    setHistoryIndex,
  } = useData();

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
    []
  );

  // Sync Context with URL
  useEffect(() => {
    const tab = searchParams.get("tab");

    if (!tab) {
      setSearchParams({ tab: activeTab });
      return;
    }

    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [searchParams, activeTab, setActiveTab, setSearchParams]);

  const activeCard =
    tabs.find((tab) => tab.id === activeTab) || tabs[0];

  const handleTabChange = (tabId: string) => {
    if (tabId === activeTab) return;

    setActiveTab(tabId);

    setNavigationHistory((prev) => [...prev, tabId]);

    setHistoryIndex((prev) => prev + 1);

    setSearchParams({ tab: tabId });
  };

  return (
    <Workspace
      subtitle="Workspace"
      title="Dashboard"
      description="Welcome back. Here's an overview of your workspace."
    >
      {/* Tabs */}
{/* Tabs */}
<div className="mb-8">
  <div className="no-scrollbar flex gap-3 overflow-x-auto rounded-2xl bg-gray-100 p-2">
    {tabs.map((tab) => {
      const isActive = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          onClick={() => handleTabChange(tab.id)}
          className={`
            relative flex-shrink-0 rounded-xl px-5 py-3
            text-sm font-semibold transition-all duration-300
            ${
              isActive
                ? "bg-white text-blue-600 shadow-md shadow-blue-100"
                : "text-gray-600 hover:bg-white hover:text-gray-900"
            }
          `}
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

      {/* History Debug Panel */}
      <div className="mb-6 rounded-lg border bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold text-gray-800">
          Navigation History
        </h3>

        <p className="text-sm text-gray-600">
          <strong>History Index:</strong> {historyIndex}
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {navigationHistory.map((item, index) => (
            <span
              key={`${item}-${index}`}
              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"
            >
              {index + 1}. {item}
            </span>
          ))}
        </div>
      </div>

      {/* Active Card */}
      <div className="w-full">{activeCard.content}</div>
    </Workspace>
  );
};

export default Dashboard;