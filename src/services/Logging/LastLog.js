import axios from "axios";
import config from "../../../public/config";

export const LastLog = async (NidUser, token) => {
  try {
    const response = await axios.patch(
      `${config.apiBaseURL}/users/incrementLogin/${NidUser}`,{},
      {
        headers: {
          "authorization" : `Bearer ${token}`
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
