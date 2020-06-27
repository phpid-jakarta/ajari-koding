<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const winWidth = window.innerWidth;
  const perPageOptions = winWidth <= 767 ? [10, 20, 40, 60] : [9, 15, 30, 60];

  export let total;
  export let perPage;
  export let currentPage;

  $: pageCount = Math.ceil(total / perPage);

  const handleClick = (e, val) => {
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
  <div class="dropdown mr-2">
    <button class="btn btn-primary dropdown-toggle" id="dropdownPageOptions" data-toggle="dropdown" aria-expanded="false">
      Per Halaman: {perPage}
    </button>
    <ul class="dropdown-menu" aria-labelledby="dropdownPageOptions">
      {#each perPageOptions as page (page)}
        <li>
          <a class="dropdown-item" href="#" on:click={e => handleClickPerPage(e, page)}>{page}</a>
        </li>
      {/each}
    </ul>
  </div>
  <ul class="pagination">
    <li class="page-item {currentPage == 1 ? 'disabled' : ''}">
      <a href="#" class="page-link" on:click={e => handleClick(e, currentPage - 1)}>&laquo;</a>
    </li>
    {#each Array(pageCount) as _, i}
      <li class="page-item {currentPage == i + 1 ? 'active' : ''}">
        <a href="#" class="page-link" on:click={e => handleClick(e, i + 1)}>{i + 1}</a>
      </li>
    {/each}
    <li class="page-item {currentPage == pageCount ? 'disabled' : ''}">
      <a href="#" class="page-link" on:click={e => handleClick(e, currentPage + 1)}>&raquo;</a>
    </li>
  </ul>
</div>
