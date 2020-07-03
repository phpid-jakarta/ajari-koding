<script>
  import { showBottomSheetSort } from "../store";
  import Icon from "./Icon.svelte";

  const handleClose = () => {
    showBottomSheetSort.set(false);
    document.body.classList.remove('overflow-hidden');
  }
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
</style>

<div class={$showBottomSheetSort ? 'overlay' : ''} on:click={handleClose} />
<div
  class="show-on-mobile-only bottomsheet {$showBottomSheetSort ? 'bottomsheet--show' : 'bottomsheet--hide'}">
  <div class="bottomsheet-wrapper">
    <div class="bottomsheet-header" on:click={handleClose}>
      <Icon name="close" width="30" height="30" fill="#6c757d" />
      <span class="text-title text-muted">Sort</span>
    </div>

    <div class="bottomsheet-body" />
  </div>
</div>
