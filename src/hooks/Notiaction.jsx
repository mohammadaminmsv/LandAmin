import { createSlice } from "@reduxjs/toolkit";

const Notiaction = createSlice({
  name: "noti",
  initialState: {
    notiaction: {
      open: false,
      message: "",
      type: "",
    },
  },
  reducers: {
    showNotification(state, action) {
      state.notiaction = {
        message: action.payload.message,
        type: action.payload.type,
        open: action.payload.open,
      };
    },
  },
});

export const NotiActions = Notiaction.actions;
export default Notiaction;
