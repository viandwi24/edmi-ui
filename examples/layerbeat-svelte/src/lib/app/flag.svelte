<script lang="ts">
	import type { Flag } from "#lib/data/layerbeat.js";

	let { flag, class: className = "" }: { flag: Flag; class?: string } = $props();
	const n = $derived(flag.colors.length);
</script>

<svg width="20" height="14" viewBox="0 0 20 14" class="shrink-0 rounded-[2px] {className}" aria-hidden="true">
	{#each flag.colors as color, i (i)}
		{#if flag.direction === "horizontal"}
			<rect x="0" y={(14 / n) * i} width="20" height={14 / n + 0.3} fill={color} />
		{:else}
			<rect x={(20 / n) * i} y="0" width={20 / n + 0.3} height="14" fill={color} />
		{/if}
	{/each}
</svg>
