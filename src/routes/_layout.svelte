<script context="module">
  export async function preload(page, session) {
    const {
        FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN,
        FIREBASE_DATABASE_URL,
        FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID
    } = session;

    return {
      FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID
    };
  }
</script>

<script>
import { onMount } from 'svelte'
import { getFirebaseApp } from '../firebase'

export let FIREBASE_API_KEY
export let FIREBASE_AUTH_DOMAIN
export let FIREBASE_DATABASE_URL
export let FIREBASE_PROJECT_ID
export let FIREBASE_STORAGE_BUCKET
export let FIREBASE_MESSAGING_SENDER_ID
export let FIREBASE_APP_ID
export let FIREBASE_MEASUREMENT_ID

let currentSid = ''
onMount(() => {
  currentSid = window.localStorage.getItem('__SID')
  if (!currentSid) {
    const c = (Math.random().toString(36) + '00000000000000000').slice(2, 5 + 2)
    currentSid = c
    window.localStorage.setItem('__SID', c)
  }

  getFirebaseApp({
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_DATABASE_URL,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
  });
})
</script>

<style>
</style>

<main id="app-layout" data-sid="{currentSid}">
	<slot></slot>
</main>
