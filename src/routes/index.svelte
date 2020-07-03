<script>
import {
  allData,
  showData,
  perPage,
  offsetPage,
  showBottomSheetFilter
} from "../store";

import Hero from "../components/Hero.svelte";
import HeaderMobile from "../components/HeaderMobile.svelte";
import Tabs from "../components/Tabs.svelte";
import TabsMobile from "../components/TabsMobile.svelte";
import Search from "../components/Search.svelte";
import TagsCloud from "../components/TagsCloud.svelte";
import CardItem from "../components/CardItem.svelte";
import Footer from "../components/Footer.svelte";
import Empty from "../components/Empty.svelte";
import Pagination from "../components/Pagination.svelte";
import FloatingButtonMobile from "../components/FloatingButtonMobile.svelte";
import BottomSheetFilter from "../components/BottomSheetFilter.svelte";
import BottomSheetSort from "../components/BottomSheetSort.svelte";
import ThemeSwitcher from "../components/ThemeSwitcher.svelte";
</script>

<style>
  .app-content {
    min-height: 70vh;
    text-rendering: optimizeLegibility;
    word-wrap: break-word;
    font-kerning: normal;
    -moz-font-feature-settings: "kern", "liga", "clig", "calt";
    font-feature-settings: "kern", "liga", "clig", "calt";
  }
</style>

<svelte:head>
  <title>Ajari Koding oleh PHPID</title>
</svelte:head>

<main id="page-index">
  <Hero />
  <HeaderMobile />

  <section class="app-content container mt-5 mb-5">
    <Tabs />
    <Search />
    {#if $showData.length > 0}
      <TagsCloud />
      <div class="row justify-content-center gx-3 gy-3">
        {#each $showData.slice($offsetPage, $offsetPage + $perPage) as item (item.id)}
          <CardItem {item} />
        {/each}
      </div>
      <Pagination />
    {:else}
      <Empty />
    {/if}
  </section>
  <Footer />
</main>

<FloatingButtonMobile />
<TabsMobile />
<BottomSheetFilter />
<BottomSheetSort />
<ThemeSwitcher />
