<script>
  import Icon from "./Icon.svelte";
  import Tags from "./Tags.svelte";
  import Rating from "./Rating.svelte";
  import { activeTheme } from "../store";
  export let item;
</script>

<style>
  .card {
    height: 100%;
    background-color: var(--bg-card);
    color: var(--text-color);
    border: var(--border-line);
  }
  .card .card-body {
    padding-bottom: calc(1rem + 38px); /* card body padding + button height */
  }
  .card .btn-wrapper {
    position: absolute;
    bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: calc(100% - 2rem);
  }
  .business-model {
    font-size: 10px;
  }
  .thumb {
    color: var(--bs-warning);
    font-size: 1.3rem;
  }
</style>

<div class="col-md-4 col-sm-6 col-xs-12">
  <div class="card">
    <div class="card-body">
      <small class="text-muted text-uppercase business-model">
        {item.business_model}
      </small>
      <h5 class="card-title font-weight-bold">{item.title}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{item.creator}</h6>
      <p class="card-text mt-3">{item.description}</p>

      {#if typeof item.likes !== 'undefined'}
        <div class="d-flex align-items-center mb-2 thumb">
          <Icon name="thumbs_up" width="24" height="24" />
          <span class="ml-2">{item.likes}</span>
        </div>
      {/if}

      <Rating rating={item.rating} />

      {#if item.topic_tags && item.topic_tags.length > 0}
        <Tags topic_tags={item.topic_tags} />
      {/if}

      <div class="btn-wrapper">
        <a
          href="{item.url}?utm_source=ajari-koding&utm_medium=website&utm_campaign=phpid"
          target="_blank"
          rel="noopener noreferrer"
          class="btn {$activeTheme === 'dark' ? 'btn-light' : 'btn-outline-primary'}">
          Kunjungi
          <Icon name="arrow" width="24" height="24" />
        </a>
        <button
          class="btn {$activeTheme === 'dark' ? 'btn-light' : 'btn-outline-primary'}">
          <Icon name="thumbs_up" width="24" height="24" />
        </button>
      </div>
    </div>
  </div>
</div>
