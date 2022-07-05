import axios from 'axios';
export { fetchImg };

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = 'key=28348540-5acc26c4c4c16999acfb2f011';


  
  async function fetchImg (query, page, per_page) {
    
    if(query === ''){      
    resetForm();
    return}; 

    const response = await axios.get(`${BASE_URL}${API_KEY}&q=${query}&image_type=photo&$orientation=horizontal&safesearch=true&page=${page}&per_page=${per_page}`)
    return response;
}