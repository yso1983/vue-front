import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/automatic/';

class AutomaticDnwService {
  
  getDetails() {
     return axios.get(API_URL + 'list', { headers: authHeader() });
  }
  
  setDetail(detail) {
    return axios.put(API_URL, detail, { headers: authHeader() });
  }
}

export default new AutomaticDnwService();