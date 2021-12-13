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

  getDetails(params) {
    return axios.get(API_URL + params + '/details', { headers: authHeader() });
  }

  setDetail(detail) {
    return axios.put(API_URL + 'details', detail, { headers: authHeader() });
  }

  getDnwChartLastFewDays(params) {
    return axios.get(API_URL + params + '/chart', { headers: authHeader() });
  }
}

export default new DnwService();