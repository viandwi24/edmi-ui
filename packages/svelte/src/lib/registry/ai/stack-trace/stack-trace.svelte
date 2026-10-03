<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import * as Collapsible from "$lib/registry/ui/collapsible/index.js";
	import { cn } from "$lib/utils.js";
	import type { ComponentProps } from "svelte";
	import { parseStackTrace, setStackTraceContext } from "./use-stack-trace.svelte.js";

	let {
		ref = $bindable(null),
		trace,
		open = $bindable(false),
		onFilePathClick,
		class: className,
		children,
		...restProps
	}: ComponentProps<typeof Collapsible.Root> & {
		trace: string;
		onFilePathClick?: (filePath: string, line?: number, column?: number) => void;
	} = $props();

	const parsed = $derived(parseStackTrace(trace));

	setStackTraceContext({
		get trace() {
			return parsed;
		},
		get raw() {
			return trace;
		},
		get open() {
			return open;
		},
		set open(value: boolean) {
			open = value;
		},
		get onFilePathClick() {
			return onFilePathClick;
		},
	});
</script>

<Collapsible.Root
	bind:ref
	bind:open
	data-slot="ai-stack-trace"
	class={cn(
		"not-prose w-full overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card font-mono text-sm",
		className
	)}
	{...restProps}
>
	{@render children?.()}
</Collapsible.Root>
