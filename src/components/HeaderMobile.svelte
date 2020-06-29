<script>
  import Icon from './Icon.svelte'
  import { REPO_URL, REPO_NEW_ISSUE_URL } from '../constant.js'
</script>

<style>
.n-link{
  color: var(--bs-white);
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
    </ul>
  </div>
</nav>
