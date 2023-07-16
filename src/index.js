import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import * as basicLightbox from 'basiclightbox';
import { requestAPI } from './requestAPI';

const btnLoadMoreEl = document.querySelector('.load-more');
const searchFormEl = document.querySelector('#search-form');
const searchQueryEl = document.getElementsByName('searchQuery');
const postsWrapperEl = document.querySelector('.js-posts');
const galleryEl = document.querySelector('.gallery-list');
let page = 1;
let inputValue;
let totalPages = 0;
btnLoadMoreEl.style.display = 'none';
let totalHits = 0;
// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `);

// instance.show();

function searchImgByTag(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;

  inputValue = searchQuery.value.trim();
  // console.log(event.target.elements.searchQuery.value);
  galleryEl.innerHTML = '';
  searchQuery.value = '';
  if (inputValue === '') {
    Notiflix.Notify.failure('Enter a query');
    return;
  }

  requestAPI(inputValue, page)
    .then(data => {
      btnLoadMoreEl.style.display = 'block';
      console.log(data.hits.length);
      if (data.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again'
        );
        btnLoadMoreEl.style.display = 'none';
        return;
      }

      createMarkup(data.hits);

      if (data.hits.length <= 40) {
        btnLoadMoreEl.style.display = 'none';
        return;
      }
    })
    .catch(err => {
      console.log(err.message);
    });
}

function createMarkup(data) {
  const markup = data
    .map(
      ({
        webformatURL,
        tags,
        largeImageURL,
        views,
        comments,
        downloads,
        likes,
      }) => {
        const card = `<div class="photo-card">
      <a class="gallery-itam" href="${largeImageURL}">
        <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy"/>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </a>
    </div>`;
        return card;
      }
    )
    .join('');
  galleryEl.insertAdjacentHTML('beforeend', markup);
}

const handleClick = async () => {
  page += 1;

  try {
    const { hits, totalHits } = await requestAPI(inputValue, page);
    createMarkup(hits);
    galleryEl.insertAdjacentHTML('beforeend', markup(data));
  } catch (error) {
    console.log(error);
  }
  if (totalHits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    btnLoadMoreEl.style.display = 'none';
    return;
  }
  if (page === Math.ceil(totalHits / 40)) {
    btnLoadMoreEl.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
};
searchFormEl.addEventListener('submit', searchImgByTag);
btnLoadMoreEl.addEventListener('click', handleClick);
let galleryShow = new SimpleLightbox('.gallery-container a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});
galleryShow.refresh();
