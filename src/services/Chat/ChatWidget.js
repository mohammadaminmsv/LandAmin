import axios from "axios";
import config from "../../../public/config";
import { encryptData } from "../../utils/EncryptData";

export const chatWithAssistant = async (message, isFirst = false) => {
  const encryptedData = encryptData({ message, is_first: isFirst });
  
  try {
    const response = await axios.post(
      `${config.apiBaseURL}/chat`,
      {
        encryptedData,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}` // اگر نیاز به احراز هویت دارد
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "خطا در ارتباط با سرور، لطفاً دوباره تلاش کنید." };
  }
};

export const getChatHistory = async () => {
  try {
    const response = await axios.get(
      `${config.apiBaseURL}/chat/history`,
      {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "خطا در دریافت تاریخچه چت." };
  }
};