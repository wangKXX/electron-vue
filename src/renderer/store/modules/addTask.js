
const state = {
  taskList: []
}

const mutations = {
  SET_ADDTASK (state, val) {
    state.taskList.push(val);
  },
  DELETE_TASK (state, id) {
    state.taskList = state.taskList.filter(item => item.re.id !== id);
  },
  CLEAR_TASK (state) {
    state.taskList = [];
  }
}

const actions = {
  _set_addTask ({ commit }, params) {
    commit('SET_ADDTASK', params);
  },
  _deltel_task ({ commit }, id) {
    commit('DELETE_TASK', id);
  },
  _clear_task({ commit }) {
    commit('CLEAR_TASK');
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
