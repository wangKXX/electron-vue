const state = {
  userInfo: {}
}

const mutations = {
  SET_USER_INFO (state, val) {
    state.userInfo = val;
  },
  CLAERUAERINFO (state) {
    state.userInfo = {}
  }
}

const actions = {
  SET_USER_INFO ({ commit }, params) {
    commit('SET_USER_INFO', params);
  },
  clearUserInfo({ commit }) {
    commit('CLAERUAERINFO')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
