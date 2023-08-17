import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
import { renderGallery } from './markup';
import ImagesApiServise from './image-api';

const lightbox = new SimpleLightbox('.gallery a');

const imageApiServise = new ImagesApiServise();

const refs = {
  gallery: document.getElementById('js-gallery'),
  formEl: document.getElementById('search-form'),
  loadMoreBtn: document.getElementById('js-load-more'),
};

refs.formEl.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);

// hide load more btn


function onSearch(evt) {
  evt.preventDefault();
  clearGallery();
  refs.loadMoreBtn.classList.add('is-hidden');
  imageApiServise.resetPage();
  imageApiServise.query = evt.target[0].value; //можно так достучаться: evt.currentTarget.elements.searchQuery.value

  if (imageApiServise.query === '') {
    Notiflix.Report.failure('Oops, please enter search query!');
  } else {
    imageApiServise.fatchHits().then(arr => {
      console.log(arr);
      renderGallery(arr);
      refs.loadMoreBtn.classList.replace('is-hidden', 'load-more');
      lightbox.refresh();
    });
  }
}

function onLoadMoreBtn(evt) {
  imageApiServise.fatchHits().then(arr => {
    console.log(arr);
    renderGallery(arr);
    lightbox.refresh();
  });
}
function clearGallery() {
  refs.gallery.innerHTML = '';
}
