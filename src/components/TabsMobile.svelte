<script>
  import { allData, showData, activeTab, currentPage } from "../store";
  import Icon from "./Icon.svelte";
  import { FILTERS } from "../constant.js";

  function doFilter(e, p) {
    e.preventDefault();
    const clickedTab = p.toLowerCase();
    activeTab.set(clickedTab)
    if (clickedTab === "semua") {
      showData.set($allData);
    } else {
      const foundData = $allData.filter(i => i.tipe.toLowerCase() === clickedTab);
      showData.set([...foundData]);
    }
    currentPage.set(1);
  }
</script>

<style>
  .tabs-mobile {
    position: fixed;
    width: 100%;
    max-width: 576px;
    bottom: 0;
    left: 0;
    background-color: var(--bs-white);
    justify-content: space-around;
    margin: 0;
    padding: 0;
    z-index: 5;
  }
  .n-text {
    font-size: 8px;
  }
  .n-link {
    color: var(--bs-gray);
  }
  @media (max-width: 400px) {
    .n-text {
      display: none;
    }
  }
  .n-link.active {
    color: var(--bs-primary);
  }
</style>

<ul class="nav tabs-mobile border-top show-on-mobile-only">
  {#each FILTERS as f (f)}
    <li class="nav-item">
      <a
        class="nav-link text-uppercase d-flex align-items-center flex-column
        n-link"
        class:active={$activeTab === f}
        aria-current="page"
        href="?tipe={f}"
        on:click={e => doFilter(e, f)}>
        <Icon name="tab_{f}" />
        <div class="n-text">{f}</div>
      </a>
    </li>
  {/each}
</ul>
