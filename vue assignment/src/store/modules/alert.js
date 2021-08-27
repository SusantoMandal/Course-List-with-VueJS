const alert = {
  namespaced: true,
  state: {
    isVissible: false,
    msg: '',
  },
  getters: {
    alertVissible(state) {
      return state.isVissible;
    },
    alertMsg(state) {
      return state.msg;
    },
  },
  actions: {
    showAlert({ commit }, msg) {
      commit('setMsg', msg);
      commit('setAlert', true);
      setTimeout(() => {
        commit('setAlert', false);
      }, 2000);
    },
  },
  mutations: {
    setAlert(state, alertState) {
      state.isVissible = alertState;
    },
    setMsg(state, msg) {
      state.msg = msg;
    },
  },
};

export default alert;
