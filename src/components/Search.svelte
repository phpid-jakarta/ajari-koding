<script>
  import Icon from './Icon.svelte'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  let keyword = ''

  function doSearch (txt) {
    dispatch('search', {
      text: txt
    })
  }

  $: doSearch(keyword)
</script>

<style>
  :global(.bi-search) {
    position: absolute;
    right: 0.75rem;
    top: 11px;
    color: var(--bs-gray);
  }
  .input-search {
    padding: 0.375rem 2rem 0.375rem 0.75rem;
  }
</style>

<div class="position-relative mb-3">
  <input
    type="text"
    class="form-control input-search"
    id="search"
    bind:value={keyword}
    placeholder="Cari nama produk, kreator, deskripsi atau tag..." />
  <Icon name="search" class="bi-search" width="1em" height="1em" />
</div>
