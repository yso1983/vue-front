import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

class UserService {
  getUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

export default new UserService();