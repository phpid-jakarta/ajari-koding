<script>
  import Icon from "./Icon.svelte";
  import { createEventDispatcher } from "svelte";
  import { FILTERS } from "../constant.js";
  export let activeFilter;

  const dispatch = createEventDispatcher();

  function doFilter(e, filterBy) {
    e.preventDefault();
    dispatch("filter", {
      text: filterBy
    });
  }
</script>

<style>

</style>

<ul class="nav nav-tabs mb-5">
  {#each FILTERS as f (f)}
    <li class="nav-item">
      <a
        class="nav-link text-capitalize d-flex align-items-center"
        class:active="{activeFilter === f}"
        aria-current="page"
        href="?tipe={f}"
        on:click={e => doFilter(e, f)}>
        <Icon name="tab_{f}" />
        <span class="ml-2">{f}</span>
      </a>
    </li>
  {/each}
</ul>
