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
  }
}

const actions = {
  SET_SELECT_USER ({ commit }, params) {
    commit('SET_SELECT_USER', params);
  },
  GET_USER_LIST ({ commit }, params) {
    const friendList = [
      {
        src: 'https://pic.qqtn.com/up/2016-1/2016010609094834279.jpg',
        nick: '王胖子',
        id: 1
      },{
        src: 'https://pic.qqtn.com/up/2016-1/2016010609094913163.png',
        nick: '天真',
        id: 2
      },{
        src: 'https://pic.qqtn.com/up/2016-1/2016010609094925585.jpg',
        nick: '张起灵',
        id: 3
      },{
        src: 'https://pic.qqtn.com/up/2016-1/2016010609094925585.jpg',
        nick: '阿宁',
        id: 4
      }
    ];
    params = friendList;
    commit('SET_USER_LIST', params)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
