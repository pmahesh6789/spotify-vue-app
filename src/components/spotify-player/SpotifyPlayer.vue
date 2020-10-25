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
import { authEndpoint, clientId, redirectUri, scopes } from '@/config';
import PlayingSong from './Consants';
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
    getCurrentlyPlaying(token: string | null) {
      if (!token) {
        return;
      }

      // Make a call using the token
      const url = 'https://api.spotify.com/v1/me/player';
      const options = {
        headers: {
          Authorization: 'Bearer ' + token
        },
      };

      axios.get(url, options)
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
    tick() {
      if (this.token) {
        this.getCurrentlyPlaying(this.token);
      }
    },
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
  // created
  mounted() {
    // Set token
    const token = hash.access_token;

    if (token) {
      // Set token
      this.token = token;
      this.getCurrentlyPlaying(token);
    }

    // set interval for polling every 5 seconds
    this.interval = setInterval(() => this.tick(), 5000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.App {
  text-align: center;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

/** Buttons **/
.btn {
  background-color: transparent;
  border-radius: 2em;
  border: 0.2em solid #1ecd97;
  color: #1ecd97;
  cursor: pointer;
  font-size: 3vmin;
  padding: 0.7em 1.5em;
  text-transform: uppercase;
  transition: all 0.25s ease;
}

.btn:hover {
  background: #1ecd97;
  color: #333;
}

.btn--login {
  margin: 0 auto;
}

/** Background **/

.background {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-size: cover;
  background-position: center center;
  filter: blur(8em) opacity(0.6);
  position: absolute;
}

.main-wrapper {
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 auto;
  justify-content: center;
  position: relative;
  width: 80%;
  z-index: 1;
}

.container {
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
}

.main-container {
  flex: 1;
}
</style>