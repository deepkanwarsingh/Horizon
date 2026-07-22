const Dashboard = () => {
  return (
    <section className="mx-auto w-full max-w-[1440px]">
      {/* Header */}
      <header className="mb-10">
        <p className="text-sm font-medium text-gray-500">
          Workspace
        </p>

        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-gray-600">
          Welcome back. Here's an overview of your workspace, projects,
          analytics, and recent activity.
        </p>
      </header>

      {/* Stats */}
      {/* <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Projects",
            value: "24",
          },
          {
            title: "Tasks",
            value: "187",
          },
          {
            title: "Revenue",
            value: "$12,480",
          },
          {
            title: "Visitors",
            value: "18.4K",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
          >
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-gray-900">
              {item.value}
            </h2>
          </div>
        ))}
      </div> */}

      {/* Content */}
      {/* <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm xl:col-span-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Recent Activity
          </h2>

          <p className="mt-3 text-gray-600">
            Activity feed, charts, or tables can be displayed here.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Quick Actions
          </h2>

          <p className="mt-3 text-gray-600">
            Create a project, invite team members, or manage your settings.
          </p>
        </div>
      </div> */}
    </section>
  );
};

export default Dashboard;