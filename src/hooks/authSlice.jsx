import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: false,
    token: localStorage.getItem("token"),
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.token = action.payload;
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice;
