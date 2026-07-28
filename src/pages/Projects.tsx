import { useEffect, useState } from "react";
import Workspace from "../components/WorkSpace";
import Card from "../components/subComponents/Card";
import { useAppSelector } from "../hooks/reduxHooks";
import api from "../api/axios";

interface Project {
  id: number;
  name: string;
  status: string;
  members: number;
}

const Projects = () => {
  const { theme } = useAppSelector(
    (state) => state.settings
  );

  const isDarkMode = theme === "dark";

  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await api.get("/projects");

        setProjectList(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Workspace
        subtitle="Workspace"
        title="Projects"
        description="Manage and monitor all your active projects."
      >
        <div className="flex items-center justify-center py-20">
          <p
            className={`text-lg ${
              isDarkMode
                ? "text-gray-300"
                : "text-gray-600"
            }`}
          >
            Loading Projects...
          </p>
        </div>
      </Workspace>
    );
  }

  if (error) {
    return (
      <Workspace
        subtitle="Workspace"
        title="Projects"
        description="Manage and monitor all your active projects."
      >
        <div className="flex items-center justify-center py-20">
          <p className="text-red-500">{error}</p>
        </div>
      </Workspace>
    );
  }

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