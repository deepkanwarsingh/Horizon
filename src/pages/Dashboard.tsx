import Workspace from "../components/WorkSpace";

const Dashboard = () => {
  const cards = [
    {
      id: "projects",
      content: (
        <>
          <p className="text-sm text-gray-500">Projects</p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            24
          </h2>
        </>
      ),
    },
    {
      id: "tasks",
      content: (
        <>
          <p className="text-sm text-gray-500">Tasks</p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            187
          </h2>
        </>
      ),
    },
    {
      id: "revenue",
      content: (
        <>
          <p className="text-sm text-gray-500">Revenue</p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            $12,480
          </h2>
        </>
      ),
    },
    {
      id: "visitors",
      content: (
        <>
          <p className="text-sm text-gray-500">Visitors</p>

          <h2 className="mt-3 text-3xl font-semibold text-gray-900">
            18.4K
          </h2>
        </>
      ),
    },
    {
      id: "recent-activity",
      className: "xl:col-span-2",
      content: (
        <>
          <h2 className="text-lg font-semibold">
            Recent Activity
          </h2>

          <p className="mt-3 text-gray-600">
            Activity feed, charts, or tables can be displayed here.
          </p>
        </>
      ),
    },
    {
      id: "quick-actions",
      content: (
        <>
          <h2 className="text-lg font-semibold">
            Quick Actions
          </h2>

          <p className="mt-3 text-gray-600">
            Create a project, invite team members, or manage your
            settings.
          </p>
        </>
      ),
    },
  ];

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