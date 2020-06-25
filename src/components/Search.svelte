<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function doSearch(e) {
    const val = e.target.value;
    dispatch("search", {
      text: val
    });
  }
</script>

<style>

</style>

<div class="mb-3">
  <input
    type="text"
    class="form-control"
    id="txt-search"
    placeholder="Ketik kata kunci untuk mencari..."
    on:change={doSearch} />
</div>
