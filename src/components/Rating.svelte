<script>
  import { createArray } from "../utils.js";
  export let rating;
  const arrayRatings = rating > 0 ? createArray(rating) : [];
</script>

<style>
  .text-12 {
    font-size: 12px;
  }
  .bi-star-fill {
    color: var(--bs-warning);
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
    content: '';
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

<div class="mb-3 text-12 d-flex align-items-center c-tooltip">
  {#if arrayRatings.length > 0}
    {#each arrayRatings as item (item)}
      <svg
        width="24"
        height="24"
        viewBox="0 0 16 16"
        class="mr-1 bi-star-fill"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173
          6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927
          0l2.184 4.327 4.898.696c.441.062.612.636.283.95l-3.523 3.356.83
          4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
      </svg>
    {/each}
  {:else}
    <span class="text-muted">Rating Belum tersedia</span>
  {/if}
  <span class="c-tooltiptext">Rating oleh tim PHPID</span>
</div>
