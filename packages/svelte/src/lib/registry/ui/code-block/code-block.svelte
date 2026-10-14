<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import type { Elevation } from "$lib/registry/ui/elevation/index.js";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import type { ComponentProps, Snippet } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		code,
		title,
		highlightLines,
		copyable = true,
		onCopy,
		elevation = "auto",
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		/** Source text. */
		code: string;
		/** Header label (file name or tool), or a snippet for rich content. */
		title?: string | Snippet;
		/** 1-based line numbers to highlight. */
		highlightLines?: number[];
		/** Show the copy button (default true). */
		copyable?: boolean;
		/** Called after a successful copy. */
		onCopy?: (code: string) => void;
		/** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
		elevation?: Elevation;
	} = $props();

	let copied = $state(false);
	let timer: ReturnType<typeof setTimeout> | undefined;
	$effect(() => () => clearTimeout(timer));

	async function copy() {
		try {
			await navigator.clipboard.writeText(code);
		} catch {
			return;
		}
		onCopy?.(code);
		copied = true;
		clearTimeout(timer);
		timer = setTimeout(() => (copied = false), 1500);
	}

	const lines = $derived(code.split("\n"));
</script>

<Card bind:ref {elevation} data-slot="code-block" class={cn("gap-0 overflow-hidden p-0", className)} {...restProps}>
	{#if title || copyable}
		<div class="flex items-center justify-between border-b border-border bg-muted py-2 pr-2 pl-3.5">
			<span class="font-mono text-[11.5px] text-muted-foreground">{#if typeof title === "function"}{@render title()}{:else}{title}{/if}</span>
			{#if copyable}
				<Button variant="ghost" size="icon-xs" aria-label={copied ? "Copied" : "Copy code"} onclick={copy}>
					{#if copied}
						<IconPlaceholder
							lucide="CheckIcon"
							tabler="IconCheck"
							hugeicons="Tick02Icon"
							phosphor="CheckIcon"
							remixicon="RiCheckLine"
						/>
					{:else}
						<IconPlaceholder
							lucide="CopyIcon"
							tabler="IconCopy"
							hugeicons="Copy01Icon"
							phosphor="CopyIcon"
							remixicon="RiFileCopyLine"
						/>
					{/if}
				</Button>
			{/if}
		</div>
	{/if}
	<pre
		class="m-0 overflow-x-auto bg-card py-3.5 font-mono text-[12.5px] leading-[1.65] whitespace-pre-wrap text-foreground-2"><code
			>{#each lines as line, i (i)}<span
					data-highlighted={highlightLines?.includes(i + 1) ? "" : undefined}
					class="block border-l-2 border-transparent px-3.5 data-[highlighted]:border-brand data-[highlighted]:bg-accent"
					>{line || "​"}</span
				>{/each}</code
		></pre>
</Card>
