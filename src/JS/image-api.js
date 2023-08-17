import axios from 'axios';
import Notiflix from 'notiflix';
axios.defaults.baseURL = 'https://pixabay.com/api/';

// делаю класс для работы с API pixabay.
// будет фетчить имеджи и работать с запросом формы, уваличивать пейдж на один, ресет Пейдж

export default class ImagesApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fatchHits(query, page = 1) {
    const params = {
      key: '38366694-9ace1c8eba851c65d09ce7fab',
      q: `${this.searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: `${this.page}`,
      lang: 'en',
    };
    

    const response = await axios.get('', { params });
    const hitsArray = response.data.hits;

    if (hitsArray.length === 0) {
      loadMoreButton.style.display = 'none';
      Notiflix.Report.failure(
        'Error!',
        'Sorry, there are no images matching your search query. Please try again...',
        'Ok'
      );
    }
    this.page += 1;

    
    return hitsArray;
  }

  resetPage(){
    this.page = 1;
  };
  
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

//export { fatchHits };
