import Card from "../components/subComponents/Card";

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
  return (
    <section className="mx-auto w-full max-w-[1440px]">
      <header className="mb-8">
        <h1 className="text-4xl font-semibold text-gray-900">
          Projects
        </h1>

        <p className="mt-2 text-gray-600">
          Manage and monitor all your active projects.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projectList.map((project) => (
          <Card key={project.id}>
            <h2 className="text-xl font-semibold text-gray-900">
              {project.name}
            </h2>

            <p className="mt-4 text-sm text-gray-500">
              Status
            </p>

            <p className="font-medium text-blue-600">
              {project.status}
            </p>

            <p className="mt-4 text-sm text-gray-500">
              Team Members
            </p>

            <p className="font-medium text-gray-900">
              {project.members}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;