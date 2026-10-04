<script lang="ts">
	import { Dialog } from "$lib/registry/ui/dialog/index.js";
	import type { ComponentProps } from "svelte";

	// Built on ui/command + ui/dialog (DESIGN §5b): the palette body is the Edmi Command, the popup the Edmi Dialog.
	let { open = $bindable(false), ...restProps }: ComponentProps<typeof Dialog> = $props();
</script>

<Dialog bind:open {...restProps} />
