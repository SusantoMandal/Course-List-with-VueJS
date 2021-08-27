const apiEndPoint = 'http://localhost:5000/course/';
const course = {
  namespaced: true,
  state: {
    courseData: {},
  },

  getters: {
    course(state) {
      return state.courseData;
    },
  },

  actions: {
    async getData({ commit }, id) {
      const res = await fetch(`${apiEndPoint}${id}`);
      const data = await res.json();
      commit('setCourseData', data);
    },

    async deleteCourse({ state }, id) {
      console.log(state);
      await fetch(`${apiEndPoint}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: null,
      });
    },

    async updateCourse({ commit }, info) {
      const res = await fetch(`${apiEndPoint}${info.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(info.inputData),
      });
      const data = await res.json();
      commit('setCourseData', data);
    },

  },

  mutations: {
    setCourseData(state, payload) {
      state.courseData = payload;
    },
  },

};

export default course;
