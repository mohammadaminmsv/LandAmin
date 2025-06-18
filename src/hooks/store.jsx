import { configureStore } from "@reduxjs/toolkit";
import Notiaction from "./Notiaction";
import authSlice from "./authSlice";
import userLoged from "./userLoged";


const store = configureStore({
  reducer: {
    noti: Notiaction.reducer,
    auth: authSlice.reducer,
    userLog : userLoged.reducer
  },
});

export default store;
