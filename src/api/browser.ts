// src/api/browser.ts

import { setupWorker } from "msw/browser";
import { handlers } from "./mock";

export const worker = setupWorker(...handlers);