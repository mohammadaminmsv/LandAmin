import axios from "axios";
import config from "../../../public/config";

export const getDashboard = async (NidUser) => {
  try {
      const response = await axios.get(
          `${config.apiBaseURL}/dashboard/getAll/${NidUser}`,
          {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );

      return response.data;
  } catch (error) {
      console.error("خطا در درخواست:", error);
      throw error.response ? error.response.data : { message: "خطای ناشناخته، دوباره تلاش کنید" };
  }
};
