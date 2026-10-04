<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLTimeAttributes } from "svelte/elements";

	let {
		date,
		class: className,
		children,
		...restProps
	}: HTMLTimeAttributes & { date: Date; children?: Snippet } = $props();

	const relativeTimeFormat = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

	function formatRelativeDate(value: Date) {
		const seconds = Math.round((value.getTime() - Date.now()) / 1000);
		const steps: [Intl.RelativeTimeFormatUnit, number][] = [
			["day", 86_400],
			["hour", 3600],
			["minute", 60],
		];
		for (const [unit, size] of steps) {
			if (Math.abs(seconds) >= size) {
				return relativeTimeFormat.format(Math.round(seconds / size), unit);
			}
		}
		return relativeTimeFormat.format(0, "second");
	}

	// Formatted after mount so server and client markup match.
	let formatted = $state("");
	$effect(() => {
		formatted = formatRelativeDate(date);
	});
</script>

<time class={cn("text-xs", className)} datetime={date.toISOString()} {...restProps}>
	{#if children}{@render children()}{:else}{formatted}{/if}
</time>
