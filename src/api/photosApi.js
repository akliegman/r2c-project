import axios from "axios";
import { groupArrayByKey } from "../utils/groupArrayByKey";

export const getPhotos = async () => {
  // uses axios to grab photos from the API in try catach
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/photos"
    );

    return groupArrayByKey(response.data, "albumId");
  } catch (error) {
    console.log(error);
  }
};
