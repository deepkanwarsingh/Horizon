const RevenueCard = () => {
  return (
    <>
      <p className="text-sm font-medium text-gray-500">
        Monthly Revenue
      </p>

      <h2 className="mt-4 text-4xl font-bold text-gray-900">
        $12,480
      </h2>

      <p className="mt-2 text-sm text-green-600">
        ▲ 8.2% from last month
      </p>

      <div className="mt-8 flex h-28 items-end gap-2">
        {[35, 70, 55, 90, 60, 80, 100].map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-lg bg-gradient-to-t from-blue-600 to-blue-400"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </>
  );
};

export default RevenueCard;