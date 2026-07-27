import Workspace from "../components/WorkSpace";
import Card from "../components/subComponents/Card";
import { useAppSelector } from "../hooks/reduxHooks";

const projectList = [
  {
    id: 1,
    name: "AI Resume Analyzer",
    status: "In Progress",
    members: 5,
  },
  {
    id: 2,
    name: "Travel Planner",
    status: "Completed",
    members: 3,
  },
  {
    id: 3,
    name: "Patent Analyzer",
    status: "Planning",
    members: 4,
  },
  {
    id: 4,
    name: "Workspace Dashboard",
    status: "Active",
    members: 6,
  },
];

const Projects = () => {
  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  return (
    <Workspace
      subtitle="Workspace"
      title="Projects"
      description="Manage and monitor all your active projects."
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectList.map((project) => (
          <Card key={project.id}>
            <h2
              className={`text-xl font-semibold ${
                isDarkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {project.name}
            </h2>

            <p
              className={`mt-4 text-sm ${
                isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Status
            </p>

            <p className="font-medium text-blue-600">
              {project.status}
            </p>

            <p
              className={`mt-4 text-sm ${
                isDarkMode
                  ? "text-gray-400"
                  : "text-gray-500"
              }`}
            >
              Team Members
            </p>

            <p
              className={`font-medium ${
                isDarkMode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {project.members}
            </p>
          </Card>
        ))}
      </div>
    </Workspace>
  );
};

export default Projects;