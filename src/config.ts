/*
*   TODO: Please update this configuration into .env file.
*   NOTE: For reading environment variables from .env file required vue clie version 3 or above.
*/

export const authEndpoint = 'https://accounts.spotify.com/authorize';

// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = '76f432f69a5a41b6a48f3895a3ed1c98';
export const redirectUri = 'http://localhost:3000/redirect';
export const scopes = [
    'user-top-read',
    'user-read-currently-playing',
    'user-read-playback-state',
];
