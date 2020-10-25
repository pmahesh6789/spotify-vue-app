<template>
  <footer>
    <h6>Copyright @Spotify player app.</h6>
  </footer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Footer'
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h6 {
  margin: 20px 0px;
  text-align: center;
}
footer {
  position: fixed;
  bottom: 0;
  height: 50px;
  width: 100%;
  background: #4c4c4c;
  color: #FFF;
}
</style>
