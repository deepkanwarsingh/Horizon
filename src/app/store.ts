import { configureStore } from "@reduxjs/toolkit";

import dashboardReducer from "../features/dashboard/dashboardSlice";
// import panelReducer from "../features/panel/panelSlice";
// import dataReducer from "../features/data/dataSlice";
import filterReducer from "../features/filter/filterSlice"
import settingsReducer from "../features/settings/settingsSlice";


export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    filter:filterReducer,
     settings: settingsReducer,
    // panel: panelReducer,
    // data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;