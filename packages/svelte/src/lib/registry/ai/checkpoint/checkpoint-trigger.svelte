<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let {
		tooltip,
		variant = "ghost",
		size = "xs",
		children,
		...restProps
	}: Omit<ButtonProps, "href"> & { tooltip?: string } = $props();
</script>

{#if tooltip}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				{#snippet child({ props })}
					<Button {...props} data-slot="ai-checkpoint-trigger" type="button" {variant} {size} {...restProps}>
						{@render children?.()}
					</Button>
				{/snippet}
			</Tooltip.Trigger>
			<Tooltip.Content align="start" side="bottom">
				<p>{tooltip}</p>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{:else}
	<Button data-slot="ai-checkpoint-trigger" type="button" {variant} {size} {...restProps}>
		{@render children?.()}
	</Button>
{/if}
