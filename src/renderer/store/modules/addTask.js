
const state = {
  taskList: []
}

const mutations = {
  SET_ADDTASK (state, val) {
    state.taskList.push(val);
  },
  DELETE_TASK (state, id) {
    state.taskList = state.taskList.filter(item => item.re.id !== id);
  }
}

const actions = {
  _set_addTask ({ commit }, params) {
    commit('SET_ADDTASK', params);
  },
  _deltel_task ({ commit }, id) {
    commit('DELETE_TASK', id);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
