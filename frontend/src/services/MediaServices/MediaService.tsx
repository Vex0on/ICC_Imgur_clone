import axios from "axios";
import { API_URL } from "../Api/Api";

const fetchImages = () => {
  return axios
    .get(API_URL + "images")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export default { fetchImages };