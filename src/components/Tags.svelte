<script>
  import { getTagWithColor } from '../utils.js'
  export let topic_tags

  const tags_w_color = getTagWithColor(topic_tags)
</script>

<style>

</style>

<div class="mb-3">
  {#if tags_w_color && tags_w_color.length > 0}
    {#each tags_w_color as item (item)}
      {#if item.isMapped}
        <span
          class="badge mr-1"
          style="background-color: {item.bg};color: {item.fg};">
          {item.tag}
        </span>
      {:else}
        <span class="badge mr-1 {item.classes}">{item.tag}</span>
      {/if}
    {/each}
  {/if}
</div>
