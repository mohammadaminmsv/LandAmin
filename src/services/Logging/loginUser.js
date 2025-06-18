import axios from "axios";
import config from "../../../public/config";
import { encryptData } from "../../utils/EncryptData";

// تابع برای ورود کاربر
export const loginUser = async (loginData) => {
  const encryptedData = encryptData(loginData);
  try {
    const response = await axios.post(
      `${config.apiBaseURL}/users/loginUsers`,
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
