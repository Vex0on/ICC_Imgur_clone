import axios from "axios";
import { API_URL } from "../Api/Api";

const fetchUsers = () => {
  return axios
    .get(API_URL + "users")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { fetchUsers };