import axios from 'axios';
import Notiflix from 'notiflix';
import { placeholderAPI } from './JSON PlaceholdeAPI';
import { createMarkup } from './markup';
const searchBtnEl = document.querySelector('.search-btn');
const searchQueryEl = document.getElementsByName('searchQuery');
const btnLoadMoreEl = document.querySelector('.load-more');
const searchFormEl = document.querySelector('#search-form');
const postsWrapperEl = document.querySelector('.js-posts');
const galleryEl = document.querySelector('.gallery-section');
const totalHits = '';
btnLoadMoreEl.style.display = 'none';

const placeholderInstance = new placeholderAPI();
placeholderInstance
  .fetchPhoto()
  .then(data => {
    console.log(data.hits);
    postsWrapperEl.innerHTML = createMarkup(data);
  })
  .catch(err => {
    console.log(err);
  });

// const options = {
//   method: 'GET',
//   key: API_KEY,
//   q: tagIMG,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 40,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// };
// searchFormEl.addEventListener('submit', searchImgByTag);

// function searchImgByTag(event) {
//   event.preventDefault();
//   const { searchQuery } = event.currentTarget.elements;
//   SearchPhoto = searchQuery.value.trim().toLowerCase();
//   // console.log(SearchPhoto);
//   if (SearchPhoto === '') {
//     Notiflix.info('Enter your request!');
//     return;
//   }
//   console.log(SearchPhoto);
//   getImgByTeg().then(res => {
//     const data = res.data;
//     console.log(res.data);
//     return data;
//   });
// }

// const getImgByTeg = async tag => {
//   try {
//     const response = await axios.get(`${BASE_URL}`, options);
//     return console.log(response);
//   } catch {
//     Notiflix.Notify.failure(err.massege);
//   }
// };

// let imgData = response.data.hits.map(hit => {
//   webformatURL: hit.webformatURL;
//   largeImageURL: hit.largeImageURL;
//   comments: hit.comments;
//   views: hit.views;
//   downloads: hit.downloads;
//   likes: hit.likes;
//   tags: hit.tags;
// });
