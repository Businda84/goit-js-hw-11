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
let tag;
btnLoadMoreEl.style.display = 'none';
// const instance = basicLightbox.create(`
//     <img src="assets/images/image.png" width="800" height="600">
// `);

// instance.show();
console.log(btnLoadMoreEl);

function searchImgByTag(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;

  tag = searchQuery.value.trim();
  console.log(tag);

  let searchByTag = '';

  searchByTag = tag;
  console.log(tag);
  galleryEl.innerHTML = '';
  searchQuery.value = '';
  requestAPI(searchByTag)
    .then(data => {
      console.log(data);
      if (data.totalHits === 0) {
        return Notiflix.Notify.failure(
          "We're sorry, but nothing was found for your search."
        );
        btnLoadMoreEl.style.display = 'none';
      }

      btnLoadMoreEl.style.display = 'block';
      createMarkup(data.hits);
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
      <a href="${largeImageURL}">
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

const handlClick = async () => {
  page += 1;
  try {
    if (page === data.totalHits) {
      Notiflix.Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
      btnLoadMoreEl.style.display = 'none';
    }

    galleryEl.insertAdjacentHTML('beforeend', createMarkup(data));
  } catch {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    btnLoadMoreEl.style.display = 'none';
  }
};
searchFormEl.addEventListener('submit', searchImgByTag);
btnLoadMoreEl.addEventListener('click', handlClick);
