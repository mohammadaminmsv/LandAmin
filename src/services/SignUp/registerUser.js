import axios from "axios";
import config from "../../../public/config";
import { encryptData } from "../../utils/EncryptData";

export const registerUser = async (loginData) => {
  const encryptedData = encryptData(loginData);
  try {
    const response = await axios.post(
      `${config.apiBaseURL}/users/registerUsers`,
      {
        encryptedData,
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
