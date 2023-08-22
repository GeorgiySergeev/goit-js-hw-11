import Notiflix from 'notiflix';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';
//--------------------------------
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
  //Notiflix.Loading.standard('Loading...', 1000);
  clearGallery();
  
  refs.loadMoreBtn.classList.add('is-hidden');
  imageApiServise.resetPage();
  imageApiServise.query = evt.target[0].value; //можно так достучаться: evt.currentTarget.elements.searchQuery.value

  if (imageApiServise.query === '') {
    Notiflix.Report.failure('Error!', 'Please, enter search query! ', 'Close');
  } else {
    imageApiServise.fatchHits().then(arr => {
      if (arr.length === 0) {
        Notiflix.Report.failure(
          'Error!',
          'Sorry, there are no images matching your search query. Please try again...',
          'Ok'
        );
        return;
      }

      renderGallery(arr);
      refs.loadMoreBtn.classList.replace('is-hidden', 'load-more');
      lightbox.refresh();
    });
  }
};

function onLoadMoreBtn() {
    
  imageApiServise.fatchHits().then(arr => {
    
    console.log(arr);
    renderGallery(arr);
    lightbox.refresh();
    
  });
  
};

function clearGallery() {
  refs.gallery.innerHTML = '';
};




console.log(imageApiServise)
