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

</style>
