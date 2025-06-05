import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

let lightbox;

export function createGallery(images) {
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <a class="photo-card" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          <div class="info">
            <p><b>Likes:</b> ${likes}</p>
            <p><b>Views:</b> ${views}</p>
            <p><b>Comments:</b> ${comments}</p>
            <p><b>Downloads:</b> ${downloads}</p>
          </div>
        </a>
      `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';

// let lightbox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });

// const gallery = document.querySelector('.gallery');
// const loader = document.querySelector('.loader');

// export function createGallery(images) {
//   const markup = images
//     .map(
//       image => 
//       `<div class="photo-card">
//         <a href="${image.largeImageURL}">
//           <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
//         </a>
//         <div class="info">
//           <p class="info-item"><b>Likes</b><span>${image.likes}</span></p>
//           <p class="info-item"><b>Views</b><span>${image.views}</span></p>
//           <p class="info-item"><b>Comments</b><span>${image.comments}</span></p>
//           <p class="info-item"><b>Downloads</b><span>${image.downloads}</span></p>
//         </div>
//       </div>`
//     )
//     .join('');

//   gallery.insertAdjacentHTML('beforeend', markup);
//   lightbox.refresh();
// }

// export function clearGallery() {
//   gallery.innerHTML = '';
// }

// export function showLoader() {
//   loader.classList.remove('hidden');
// }

// export function hideLoader() {
//   loader.classList.add('hidden');
// }