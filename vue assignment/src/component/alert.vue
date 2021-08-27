<template>
  <div id="msg">
    <div class="alert alert-success mx-auto" role="alert">
      {{ alertMsg }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('alert', ['alertMsg']),
  },
};
</script>

<style scoped>
#msg {
  /* background-color: rgb(0, 0, 0, 0.2); */
  /* height: 100%; */
  width: 100%;
  position: absolute;
  bottom: 100px;
  display: flex;
  margin-top: 3.8rem;
}
</style>
