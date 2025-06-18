import { createSlice } from "@reduxjs/toolkit";

const userLoged = createSlice({
  name: "userLog",
  initialState: {
    nidUser: {},
  },
  reducers: {
    mainUser(state, action) {
      state.nidUser = action.payload;
    },
    userLogin(state) {
      state.nidUser = {};
    },
  },
});

export const { userLogin, mainUser } = userLoged.actions;
export default userLoged;
