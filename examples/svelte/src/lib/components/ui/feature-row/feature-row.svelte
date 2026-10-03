<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import * as Collapsible from "#lib/components/ui/collapsible/index.js";
	import PlusIcon from 'phosphor-svelte/lib/Plus';
	import type { ComponentProps, Snippet } from "svelte";

	let {
		class: className,
		index,
		title,
		icon,
		children,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		/** Mono number, e.g. "1.1". */
		index: string | number;
		title: string;
		/** Trailing icon; defaults to a plus. */
		icon?: Snippet;
		/** When set the row expands to show this content. */
		children?: Snippet;
	} = $props();
</script>

{#snippet plus()}
	<PlusIcon class="size-4" />
{/snippet}

{#if !children}
	<Card data-slot="feature-row" class={cn("h-14 flex-row items-center gap-4 px-5 py-0", className)} {...restProps}>
		<span class="font-mono text-xs text-muted-foreground">{index}</span>
		<span class="flex-1 text-left text-base font-medium">{title}</span>
		<span class="text-muted-foreground">{@render (icon ?? plus)()}</span>
	</Card>
{:else}
	<Card data-slot="feature-row" class={cn("gap-0 py-0", className)} {...restProps}>
		<Collapsible.Root class="group/feature-row">
			<Collapsible.Trigger
				class="flex h-14 w-full cursor-pointer items-center gap-4 px-5 outline-none focus-visible:bg-accent"
			>
				<span class="font-mono text-xs text-muted-foreground">{index}</span>
				<span class="flex-1 text-left text-base font-medium">{title}</span>
				<span class="text-muted-foreground transition-transform group-data-[state=open]/feature-row:rotate-45">
					{@render (icon ?? plus)()}
				</span>
			</Collapsible.Trigger>
			<Collapsible.Content class="px-5 pb-4 pl-[52px] text-sm text-muted-foreground">
				{@render children()}
			</Collapsible.Content>
		</Collapsible.Root>
	</Card>
{/if}
