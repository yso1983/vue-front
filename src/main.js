import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
// store.js를 불러오는 코드
import { store } from "./plugins/store";
import router from "./router/router";
import axios from "axios";

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

Vue.filter("makeComma", val =>{
    return String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
});

new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount("#app");
