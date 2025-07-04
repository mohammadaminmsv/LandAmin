import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// تابع کمکی برای بررسی اعتبار توکن
const isTokenValid = (token) => {
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedIn: isTokenValid(localStorage.getItem("token")),
    token: localStorage.getItem("token"),
    user: null
  },
  reducers: {
    login(state, action) {
      state.loggedIn = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
      localStorage.setItem("token", action.payload.token);
    },
    logout(state) {
      state.loggedIn = false;
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    verifyToken(state) {
      const token = localStorage.getItem("token");
      state.loggedIn = isTokenValid(token);
      state.token = token;
    }
  },
});

export const { login, logout, verifyToken } = authSlice.actions;
export default authSlice;