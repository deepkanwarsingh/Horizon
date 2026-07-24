import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { LayoutProvider } from "./context/LayoutContext";
import { DataProvider } from "./context/DataContext";
import './index.css';
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
  <React.StrictMode>
    <DataProvider>
    <LayoutProvider>
      <App />
    </LayoutProvider>
    </DataProvider>
  </React.StrictMode>
  </BrowserRouter>
);