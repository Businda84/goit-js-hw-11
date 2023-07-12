import axios from 'axios';
import Notiflix from 'notiflix';
import { requestAPI, searchByTag } from './requestAPI';

const btnLoadMoreEl = document.querySelector('load-more');
const searchFormEl = document.querySelector('#search-form');
const searchQueryEl = document.getElementsByName('searchQuery');
const postsWrapperEl = document.querySelector('.js-posts');
const galleryEl = document.querySelector('.gallery');
let page = 1;

function searchImgByTag(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;
  tag = searchQuery.value.trim();
  searchQuery.value = '';
  console.log(tag);

  requestAPI()
    .then(data => {
      galleryEl.innerHTML = createMarkup(data);
    })
    .catch(err => {
      console.log(err);
    });
}
function createMarkup(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        views,
        comments,
        downloads,
        likes,
      }) =>
        `<div class="photo-card">
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
  </div>`
    )
    .join('');
}

searchFormEl.addEventListener('submit', searchImgByTag);
