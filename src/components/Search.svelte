<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function doSearch(e) {
    const val = e.target.value;
    dispatch("search", {
      text: val
    });
  }
</script>

<style>
  .bi-search {
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
    placeholder="Cari nama produk, kreator, deskripsi atau tag..."
    on:change={doSearch} />
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    class="bi-search"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414
      1.415l-3.85-3.85a1 1 0 0 1 0-1.415z" />
    <path
      fill-rule="evenodd"
      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13
      0 6.5 6.5 0 0 1 13 0z" />
  </svg>
</div>
