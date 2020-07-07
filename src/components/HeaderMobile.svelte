<script>
  import { onMount } from 'svelte'
  import Icon from './Icon.svelte'
  import { activeTheme, isLogin, userName, userEmail, userImage } from "../store"
  import { REPO_URL, REPO_NEW_ISSUE_URL } from '../constant.js'
  import { doLogin, doLogout, observeLoginStatus } from '../firebase'

  let isLoading = true
  const onSuccess = ({ email, name, image }) => {
    isLoading = false
    isLogin.set(true)
    userName.set(name)
    userEmail.set(email)
    userImage.set(image)
  }

  const resetLoginStatus = () => {
    isLoading = false
    isLogin.set(false)
    userName.set('')
    userEmail.set('')
    userImage.set('')
  }

  const handleLogin = () => {
    doLogin({ onSuccess, onFailed: resetLoginStatus });
  }

  const handleLogout = () => {
    doLogout({ onLogout: resetLoginStatus });
  }

  onMount(() => {
    setTimeout(() => {
      observeLoginStatus({ onSuccess, onFailed: resetLoginStatus })
    }, 1000)
  })
</script>

<style>
.n-link{
  color: var(--bs-white);
  padding: .5em;
}
.avatar {
  width: 30px;
  height: 30px;
  object-fit: cover;
  border-radius: 50%;
  margin: .375rem .75rem;
}
</style>

<nav class="navbar navbar-dark bg-dark hdr show-on-mobile-only">
  <div class="container-fluid">
    <a class="navbar-brand" href="/ajari-koding">Ajari Koding</a>
    <ul class="nav">
      <li class="nav-item">
        <a
          class="nav-link n-link"
          href={REPO_NEW_ISSUE_URL}
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="new_issue" width=24 height=24 />
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link n-link"
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer">
          <Icon name="octocat" width=24 height=24  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </a>
      </li>
      {#if !isLoading}
        {#if $isLogin}
          <li class="nav-item">
            <img alt="{$userName}" src="{$userImage}" class="avatar"/>
          </li>
        {/if}
        <li class="nav-item">
          {#if $isLogin}
            <button
              on:click={handleLogout}
              rel="noopener noreferrer"
              class="btn btn-outline-light">
              Keluar
            </button>
          {:else}
            <button
              on:click={handleLogin}
              rel="noopener noreferrer"
              class="btn btn-outline-light">
              Masuk
            </button>
          {/if}
        </li>
      {/if}
    </ul>
  </div>
</nav>
