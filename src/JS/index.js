import Notiflix, { Loading } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import throttle from 'lodash.throttle';

import { fatchHits } from './api';
import { renderGallery } from './markup';
import { btnUp } from './button-up';

//============== refs & const ==========================

const lightbox = new SimpleLightbox('.gallery a');
const PER_PAGE = 40;
let counter = PER_PAGE;

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
btnUp.addEventListener();

//==========================================================
function onSearch(evt) {
  evt.preventDefault();
  clearGallery();

  refs.query = evt.target[0].value.trim();

  if (refs.query === '') {
    errorSearchQuery();
    return;
  } else {
    refs.titleEl.style.fontSize = '38px';
    refs.titleEl.style.marginTop = '38px';

    fatchHits(refs.query, refs.page)
      .then(data => {
        //console.log(counter);
        const arrOfImages = data.hits;

        if (arrOfImages.length === 0) {
          noImagesFound();
        }
        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        renderGallery(arrOfImages);

        lightbox.refresh();
      })
      .catch(error => console.log(error.message))
      .finally(() => {
        refs.formEl.reset();
      });
  }
}
//===================================
function loadMoreImages() {
  Notiflix.Loading.remove();

  refs.page += 1;

  fatchHits(refs.query, refs.page)
    .then(data => {
      const state = counterFnc(data.totalHits, counter);
      counter += PER_PAGE;
      if (!state) {
        return endOfCollection();
      }
      renderGallery(data.hits);
      lightbox.refresh();
    })
    .catch(error => {
      return endOfCollection();
    });
}

function counterFnc(totalHits, counter) {
  return counter < totalHits;
}

function onScroll() {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight
  ) {
    onLoading();
    loadMoreImages();
  }
}
function checkIfEndOfPage() {
  return (
    window.innerHeight + window.pageYOffset >=
    document.documentElement.scrollHeight
  );
}
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
function onLoading() {
  Notiflix.Loading.circle('Loading picture...', {
    backgroundColor: 'transparent',
  });
}
