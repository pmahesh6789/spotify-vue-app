<template>
  <div class="App">
    <div class="main-wrapper">
      <div class="now-playing__img">
        <img :src="getPlayingSongUrl()" />
      </div>
      <div class="now-playing__side">
        <div class="now-playing__name">{{ item.name }}</div>
        <div class="now-playing__artist">
          {{ getArtistName() }}
        </div>
        <div class="now-playing__status">
          {{ is_playing ? "Playing" : "Paused" }}
        </div>
        <div class="progress">
          <div class="progress__bar" :style="progressBarStyles()" />
        </div>
      </div>
      <div class="background" :style="backgroundStyles()" />
    </div>
</div>
</template>

<script>
import PlayingSong from './Consants';

export default {
  name: 'Player',
  props: {
    item: PlayingSong,
    is_playing: String | Boolean,
    progress_ms: Number,
  },
  methods: {
    /*
    * Get the playing song's progress status.
    */
    progressBarStyles() {
      return { width: (this.progress_ms * 100 / this.item?.duration_ms) + '%' };
    },

    /*
    * Get the backgroung image of playing song.
    */
    backgroundStyles() {
      return {
        backgroundImage: `url(${
          this.item?.album?.images[0]?.url
        })`
      };
    },

    /*
    * Get artist name of playing song.
    */
    getArtistName() {
      return this.item?.artists[0]?.name || '';
    },

    /*
    * Get URL path of playing song.
    */
    getPlayingSongUrl() {
      return this.item?.album?.images[0]?.url || '';
    }
  }
};
</script>

<!-- Only component specific scoped SCSS will be added here. -->
<style scoped lang="scss">

</style>
