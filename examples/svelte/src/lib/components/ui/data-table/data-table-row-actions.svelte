<script lang="ts">
	import type { Snippet } from "svelte";
	import DotsThreeOutlineIcon from 'phosphor-svelte/lib/DotsThreeOutline';
	import { Button } from "#lib/components/ui/button/index.js";
	import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.js";

	/**
	 * ✦ Row actions trigger: ghost icon button + DropdownMenu. Pass
	 * `DropdownMenu.Item`s (or groups) as children.
	 */
	let { children, label = "Open menu" }: { children?: Snippet; label?: string } = $props();
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			<Button {...props} variant="ghost" size="icon-xs">
				<span class="sr-only">{label}</span>
				<DotsThreeOutlineIcon  />
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-44">
		{@render children?.()}
	</DropdownMenu.Content>
</DropdownMenu.Root>
