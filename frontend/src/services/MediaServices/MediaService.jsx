import axios from "axios"
import { API_URL } from "../Api/Api"

const fetchImages = async () => {
  try {
    const response = await axios
      .get(API_URL + "images")
    return response.data
  } catch (error) {
    console.log(error)
  }
};

const fetchImagesHomePage = async (page, itemsPerPage = 10) => {
  try {
    const response = await axios.get(`${API_URL}images`)
    const allImages = response.data
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedImages = allImages.slice(startIndex, endIndex)

    return paginatedImages
  } catch (error) {
    console.log(error)
  }
};

export default { fetchImages, fetchImagesHomePage }