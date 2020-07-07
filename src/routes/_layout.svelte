<script>
import { onMount } from 'svelte'
import { getFirebaseApp } from '../firebase'

let currentSid = ''
onMount(() => {
  currentSid = window.localStorage.getItem('__SID')
  if (!currentSid) {
    const c = (Math.random().toString(36) + '00000000000000000').slice(2, 5 + 2)
    currentSid = c
    window.localStorage.setItem('__SID', c)
  }

  getFirebaseApp({
    FIREBASE_API_KEY: __FIREBASE_API_KEY__,
    FIREBASE_AUTH_DOMAIN: __FIREBASE_AUTH_DOMAIN__,
    FIREBASE_DATABASE_URL: __FIREBASE_DATABASE_URL__,
    FIREBASE_PROJECT_ID: __FIREBASE_PROJECT_ID__,
    FIREBASE_STORAGE_BUCKET: __FIREBASE_STORAGE_BUCKET__,
    FIREBASE_MESSAGING_SENDER_ID: __FIREBASE_MESSAGING_SENDER_ID__,
    FIREBASE_APP_ID: __FIREBASE_APP_ID__,
    FIREBASE_MEASUREMENT_ID: __FIREBASE_MEASUREMENT_ID__
  });
})
</script>

<style>
</style>

<main id="app-layout" data-sid="{currentSid}">
	<slot></slot>
</main>
