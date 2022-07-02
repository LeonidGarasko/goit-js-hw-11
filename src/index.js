import 'modern-normalize'
import axios from "axios";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const createdGallery = new SimpleLightbox('.gallery a');

axios.defaults.baseURL = 'https://pixabay.com';
axios.defaults.headers.common.key ="28400879-5f1a3988aabd52ac255ecba31";
axios.defaults.headers.common.image_type = 'photo';
axios.defaults.headers.common.orientation = 'horizontal';
axios.defaults.headers.common.safesearch = 'true';
axios.defaults.headers.common.per_page = 'per_page=40';

let page = 1;
let query = '';

form.addEventListener('submit', onSearch);

function onSearch(e) {
      e.preventDefault();
    gallery.innerHTML ='';
    query = e.currentTarget.searchQuery.value.trim();
    page = 1;
    
    if(query === ''){Notify.failure('The search string cannot be empty.')
    return};
    
    fetchImg(query, page);
    observer.observe(document.querySelector('.scroll-guard'));
}

function fetchImg(query, page) {
    axios
        .get(`/api`).then(res => res.data).catch(error => console.log)
    .then(res => {          
    createCardMarkup(res.data.hits);
    });
}

function createCardMarkup(arr) {
    const cardMarkup = arr.map(item=>  
      
            `<a class='gallery__item' href='${item.largeImageURL}'>
            <div class="photo-card">
            <img class="gallery__image" src="${item.previewURL}" alt="" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes: ${item.likes}</b>
              </p>
              <p class="info-item">
                <b>Views: ${item.views}</b>
              </p>
              <p class="info-item">
                <b>Comments: ${item.comments}</b>
              </p>
              <p class="info-item">
                <b>Downloads: ${item.downloads}</b>
              </p>
            </div>
          </div>
          </a>`        
      ).join('');
    
  gallery.insertAdjacentHTML('beforeend', cardMarkup);
}
const options = {
  rootMargin: '150px',
  threshold: 1.0,
};

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('entry');
      page += 1;
      fetchImg (query, page);
    }
  });
}, options);









// fetch('https://pixabay.com/api/?key=28400879-5f1a3988aabd52ac255ecba31&q=cat').then(res =>console.log(res.json()))