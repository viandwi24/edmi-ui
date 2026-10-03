<script lang="ts">
	let { size = 24, class: className = "" }: { size?: number; class?: string } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" class={className} aria-hidden="true">
	<path d="M19 12a7 7 0 1 1-7-7" />
	<path d="M12 9a3 3 0 1 0 3 3" />
</svg>
