const loader = {
  namespaced: true,
  state: {
    isVissible: false,
  },
  getters: {
    loaderVissible(state) {
      return state.isVissible;
    },
  },
  actions: {
    showLoader({ commit }) {
      commit('toggleLoader', true);
    },
    hideLoader({ commit }) {
      commit('toggleLoader', false);
    },
  },
  mutations: {
    toggleLoader(state, loaderState) {
      state.isVissible = loaderState;
    },
  },
};

export default loader;
