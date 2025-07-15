import axios from "axios";
import config from "../../../public/config";

export const getAccessory = async (limit) => {
  try {
        const url = limit ? `/accessory/getAllAccessory?limit=${limit}` : `/accessory/getAllAccessory`;
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
