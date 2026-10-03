<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { DropdownMenuTrigger } from "$lib/registry/ui/dropdown-menu/index.js";
	import type { ComponentProps } from "svelte";
	import PromptInputButton from "./prompt-input-button.svelte";

	let {
		class: className,
		children,
		...restProps
	}: Omit<ComponentProps<typeof PromptInputButton>, "tooltip"> = $props();
</script>

<DropdownMenuTrigger>
	{#snippet child({ props })}
		<PromptInputButton {...props} class={className} {...restProps}>
			{#if children}
				{@render children()}
			{:else}
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="Add01Icon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
					class="size-4"
				/>
			{/if}
		</PromptInputButton>
	{/snippet}
</DropdownMenuTrigger>
