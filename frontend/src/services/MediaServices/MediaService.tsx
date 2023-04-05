import axios from "axios";
import { API_URL } from "../Api/Api";

const fetchImages = async () => {
  try {
    const response = await axios
      .get(API_URL + "images");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { fetchImages };