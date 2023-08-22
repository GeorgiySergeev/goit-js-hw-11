import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fatchHits(searchQuery, page) {
  const params = {
    key: '38366694-9ace1c8eba851c65d09ce7fab',
    q: `${searchQuery}`,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
    page: `${page}`,
    lang: 'en',
  };

  try {
    const response = await axios.get('', { params });
    const hitsData = response.data;

    return hitsData;
  } catch (error) {
    console.log(error.message);
  }
}

export { fatchHits };
