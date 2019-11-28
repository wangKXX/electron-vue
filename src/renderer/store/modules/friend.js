import pinying from '../../utils/pinyin'
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
    state.friendList = [];
  }
}

const actions = {
  SET_SELECT_USER ({ commit }, params) {
    commit('SET_SELECT_USER', params);
  },
  SET_USER_LIST ({ commit }, params) {
    const mkResoult = params.reduce((init, curr) => {
      const code = pinying(curr.nick);
      if (!init[code]) {
        init[code] = [];
      }
      init[code].push(curr);
      return init;
    }, {})
    commit('SET_USER_LIST', mkResoult);
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
