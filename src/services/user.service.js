import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

class UserService {
  getUsers() {
    return axios.get(API_URL + 'users', { headers: authHeader() });
  }

  getGroups(){
    return axios.get(API_URL + 'groups', { headers: authHeader() });
  }

  getUsersByGroup(groupId){
    let query = groupId ? '?groupId=' + groupId : '';

    return axios.get(API_URL + 'group/users' + query, { headers: authHeader() });
  }
}

export default new UserService();