<script lang="ts">
	let { color, ubuntu = false }: { color: string; ubuntu?: boolean } = $props();
</script>

<svg width="22" height="22" viewBox="0 0 24 24" class="shrink-0" aria-hidden="true">
	<circle cx="12" cy="12" r="11" fill={color} />
	{#if ubuntu}
		<circle cx="12" cy="12" r="5.2" fill="none" stroke="#fff" stroke-width="2.2" />
		<circle cx="5.6" cy="12" r="2" fill="#fff" />
		<circle cx="15.2" cy="6.5" r="2" fill="#fff" />
		<circle cx="15.2" cy="17.5" r="2" fill="#fff" />
	{/if}
</svg>
