import axios from "axios";
import config from "../../../public/config";

export const getBrands = async () => {
  try {
    const response = await axios.get(
      `${config.apiBaseURL}/brands/getAllBrand`

    );
    return response.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: "خطای ناشناخته، دوباره تلاش کنید." };
  }
};
