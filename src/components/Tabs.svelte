<script>
  import { allData, showData, activeTab, currentPage, activeTheme } from "../store";
  import Icon from "./Icon.svelte";
  import { FILTERS } from "../constant.js";

  function doFilter(e, p) {
    e.preventDefault();
    const clickedTab = p.toLowerCase();
    if (clickedTab === $activeTab) {
      activeTab.set("semua");
      showData.set($allData);
    } else {
      activeTab.set(clickedTab);
      if (clickedTab === "semua") {
        showData.set($allData);
      } else {
        const foundData = $allData.filter(
          i => i.tipe.toLowerCase() === clickedTab
        );
        showData.set([...foundData]);
      }
    }
    currentPage.set(1);
  }
</script>

<style>
.is--dark {
  color: var(--text-color);
}
.is--dark.active {
  color: var(--bg-color);
}
</style>

<ul class="nav nav-tabs mb-5 hide-on-mobile">
  {#each FILTERS as f (f)}
    <li class="nav-item">
      <a
        class="nav-link {$activeTheme === 'dark' ? 'is--dark' : 'is--ligth'} text-capitalize d-flex align-items-center"
        class:active={$activeTab === f}
        aria-current="page"
        href="?tipe={f}"
        on:click={e => doFilter(e, f)}>
        <Icon name="tab_{f}" />
        <span class="ml-2">{f}</span>
      </a>
    </li>
  {/each}
</ul>
