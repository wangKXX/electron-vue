const state = {
  userInfo: {
    id: 1944821630,
    nick: 'carol',
    src: 'https://pic.qqtn.com/up/2016-1/2016010609094834279.jpg'
  }
}

const mutations = {
  SET_USER_INFO (state, val) {
    state.userInfo = val;
  }
}

const actions = {
  SET_USER_INFO ({ commit }, params) {
    commit('SET_USER_INFO', params);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
