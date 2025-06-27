import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotiActions } from "../hooks/Notiaction";
import LAAlert from "./LaAlert";

const Notification = () => {
  const dispatch = useDispatch();
  const notiaction = useSelector((state) => state.noti.notiaction);
  console.log(notiaction);
  setTimeout(() => {
    dispatch(
      NotiActions.showNotification({
        open: false,
        message: "",
        type: "",
      })
    );
  }, 4000);

  return (
    <>
      {notiaction.open && (
        <LAAlert
          type={notiaction.type}
          message={notiaction.message}
        />
      )}
    </>
  );
};

export default Notification;
