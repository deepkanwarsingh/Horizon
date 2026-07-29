import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotificationType = "success" | "error" | "warning" | "info";

interface NotificationState {
  visible: boolean;
  message: string;
  type: NotificationType;
}

const initialState: NotificationState = {
  visible: false,
  message: "",
  type: "info",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (
      state,
      action: PayloadAction<{
        message: string;
        type: NotificationType;
      }>
    ) => {
      state.visible = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
    },

    hideNotification: (state) => {
      state.visible = false;
      state.message = "";
      state.type = "info";
    },
  },
});

export const { showNotification, hideNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;