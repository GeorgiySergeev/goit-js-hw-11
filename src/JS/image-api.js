// // делаю класс для работы с API pixabay.
// // будет фетчить имеджи и работать с запросом формы, уваличивать пейдж на один, ресет Пейдж

// export default class ImagesApiServise {
//   constructor() {
//     this.searchQuery = '';
//     this.page = 1;
//   }

//   async fatchHits(query, page = 1) {
//     const params = {
//       key: '38366694-9ace1c8eba851c65d09ce7fab',
//       q: `${this.searchQuery}`,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 40,
//       page: `${this.page}`,
//       lang: 'en',
//     };

//     try {
//       const response = await axios.get('', { params });
//       const hitsArray = response.data.hits;

//       this.page += 1;

//       return hitsArray; //возврат данных
//     } catch (error) {
//       console.log('ERROR');
//     }
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }

// //export { fatchHits };
