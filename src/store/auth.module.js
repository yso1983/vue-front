import AuthService from '../services/auth.service';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = user
  ? { status: { loggedIn: true, selectedGroupId: true }, user, groups: user.groups }
  : { status: { loggedIn: false, selectedGroupId: false }, user: null, groups: [] };

export const auth = {
  namespaced: true,
  state: initialState,
  actions: {
    login({ commit }, user) {
      return AuthService.login(user).then(
        user => {

          let groups  = user.groups;

          if(groups && groups.length == 1){
            commit('groupSuccess', groups[0].id);
          }

          commit('loginSuccess', user);
          return Promise.resolve(user);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    logout({ commit }) {
      AuthService.logout();
      commit('logout');
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        response => {
          commit('registerSuccess');
          return Promise.resolve(response.data);
        },
        error => {
          commit('registerFailure');
          return Promise.reject(error);
        }
      );
    },
    refresh({ commit }) {
      return AuthService.refresh().then(
        tokens => {
          if (tokens == null) {
            this.logout({ commit });
            return Promise.reject({ message: "token is null" });
          }
          else {
            commit('refresh', tokens);
            return Promise.resolve(tokens);
          }
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    }, 
    check({commit}){
      return AuthService.check().then(
        code => {
          return Promise.resolve(code);
        },
        error => {
          commit('loginFailure');
          return Promise.reject(error);
        }
      );
    },
    selectGroupId({commit}){
      commit('selectGroupId');
    }
  },
  mutations: {
    loginSuccess(state, user) {
      state.status.loggedIn = true;
      state.user = user;
      state.groups = user.groups;
    },
    loginFailure(state) {
      state.status.loggedIn = false;
      state.user = null;
    },
    logout(state) {
      state.status.loggedIn = false;
      state.status.selectedGroupId = false;
      state.user = null;
      state.groups = [];
    },
    registerSuccess(state) {
      state.status.loggedIn = false;
    },
    registerFailure(state) {
      state.status.loggedIn = false;
    },
    refresh(state, tokens) {
      state.status.loggedIn = true;
      state.user.accessToken = tokens.accessToken;
      state.user.refreshToken = tokens.refreshToken;
    },
    groupSuccess(state, groupid) {
      state.status.selectedGroupId = true;
      localStorage.setItem("groupid", groupid);
    },
    selectGroupId(state){
      state.status.selectedGroupId = true;
    },
  }
};