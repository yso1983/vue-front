import Sevrice from '../services/automatic.dnw.service';
import Detail from '../models/automatic.dnw.detail';


const initialState = {
  items: [],
  detail: new Detail(0),
  details: []
};

export const automaticDnw = {
  namespaced: true,
  state: initialState,
  actions: {
    details({ commit }) {
      return Sevrice.getDetails()
        .then(
          res => {
            if (res.data) {
              if (res.data.code === "0000") {
                commit('details', res.data.data);
              }
              return Promise.resolve(res.data);
            }
            else {
              return Promise.reject({ massage: "response data is not fund" });
            }
          },
          error => {
            return Promise.reject(error);
          }
        );
    },
    changeDetail({ commit }, detail) {
      commit('changeDetail', detail);
    },
    setDetail({ commit }, detail) {
      commit('setDetail', detail); 
    },
  },
  mutations: {
    details(state, details) {
      state.details = details.map((obj) => {
        return {
          id: obj.id,
          account_id: obj.account_id,
          account_name: obj.account.name,
          user_id: obj.created_user_id,
          user_name: obj.account.user.name,
          dnw_item_id: obj.dnw_item_id,
          dnw_item_name: obj.dnw_item.name,
          amount: obj.amount,
          day: obj.day
        };
      });
    },
    changeDetail(state, detail) {
      state.detail = detail;
    },
    setDetail(state, detail) {
      state.details.push(detail);
    },
  },
  getters: {
    detail(state) {
      return state.detail;
    },
    details(state) {
      return state.details;
    },
  }
};