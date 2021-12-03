import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/dnw/';

class DnwService {
  getItems() {
     return axios.get(API_URL + 'items', { headers: authHeader() });
  }

  setItem(item) {
    return axios.put(API_URL + 'items', item, { headers: authHeader() });
  }

  getDetails() {
     return axios.get(API_URL + 'details', { headers: authHeader() });
  }
  
  setDetail(detail) {
    return axios.put(API_URL + 'details', detail, { headers: authHeader() });
  }
}

export default new DnwService();