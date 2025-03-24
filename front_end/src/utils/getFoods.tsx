import axios from "axios";

const TMDB_BASE_URL = "https://food-delivery-backend-navy-eight.vercel.app";

export const getFood = async (food: string) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.get(
      `${TMDB_BASE_URL}/${food}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (Array.isArray(response.data)) {
      return response.data;
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error("Fetched data is not an array or does not contain 'data' array:", response.data);
      return [];
    }
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};
