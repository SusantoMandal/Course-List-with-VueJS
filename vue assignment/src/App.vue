<template>
<div>
  <home-header></home-header>
  <router-view></router-view>
  <home-loader v-if="loaderVissible"></home-loader>
  <alert-info v-if="alertVissible"></alert-info>
  <home-footer></home-footer>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import homeHeader from './component/header.vue';
import homeFooter from './component/footer.vue';
import homeLoader from './component/loader.vue';
import alertInfo from './component/alert.vue';

export default {
  components: {
    homeHeader,
    homeFooter,
    homeLoader,
    alertInfo,
  },
  computed: {
    ...mapGetters('loader', [
      'loaderVissible',
    ]),
    ...mapGetters('alert', [
      'alertVissible',
    ]),
  },
};

</script>
