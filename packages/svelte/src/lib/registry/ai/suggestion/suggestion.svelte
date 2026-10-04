<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";

	type ButtonVariant = NonNullable<ButtonProps["variant"]>;

	let {
		suggestion,
		onclick,
		class: className,
		variant = "chip",
		size = "sm",
		children,
		...restProps
	}: Omit<ButtonProps, "onclick" | "variant" | "href"> & {
		suggestion: string;
		onclick?: (suggestion: string) => void;
		/**
		 * `chip` (default): pill. `card` ✦: a larger tile with a lead-in line, for the home state
		 * (`children` = description).
		 */
		variant?: "chip" | "card" | ButtonVariant;
		children?: Snippet;
	} = $props();

	const isCard = $derived(variant === "card");
	const buttonVariant = $derived<ButtonVariant>(
		variant === "chip" || variant === "card" ? "outline" : variant
	);
</script>

<Button
	data-slot="ai-suggestion"
	data-variant={isCard ? "card" : "chip"}
	type="button"
	variant={buttonVariant}
	size={isCard ? undefined : size}
	class={cn(
		isCard
			? "h-auto min-w-44 flex-col items-start gap-1 rounded-xl px-4 py-3 text-left whitespace-normal"
			: "rounded-full px-4",
		className
	)}
	onclick={() => onclick?.(suggestion)}
	{...restProps}
>
	{#if isCard}
		<span class="text-[13.5px] font-medium">{suggestion}</span>
		{#if children}
			<span class="text-xs font-normal text-muted-foreground">{@render children()}</span>
		{/if}
	{:else if children}
		{@render children()}
	{:else}
		{suggestion}
	{/if}
</Button>
