import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import SpotifyPlayer from '@/components/spotify-player/SpotifyPlayer.vue';

Vue.use(VueRouter);

/*
* Routing module for application.
* Configure navigation and related modules as per requirements.
* Use lazy loding if required and as per the scope of the application.
*/
const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'SpotifyPlayer',
    component: SpotifyPlayer,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
