<script>
  import { createArray, formatThousand } from "../utils.js";
  import Icon from "./Icon.svelte";
  export let rating;
  export let likes;
  const arrayRatings = rating > 0 ? createArray(rating) : [];
</script>

<style>
  .text-12 {
    font-size: 12px;
  }
  .rating {
    color: var(--bs-warning);
  }
  .thumb {
    color: var(--bs-success);
    font-size: 1.1rem;
  }
  .c-tooltip {
    position: relative;
    cursor: pointer;
  }
  .c-tooltip .c-tooltiptext {
    visibility: hidden;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    position: absolute;
    z-index: 1;

    width: 150px;
    bottom: calc(100% + 2px);
    left: 1px;
  }
  .c-tooltip:hover .c-tooltiptext {
    visibility: visible;
  }
  .c-tooltip .c-tooltiptext::after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border: 5px solid transparent;
    border-top-color: #000;
    transform: rotate(-90deg);
    left: 0;
    bottom: -5px;
  }
</style>

<div class="mb-1">
  <div class="rating mb-1 c-tooltip d-flex align-items-center">
    {#if arrayRatings.length > 0}
      {#each arrayRatings as item (item)}
        <Icon name="star" />
      {/each}
    {:else}
      <span class="text-12 text-muted">Rating Belum tersedia</span>
    {/if}
    <span class="text-12 c-tooltiptext">Rating oleh tim PHPID</span>
  </div>
  <div class="thumb c-tooltip d-flex align-items-center">
    <div class="d-flex align-items-center mb-2 thumb">
      <Icon name="thumbs_up" width="18" height="18" />
      <span class="ml-2">{likes ? formatThousand(likes) : 0}</span>
    </div>
    <span class="text-12 c-tooltiptext">Like oleh pengguna</span>
  </div>
</div>
