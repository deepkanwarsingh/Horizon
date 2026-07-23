import { useMemo } from "react";
import Workspace from "../components/WorkSpace";

import ProjectsCard from "../components/workspace/ProjectCard";
import TasksCard from "../components/workspace/TaskCard";
import RevenueCard from "../components/workspace/RevenueCard";
import VisitorsCard from "../components/workspace/VistorsCard";

const Dashboard = () => {
  const cards = useMemo(
    () => [
      {
        id: "projects",
        content: <ProjectsCard />,
      },
      {
        id: "tasks",
        content: <TasksCard />,
      },
      {
        id: "revenue",
        content: <RevenueCard />,
      },
      {
        id: "visitors",
        content: <VisitorsCard />,
      },
    ],
    []
  );

  return (
    <Workspace
      subtitle="Workspace"
      title="Dashboard"
      description="Welcome back. Here's an overview of your workspace."
      cards={cards}
    />
  );
};

export default Dashboard;