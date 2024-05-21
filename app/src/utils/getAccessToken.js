import axios from "axios";

const getAccessToken = async () => {
  try {
    const response = await axios.get("http://localhost:4000/api/token");
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw error;
  }
};

export default getAccessToken;
