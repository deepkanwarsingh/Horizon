// src/api/mock.ts

import { http, HttpResponse, delay } from "msw";
import workspace from "./workspace.json";

export const handlers = [
  // -----------------------------------------
  // Dashboard / Workspace
  // -----------------------------------------
  http.get("/api/workspace", async () => {
    await delay(1500);

    return HttpResponse.json(workspace);
  }),

  // -----------------------------------------
  // Dashboard
  // -----------------------------------------
  http.get("/api/dashboard", async () => {
    await delay(1500);

    return HttpResponse.json(workspace.dashboard);
  }),

  // -----------------------------------------
  // Projects
  // -----------------------------------------
  http.get("/api/projects", async () => {
    await delay(2000);

    return HttpResponse.json(workspace.projects);
  }),

  // -----------------------------------------
  // Tasks
  // -----------------------------------------
  http.get("/api/tasks", async () => {
    await delay(1200);

    return HttpResponse.json(workspace.tasks);
  }),

  // -----------------------------------------
  // Analytics
  // -----------------------------------------
  http.get("/api/analytics", async () => {
    await delay(1800);

    return HttpResponse.json(workspace.dashboard);
  }),

  // -----------------------------------------
  // Settings
  // -----------------------------------------
  http.get("/api/settings", async () => {
    await delay(1000);

    return HttpResponse.json({
      theme: "Light",
      language: "English",
      fontSize: "Medium",
    });
  }),

  // -----------------------------------------
  // Server Error
  // -----------------------------------------
  http.get("/api/server-error", async () => {
    await delay(1000);

    return HttpResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }),

  // -----------------------------------------
  // Unauthorized
  // -----------------------------------------
  http.get("/api/unauthorized", async () => {
    await delay(1000);

    return HttpResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  }),
];