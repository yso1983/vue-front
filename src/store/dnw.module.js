import DnwSevrice from '../services/dnw.service';
import DnwDetail from '../models/dnw.detail';


const initialState = {
  items : [],
  detail : new DnwDetail(0),
  details : []
};

export const dnw = {
  namespaced: true,
  state: initialState,
  actions: {
    items({ commit }) {
      return DnwSevrice.getItems()
      .then(
        items => {
          if(items.data){
            if(items.data.code === "0000")
            {
              commit('items', items.data.data);
            }
            return Promise.resolve(items.data);
          }
          else{
            return Promise.reject({massage: "response data is not fund"});
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
    setItem({ commit }, item){
      commit('setItem', item);
    },
    details({ commit }) {
      return DnwSevrice.getDetails()
      .then(
        res => {
          if(res.data){
            if(res.data.code === "0000")
            {
              commit('details', res.data.data);
            }
            return Promise.resolve(res.data);
          }
          else{
            return Promise.reject({massage: "response data is not fund"});
          }
        },
        error => {
          return Promise.reject(error);
        }
      );
    },
  },
  mutations: {
    items(state, items) {
      state.items = items;
    },
    setItem(state, item) {
      state.items.push(item);
    },
    details(state, details) {
      state.details = details;
    },
  },
  getters: {
    items(state) {
      return state.items;
    },
    detail(state){
      return state.detail;
    },
    details(state){
      return state.details;
    }
  }
};