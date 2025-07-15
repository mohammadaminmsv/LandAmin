import axios from "axios";
import config from "../../../public/config";

export const getBrands = async (limit) => {
  try {
        const url = limit ? `/brands/getAllBrand?limit=${limit}` : `/brands/getAllBrand`;

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
