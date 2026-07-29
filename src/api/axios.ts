import axios, {
  AxiosError,
  AxiosResponse,
} from "axios";

// Provide types for import.meta.env when using Vite in TypeScript
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

type SimulateError =
  | false
  | "network"
  | "timeout"
  | "401"
  | "403"
  | "500";

/**
 * Simulation Mode (Testing Only)
 *
 * false      -> Normal API
 * "network"  -> Simulate no internet
 * "timeout"  -> Simulate timeout
 * "401"      -> Simulate unauthorized
 * "403"      -> Simulate forbidden
 * "500"      -> Simulate server error
 */
const SIMULATE_ERROR: SimulateError = "network";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,

  timeout: 10000,

  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// --------------------
// Request Interceptor
// --------------------

api.interceptors.request.use(
  (config) => {
    // ==========================
    // Testing Simulations
    // ==========================

    if (SIMULATE_ERROR === "network") {
      return Promise.reject(new Error("Network Error"));
    }

    if (SIMULATE_ERROR === "timeout") {
      return Promise.reject({
        code: "ECONNABORTED",
        message: "Request timed out",
      });
    }

    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// --------------------
// Response Interceptor
// --------------------

api.interceptors.response.use(
  (response: AxiosResponse) => {
    // ==========================
    // Testing Simulations
    // ==========================

    if (SIMULATE_ERROR === "401") {
      return Promise.reject({
        response: {
          status: 401,
          data: {},
        },
      });
    }

    if (SIMULATE_ERROR === "403") {
      return Promise.reject({
        response: {
          status: 403,
          data: {},
        },
      });
    }

    if (SIMULATE_ERROR === "500") {
      return Promise.reject({
        response: {
          status: 500,
          data: {
            message: "Internal Server Error",
          },
        },
      });
    }

    return response;
  },

  (error: AxiosError<any>) => {
    // Timeout
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out.");
      return Promise.reject(error);
    }

    // Network failure
    if (!error.response) {
      console.error("Network Error");
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        console.error("Unauthorized");

        localStorage.removeItem("token");

        window.location.href = "/login";
        break;

      case 403:
        console.error("Forbidden");

        window.location.href = "/forbidden";
        break;

      case 404:
        console.error("Resource Not Found");
        break;

      case 422:
      case 400:
        console.error("Validation Error");

        return Promise.reject({
          ...error,
          validationErrors: data?.errors ?? {},
        });

      case 500:
        console.error("Internal Server Error");
        break;

      default:
        console.error("Unexpected Error");
    }

    return Promise.reject(error);
  }
);

export default api;