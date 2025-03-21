import axios from "axios";

const TMDB_BASE_URL = "https://food-delivery-backend-navy-eight.vercel.app";

export const getCategory = async (category: string) => {
  try {
    const token = localStorage.getItem("userToken");

    if (!token) {
      throw new Error("No token found in localStorage");
    }

    const response = await axios.get(
      `${TMDB_BASE_URL}/${category}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if response.data is an object and contains the 'data' array
    if (Array.isArray(response.data)) {
      return response.data; // If it's already an array
    } else if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // If the array is inside the 'data' key
    } else {
      console.error("Fetched data is not an array or does not contain 'data' array:", response.data);
      return [];
    }
  } catch (error) {
    console.log("Axios Error shuu", error);
    return error;
  }
};
