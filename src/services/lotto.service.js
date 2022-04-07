import axios from 'axios';

const API_URL = '/lotto/';

class LottoService {
  getRandomNumbers(cnt) {
    return axios.get(`${API_URL}random?cnt=${cnt}`);
  }

  getLottoList() {
    return axios.get(`${API_URL}`);
  }

  setLatestSync() {
    return axios.get(`${API_URL}latest/sync`);
  }
}

export default new LottoService();