<script lang="ts">
	import type { Layout } from "./layout.js";

	let { layout }: { layout: Layout } = $props();

	const bar = "block rounded-sm bg-[color-mix(in_srgb,var(--muted-foreground)_20%,var(--card))]";
</script>

<div class="flex h-24 w-full overflow-hidden rounded-lg border border-border-2 bg-muted shadow-sunk">
	{#if layout === "dashboard"}
		<div class="flex w-[46px] flex-col gap-1.5 border-r border-border p-1.5">
			{#each [0, 1, 2, 3] as i (i)}
				<span class="{bar} h-1.5"></span>
			{/each}
		</div>
		<div class="flex flex-1 flex-col gap-1.5 p-2">
			<span class="{bar} h-2 w-3/5"></span>
			<span class="{bar} h-10"></span>
		</div>
	{:else}
		<div class="flex flex-1 flex-col">
			<div class="flex h-4 items-center gap-3 border-b border-border px-2">
				<span class="{bar} h-1.5 w-[30px]"></span>
				<span class="{bar} h-1.5 w-[60px]"></span>
			</div>
			<div class="flex flex-col gap-1.5 p-2">
				<span class="{bar} h-2 w-3/5"></span>
				<span class="{bar} h-10"></span>
			</div>
		</div>
	{/if}
</div>
