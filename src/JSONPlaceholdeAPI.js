import axios from 'axios';

const BASE_URL =
  'https://pixabay.com/api/?key=38109927-58adaea0db8d57035fe4e4e71';
tagIMG = '';
const options = {
  method: 'GET',

  q: tagIMG,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 40,
  safesearch: 'true',
  headers: {
    'Content-Type': 'application/json',
  },
};
// export class placeholderAPI {
//   fetchPhoto = async tag => {
//     try {
//       const response = await axios.get(`${BASE_URL}`);
//       return console.log(response);
//     } catch {
//       Notiflix.Notify.failure(err.massege);
//     }
//   };
// }

export class placeholderAPI {
  page = 1;
  fetchPhoto() {
    return fetch(`${BASE_URL}`, options).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}
