import axios from 'axios';

/* main url to make requests to the TMDB movie db */
// stuff gets appended to the end of the url. good practise to do when doing multiple requests.
const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export default instance;
