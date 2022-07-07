import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

class MailService {

  sendNoteMail(params) {
      return axios.post(API_URL + 'mail/note/send', params, { headers: authHeader() });
  }

}

export default new MailService();