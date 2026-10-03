<script lang="ts">
	import type { Snippet } from "svelte";
	import {
		type MessageScrollerProviderProps,
		provideMessageScroller,
	} from "./use-message-scroller.svelte.js";

	let { children, ...props }: MessageScrollerProviderProps & { children?: Snippet } = $props();

	// `props` is a live proxy; the engine reads it lazily, so it stays reactive.
	// svelte-ignore state_referenced_locally
	provideMessageScroller(props);
</script>

{@render children?.()}
