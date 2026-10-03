<!-- Derived from Svelte AI Elements (MIT), modified for Edmi UI. -->
<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Collapsible } from "$lib/registry/ui/collapsible/index.js";
	import type { ComponentProps } from "svelte";
	import { setReasoningContext } from "./use-reasoning.svelte.js";

	let {
		class: className,
		isStreaming = false,
		open = $bindable(),
		defaultOpen,
		duration = $bindable(),
		children,
		...restProps
	}: Omit<ComponentProps<typeof Collapsible>, "open"> & {
		isStreaming?: boolean;
		open?: boolean;
		defaultOpen?: boolean;
		/** Seconds. Measured automatically when `isStreaming` flips to false. */
		duration?: number;
	} = $props();

	const AUTO_CLOSE_DELAY = 1000;
	const MS_IN_S = 1000;

	// svelte-ignore state_referenced_locally
	if (open === undefined) open = defaultOpen ?? isStreaming;

	// svelte-ignore state_referenced_locally
	let hasEverStreamed = isStreaming;
	let hasAutoClosed = $state(false);
	let startTime: number | null = null;

	// Track when streaming starts and compute the duration when it ends; auto-open on start unless
	// `defaultOpen` was explicitly false.
	$effect(() => {
		if (isStreaming) {
			hasEverStreamed = true;
			if (!open && defaultOpen !== false) open = true;
			if (startTime === null) startTime = Date.now();
		} else if (startTime !== null) {
			duration = Math.ceil((Date.now() - startTime) / MS_IN_S);
			startTime = null;
		}
	});

	// Auto-close once when streaming ends (only if it ever streamed).
	$effect(() => {
		if (hasEverStreamed && !isStreaming && open && !hasAutoClosed) {
			const timer = setTimeout(() => {
				open = false;
				hasAutoClosed = true;
			}, AUTO_CLOSE_DELAY);
			return () => clearTimeout(timer);
		}
	});

	setReasoningContext({
		get isStreaming() {
			return isStreaming;
		},
		get isOpen() {
			return !!open;
		},
		get duration() {
			return duration;
		},
		setIsOpen: (value: boolean) => {
			open = value;
		},
	});
</script>

<Collapsible bind:open data-slot="ai-reasoning" class={cn("not-prose", className)} {...restProps}>
	{@render children?.()}
</Collapsible>
