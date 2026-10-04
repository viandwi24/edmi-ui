<script lang="ts">
	import { Button, type ButtonProps } from "$lib/registry/ui/button/index.js";
	import { useConfirmationOptional } from "./use-confirmation.svelte.js";

	// `raised` falls back to the Confirmation's (an explicit `false` here wins).
	let {
		raised,
		size = "sm",
		children,
		...restProps
	}: ButtonProps & { raised?: boolean } = $props();

	const confirmation = useConfirmationOptional();
</script>

<Button
	data-slot="ai-confirmation-action"
	type="button"
	elevation={raised ?? confirmation?.raised ?? false ? "raised" : undefined}
	{size}
	{...restProps}
>
	{@render children?.()}
</Button>
