import DnwSevrice from '../services/dnw.service';
import DnwDetail from '../models/dnw.detail';


const initialState = {
  items: [],
  detail: new DnwDetail(0),
  details: []
};

export const dnw = {
  namespaced: true,
  state: initialState,
  actions: {
    items({ commit }) {
      return DnwSevrice.getItems()
        .then(
          items => {
            if (items.data) {
              if (items.data.code === "0000") {
                commit('items', items.data.data);
              }
              return Promise.resolve(items.data);
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
    setItem({ commit }, item) {
      commit('setItem', item);
    },
    details({ commit }, date) {
      return DnwSevrice.getDetails(date)
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
    items(state, items) {
      state.items = items;
    },
    setItem(state, item) {
      state.items.unshift(item);
      state.detail.dnw_item_id = item.id;
    },
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
          remark: obj.remark,
          amount: obj.amount,
          standard_dt: obj.standard_dt
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
    items(state) {
      return state.items;
    },
    detail(state) {
      return state.detail;
    },
    details(state) {
      return state.details;
    },
  }
};