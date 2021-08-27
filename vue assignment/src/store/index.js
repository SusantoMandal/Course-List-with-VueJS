import Vue from 'vue';
import Vuex from 'vuex';
import courses from './modules/courses';
import course from './modules/course';
import loader from './modules/loader';
import alert from './modules/alert';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    courses,
    course,
    loader,
    alert,
  },
});
