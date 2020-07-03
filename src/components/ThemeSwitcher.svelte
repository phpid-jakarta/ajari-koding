<script>
  import { onMount } from "svelte";
  import { activeTheme } from "../store";
  import Icon from "./Icon.svelte";

  const handleSwitchTheme = () => {
    if ($activeTheme === 'dark') {
      activeTheme.set('light');
      window.__setPreferredTheme('light')
    } else {
      activeTheme.set('dark');
      window.__setPreferredTheme('dark')
    }
  };

  onMount(() => {
    activeTheme.set(window.__theme);
  });
</script>

<style>
  .theme-swither {
    height: 48px;
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 50px;
    z-index: 5;
    border-radius: 28px;
    box-shadow: rgba(88, 71, 71, 0.12) 0px 2px 6px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  @media (max-width: 576px) {
    .theme-swither {
      right: 10px;
    }
  }
  .is--dark{
    background-color: #fff;
  }
  .is--light {
    background-color: #162a44;
  }
</style>

<div
  class="theme-swither {$activeTheme === 'dark' ? 'is--dark' : 'is--light'}"
  on:click={handleSwitchTheme}>
  <div class="icon">
    {#if $activeTheme === 'dark'}
      <Icon name="sun" fill="#ffc107" />
    {:else}
      <Icon name="moon" fill="#ffc107" />
    {/if}
  </div>
</div>
