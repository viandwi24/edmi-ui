<script lang="ts">
	import { AspectRatio } from "@edmi-svelte/ui/aspect-ratio";

	const boxes = [
		{ label: "16 / 9", ratio: 16 / 9, width: "w-52" },
		{ label: "1 / 1", ratio: 1, width: "w-28" },
		{ label: "9 / 16", ratio: 9 / 16, width: "w-20" },
	];
</script>

<div class="flex items-start gap-4">
	{#each boxes as b (b.label)}
		<AspectRatio
			ratio={b.ratio}
			class="{b.width} flex items-center justify-center rounded-lg border border-border bg-muted font-mono text-xs text-muted-foreground"
		>
			{b.label}
		</AspectRatio>
	{/each}
</div>
