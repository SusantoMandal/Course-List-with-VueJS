import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome, faInfoCircle, faTimes, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BootstrapVue, IconsPlugin, ModalPlugin } from 'bootstrap-vue';
import store from './store';
import router from './router/routes';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.use(ModalPlugin);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

library.add(faHome, faInfoCircle, faTimes, faArrowLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount('#app');
