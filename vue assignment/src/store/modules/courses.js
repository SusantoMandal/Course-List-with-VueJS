const apiEndPoint = 'http://localhost:5000/course';
const courses = {
  namespaced: true,
  state: {
    coursesData: null,
  },

  getters: {
    coursesData(state) {
      return state.coursesData;
    },
  },

  actions: {
    async getData({ commit }) {
      const res = await fetch(apiEndPoint);
      const data = await res.json();
      commit('setCoursesData', data);
    },

    async postData({ commit }, payload) {
      const res = await fetch(apiEndPoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      debugger;
      const data = await res.json();
      debugger;
      commit('setCoursesData', data.coursesData);
    },

  },

  mutations: {
    setCoursesData(state, payload) {
      state.coursesData = payload;
    },
  },

};

export default courses;
