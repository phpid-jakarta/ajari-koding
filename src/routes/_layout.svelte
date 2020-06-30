<script>
import { onMount } from 'svelte'

let currentSid = ''
onMount(() => {
  currentSid = window.localStorage.getItem('__SID')
  if (!currentSid) {
    const c = (Math.random().toString(36) + '00000000000000000').slice(2, 5 + 2)
    currentSid = c
    window.localStorage.setItem('__SID', c)
  }
})
</script>

<style>
</style>

<main id="app-layout" data-sid="{currentSid}">
	<slot></slot>
</main>
