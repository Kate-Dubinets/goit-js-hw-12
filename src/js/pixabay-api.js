import axios from 'axios';

const API_KEY = '50507982-c6a73d82cfbe0bce0234dfd9b';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  console.log("getImagesByQuery")
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}