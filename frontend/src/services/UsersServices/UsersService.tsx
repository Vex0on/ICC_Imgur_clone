import axios from "axios";
import { API_URL } from "../Api/Api";

const fetchUsers = async () => {
  try {
    const response = await axios
      .get(API_URL + "users");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { fetchUsers };