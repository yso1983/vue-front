import axios from 'axios';
import authHeader from './auth-header';

const API_URL = '/api/';

class NoteService {
  getNotes(dt, limit) {
    return axios.get(`${API_URL}notes?dt=${dt}&limit=${limit}`, { headers: authHeader() });
  }

  setNotes(params) {
      return axios.put(API_URL + 'notes', params, { headers: authHeader() });
  }

}

export default new NoteService();