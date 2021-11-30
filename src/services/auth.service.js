import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/auth/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'signin', {
        email: user.email,
        password: user.password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'signup', {
      name: user.name,
      username: user.username,
      email: user.email,
      password: user.password
    });
  }

  refresh() {
    return axios.post(API_URL + 'refresh', { headers: authHeader(true) });
  }
}

export default new AuthService();