import axios from "axios";
import config from "../../../public/config";

export const createDashboard = async (NidUser) => {
  try {
    const response = await axios.post(
      `${config.apiBaseURL}/dashboard/create/${NidUser}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "خطای ناشناخته، دوباره تلاش کنید." };
  }
};
