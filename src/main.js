import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// store.js를 불러오는 코드
import store  from "./store/index";
import router from "./router/router";
import axios from "axios";
import moment from 'moment';

import * as VueGoogleMaps from 'vue2-google-maps';

import VueLodash from 'vue-lodash';
import lodash from 'lodash';
 
// name is optional
Vue.use(VueLodash, { name: 'custom' , lodash: lodash });

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
  if(val){
    return val.toString().substring(0, val.toString().indexOf('.')).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }else{
    return "0";
  }
  
});

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('YYYY-MM-DD');
  }
});

Vue.filter('strSortData', function(value) {
  if (value && value.length > 20) {
    return value.substr(0, 20) + "...";
  } else {
    return value ?? "";
  }
});


window.Kakao.init(process.env.VUE_APP_KAKAO_JS_KEY);

// @see https://www.npmjs.com/package/vue2-google-maps
Vue.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_GOOGLEMAP_KEY,
        // This is required to use the Autocomplete plugin
        libraries: 'places', // 'places,drawing,visualization'
    },
});
 
new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
