import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

class AccountService {
  getAaccounts(queryString) {
    if(queryString)
      return axios.get(API_URL + 'accounts?' + queryString, { headers: authHeader() });
    else 
      return axios.get(API_URL + 'accounts', { headers: authHeader() });
  }

  setAaccount(params) {
    return axios.put(API_URL + 'accounts', params, { headers: authHeader() });
  }
}

export default new AccountService();