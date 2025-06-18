import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NotiActions } from "../hooks/Notiaction";
import LAAlert from "./LaAlert";

const Notification = ({ type, message }) => {
  const dispatch = useDispatch();
  const notiaction = useSelector((state) => state.noti.notiaction);
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
          type={type}
          message={message}
        />
      )}
    </>
  );
};

export default Notification;
