import { getImagesByQuery } from './js/pixabay-api.js';
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const form = document.getElementById('search-form');
const guard = document.getElementById('guard');

let query = '';
let page = 1;
let totalHits = 0;
const perPage = 40;

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();
  query = event.currentTarget.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  observer.unobserve(guard);

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({ title: 'Info', message: 'No images found.', position: 'topRight' });
      return;
    }

    createGallery(data.hits);
    observer.observe(guard);
  } catch (error) {
    iziToast.error({ title: 'Error', message: 'Failed to fetch images.', position: 'topRight' });
  } finally {
    hideLoader();
  }
}

const observerOptions = {
  root: null,
  rootMargin: '200px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(onLoadMore, observerOptions);

async function onLoadMore(entries) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      page++;
      showLoader();

      try {
        const data = await getImagesByQuery(query, page);
        createGallery(data.hits);

        const loadedImages = document.querySelectorAll('.gallery a').length;
        if (loadedImages >= totalHits) {
          iziToast.info({ title: 'End', message: 'No more images.', position: 'topRight' });
          observer.unobserve(guard);
        }
      } catch (error) {
        iziToast.error({ title: 'Error', message: 'Loading more images failed.', position: 'topRight' });
        observer.unobserve(guard);
      } finally {
        hideLoader();
      }
    }
  }
}

// import { getImagesByQuery } from './js/pixabay-api';
// import {
//   createGallery,
//   clearGallery,
//   showLoader,
//   hideLoader,
// } from './js/render-functions';
// import iziToast from 'izitoast';

// const form = document.querySelector('.form');
// const loadMoreBtn = document.querySelector('.load-more');

// let searchQuery = '';
// let currentPage = 1;
// let totalHits = 0;

// hideLoadMore();

// form.addEventListener('submit', async e => {
//   e.preventDefault();
//   searchQuery = e.target.elements.searchQuery.value.trim();
//   if (!searchQuery) return;

//   clearGallery();
//   hideLoadMore(); 
//   currentPage = 1;

//   showLoader();

//   try {
//     const { hits, totalHits: total } = await getImagesByQuery(searchQuery, currentPage);
//     totalHits = total;

//     if (hits.length === 0) {
//       iziToast.info({ message: 'No images found. Try another keyword!' });
//       return;
//     }

//     createGallery(hits);

//     if (totalHits > hits.length) {
//       showLoadMore();
//     }
//   } catch (error) {
//     iziToast.error({ message: 'Error fetching images' });
//   } finally {
//     hideLoader();
//   }
// });

// loadMoreBtn.addEventListener('click', async () => {
//   currentPage++;
//   showLoader();
//   hideLoadMore();

//   try {
//     const { hits } = await getImagesByQuery(searchQuery, currentPage);
//     createGallery(hits);

//     const loadedImages = currentPage * 40;
//     if (loadedImages >= totalHits) {
//       hideLoadMore();
//     }
//   } catch (error) {
//     iziToast.error({ message: 'Error loading more images' });
//   } finally {
//     hideLoader();
//   }
// });

// function showLoadMore() {
//   loadMoreBtn.style.display='block';
// }

// function hideLoadMore() {
//   loadMoreBtn.style.display='none'
// }