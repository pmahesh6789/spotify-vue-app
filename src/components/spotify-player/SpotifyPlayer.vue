<template>
  <section class="App-header">
    <a v-if="!token"
      class="btn btn--loginApp-link"
      :href="getSpotifyToken()"
    >
      Login to Spotify
    </a>

    <Player 
      v-if="token && !no_data"
      :item="item"
      :is_playing="is_playing"
      :progress_ms="progress_ms"
    />

    <p v-if="no_data">
      You need to be playing a song on Spotify, for something to appear here.
    </p>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from 'axios';

import hash from '@/hash';
// TODO: If we use .env file for application specific congif then remove this config ref.
import { authEndpoint, clientId, redirectUri, scopes } from '@/config';
import Player from './Player.vue';

export default Vue.extend({
  name: 'SpotifyPlayer',
  components: {
    Player
  },
  data() {
    return {
      token: null,
      item: {
        album: {
          images: [{ url: '' }]
        },
        name: '',
        artists: [{ name: '' }],
        duration_ms: 0
      },
      is_playing: 'Paused',
      progress_ms: 0,
      no_data: false,
      interval: 0,
    };
  },
  methods: {
    /*
    * Get and update DOM as per current playing songs information.
    * TODO: Update this method if we use vuex state management later.
    */
    getCurrentlyPlaying(token: string | null) {
      if (!token) {
        return;
      }

      const API_URL = 'https://api.spotify.com/v1/me/player';
      const options = {
        headers: {
          Authorization: 'Bearer ' + token
        },
      };

      // Make a axios call using the token
      axios.get(API_URL, options)
        .then((resp) => {
          if (!resp.data) {
            this.no_data = true;
            return;
          }

          this.item = resp.data.item;
          this.is_playing = resp.data.is_playing;
          this.progress_ms = resp.data.progress_ms;
          this.no_data = false;
        }).catch((error) => {
          console.log('Error -' + JSON.stringify(error, null, 4));
        });
    },

    /*
    * Tick event method for check token and update playing song.
    */
    tick() {
      if (this.token) {
        this.getCurrentlyPlaying(this.token);
      }
    },

    /*
    * Get spotify token url for accept terms and conditions.
    * Generates url as per required parameters.
    */
    getSpotifyToken() {
      // NOTE: Remove config details from script and read from .env file.
      /* Secure data storing in the environment specific file will be good instead of in the script files.
      *  Reading env variables from .env file required vue cli version 3 or above.
      * */
      const AUTH_END_POINT = process.env.VUE_APP_AUTH_END_POINT;
      const CLIENT_ID = process.env.VUE_APP_CLIENT_ID;
      const REDIRECT_URL = process.env.VUE_APP_REDIRECT_URL;

      /*
      * TODO: If this scopes related setting is one time configuration only then it's ok.
      * If this setting going to change then we can add this in some one global congig file.
      * Which will reduce cost of changing code internaly.
      * */
      const USER_TOP_READ = process.env.VUE_APP_USER_TOP_READ;
      const USER_READ_CURRENTLY_PLAYING = process.env.VUE_APP_USER_READ_CURRENTLY_PLAYING;
      const USER_READ_PLAYBACK_STATE = process.env.VUE_APP_USER_READ_PLAYBACK_STATE;

      const SCOPES = [USER_TOP_READ, USER_READ_CURRENTLY_PLAYING, USER_READ_PLAYBACK_STATE];

      // TODO: Not required. But added for fallback for those who running this code on lover version of vue cli.
      if (!AUTH_END_POINT
        || !CLIENT_ID
        || !REDIRECT_URL
        || !USER_TOP_READ
        || !USER_READ_CURRENTLY_PLAYING
        || !USER_READ_PLAYBACK_STATE) {
          console.log('App working from config settings. Please update .env file for better security.');
          const AUTH_END_POINT = authEndpoint;
          const CLIENT_ID = clientId;
          const REDIRECT_URL = redirectUri;
          const SCOPES = scopes;
          return `${AUTH_END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES.join(
                  '%20')}&response_type=token&show_dialog=true`;
      }

      return `${AUTH_END_POINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES.join(
              '%20')}&response_type=token&show_dialog=true`;
    },
  },

  /*
  * On component mount event handaling.
  */
  mounted() {
    // Set token
    const token = hash.access_token;

    if (token) {
      this.token = token;
      this.getCurrentlyPlaying(token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  },

  /*
  * On component destroy event handaling.
  */
  destroyed() {
    clearInterval(this.interval);
  },
});
</script>

<!-- Only component specific scoped SCSS will be added here. -->
<style scoped lang="scss">

</style>
