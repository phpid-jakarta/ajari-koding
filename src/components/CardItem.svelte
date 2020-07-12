<script>
  import Hoverable from "./Hoverable.svelte";
  import Icon from "./Icon.svelte";
  import Tags from "./Tags.svelte";
  import Rating from "./Rating.svelte";
  import { activeTheme, isLogin } from "../store";
  import { getLikeSingleRef, updateLikesOrDislikes } from "../firebase";
  import { SESSION_ID_KEY } from "../constant";
  export let item;

  let showDesc = false;
  const toggleDescription = () => {
    showDesc = !showDesc;
  };

  let clickedLikeBtn = false;
  const handleClickThumbUp = id => {
    clickedLikeBtn = true;
    if ($isLogin) {
      const uid = window.localStorage.getItem(SESSION_ID_KEY);
      if (uid) {
        const dataInStorage = window.localStorage.getItem(uid);
        if (dataInStorage) {
          const parseData = JSON.parse(dataInStorage);
          console.debug(`Data like in web storage`, parseData);
          if (!parseData[id] || parseData[id] < 10) {
            const numb = parseData[id] || 0;
            const ref = getLikeSingleRef(id);
            updateLikesOrDislikes(ref);
            window.localStorage.setItem(
              uid,
              JSON.stringify({ ...parseData, [id]: numb + 1 })
            );
          } else {
            console.warn(
              `Hey, you've already push like button for "${id}" more than 10 times`
            );
          }
        } else {
          window.localStorage.setItem(uid, JSON.stringify({ [id]: 1 }));
        }
      }
    }

    setTimeout(() => {
      clickedLikeBtn = false;
    }, 700);
  };
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
    z-index: 2;
  }
  .business-model {
    font-size: 10px;
  }

  .desc {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.3s ease-out;
  }
  .hovered .desc {
    max-height: 200px;
  }
  .desc--mobile {
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  .is--show {
    max-height: 200px;
  }
  .is--hide {
    max-height: 0;
  }
  .btn-like {
    position: relative;
    transition: transform ease-in 0.1s, box-shadow ease-in 0.25s;
  }
  .btn-like:active {
    transform: scale(0.9);
    box-shadow: 0 2px 25px rgba(255, 0, 130, 0.2);
  }
  .btn-like:before,
  .btn-like:after {
    position: absolute;
    content: "";
    display: block;
    width: 140%;
    height: 100%;
    left: -20%;
    z-index: -1000;
    transition: all ease-in-out 0.5s;
    background-repeat: no-repeat;
  }

  .btn-like:before {
    display: none;
    top: -75%;
    background-image: radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, transparent 20%, #0d6efd 20%, transparent 30%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #0d6efd 15%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%);
    background-size: 10% 10%, 20% 20%, 15% 15%, 20% 20%, 18% 18%, 10% 10%,
      15% 15%, 10% 10%, 18% 18%;
  }

  .btn-like:after {
    display: none;
    bottom: -75%;
    background-image: radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, transparent 10%, #0d6efd 15%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%),
      radial-gradient(circle, #0d6efd 20%, transparent 20%);
    background-size: 15% 15%, 20% 20%, 18% 18%, 20% 20%, 15% 15%, 10% 10%,
      20% 20%;
  }

  .btn-like.bubble:before {
    display: block;
    animation: topBubbles ease-in-out 0.75s forwards;
  }
  .btn-like.bubble:after {
    display: block;
    animation: bottomBubbles ease-in-out 0.75s forwards;
  }

  @keyframes topBubbles {
    0% {
      background-position: 5% 90%, 10% 90%, 10% 90%, 15% 90%, 25% 90%, 25% 90%,
        40% 90%, 55% 90%, 70% 90%;
    }
    50% {
      background-position: 0% 80%, 0% 20%, 10% 40%, 20% 0%, 30% 30%, 22% 50%,
        50% 50%, 65% 20%, 90% 30%;
    }
    100% {
      background-position: 0% 70%, 0% 10%, 10% 30%, 20% -10%, 30% 20%, 22% 40%,
        50% 40%, 65% 10%, 90% 20%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }

  @keyframes bottomBubbles {
    0% {
      background-position: 10% -10%, 30% 10%, 55% -10%, 70% -10%, 85% -10%,
        70% -10%, 70% 0%;
    }
    50% {
      background-position: 0% 80%, 20% 80%, 45% 60%, 60% 100%, 75% 70%, 95% 60%,
        105% 0%;
    }
    100% {
      background-position: 0% 90%, 20% 90%, 45% 70%, 60% 110%, 75% 80%, 95% 70%,
        110% 10%;
      background-size: 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%, 0% 0%;
    }
  }
</style>

<div class="col-md-4 col-sm-6 col-xs-12">
  <Hoverable let:hovering={hovered}>
    <div class="card" class:hovered on:click={toggleDescription}>
      <div class="card-body">
        <small class="text-muted text-uppercase business-model">
          {item.business_model}
        </small>
        <h5 class="card-title font-weight-bold">{item.title}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{item.creator}</h6>
        <p class="card-text desc hide-on-mobile">{item.description}</p>
        <p
          class="card-text desc--mobile show-on-mobile-only {showDesc ? 'is--show' : 'is--hide'}">
          {item.description}
        </p>

        <Rating rating={item.rating} likes={item.likes} />

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
            class="btn btn-like {clickedLikeBtn ? 'bubble' : ''}
            {$activeTheme === 'dark' ? 'btn-light' : 'btn-outline-primary'}"
            on:click={() => {
              handleClickThumbUp(item.id);
            }}>
            <Icon name="thumbs_up" width="24" height="24" />
          </button>

        </div>
      </div>
    </div>
  </Hoverable>
</div>
