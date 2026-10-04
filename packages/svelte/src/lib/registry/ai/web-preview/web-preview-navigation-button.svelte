<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let {
		tooltip,
		variant = "ghost",
		size = "icon-sm",
		children,
		...restProps
	}: Omit<ButtonProps, "href"> & { tooltip?: string } = $props();
</script>

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button {...props} aria-label={tooltip} {...restProps} {size} type="button" {variant}>
						{@render children?.()}
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
	</Button>
{/if}
