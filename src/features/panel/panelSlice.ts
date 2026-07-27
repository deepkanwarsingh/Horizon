import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PanelCoordinate {
  row: number;
  column: number;
}

export interface PanelLayout {
  [key: string]: PanelCoordinate;
}

interface PanelState {
  panelLayout: PanelLayout;
}

const initialState: PanelState = {
  panelLayout: {
    task1: { row: 1, column: 1 },
    task2: { row: 1, column: 2 },
    task3: { row: 2, column: 1 },
    task4: { row: 2, column: 2 },
    task5: { row: 3, column: 1 },
    task6: { row: 3, column: 2 },
  },
};

const panelSlice = createSlice({
  name: "panel",
  initialState,
  reducers: {
    setPanelLayout: (
      state,
      action: PayloadAction<PanelLayout>
    ) => {
      state.panelLayout = action.payload;
    },
  },
});

export const { setPanelLayout } = panelSlice.actions;

export default panelSlice.reducer;