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
.d-header {
  background-color: var(--bg-card);
  color: var(--text-color);
}

.nav-item{
  padding: 0 .5em;
}
.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}
</style>


<nav class="navbar d-header hide-on-mobile">
  <div class="container">
    <a class="navbar-brand" href="/ajari-koding">&nbsp;</a>
    {#if !isLoading}
      <ul class="nav">
        {#if $isLogin}
          <li class="nav-item">
            <img alt="{$userName}" src="{$userImage}" class="avatar"/>
            <span>{$userName}</span>
          </li>
        {/if}
        <li class="nav-item">
          {#if $isLogin}
            <button
              on:click={handleLogout}
              rel="noopener noreferrer"
              class="btn {$activeTheme === 'dark' ? 'btn-outline-light' : 'btn-outline-primary'}  mb-2 mr-2">
              Keluar
            </button>
          {:else}
            <button
              on:click={handleLogin}
              rel="noopener noreferrer"
              class="btn {$activeTheme === 'dark' ? 'btn-outline-light' : 'btn-outline-primary'}  mb-2 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 16 16"><defs><path id="a" d="M15.455 6.545H8v3.091h4.29c-.4 1.964-2.072 3.091-4.29 3.091A4.718 4.718 0 0 1 3.273 8 4.718 4.718 0 0 1 8 3.273c1.127 0 2.145.4 2.945 1.054L13.273 2C11.855.764 10.036 0 8 0 3.564 0 0 3.564 0 8s3.564 8 8 8c4 0 7.636-2.91 7.636-8 0-.473-.072-.982-.181-1.455z"/><path id="c" d="M15.455 6.545H8v3.091h4.29c-.4 1.964-2.072 3.091-4.29 3.091A4.718 4.718 0 0 1 3.273 8 4.718 4.718 0 0 1 8 3.273c1.127 0 2.145.4 2.945 1.054L13.273 2C11.855.764 10.036 0 8 0 3.564 0 0 3.564 0 8s3.564 8 8 8c4 0 7.636-2.91 7.636-8 0-.473-.072-.982-.181-1.455z"/><path id="e" d="M15.455 6.545H8v3.091h4.29c-.4 1.964-2.072 3.091-4.29 3.091A4.718 4.718 0 0 1 3.273 8 4.718 4.718 0 0 1 8 3.273c1.127 0 2.145.4 2.945 1.054L13.273 2C11.855.764 10.036 0 8 0 3.564 0 0 3.564 0 8s3.564 8 8 8c4 0 7.636-2.91 7.636-8 0-.473-.072-.982-.181-1.455z"/><path id="g" d="M15.455 6.545H8v3.091h4.29c-.4 1.964-2.072 3.091-4.29 3.091A4.718 4.718 0 0 1 3.273 8 4.718 4.718 0 0 1 8 3.273c1.127 0 2.145.4 2.945 1.054L13.273 2C11.855.764 10.036 0 8 0 3.564 0 0 3.564 0 8s3.564 8 8 8c4 0 7.636-2.91 7.636-8 0-.473-.072-.982-.181-1.455z"/></defs><g fill="none" fill-rule="evenodd"><mask id="b" fill="#fff"><use xlink:href="#a"/></mask><path fill="#FBBC05" fill-rule="nonzero" d="M-.727 12.727V3.273L5.455 8z" mask="url(#b)"/><mask id="d" fill="#fff"><use xlink:href="#c"/></mask><path fill="#EA4335" fill-rule="nonzero" d="M-.727 3.273L5.455 8 8 5.782l8.727-1.418V-.727H-.727z" mask="url(#d)"/><g><mask id="f" fill="#fff"><use xlink:href="#e"/></mask><path fill="#34A853" fill-rule="nonzero" d="M-.727 12.727l10.909-8.363 2.873.363 3.672-5.454v17.454H-.727z" mask="url(#f)"/></g><g><mask id="h" fill="#fff"><use xlink:href="#g"/></mask><path fill="#4285F4" fill-rule="nonzero" d="M16.727 16.727L5.455 8 4 6.91l12.727-3.637z" mask="url(#h)"/></g></g></svg>
              Masuk dengan Google
            </button>
          {/if}
        </li>
      </ul>
    {/if}
  </div>
</nav>

<header class="container-fluid d-header pb-5 pt-5 hide-on-mobile">
  <div class="container">
    <h1 class="display-1 font-weight-bolder">Ajari Koding</h1>
    <h2 class="text-muted">oleh PHPID</h2>
    <p class="mt-3" style="max-width: 500px;">
      Kumpulan berbagai sumber daya untuk belajar koding dari hasil karya para
      kreator lokal yang terpercaya dan telah dikurasi oleh komunitas PHPID
    </p>
    <p>
      <a
        href="{REPO_NEW_ISSUE_URL}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn {$activeTheme === 'dark' ? 'btn-light' : 'btn-primary'}   mb-2">
        <Icon name="new_issue" width=24 height=24 />
        Tambahkan data
      </a>
    </p>
  </div>
</header>
