<script>
  import Icon from './Icon.svelte'
  import { activeTheme } from "../store";
  import { REPO_URL, REPO_NEW_ISSUE_URL } from '../constant.js'
</script>

<style>
.d-header {
  background-color: var(--bg-card);
  color: var(--text-color);
}
</style>

<header class="container-fluid pb-5 pt-5 d-header hide-on-mobile">
  <div class="container">
    <h1 class="display-1 font-weight-bolder">Ajari Koding</h1>
    <h2 class="text-muted">oleh PHPID</h2>
    <p class="mt-3" style="max-width: 500px;">
      Kumpulan berbagai sumber daya untuk belajar koding dari hasil karya para
      kreator lokal yang terpercaya dan telah dikurasi oleh komunitas PHPID
    </p>

    <p>
      <a
        href="{REPO_URL}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn {$activeTheme === 'dark' ? 'btn-outline-light' : 'btn-outline-primary'} mb-2 mr-2">
        <Icon name="help_us" width=24 height=24 />
        Yuk bantu kami
      </a>
      <a
        href="{REPO_NEW_ISSUE_URL}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn {$activeTheme === 'dark' ? 'btn-light' : 'btn-primary'} mb-2">
        <Icon name="new_issue" width=24 height=24 />
        Tambahkan data baru
      </a>
    </p>
  </div>
</header>
