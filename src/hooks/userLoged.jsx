import { createSlice } from "@reduxjs/toolkit";

const userLoged = createSlice({
  name: "userLog",
  initialState: {
    User: {},
    dashboard: {}
  },
  reducers: {
    mainUser(state, action) {
      state.User = action.payload.user;
      state.dashboard = action.payload.dashboard;
    },
    userLogin(state) {
      state.User = {};
      state.dashboard = {};
    },
  },
});

export const { userLogin, mainUser } = userLoged.actions;
export default userLoged;
