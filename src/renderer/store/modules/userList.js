const state = {
  userList: [],
  currentSession: {},
  histryCache: []
}

const mutations = {
  SET_USER_LIST (state, val) {
    state.userList = val;
  },
  SET_CURRENT_SESSION(state, val) {
    state.currentSession = val;
  },
  SET_HISTRY_CACHE(state, val) {
    if (val.type === 1) {
      state.histryCache.push(val.mesg);
    } else {
      state.histryCache = val
    }
  },
  clearUserList (state, isClearSession) {
    state.userList = [];
    isClearSession && (state.currentSession = null);
    state.histryCache = [];
  }
}

const actions = {
  SET_USER_LIST ({ commit }, params) {
    commit('SET_USER_LIST', params);
  },
  SET_CURRENT_SESSION({ commit }, params) {
    commit('SET_CURRENT_SESSION', params);
  },
  SET_HISTRY_CACHE({ commit }, params) {
    commit('SET_HISTRY_CACHE', params);
  },
  clearUserList({ commit }, isClearSession = true) {
    commit('clearUserList', isClearSession);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
