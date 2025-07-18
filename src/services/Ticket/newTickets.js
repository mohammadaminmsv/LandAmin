import axios from "axios";
import config from "../../../public/config";

export const newTickets = async (data,NidUser) => {
  try {
    const response = await axios.post(
      `${config.apiBaseURL}/tickets/createTicket/${NidUser}`,
      {
        data,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "خطای ناشناخته، دوباره تلاش کنید." };
  }
};
