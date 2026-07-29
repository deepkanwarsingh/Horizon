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
  (response: AxiosResponse) => response,

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

        // Clear any auth state if needed

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
        // Validation errors
        console.error("Validation Error");

        /*
          Expected API response:

          {
            errors: {
              email: "Invalid email",
              password: "Password too short"
            }
          }

          Don't handle here.
          Pass back to the component.
        */

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