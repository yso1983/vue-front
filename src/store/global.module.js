import Account from "../models/account";
import UserService from "../services/user.service";

export const global = {
  namespaced: true,
  state: {
    drawer: false,
    account: new Account(0, 0),
    accounts: [],
    subtitle: "",
    messageDialog: {
      dialog: false,
      message: ""
    }, 
    noteMail: {
      nodeId: 0,
      dialog: false,
      targets: [], 
    }
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
    OPEN_DIALOG(state, message){
      state.messageDialog.dialog = true;
      state.messageDialog.message = message;
    },
    CLOSE_DIALOG(state){
      state.messageDialog.dialog = false;
      state.messageDialog.message = '';
    },
    OPEN_NOTE_MAIL(state, targets){
      state.noteMail.nodeId = targets[0].id;
      state.noteMail.dialog = true;
      state.noteMail.targets = targets;
    },
    CLOSE_NOTE_MAIL(state){
      state.noteMail.nodeId = 0;
      state.noteMail.dialog = false;
      state.noteMail.targets = [];
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
    OPEN_DIALOG({commit}, message){
       commit('OPEN_DIALOG', message);
    },
    CLOSE_DIALOG({commit}){
       commit('CLOSE_DIALOG');
    },
    OPEN_NOTE_MAIL({commit}, noteId){
      UserService.getUsers()
        .then((res) => {
        if (res.data && res.data.code === "0000") {
          commit('OPEN_NOTE_MAIL', res.data.data.map((obj) => {
            return {
              email: obj.email,
              id: noteId,
            };
          }));
        }
      });

    },
    CLOSE_NOTE_MAIL({commit}){
       commit('CLOSE_NOTE_MAIL');
    },
  },
  getters: {
    dialog(state) {
      return state.messageDialog;
    },
    noteMail(state) {
      return state.noteMail;
    }
  }
};