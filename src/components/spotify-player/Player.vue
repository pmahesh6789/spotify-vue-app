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
    progressBarStyles() {
      return { width: (this.progress_ms * 100 / this.item?.duration_ms) + '%' };
    },
    backgroundStyles() {
      return {
        backgroundImage: `url(${
          this.item?.album?.images[0]?.url
        })`
      };
    },
    getArtistName() {
      return this.item?.artists[0]?.name || '';
    },
    getPlayingSongUrl() {
      return this.item?.album?.images[0]?.url || '';
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/** Now Playing **/
.now-playing__name {
    font-size: 1.5em;
    margin-bottom: 0.2em;
}

.now-playing__artist {
    margin-bottom: 1em;
}

.now-playing__status {
    margin-bottom: 1em;
}

.now-playing__img {
    float: left;
    margin-right: 10px;
    text-align: right;
    width: 45%;
}

.now-playing__img img {
    max-width: 80vmin;
    width: 100%;
}

.now-playing__side {
    margin-left: 5%;
    width: 100%;
}

/** Progress **/
.progress {
    border: 1px solid #eee;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
}

.progress__bar {
    background-color: #eee;
    height: 4px;
}
</style>
