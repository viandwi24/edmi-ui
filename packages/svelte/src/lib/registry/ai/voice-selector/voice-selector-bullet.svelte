<script lang="ts">
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";

	let { class: className, ...restProps }: HTMLAttributes<HTMLSpanElement> = $props();
</script>

<span aria-hidden="true" class={cn("select-none text-muted-foreground-2", className)} {...restProps}>&middot;</span>
