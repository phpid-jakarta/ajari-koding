<script>
  import { allData, showData, activeTag, allDistictTags, currentPage } from "../store";
  import { isHaveTag, getTagWithColor } from "../utils.js";

  const allTagsWithColor = getTagWithColor($allDistictTags.tags);
  const handleClick = (e, val) => {
    e.preventDefault();
    const tagClicked = val.toLowerCase();
    if (tagClicked !== $activeTag.toLowerCase()) {
      activeTag.set(tagClicked);
      const foundData = $allData.filter(i => {
        return isHaveTag(i, tagClicked);
      });
      showData.set([...foundData]);
    } else {
      activeTag.set("");
      showData.set($allData);
    }
    currentPage.set(1);
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
  {#if allTagsWithColor && allTagsWithColor.length > 0}
    {#each allTagsWithColor as item (item)}
      {#if item.isMapped}
        <button
          role="button"
          data-toggle="button"
          aria-pressed={item.tag === $activeTag}
          type="button"
          class="btn mr-2 mb-2 {item.tag === $activeTag ? 'tag--active' : ''}
          {$activeTag !== '' && item.tag !== $activeTag ? 'tag--unfocus' : ''}"
          style="background-color: {item.bg};color: {item.fg};"
          on:click={e => handleClick(e, item.tag)}>
          {item.tag}
          <span class="badge bg-secondary">
            {$allDistictTags.withCount[item.tag]}
          </span>
        </button>
      {:else}
        <button
          role="button"
          data-toggle="button"
          aria-pressed={item.tag === $activeTag}
          type="button"
          class="btn mr-2 mb-2 {item.classes}
          {item.tag === $activeTag ? 'tag--active' : ''}
          {$activeTag !== '' && item.tag !== $activeTag ? 'tag--unfocus' : ''}"
          on:click={e => handleClick(e, item.tag)}>
          {item.tag}
          <span class="badge bg-secondary">
            {$allDistictTags.withCount[item.tag]}
          </span>
        </button>
      {/if}
    {/each}
  {/if}
</div>
