import ProjectsCard from "./workspace/ProjectCard";
import TasksCard from "./workspace/TaskCard";
import RevenueCard from "./workspace/RevenueCard";
import VisitorsCard from "./workspace/VistorsCard";

import { throttle } from "../../utils/throttle";
import {
  setActiveTab,
  addNavigationHistory,
} from "../../features/dashboard/dashboardSlice";

import type { AppDispatch } from "../../app/store";
import type { SetURLSearchParams } from "react-router-dom";

export const dashboardTabs = [
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
];

export const createTabChangeHandler = (
  activeTab: string,
  dispatch: AppDispatch,
  setSearchParams: SetURLSearchParams
) =>
  throttle((tabId: string) => {
    if (tabId === activeTab) return;

    dispatch(setActiveTab(tabId));
    dispatch(addNavigationHistory(tabId));
    setSearchParams({ tab: tabId });
  }, 500);