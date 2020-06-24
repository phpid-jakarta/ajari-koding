<script>
	import Hero from './components/Hero.svelte';
	import CardItem from './components/CardItem.svelte';
	import Footer from './components/Footer.svelte';

	export let data;
</script>

<main class="app">
	<Hero />

	<section class="app-content container mt-5 mb-5">
		{#if data.awesome_list}
			<div class="row justify-content-center">
				{#each data.awesome_list as item, i}
					<CardItem {item} />
				{/each}
			</div>
		{/if}
	</section>

	<Footer />
</main>

<style>
.app-content {
	min-height: 70vh;
}
</style>
