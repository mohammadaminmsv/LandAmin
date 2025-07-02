import { createSlice } from "@reduxjs/toolkit";

const userLoged = createSlice({
  name: "userLog",
  initialState: {
    User: {},
  },
  reducers: {
    mainUser(state, action) {
      state.User = action.payload;
    },
    userLogin(state) {
      state.User = {};
    },
  },
});

export const { userLogin, mainUser } = userLoged.actions;
export default userLoged;
