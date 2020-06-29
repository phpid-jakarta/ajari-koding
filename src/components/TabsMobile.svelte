<script>
  import Icon from './Icon.svelte'
  import { createEventDispatcher } from 'svelte'
  import { FILTERS } from '../constant.js'
  export let activeFilter

  const dispatch = createEventDispatcher()

  function doFilter (e, filterBy) {
    console.log('clicked', filterBy)
    e.preventDefault()
    dispatch('filter', {
      text: filterBy
    })
  }
</script>

<style>
.tabs-mobile {
  position: fixed;
  width: 100%;
  max-width: 576px;
  bottom: 0;
  left: 0;
  background-color: var(--bs-white);
  justify-content: space-around;
  margin: 0;
  padding: 0;
  z-index: 5;
}
.n-text{
  font-size: 8px;
}
.n-link{
  color: var(--bs-gray);
}
@media (max-width: 400px) {
  .n-text{
    display: none;
  }
}
.n-link.active{
  color: var(--bs-primary);
}
</style>

<ul class="nav tabs-mobile border-top show-on-mobile-only">
  {#each FILTERS as f (f)}
    <li class="nav-item">
      <a
        class="nav-link text-uppercase d-flex align-items-center flex-column n-link"
        class:active="{activeFilter === f}"
        aria-current="page"
        href="?tipe={f}"
        on:click={e => doFilter(e, f)}>
        <Icon name="tab_{f}" />
        <div class="n-text">{f}</div>
      </a>
    </li>
  {/each}
</ul>
