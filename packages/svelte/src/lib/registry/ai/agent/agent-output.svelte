<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import { CodeBlock } from "../code-block/index.js";

	let {
		schema,
		class: className,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & { schema: string } = $props();
</script>

<div class={cn("flex flex-col gap-1.5", className)} {...restProps}>
	<span class="font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase"
		>Output schema</span
	>
	<CodeBlock class="rounded-lg border-0 bg-muted" code={schema} language="typescript" />
</div>
