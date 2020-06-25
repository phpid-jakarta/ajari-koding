<script>
  import Hero from "./components/Hero.svelte";
  import Tabs from "./components/Tabs.svelte";
  import Search from "./components/Search.svelte";
  import TagsCloud from "./components/TagsCloud.svelte";
  import CardItem from "./components/CardItem.svelte";
  import Footer from "./components/Footer.svelte";
  import { FILTER_ITEMS } from "./constant.js";
  import { getDistinctTags, isHaveTag } from "./utils.js";

  export let data;
  let showData = data.awesome_list;
  let activeFilter = FILTER_ITEMS.ALL;
  let allTags = getDistinctTags(showData);

  const handleFilter = event => {
    const filterBy = event.detail.text.toLowerCase();
    activeFilter = filterBy;
    if (filterBy === "semua") {
      showData = data.awesome_list;
    } else {
      showData = data.awesome_list.filter(
        i => i.tipe.toLowerCase() === filterBy
      );
    }
  };

  const handleSearch = event => {
    const searchKeyword = event.detail.text.toLowerCase();
    if (searchKeyword === "") {
      showData = data.awesome_list;
    } else {
      showData = data.awesome_list.filter(
        i =>
          i.title.toLowerCase().includes(searchKeyword) ||
          i.creator.toLowerCase().includes(searchKeyword) ||
          i.description.toLowerCase().includes(searchKeyword) ||
          i.url.toLowerCase().includes(searchKeyword)
      );
    }
  };

  const handleClickTag = event => {
    const tagClicked = event.detail.text.toLowerCase();
    showData = data.awesome_list.filter(i => Boolean(isHaveTag(i, tagClicked)));
  };
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
    <TagsCloud {allTags} on:tagclick={handleClickTag} />
    {#if showData.length > 0}
      <div class="row justify-content-center">
        {#each showData as item, i}
          <CardItem {item} />
        {/each}
      </div>
    {/if}
  </section>

  <Footer />
</main>
