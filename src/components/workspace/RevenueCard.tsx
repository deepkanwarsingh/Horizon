const RevenueCard = () => {
  const chart = [35, 70, 55, 90, 60, 80, 100];

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">
            Monthly Revenue
          </p>

          <h2 className="mt-2 text-4xl font-bold text-gray-900">
            $12,480
          </h2>

          <p className="mt-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            ▲ 8.2% vs last month
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-3">
          <span className="text-2xl">💰</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            Avg. Daily
          </p>

          <p className="mt-1 text-lg font-semibold">
            $416
          </p>
        </div>

        <div className="rounded-xl bg-gray-50 p-4">
          <p className="text-xs text-gray-500">
            Transactions
          </p>

          <p className="mt-1 text-lg font-semibold">
            328
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500">
            Monthly Target
          </span>

          <span className="font-medium">
            83%
          </span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full w-[83%] rounded-full bg-blue-600" />
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="mt-8 flex h-32 items-end gap-2">
        {chart.map((height, index) => (
          <div
            key={index}
            className="group flex flex-1 items-end"
          >
            <div
              style={{ height: `${height}%` }}
              className="
                w-full rounded-t-xl
                bg-gradient-to-t
                from-blue-600
                to-blue-400
                transition-all
                duration-300
                group-hover:scale-y-105
              "
            />
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between border-t pt-4">
        <div>
          <p className="text-xs text-gray-500">
            Best Day
          </p>

          <p className="font-semibold">
            Friday
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">
            Forecast
          </p>

          <p className="font-semibold text-blue-600">
            $15.2K
          </p>
        </div>
      </div>
    </>
  );
};

export default RevenueCard;