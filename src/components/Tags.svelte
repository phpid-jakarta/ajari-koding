<script>
	export let topic_tags;
	const defaultColors = ['bg-primary', 'bg-success', 'bg-danger', 'bg-warning text-dark', 'bg-info', 'bg-dark'];
	const mappingTags = {
		php: {
			bg: '#333',
			fg: '#fff'
		},
		javascript: {
			bg: '#ffc107',
			fg: '#333'
		}
	}

	const tags_w_color = topic_tags.map((tag, i) => {
		const dataMapping = mappingTags[tag.toLowerCase()]
		if (dataMapping) {
			return {
				tag,
				isMapped: true,
				...dataMapping,
			}
		} else {
			let classes = defaultColors[0];

			const l = defaultColors.length;
			for (let index = l - 1; index >= 0; index--) {
				if (i % index === 0) {
					classes = defaultColors[index];
					break;
				}
			}

			return {
				tag,
				isMapped: false,
				classes,
			}
		}
	})
</script>

<div class="mb-3">
	{#if tags_w_color.length > 0}
		{#each tags_w_color as item}
			{#if item.isMapped}
				<span class="badge mr-1" style="background-color: {item.bg};color: {item.fg};">{item.tag}</span>
			{:else}
				<span class="badge mr-1 {item.classes}">{item.tag}</span>
			{/if}
		{/each}
	{/if}
</div>

<style>
</style>
