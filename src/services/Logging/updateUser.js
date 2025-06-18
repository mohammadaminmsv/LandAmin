import axios from "axios";
import config from "../../../public/config";
import { encryptData } from "../../utils/EncryptData";

export const updateUser = async (userData) => {
  if (!userData || !userData.NidUser) {
      console.error("خطا: NidUser مقدار ندارد!");
      throw new Error("NidUser مقدار ندارد!");
  }

  const encryptedData = encryptData(userData);

  console.log("User Data:", userData);
  console.log("Encrypted Data:", encryptedData);
  console.log("Sending request to:", `${config.apiBaseURL}/users/UpdateUser/${userData.NidUser}`);

  try {
      const response = await axios.put(
          `${config.apiBaseURL}/users/UpdateUser/${userData.NidUser}`,
          { encryptedData },
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
