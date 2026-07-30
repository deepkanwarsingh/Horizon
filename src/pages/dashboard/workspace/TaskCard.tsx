const TasksCard = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">
          Tasks Completed
        </p>

        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
          +18%
        </span>
      </div>

      <h2 className="mt-4 text-4xl font-bold text-gray-900">
        187
      </h2>

      <div className="mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full w-3/4 rounded-full bg-green-500"></div>
        </div>

        <div className="mt-2 flex justify-between text-xs text-gray-500">
          <span>Progress</span>
          <span>75%</span>
        </div>
      </div>
    </>
  );
};

export default TasksCard;