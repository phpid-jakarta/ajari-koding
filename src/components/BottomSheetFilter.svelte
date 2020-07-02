<script>
  import {
    allData,
    showData,
    activeTag,
    allDistictTags,
    currentPage,
    showBottomSheetFilter
  } from "../store";
  import Icon from "./Icon.svelte";
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
    showBottomSheetFilter.set(false);
  };

  const handleClose = () => {
    showBottomSheetFilter.set(false);
  };
</script>

<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0.68;
    background-color: rgb(49, 53, 59);
    overflow: hidden;
    z-index: 9;
  }
  .bottomsheet {
    position: fixed;
    top: 200px;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: #fff;
    overflow: hidden;
    z-index: 10;
    box-shadow: rgba(49, 53, 59, 0.12) 0px -2px 6px 0px;
    border-radius: 10px 10px 0px 0px;
    transition: all 450ms cubic-bezier(0.32, 1, 0.23, 1) 0ms;
  }
  .bottomsheet--hide {
    transform: translate(0, 100%);
  }
  .bottomsheet-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 1em 1em 0 1em;
  }
  .bottomsheet-body {
    overflow: auto;
    height: calc(100vh - 275px);
    padding: 1em;
  }
  .text-title {
    font-size: 1.5rem;
  }
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

<div class={$showBottomSheetFilter ? 'overlay' : ''} on:click={handleClose} />
<div
  class="show-on-mobile-only bottomsheet {$showBottomSheetFilter ? 'bottomsheet--show' : 'bottomsheet--hide'}">
  <div class="bottomsheet-wrapper">
    <div class="bottomsheet-header" on:click={handleClose}>
      <Icon name="close" width="30" height="30" fill="#6c757d" />
      <span class="text-title text-muted">Filter</span>
    </div>

    <div class="bottomsheet-body">
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
  </div>
</div>
