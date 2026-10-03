<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import * as Tooltip from "$lib/registry/ui/tooltip/index.js";

	let {
		label,
		children,
		...restProps
	}: Omit<ButtonProps, "href"> & {
		/** Tooltip and accessible name. */
		label: string;
	} = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Button
					{...props}
					{...restProps}
					aria-label={label}
					size="icon-sm"
					type="button"
					variant="ghost"
				>
					{@render children?.()}
				</Button>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content>{label}</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
