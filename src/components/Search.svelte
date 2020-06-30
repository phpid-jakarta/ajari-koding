<script>
  import { allData, showData, currentPage } from "../store";
  import Icon from "./Icon.svelte";
  import { isHaveTag } from "../utils.js";

  let keyword = "";

  function doSearch(txt) {
    const searchKeyword = txt.toLowerCase();
    if (searchKeyword === "") {
      showData.set($allData);
    } else {
      const foundData = $allData.filter(
        i =>
          i.title.toLowerCase().includes(searchKeyword) ||
          i.creator.toLowerCase().includes(searchKeyword) ||
          i.description.toLowerCase().includes(searchKeyword) ||
          i.url.toLowerCase().includes(searchKeyword) ||
          isHaveTag(i, searchKeyword)
      );
      showData.set([...foundData]);
    }
    currentPage.set(1);
  }

  $: doSearch(keyword);
</script>

<style>
  :global(.bi-search) {
    position: absolute;
    right: 0.75rem;
    top: 11px;
    color: var(--bs-gray);
  }
  .input-search {
    padding: 0.375rem 2rem 0.375rem 0.75rem;
  }
</style>

<div class="position-relative mb-3">
  <input
    type="text"
    class="form-control input-search"
    id="search"
    bind:value={keyword}
    placeholder="Cari nama produk, kreator, deskripsi atau tag..." />
  <Icon name="search" class="bi-search" width="1em" height="1em" />
</div>
