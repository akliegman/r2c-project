import { groupArrayByKey } from "../utils/groupArrayByKey";

export const getPhotos = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .catch((error) => {
      // TODO: handle error
      console.error("Error:", error);
    });

  const groupedPhotos = groupArrayByKey(response, "albumId");
  return groupedPhotos;
};
