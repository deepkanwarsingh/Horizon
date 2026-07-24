import Button from "../subComponents/Button";

const ProjectsCard = () => {
  const projects = [
    {
      name: "Workspace Redesign",
      progress: 85,
      status: "On Track",
    },
    {
      name: "Analytics Dashboard",
      progress: 60,
      status: "In Progress",
    },
    {
      name: "Mobile Application",
      progress: 35,
      status: "Planning",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
            Projects
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            24 Active Projects
          </h2>

          <p className="mt-2 max-w-2xl text-gray-500">
            Track project progress, monitor deadlines, and keep your team
            aligned across all ongoing initiatives.
          </p>
        </div>

        <Button className="w-auto px-6">
          Create Project
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">Completed</p>
          <h3 className="mt-2 text-3xl font-bold text-green-600">18</h3>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">In Progress</p>
          <h3 className="mt-2 text-3xl font-bold text-blue-600">6</h3>
        </div>

        <div className="rounded-xl border bg-white p-6">
          <p className="text-sm text-gray-500">Team Members</p>
          <h3 className="mt-2 text-3xl font-bold text-purple-600">42</h3>
        </div>
      </div>

      {/* Project List */}
      <div className="rounded-xl border bg-white">
        <div className="border-b px-6 py-4">
          <h3 className="text-lg font-semibold">Recent Projects</h3>
        </div>

        <div className="divide-y">
          {projects.map((project) => (
            <div
              key={project.name}
              className="flex flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">
                  {project.name}
                </h4>

                <div className="mt-3 h-2 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <p className="mt-2 text-sm text-gray-500">
                  {project.progress}% Complete
                </p>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {project.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;