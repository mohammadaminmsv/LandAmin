import axios from "axios";
import config from "../../../public/config";

export const getAllProduct = async (limit) => {
  try {
    const url = limit ? `/products/getAllProduct?limit=${limit}` : `/products/getAllProduct`;
    const response = await axios.get(
      `${config.apiBaseURL}${url}`
    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "خطای ناشناخته، دوباره تلاش کنید." };
  }
};
