import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import throttle from 'lodash.throttle';

import { fatchHits } from './api';
import { renderGallery } from './markup';
import { btnUp } from './button-up';

//============== refs & const ==========================

const lightbox = new SimpleLightbox('.gallery a');
const PER_PAGE = 40;

const refs = {
  gallery: document.getElementById('js-gallery'),
  titleEl: document.querySelector('.title'),
  formEl: document.getElementById('search-form'),
  btnToTop: document.querySelector('.button-to-top'),
  query: '',
  page: 1,
};

refs.formEl.addEventListener('submit', onSearch);
window.addEventListener('scroll', throttle(onScroll, 500));
//================================scroll

//==========================================================
function onSearch(evt) {
  evt.preventDefault();
  clearGallery();

  refs.query = evt.target[0].value;

  if (refs.query === '') {
    errorSearchQuery();
    return;
  } else {
    refs.titleEl.style.fontSize = '38px';
    refs.titleEl.style.marginTop = '38px';

    fatchHits(refs.query, refs.page)
      .then(data => {
        totalHits = data.totalHits;
        console.log(data);
        console.log(totalHits);

        if (data.hits.length === 0) {
          noImagesFound();
          return;
        }
        Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        renderGallery(data.hits);

        lightbox.refresh();
      })
      .catch(error => console.log(error.message));
  }
}
//===================================
function loadMoreImages() {
  refs.page += 1;

  fatchHits(refs.query, refs.page)
    .then(data => {
      renderGallery(data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      endOfCollection();
    });
}
function onScroll(e) {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    loadMoreImages();
  }
}
btnUp.addEventListener();
//===================================
function clearGallery() {
  refs.gallery.innerHTML = '';
}

function errorSearchQuery() {
  return Notiflix.Report.failure(
    'Error!',
    'Please, enter search query! ',
    'Close'
  );
}
function noImagesFound() {
  Notiflix.Report.failure(
    'Error!',
    'Sorry, there are no images matching your search query. Please try again...',
    'Ok'
  );
}

function endOfCollection() {
  Notiflix.Report.failure(
    "We're sorry, but you've reached the end of search results."
  );
}
