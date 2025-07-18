import axios from "axios";
import config from "../../../public/config";
import { encryptData } from "../../utils/EncryptData";

export const createDashboard = async (data , NidUser) => {
  const encryptedData = encryptData(data);
  try {
    const response = await axios.post(
      `${config.apiBaseURL}/dashboard/create/${NidUser}`,
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
