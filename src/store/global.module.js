import Account from "../models/account";

export const global = {
  namespaced: true,
  state: {
    drawer: false,
    account: new Account(0, 0),
    accounts: [],
    subtitle: ""
  },
  // getters: {
  //   user:(state) => {return state.user;}
  // },
  mutations: {
    CHANGE_ACCOUNT(state, account){
      state.account = account;
    },
    CHANGE_ACCOUNT_LIST(state, accounts){
      state.accounts = accounts;
    },
    CHANGE_SUBTITLE(state, subtitle){
      state.subtitle = subtitle;
    },
  },
  actions: {
    CHANGE_ACCOUNT ({commit}, account) {
      commit('CHANGE_ACCOUNT', account);
    },
    CHANGE_ACCOUNT_LIST({commit}, accounts){
       commit('CHANGE_ACCOUNT_LIST', accounts.map((obj) => {
        return {
          id: obj.id,
          name: obj.name,
          user_id: obj.user_id,
          remark: obj.remark,
          amount: obj.amount,
          user_name: obj.user.name,
        };
      }));
    },
    CHANGE_SUBTITLE({commit}, subtitle){
       commit('CHANGE_SUBTITLE', subtitle);
    },
  }
};