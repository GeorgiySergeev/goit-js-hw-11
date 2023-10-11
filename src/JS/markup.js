export { renderGallery };



function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => {
    const {
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    } = image;
    return `
        <a class="card-link" href="${largeImageURL}">
        <div class="photo-card">
        <img class="card-img"
          src="${webformatURL}"
          width="340px"
          heigth ="240px"
          
          alt="${tags}"
          loading="lazy"
        />
        <div class="info">
          <p class="info-item">
            <b>Likes</b>
            ${likes}
          </p>
          <p class="info-item">
            <b>Views</b>
            ${views}
          </p>
          <p class="info-item">
            <b>Comments</b>
            ${comments}
          </p>
          <p class="info-item">
            <b>Downloads</b>
            ${downloads}
          </p>
        </div>
      </div> 
        </a>
      `;
  });

  gallery.insertAdjacentHTML('beforeend', markup.join(''));
}
