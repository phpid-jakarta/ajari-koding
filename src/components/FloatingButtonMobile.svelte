<script>
  import { showBottomSheetFilter, showBottomSheetSort } from "../store";
  import Icon from "./Icon.svelte";

  const handleClickFilter = () => {
    showBottomSheetFilter.set(true)
  }
  const handleClickSort = () => {
    showBottomSheetSort.set(true)
  }
</script>

<style>
  .btn-floating {
    height: 48px;
    position: fixed;
    bottom: 50px;
    width: 185px;
    z-index: 5;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 28px;
    box-shadow: rgba(88, 71, 71, 0.12) 0px 2px 6px 0px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .icon {
    padding: .5em 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
  }
</style>

<div class="btn-floating border text-muted show-on-mobile-only">
  <div class="icon border-right" on:click={handleClickSort}>
    <Icon name="sort_down" fill="#6c757d" />
    <span class="ml-1">Sort</span>
  </div>
  <div class="icon" on:click={handleClickFilter}>
    <Icon name="filter" fill="#6c757d" />
    <span class="ml-1">Filter</span>
  </div>
</div>
