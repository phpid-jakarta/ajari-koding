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

			<a href="{item.url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Pelajari</a>
		</div>
	</div>
</div>

<style>
</style>
