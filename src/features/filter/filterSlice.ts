import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  search: string;
  priority: string;
  status: string;
}

const initialState: FilterState = {
  search: "",
  priority: "all",
  status: "all",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },

    setPriority: (state, action: PayloadAction<string>) => {
      state.priority = action.payload;
    },

    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },

    resetFilters: (state) => {
      state.search = "";
      state.priority = "all";
      state.status = "all";
    },
  },
});

export const {
  setSearch,
  setPriority,
  setStatus,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;