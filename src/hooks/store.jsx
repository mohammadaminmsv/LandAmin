import { configureStore } from "@reduxjs/toolkit";
import Notiaction from "./Notiaction";
import authSlice from "./authSlice";
import userLoged from "./userLoged";
import cartSlice from "./cartSlice";


const store = configureStore({
  reducer: {
    noti: Notiaction.reducer,
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    userLog: userLoged.reducer
  },
});

export default store;
