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

  let searchByTag = '';

  btnLoadMoreEl.style.display = 'none';
  searchByTag = tag;
  console.log(searchByTag);
  galleryEl.innerHTML = '';
  searchQuery.value = '';
  if (tag === '') {
    Notiflix.Notify.failure('Enter a query');
    return;
  }
  if (searchByTag === '') {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again'
    );
    return;
  }

  requestAPI(searchByTag)
    .then(data => {
      console.log(data);

      btnLoadMoreEl.style.display = 'block';
      createMarkup(data.hits);
    })
    .catch(err => {
      console.log(err.message);
    });

  btnLoadMoreEl.style.display = 'none';
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
    const data = await requestAPI();
    galleryEl.insertAdjacentHTML('beforeend', markup(data));
  } catch {
    throw new Error();
  }
  if (page > total / hits) {
    btnLoadMoreEl.style.display = 'none';
  }
};
searchFormEl.addEventListener('submit', searchImgByTag);
btnLoadMoreEl.addEventListener('click', handlClick);
