<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import { getTagWithColor } from "../utils.js";
  export let allTags;

  const tags_w_color = getTagWithColor(allTags.tags);
  const handleClick = (e, val) => {
		e.preventDefault();
    dispatch("tagclick", {
      text: val
    });
  };
</script>

<style>

</style>

<div class="mb-3">
  {#if tags_w_color && tags_w_color.length > 0}
    {#each tags_w_color as item}
      {#if item.isMapped}
        <button
          type="button"
          class="btn mr-1 mb-1"
          style="background-color: {item.bg};color: {item.fg};"
          on:click={e => handleClick(e, item.tag)}>
          {item.tag}
          <span class="badge bg-secondary">{allTags.withCount[item.tag]}</span>
        </button>
      {:else}
        <button
          type="button"
          class="btn mr-1 mb-1 {item.classes}"
          on:click={e => handleClick(e, item.tag)}>
          {item.tag}
          <span class="badge bg-secondary">{allTags.withCount[item.tag]}</span>
        </button>
      {/if}
    {/each}
  {/if}
</div>
