import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let searchQuery = '';
let currentPage = 1;
let totalHits = 0;

hideLoadMore();

form.addEventListener('submit', async e => {
  e.preventDefault();
  searchQuery = e.target.elements.searchQuery.value.trim();
  if (!searchQuery) return;

  clearGallery();
  hideLoadMore(); 
  currentPage = 1;

  showLoader();

  try {
    const { hits, totalHits: total } = await getImagesByQuery(searchQuery, currentPage);
    totalHits = total;

    if (hits.length === 0) {
      iziToast.info({ message: 'No images found. Try another keyword!' });
      return;
    }

    createGallery(hits);

    if (totalHits > hits.length) {
      showLoadMore();
    }
  } catch (error) {
    iziToast.error({ message: 'Error fetching images' });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage++;
  showLoader();
  hideLoadMore();

  try {
    const { hits } = await getImagesByQuery(searchQuery, currentPage);
    createGallery(hits);

    const loadedImages = currentPage * 40;
    if (loadedImages >= totalHits) {
      hideLoadMore();
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading more images' });
  } finally {
    hideLoader();
  }
});

function showLoadMore() {
  loadMoreBtn.style.display='block';
}

function hideLoadMore() {
  loadMoreBtn.style.display='none'
}