<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { ButtonGroup } from "$lib/registry/ui/button-group/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getArtifactCardState } from "./use-artifact-card.svelte.js";

	let {
		label = "Download",
		onDownload,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		/** Label of the primary half of the split button. */
		label?: string;
		onDownload?: () => void;
		/** `DropdownMenu.Item`s for the chevron half (copy link, open, ...). No chevron without them. */
		children?: Snippet;
	} = $props();

	const card = getArtifactCardState();
</script>

<!-- Split Download button; hidden while the card is generating. -->
{#if card.state !== "generating"}
	<ButtonGroup data-slot="ai-artifact-card-actions" class={cn("shrink-0", className)} {...restProps}>
		<Button variant="secondary" size="sm" type="button" onclick={() => onDownload?.()}>
			{label}
		</Button>
		{#if children}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button
							{...props}
							variant="secondary"
							size="icon-sm"
							type="button"
							aria-label="More download options"
						>
							<IconPlaceholder
								lucide="ChevronDownIcon"
								tabler="IconChevronDown"
								hugeicons="ArrowDown01Icon"
								phosphor="CaretDownIcon"
								remixicon="RiArrowDownSLine"
								class="size-3.5"
							/>
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					{@render children()}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</ButtonGroup>
{/if}
