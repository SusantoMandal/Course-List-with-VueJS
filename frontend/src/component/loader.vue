<template>
  <div id="loader">
  <div class="spinner-border mx-auto" style="width: 3rem; height: 3rem;" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>

#loader{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: rgb(0,0,0,0.2);
  display: flex;
  align-items: center;
}
</style>
