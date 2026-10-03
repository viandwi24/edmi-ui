<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	// Four tones of the board identicon: columns repeat muted-2 / muted / foreground-2 / empty.
	const TONES = ["bg-muted-foreground-2", "bg-muted-foreground", "bg-foreground-2", "bg-transparent"];

	function hash(seed: string) {
		let h = 2166136261;
		for (let i = 0; i < seed.length; i++) {
			h ^= seed.charCodeAt(i);
			h = Math.imul(h, 16777619);
		}
		return h >>> 0;
	}

	let {
		class: className,
		seed,
		size = 44,
		style,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		/** Deterministic seed (agent name or address). */
		seed: string;
		/** Edge length in px. */
		size?: number;
	} = $props();

	const cells = $derived.by(() => {
		let h = hash(seed);
		return Array.from({ length: 25 }, (_, i) => {
			if (i % 5 === 0) h = hash(`${seed}:${i}:${h}`);
			return TONES[(h >>> ((i % 5) * 2)) & 3];
		});
	});
</script>

<!-- 5x5 token-colored identicon, deterministic per `seed`. -->
<div
	data-slot="agent-identicon"
	aria-hidden="true"
	class={cn("grid shrink-0 grid-cols-5 overflow-hidden rounded-xl border border-border bg-muted", className)}
	style="width: {size}px; height: {size}px;{style ? ` ${style}` : ''}"
	{...restProps}
>
	{#each cells as tone, i (i)}
		<span class={tone}></span>
	{/each}
</div>
