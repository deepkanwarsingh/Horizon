import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

const allowedValues = {
  priority: ["all", "high", "medium", "low"],
  status: ["all", "in-progress", "pending", "completed"],
};

const useValidatedRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const validatedParams = useMemo(() => {
    const search = searchParams.get("q") || "";

    const priority = searchParams.get("priority") || "all";

    const status = searchParams.get("status") || "all";

    return {
      search,

      priority: allowedValues.priority.includes(priority)
        ? priority
        : "all",

      status: allowedValues.status.includes(status)
        ? status
        : "all",
    };
  }, [searchParams]);

  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === "" || value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    setSearchParams(params, {
      replace: true,
    });
  };

  return {
    ...validatedParams,
    updateQuery,
  };
};

export default useValidatedRoute;