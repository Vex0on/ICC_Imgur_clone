import axios from "axios";
import { API_URL } from "../services/Api/Api";

export const refreshToken = async (callback: Function, endpoint: string) => {
  try {
    const newToken = await axios.get(`${API_URL}token/access`, {
      withCredentials: true,
      headers: { Accept: "application/json" },
    });
    localStorage.setItem("token", newToken.data.access);
    callback();
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 400 ||
        error.response?.status === 401 ||
        error.response?.status === 500)
    ) {
      try {
        await axios.delete("http://127.0.0.1:8000/api/token/refresh/delete", {withCredentials: true});
      } catch (deleteError) {
        console.log("Error deleting refresh token", deleteError);
      }
      localStorage.removeItem("token");
      window.location.href = "http://127.0.0.1:3000" + endpoint;
      return;
    } else {
      console.log(error);
    }
  }
};
