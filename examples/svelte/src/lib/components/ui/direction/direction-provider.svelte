<script lang="ts">
	import type { Snippet } from "svelte";
	import { type Direction, setDirectionContext } from "./context.js";

	// Same API as the React item (`direction`). Provides context only (no DOM node):
	// set `dir` on a wrapper element too, and pass `useDirection().current` to Bits UI's `dir` props.
	let { direction = "ltr", children }: { direction?: Direction; children?: Snippet } = $props();

	setDirectionContext(() => direction);
</script>

{@render children?.()}
