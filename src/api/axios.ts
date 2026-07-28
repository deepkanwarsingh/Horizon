// src/api/axios.ts

import axios, { AxiosResponse } from "axios";

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
  // Uses Vite environment variable.
  // For MSW this can simply be "/api".
  // Later replace it with your real backend URL.
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

  (error) => {
    if (error.code === "ECONNABORTED") {
      console.error("Request timed out.");
      return Promise.reject(error);
    }

    if (!error.response) {
      console.error("Network Error");
      return Promise.reject(error);
    }

    switch (error.response.status) {
      case 401:
        console.error("Unauthorized");

        localStorage.removeItem("token");

        // Optional
        window.location.href = "/login";
        break;

      case 403:
        console.error("Forbidden");
        break;

      case 404:
        console.error("Resource Not Found");
        break;

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