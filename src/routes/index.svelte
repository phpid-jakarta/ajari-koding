<script>
import { onMount } from 'svelte'
import {
  originData,
  allData,
  showData,
  perPage,
  offsetPage,
  showBottomSheetFilter,
  isLoadingAccount,
  isLogin,
  userName,
  userEmail,
  userImage
} from "../store"
import { getFirebaseApp, observeLoginStatus, getLikesRef } from '../firebase'

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
import Snackbar from "../components/Snackbar.svelte";

const onLogin = ({ email, name, image }) => {
  isLoadingAccount.set(false)
  isLogin.set(true)
  userName.set(name)
  userEmail.set(email)
  userImage.set(image)
}

const onLogout = () => {
  isLoadingAccount.set(false)
  isLogin.set(false)
  userName.set('')
  userEmail.set('')
  userImage.set('')
}

const handleLoginDispather = (event) => {
  onLogin(event.detail)
}

const handleLogoutDispather = () => {
  onLogout()
}

onMount(() => {
  getFirebaseApp({
    FIREBASE_API_KEY: __FIREBASE_API_KEY__,
    FIREBASE_AUTH_DOMAIN: __FIREBASE_AUTH_DOMAIN__,
    FIREBASE_DATABASE_URL: __FIREBASE_DATABASE_URL__,
    FIREBASE_PROJECT_ID: __FIREBASE_PROJECT_ID__,
    FIREBASE_STORAGE_BUCKET: __FIREBASE_STORAGE_BUCKET__,
    FIREBASE_MESSAGING_SENDER_ID: __FIREBASE_MESSAGING_SENDER_ID__,
    FIREBASE_APP_ID: __FIREBASE_APP_ID__,
    FIREBASE_MEASUREMENT_ID: __FIREBASE_MEASUREMENT_ID__
  })
  setTimeout(() => {
    observeLoginStatus({ onLogin, onLogout })
  }, 500)

  setTimeout(() => {
    const r = getLikesRef()
    r.on('value', function (snapshot) {
      const result = snapshot.val()
      const withLikes = $originData.map(i => {
        i.likes = result[i.id]
        return i;
      })
      allData.set(withLikes)
      showData.set(withLikes)
    })
  }, 2000)
})
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
  <Hero on:login={handleLoginDispather} on:logout={handleLogoutDispather} />
  <HeaderMobile on:login={handleLoginDispather} on:logout={handleLogoutDispather} />

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

<Snackbar />
<FloatingButtonMobile />
<TabsMobile />
<BottomSheetFilter />
<BottomSheetSort />
<ThemeSwitcher />
