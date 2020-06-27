<script>
  import { createEventDispatcher } from "svelte";
  import { createArray, clickOutside } from "../utils.js";

  const dispatch = createEventDispatcher();
  const winWidth = window.innerWidth;
  const perPageOptions = winWidth <= 767 ? [20, 30, 50, 100] : [18, 30, 60, 90];

  export let total;
  export let perPage;
  export let currentPage;

  $: pageCount = Math.ceil(total / perPage);
  let showPerPageOptions = false;

  const handleClickPage = (e, val) => {
    e.preventDefault();
    dispatch("pageclick", {
      page: val
    });
  };

  const handleClickPerPage = (e, val) => {
    e.preventDefault();
    dispatch("perpageclick", {
      perPage: val
    });
  };
</script>

<style>

</style>

<div class="d-flex justify-content-center mt-5">
  <div class="dropdown align-self-baseline mr-2">
    <button use:clickOutside class="btn btn-primary" on:click={ () => {showPerPageOptions = !showPerPageOptions} } on:click_outside={ () => {showPerPageOptions = false}}>
      <span>{perPage}</span>
<svg width="18" height="18" viewBox="0 0 16 16" class="ml-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
</svg>
    </button>
    <ul class="dropdown-menu {showPerPageOptions ? 'show' : ''}">
      {#each perPageOptions as page (page)}
        <li>
          <a class="dropdown-item" href="#" on:click={e => handleClickPerPage(e, page)}>{page}</a>
        </li>
      {/each}
    </ul>
  </div>
  <ul class="pagination">
    <li class="page-item {currentPage == 1 ? 'disabled' : ''}">
      <a href="#" class="page-link" on:click={e => handleClickPage(e, currentPage - 1)}>&laquo;</a>
    </li>
    {#each createArray(pageCount) as i}
      <li class="page-item {currentPage == i + 1 ? 'active' : ''}">
        <a href="#" class="page-link" on:click={e => handleClickPage(e, i + 1)}>{i + 1}</a>
      </li>
    {/each}
    <li class="page-item {currentPage == pageCount ? 'disabled' : ''}">
      <a href="#" class="page-link" on:click={e => handleClickPage(e, currentPage + 1)}>&raquo;</a>
    </li>
  </ul>
</div>
