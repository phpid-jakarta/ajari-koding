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

			<a href="{item.url}?utm_source=ajari-koding&utm_medium=website&utm_campaign=phpid" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Kunjungi</a>
		</div>
	</div>
</div>

<style>
</style>
