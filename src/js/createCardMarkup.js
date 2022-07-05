export { createCardMarkup };

function createCardMarkup(arr){    
   return arr.map(item=>      
      `<div class='gallery__item'>
        <a href='${item.largeImageURL}'>
          <img class="gallery__image" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            <div class="gallery__info">
              <p class="info-item">
                <b>Likes:</b><br><span>${item.likes}</span>
              </p>
              <p class="info-item">
                <b>Views:</b><br><span>${item.views}</span>
              </p>
              <p class="info-item">
                <b>Comments:</b><br><span>${item.comments}</span>
              </p>
              <p class="info-item">
                <b>Downloads:</b><br><span>${item.downloads}</span>
              </p>
          </div>
        </a>
      </div>`        
    ).join('');  
};