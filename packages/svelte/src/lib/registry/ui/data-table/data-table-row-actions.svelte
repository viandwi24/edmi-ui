<script lang="ts">
	import type { Snippet } from "svelte";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";

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
				<IconPlaceholder
					lucide="MoreHorizontalIcon"
					tabler="IconDots"
					hugeicons="MoreHorizontalCircle01Icon"
					phosphor="DotsThreeOutlineIcon"
					remixicon="RiMoreLine"
				/>
			</Button>
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-44">
		{@render children?.()}
	</DropdownMenu.Content>
</DropdownMenu.Root>
