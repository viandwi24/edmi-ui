<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import { AT_PREFIX_REGEX, useStackTraceContext } from "./use-stack-trace.svelte.js";

	let {
		showInternalFrames = true,
		class: className,
	}: { showInternalFrames?: boolean; class?: string } = $props();

	const stack = useStackTraceContext();

	const framesToShow = $derived(
		showInternalFrames ? stack.trace.frames : stack.trace.frames.filter((f) => !f.isInternal)
	);
</script>

<div data-slot="ai-stack-trace-frames" class={cn("px-3.5 py-3", className)}>
	{#each framesToShow as frame, index (`${frame.raw}-${index}`)}
		<div class={cn("flex items-center gap-2 text-xs leading-[1.9]", frame.isInternal && "opacity-50")}>
			<span class="text-muted-foreground">at</span>
			{#if frame.functionName}
				<span class="text-foreground">{frame.functionName}</span>
			{/if}
			{#if frame.filePath}
				<button
					type="button"
					disabled={!stack.onFilePathClick}
					class={cn(
						"text-muted-foreground",
						!frame.isInternal && "underline underline-offset-[3px]",
						stack.onFilePathClick && "cursor-pointer hover:text-foreground"
					)}
					onclick={() =>
						frame.filePath &&
						stack.onFilePathClick?.(
							frame.filePath,
							frame.lineNumber ?? undefined,
							frame.columnNumber ?? undefined
						)}
				>
					{frame.filePath}{frame.lineNumber !== null ? `:${frame.lineNumber}` : ""}{frame.columnNumber !==
					null
						? `:${frame.columnNumber}`
						: ""}
				</button>
			{:else if !frame.functionName}
				<span>{frame.raw.replace(AT_PREFIX_REGEX, "")}</span>
			{/if}
		</div>
	{/each}
	{#if framesToShow.length === 0}
		<div class="text-xs text-muted-foreground">No stack frames</div>
	{/if}
</div>
