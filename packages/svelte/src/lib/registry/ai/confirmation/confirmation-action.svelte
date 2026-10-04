<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { useConfirmationOptional } from "./use-confirmation.svelte.js";

	// `elevation` falls back to the Confirmation's (an explicit value here wins).
	let {
		elevation,
		size = "sm",
		children,
		...restProps
	}: ButtonProps = $props();

	const confirmation = useConfirmationOptional();
</script>

<Button
	data-slot="ai-confirmation-action"
	type="button"
	elevation={elevation && elevation !== "auto" ? elevation : confirmation?.elevation}
	{size}
	{...restProps}
>
	{@render children?.()}
</Button>
