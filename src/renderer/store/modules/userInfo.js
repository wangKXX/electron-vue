const state = {
  userInfo: {}
}

const mutations = {
  SET_USER_INFO (state, val) {
    state.userInfo = val;
  }
}

const actions = {
  SET_USER_INFO ({ commit }, params) {
    commit('SET_USER_INFO', params);
  },
  clearUserInfo({ state }) {
    state.userInfo = {}
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
