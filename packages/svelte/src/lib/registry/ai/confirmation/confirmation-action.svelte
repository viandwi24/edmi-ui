<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { useConfirmationOptional } from "./use-confirmation.svelte.js";

	// `raised` falls back to the Confirmation's (an explicit `false` here wins).
	let { raised, size = "sm", children, ...restProps }: ButtonProps = $props();

	const confirmation = useConfirmationOptional();
</script>

<Button
	data-slot="ai-confirmation-action"
	type="button"
	raised={raised ?? confirmation?.raised ?? false}
	{size}
	{...restProps}
>
	{@render children?.()}
</Button>
