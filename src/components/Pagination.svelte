<script>
  import { allData, showData, currentPage, perPage, totalPage } from "../store";
  import { createArray, clickOutside } from "../utils.js";
  import Icon from "./Icon.svelte";

  let pageCount;
  let winWidth = 767; // TODO: window.innerWidth onMount
  let perPageOptions = winWidth <= 767 ? [20, 30, 50, 100] : [18, 30, 60, 90];

  $: pageCount = Math.ceil($totalPage / $perPage);
  let showPerPageOptions = false;

  const handleClickPage = (e, val) => {
    e.preventDefault();
    currentPage.set(parseInt(val, 10));
  };

  const handleClickPerPage = (e, val) => {
    e.preventDefault();
    perPage.set(parseInt(val, 10));
    currentPage.set(1);
  };
</script>

<style>

</style>

<div class="d-flex justify-content-center mt-5">
  <div class="dropdown align-self-baseline mr-2">
    <button
      use:clickOutside
      class="btn btn-primary"
      on:click={() => {
        showPerPageOptions = !showPerPageOptions;
      }}
      on:click_outside={() => {
        showPerPageOptions = false;
      }}>
      <span>{$perPage}</span>
      <Icon name="caret_down" width="18" height="18" class="ml-2" />
    </button>
    <ul class="dropdown-menu {showPerPageOptions ? 'show' : ''}">
      {#each perPageOptions as page (page)}
        <li>
          <a
            class="dropdown-item"
            href="?perpage={page}"
            on:click={e => handleClickPerPage(e, page)}>
            {page}
          </a>
        </li>
      {/each}
    </ul>
  </div>
  <ul class="pagination">
    <li class="page-item {$currentPage === 1 ? 'disabled' : ''}">
      <a
        href="?page={$currentPage - 1}"
        class="page-link"
        on:click={e => handleClickPage(e, $currentPage - 1)}>
        &laquo;
      </a>
    </li>
    {#each createArray(pageCount) as i}
      <li class="page-item {$currentPage === i + 1 ? 'active' : ''}">
        <a
          href="?page={i - 1}"
          class="page-link"
          on:click={e => handleClickPage(e, i + 1)}>
          {i + 1}
        </a>
      </li>
    {/each}
    <li class="page-item {$currentPage === pageCount ? 'disabled' : ''}">
      <a
        href="?page={$currentPage + 1}"
        class="page-link"
        on:click={e => handleClickPage(e, $currentPage + 1)}>
        &raquo;
      </a>
    </li>
  </ul>
</div>
