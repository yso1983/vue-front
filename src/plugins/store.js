// store.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    drawer: false,
    user: null, 
    account: {
      id: 0,
      name: "",
      amount: 0,
      select: null,
      remark: "",
      accounts: []
    },
    subtitle: ""
  },
  getters: {
    user:(state) => {return state.user;}
  },
  mutations: {
    CHANGE_ACCOUNT(state, account){
      state.account.id = account.id;
      state.account.name = account.name;
      state.account.amount = account.amount;
      state.account.select = account.select;
      state.account.remark = account.remark;
    },
    CHANGE_ACCOUNT_LIST(state, accounts){
      state.account.accounts = accounts;
    },
    CHANGE_SUBTITLE(state, subtitle){
      state.subtitle = subtitle;
    },
    SET_USER(state, user){ 
      state.user = user;
    }
  },
  actions: {
    CHANGE_ACCOUNT ({commit}, account) {
      commit('CHANGE_ACCOUNT', account);
    },
    CHANGE_ACCOUNT_LIST({commit}, accounts){
       commit('CHANGE_ACCOUNT_LIST', accounts);
    },
    CHANGE_SUBTITLE({commit}, subtitle){
       commit('CHANGE_SUBTITLE', subtitle);
    },
    SET_USER({commit}, user){
       commit('SET_USER', user);
    }
  }
});