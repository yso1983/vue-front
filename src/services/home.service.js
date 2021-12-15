import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/home/';

class HomeService {
  getDnwThisMonth() {
    return axios.get(API_URL + 'dnw/month', { headers: authHeader() });
  }
}

export default new HomeService();