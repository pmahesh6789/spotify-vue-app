<template>
  <header>
    <h2>Welcome to Spotify Player App.</h2>
  </header>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Header'
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h2 {
  margin: 20px 0px;
  text-align: center;
}
header {
  position: fixed;
  top: 0;
  height: 70px;
  width: 100%;
  background: #4c4c4c;
  color: #FFF;
}
</style>
