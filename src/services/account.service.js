import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

class AccountService {
  getAaccounts() {
    return axios.get(API_URL + 'accounts', { headers: authHeader() });
  }

  setAaccount(params) {
    return axios.put(API_URL + 'account', params, { headers: authHeader() });
  }
}

export default new AccountService();