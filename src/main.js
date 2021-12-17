import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// store.js를 불러오는 코드
import store  from "./store/index";
import router from "./router/router";
import axios from "axios";
import moment from 'moment';

if(process.env.NODE_ENV === 'production'){
  // baseURL 기본값을 정의한다
  axios.defaults.baseURL = process.env.VUE_APP_API_SERVER_URL;
    
  // 모든 요청에 추가할 헤더 설정
  //axios.defaults.headers.common['Authorization'] = 'something';
  // GET 요청에 추가할 헤더 설정
  //axios.defaults.headers.post['Accepts'] = 'application/json';
}

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.filter("makeComma", val =>{
  return val.toString().substring(0, val.toString().indexOf('.')).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD');
  }
});

new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
