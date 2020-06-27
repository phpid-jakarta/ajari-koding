<script>
  import Hero from "./components/Hero.svelte";
  import Tabs from "./components/Tabs.svelte";
  import Search from "./components/Search.svelte";
  import TagsCloud from "./components/TagsCloud.svelte";
  import CardItem from "./components/CardItem.svelte";
  import Footer from "./components/Footer.svelte";
  import Empty from "./components/Empty.svelte";
  import Pagination from "./components/Pagination.svelte";
  import { FILTER_ITEMS } from "./constant.js";
  import { getDistinctTags, isHaveTag } from "./utils.js";

  export let data;
  let showData = data.awesome_list;
  let activeTag = "";
  let activeFilter = FILTER_ITEMS.ALL;
  let allTags = getDistinctTags(showData);
  
  const winWidth = window.innerWidth;

  // Pagination config
  let perPage = winWidth <= 767 ? 10 : 9;
  let currentPage = 1;
  $: offsetPage = currentPage * perPage - perPage;

  const handleFilter = event => {
    const filterBy = event.detail.text.toLowerCase();
    activeFilter = filterBy;
    activeTag = "";
    if (filterBy === "semua") {
      showData = data.awesome_list;
    } else {
      const foundData = data.awesome_list.filter(
        i => i.tipe.toLowerCase() === filterBy
      );
      showData = [...foundData];
    }
    resetCurrentPage();
  };

  const handleSearch = event => {
    const searchKeyword = event.detail.text.toLowerCase();
    if (searchKeyword === "") {
      showData = data.awesome_list;
    } else {
      const foundData = data.awesome_list.filter(
        i =>
          i.title.toLowerCase().includes(searchKeyword) ||
          i.creator.toLowerCase().includes(searchKeyword) ||
          i.description.toLowerCase().includes(searchKeyword) ||
          i.url.toLowerCase().includes(searchKeyword) ||
          isHaveTag(i, searchKeyword)
      );
      showData = [...foundData];
    }
    resetCurrentPage();
  };

  const handleClickTag = event => {
    const tagClicked = event.detail.text.toLowerCase();
    if (tagClicked !== activeTag) {
      activeTag = tagClicked;
      const foundData = data.awesome_list.filter(i => {
        return isHaveTag(i, tagClicked);
      });
      showData = [...foundData];
    } else {
      activeTag = "";
      showData = data.awesome_list;
    }
    resetCurrentPage();
  };

  const handleClickPage = event => {
    currentPage = event.detail.page;
  };

  const handleClickPerPage = event => {
    perPage = event.detail.perPage;
    resetCurrentPage();
  };

  const resetCurrentPage = () => {
    currentPage = 1;
  }
</script>

<style>
  .app-content {
    min-height: 70vh;
  }
</style>

<main class="app">
  <Hero />

  <section class="app-content container mt-5 mb-5">
    <Tabs {activeFilter} on:filter={handleFilter} />
    <Search on:search={handleSearch} />
    {#if showData.length > 0}
      <TagsCloud {allTags} {activeTag} on:tagclick={handleClickTag} />
      <div class="row justify-content-center gx-3 gy-3">
        {#each showData.slice(offsetPage, offsetPage + perPage) as item (item.id)}
          <CardItem {item} />
        {/each}
      </div>
      <Pagination total={showData.length} {perPage} {currentPage} on:pageclick={handleClickPage} on:perpageclick={handleClickPerPage} />
    {:else}
      <Empty />
    {/if}
  </section>

  <Footer />
</main>
