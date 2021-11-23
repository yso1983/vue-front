// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    drawer: false,
    cate: {
      id: 0,
      name: "",
      select: null,
      remark: ""
    }
  },
  mutations: {
    CHANGE_CATE(state, cate){
      state.cate = cate;
    }
  }
});