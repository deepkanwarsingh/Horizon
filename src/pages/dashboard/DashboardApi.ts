import api from "../../api/axios";
import { measureTime } from "../../utils/requestTimer";

export const fetchDashboardData = async () => {
  const start = performance.now();

  try {
    const response = await measureTime(() =>
      api.get("/dashboard")
    );

    console.log("========= Dashboard API =========");
    console.log("Endpoint:", "/dashboard");
    console.log("Status:", response.status);
    console.log(
      "Response Time:",
      `${(performance.now() - start).toFixed(2)} ms`
    );
    console.log(
      "Payload Size:",
      `${JSON.stringify(response.data).length} bytes`
    );
    console.log("=================================");

    return {
      data: response.data,
      error: "",
    };
  } catch (err: any) {
    console.error(err);

    let error = "Failed to load dashboard.";

    if (!err.response) {
      error =
        "No internet connection. Please check your network and try again.";
    } else if (err.response.status === 500) {
      error =
        "Server is temporarily unavailable. Please try again later.";
    } else if (err.response.status === 401) {
      error =
        "Your session has expired. Redirecting to login...";
    } else if (err.response.status === 403) {
      error =
        "You don't have permission to access this dashboard.";
    }

    return {
      data: null,
      error,
    };
  }
};