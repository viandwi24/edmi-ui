<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let {
		tooltip,
		label,
		variant = "ghost",
		size = "icon-xs",
		children,
		...restProps
	}: Omit<ButtonProps, "href"> & {
		tooltip?: string;
		label?: string;
	} = $props();

	const srOnlyLabel = $derived(label || tooltip);
</script>

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button {...props} {...restProps} {size} type="button" {variant}>
						{@render children?.()}
						{#if srOnlyLabel}
							<span class="sr-only">{srOnlyLabel}</span>
						{/if}
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{tooltip}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	<Button {...restProps} {size} type="button" {variant}>
		{@render children?.()}
		{#if srOnlyLabel}
			<span class="sr-only">{srOnlyLabel}</span>
		{/if}
	</Button>
{/if}
