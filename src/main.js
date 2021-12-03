import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// store.js를 불러오는 코드
import store  from "./store/index";
import router from "./router/router";
import axios from "axios";
import moment from 'moment';

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;
Vue.config.silent = true;

Vue.filter("makeComma", val =>{
    //return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return val.toString().substring(0, val.toString().indexOf('.')).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
