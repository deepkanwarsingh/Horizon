const VisitorsCard = () => {
  return (
    <>
      <p className="text-sm font-medium text-gray-500">
        Active Visitors
      </p>

      <h2 className="mt-4 text-4xl font-bold text-gray-900">
        18.4K
      </h2>

      <div className="mt-6 flex flex-wrap gap-2">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
          Today
        </span>

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
          +12%
        </span>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
          Live
        </span>
      </div>
    </>
  );
};

export default VisitorsCard;