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
    return axios
      .post(API_URL + 'refresh', {}, { headers: authHeader(true) })
      .then(response => {
        if (response.data && response.data.code === "0000" && response.data.data.accessToken) {
          let user = JSON.parse(localStorage.getItem('user'));
          user.accessToken = response.data.data.accessToken;
          user.refreshToken = response.data.data.refreshToken;
          localStorage.setItem('user', JSON.stringify(user));

          return response.data.data;
        }
        else{
          return null;
        }
      });
  }

  check(){
    return axios.post(API_URL, {}, { headers: authHeader() })
      .then(res => {
        if(res.data){
          return res.data.code;
        }
        else{
          return "9999";
        }
      })
    ;
  }
}

export default new AuthService();