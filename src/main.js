import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
// store.js를 불러오는 코드
import { store } from "./plugins/store";
import router from './router/router'

Vue.config.productionTip = false

new Vue({
  vuetify,
  router: router,
  store: store,
  render: h => h(App)
}).$mount('#app')
