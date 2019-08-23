const state = {
  friendList: [],
  selectUser: {}
}

const mutations = {
  SET_SELECT_USER (state, val) {
    state.selectUser = val;
  },
  SET_USER_LIST (state, val) {
    state.friendList = val
  },
  clearFriend (state) {
    state.selectUser = {};
  }
}

const actions = {
  SET_SELECT_USER ({ commit }, params) {
    console.log(params, '>>>>>');
    commit('SET_SELECT_USER', params);
  },
  SET_USER_LIST ({ commit }, params) {
    // params = friendList;
    commit('SET_USER_LIST', params)
  },
  clearFriend({ commit }) {
    commit('clearFriend')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
