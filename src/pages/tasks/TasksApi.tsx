import api from "../../api/axios";

export const fetchTasksData = async () => {
  const startTime = performance.now();

  try {
    const response = await api.get("/tasks");

    console.log("========== API Metrics ==========");
    console.log("Endpoint:", "/tasks");
    console.log("Method:", "GET");
    console.log("Status:", response.status);
    console.log(
      "Response Time:",
      `${(performance.now() - startTime).toFixed(2)} ms`
    );
    console.log(
      "Payload Size:",
      `${JSON.stringify(response.data).length} bytes`
    );
    console.log("================================");

    return {
      data: response.data,
      error: "",
    };
  } catch (err) {
    console.error(err);

    return {
      data: [],
      error: "Failed to load tasks.",
    };
  }
};