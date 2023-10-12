import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const newApiKey = '22698692-493badbd00e8d258bf66e0e0d';

async function fatchHits(searchQuery, page) {
  const params = {
    key: newApiKey, // my old key  '38366694-9ace1c8eba851c65d09ce7fab', //new key Juliya '39996827-e9c56c5fbc7ab9c1bd6fd11c1'
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
    console.log(hitsData);

    return hitsData;
  } catch (error) {
    return;
  }
}

export { fatchHits };
