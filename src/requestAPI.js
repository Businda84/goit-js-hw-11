import axios from 'axios';

const API_KEY = '38109927-58adaea0db8d57035fe4e4e71';
const BASE_URL = 'https://pixabay.com/api/';

export async function requestAPI(searchByTag, page) {
  const response = await fetch(
    `${BASE_URL}?key=${API_KEY}&q=${searchByTag}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
  );
  const photos = await response.json();
  // console.log(photos);
  return photos;
}
