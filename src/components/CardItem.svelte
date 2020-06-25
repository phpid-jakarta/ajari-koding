<script>
	import Tags from './Tags.svelte';
	export let item;
</script>

<div class="col-md-4 col-sm-6 col-xs-12">
	<div class="card">
		<div class="card-body">
			<h5 class="card-title">{item.title}</h5>
			<h6 class="card-subtitle mb-2 text-muted">{item.creator}</h6>
			<p class="card-text">{item.description}</p>
			<Tags topic_tags={item.topic_tags} />

			<a href="{item.url}?utm_source=ajari-koding&utm_medium=website&utm_campaign=phpid" target="_blank" rel="noopener noreferrer" class="btn btn-outline-primary">
			Kunjungi
			<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
			</a>
		</div>
	</div>
</div>

<style>
</style>
