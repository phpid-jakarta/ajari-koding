<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  import { getTagWithColor } from "../utils.js";
  export let allTags;
  export let activeTag;

  const tags_w_color = getTagWithColor(allTags.tags);
  const handleClick = (e, val) => {
    e.preventDefault();
    dispatch("tagclick", {
      text: val
    });
  };
</script>

<style>
  .tag--active {
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
  }
  .tag--unfocus {
    opacity: 0.3;
  }
  .tag--unfocus:hover {
    opacity: 1;
  }
</style>

<div class="mb-3">
  {#if tags_w_color && tags_w_color.length > 0}
    {#each tags_w_color as item (item)}
      {#if item.isMapped}
        <button
          role="button"
          data-toggle="button"
          aria-pressed={item.tag === activeTag}
          type="button"
          class="btn mr-2 mb-2 {item.tag === activeTag ? 'tag--active' : ''}
          {activeTag !== '' && item.tag !== activeTag ? 'tag--unfocus' : ''}"
          style="background-color: {item.bg};color: {item.fg};"
          on:click={e => handleClick(e, item.tag)}>
          {item.tag}
          <span class="badge bg-secondary">{allTags.withCount[item.tag]}</span>
        </button>
      {:else}
        <button
          role="button"
          data-toggle="button"
          aria-pressed={item.tag === activeTag}
          type="button"
          class="btn mr-2 mb-2 {item.classes}
          {item.tag === activeTag ? 'tag--active' : ''}
          {activeTag !== '' && item.tag !== activeTag ? 'tag--unfocus' : ''}"
          on:click={e => handleClick(e, item.tag)}>
          {item.tag}
          <span class="badge bg-secondary">{allTags.withCount[item.tag]}</span>
        </button>
      {/if}
    {/each}
  {/if}
</div>
