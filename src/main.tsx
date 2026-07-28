import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import { store } from "./app/store";
import { LayoutProvider } from "./context/LayoutContext";
import { DataProvider } from "./context/DataContext";
import { worker } from "./api/browser";

import "./index.css";

async function startApp() {
  if (import.meta.env.DEV) {
    await worker.start({
      onUnhandledRequest: "bypass",
    });
  }

  ReactDOM.createRoot(
    document.getElementById("root")!
  ).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <DataProvider>
            <LayoutProvider>
              <App />
            </LayoutProvider>
          </DataProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

startApp();