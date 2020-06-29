<script>
  import Icon from './Icon.svelte'
  import { REPO_URL, REPO_NEW_ISSUE_URL } from '../constant.js'
</script>

<style>

</style>

<header class="container-fluid bg-dark pb-5 pt-5 hide-on-mobile">
  <div class="container">
    <h1 class="display-1 text-light font-weight-bolder">Ajari Koding</h1>
    <h2 class="text-muted">oleh PHPID</h2>
    <p class="mt-3 text-light" style="max-width: 500px;">
      Kumpulan berbagai sumber daya untuk belajar koding dari hasil karya para
      kreator lokal yang terpercaya dan telah dikurasi oleh komunitas PHPID
    </p>

    <p>
      <a
        href="{REPO_URL}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-outline-light mb-2 mr-2">
        <Icon name="help_us" width=24 height=24 />
        Yuk bantu kami
      </a>
      <a
        href="{REPO_NEW_ISSUE_URL}"
        target="_blank"
        rel="noopener noreferrer"
        class="btn btn-light mb-2">
        <Icon name="new_issue" width=24 height=24 />
        Tambahkan data baru
      </a>
    </p>
  </div>
</header>
