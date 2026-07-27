import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataState {
  data: any | null;
}

const initialState: DataState = {
  data: null,
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setData } = dataSlice.actions;

export default dataSlice.reducer;