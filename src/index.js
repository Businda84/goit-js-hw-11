import axios from 'axios';
import Notiflix from 'notiflix';
import * as basicLightbox from 'basiclightbox';
import { requestAPI } from './requestAPI';

const btnLoadMoreEl = document.querySelector('load-more');
const searchFormEl = document.querySelector('#search-form');
const searchQueryEl = document.getElementsByName('searchQuery');
const postsWrapperEl = document.querySelector('.js-posts');
const galleryEl = document.querySelector('.gallery');
let page = 1;
let tag;

function searchImgByTag(event) {
  event.preventDefault();
  const { searchQuery } = event.currentTarget.elements;

  tag = searchQuery.value.trim();
  console.log(tag);
  if (!tag) {
    return;
  }

  let searchByTag = '';

  searchByTag = tag;
  console.log(tag);

  requestAPI(searchByTag)
    .then(data => {
      console.log(data);
      if (!data) {
        return console.log('Images not found');
      }

      createMarkup(data.hits);
    })
    .catch(err => {
      console.log(err);
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

searchFormEl.addEventListener('submit', searchImgByTag);
