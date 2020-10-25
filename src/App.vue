<template>
  <div class="container">
    <Header />
    <SpotifyPlayer />
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import Header from '@/components/header/Header.vue';
import Footer from '@/components/footer/Footer.vue';
import SpotifyPlayer from '@/components/spotify-player/SpotifyPlayer.vue';

export default Vue.extend({
  name: 'App',
  components: {
    Header,
    Footer,
    SpotifyPlayer,
  },
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #333;
  color: #eee;
  font-family: Helvetica, Arial;
  font-size: 3vmin;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

.hidden {
  display: none;
}


</style>
