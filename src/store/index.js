import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './auth.module';
import { global } from './global.module';
import { dnw } from './dnw.module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    global,
    dnw,
  }
});