<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";
	import { cn } from "$lib/utils.js";

	// The icon goes in `children` (an `IconPlaceholder`).
	let {
		tooltip,
		label,
		variant = "ghost",
		size = "icon-sm",
		class: className,
		children,
		...restProps
	}: Omit<ButtonProps, "href"> & { tooltip?: string; label?: string } = $props();
</script>

{#snippet inner()}
	{@render children?.()}
	<span class="sr-only">{label || tooltip}</span>
{/snippet}

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button
						{...props}
						type="button"
						{variant}
						{size}
						class={cn("text-muted-foreground hover:text-foreground", className)}
						{...restProps}
					>
						{@render inner()}
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{tooltip}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	<Button
		type="button"
		{variant}
		{size}
		class={cn("text-muted-foreground hover:text-foreground", className)}
		{...restProps}
	>
		{@render inner()}
	</Button>
{/if}
