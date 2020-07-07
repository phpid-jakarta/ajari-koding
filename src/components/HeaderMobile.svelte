<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import Icon from './Icon.svelte'
  import { activeTheme, isLoadingAccount, isLogin, userName, userEmail, userImage } from "../store"
  import { REPO_URL, REPO_NEW_ISSUE_URL } from '../constant.js'
  import { doLogin, doLogout } from '../firebase'

  const dispatch = createEventDispatcher();

  const dispatchLogin = ({ email, name, image }) => {
    dispatch('login', { email, name, image });
  }

  const dispatchLogout = () => {
    dispatch('logout');
  }

  const handleLogin = () => {
    doLogin({ onSuccess: dispatchLogin, onFailed: dispatchLogout });
  }

  const handleLogout = () => {
    doLogout({ onLogout: dispatchLogout });
  }
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
      {#if !$isLoadingAccount}
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
