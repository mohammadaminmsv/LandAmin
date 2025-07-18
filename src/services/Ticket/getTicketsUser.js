import axios from "axios";
import config from "../../../public/config";

export const getTicketsUser = async (NidUser) => {
  try {
      const response = await axios.get(
          `${config.apiBaseURL}/tickets/userT/${NidUser}`,
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
