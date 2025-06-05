import axios from 'axios';

const API_KEY = '50507982-c6a73d82cfbe0bce0234dfd9b';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;

export async function getImagesByQuery(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: PER_PAGE,
    },
  });
  return response.data;
}



// import axios from 'axios';

// const API_KEY = '50507982-c6a73d82cfbe0bce0234dfd9b';
// const BASE_URL = 'https://pixabay.com/api/';

// export async function getImagesByQuery(query, page = 1, perPage = 40) {
//   const params = {
//     key: API_KEY,
//     q: query,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     page,
//     per_page: perPage,
//   };

//   try {
//     const response = await axios.get(BASE_URL, { params });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// }


