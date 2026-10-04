<script lang="ts">
	import { cn } from "#lib/utils.js";
	import { Button } from "#lib/components/ui/button/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import CheckIcon from 'phosphor-svelte/lib/Check';
	import CopyIcon from 'phosphor-svelte/lib/Copy';
	import type { ComponentProps } from "svelte";

	let {
		class: className,
		code,
		title,
		highlightLines,
		copyable = true,
		onCopy,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "title" | "children"> & {
		/** Source text. */
		code: string;
		/** Header label (file name or tool). */
		title?: string;
		/** 1-based line numbers to highlight. */
		highlightLines?: number[];
		/** Show the copy button (default true). */
		copyable?: boolean;
		/** Called after a successful copy. */
		onCopy?: (code: string) => void;
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

<Card data-slot="code-block" class={cn("gap-0 overflow-hidden p-0", className)} {...restProps}>
	{#if title || copyable}
		<div class="flex items-center justify-between border-b border-border bg-muted py-2 pr-2 pl-3.5">
			<span class="font-mono text-[11.5px] text-muted-foreground">{title}</span>
			{#if copyable}
				<Button variant="ghost" size="icon-xs" aria-label={copied ? "Copied" : "Copy code"} onclick={copy}>
					{#if copied}
						<CheckIcon  />
					{:else}
						<CopyIcon  />
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
