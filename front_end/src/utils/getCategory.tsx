import axios from "axios";

const TMDB_BASE_URL = "https://food-delivery-backend-navy-eight.vercel.app";

export const getCategory = async (category: string) => {
  try {
    const response = await axios.get(
      `${TMDB_BASE_URL}/${category}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    console.log("TEST",response);
    
    return response.data;
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};