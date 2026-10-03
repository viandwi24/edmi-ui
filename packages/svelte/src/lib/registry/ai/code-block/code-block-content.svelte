<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { BundledLanguage } from "shiki";
	import {
		createRawTokens,
		highlightCode,
		isBold,
		isItalic,
		isUnderline,
		type TokenizedCode,
	} from "./utils.js";

	let {
		code,
		language,
		showLineNumbers = false,
	}: { code: string; language: BundledLanguage; showLineNumbers?: boolean } = $props();

	// Line numbers use CSS counters: 38px gutter, number right-aligned 14px from the code (board AI 05).
	const LINE_NUMBER_CLASSES = cn(
		"block",
		"before:inline-block before:w-[38px] before:pr-3.5 before:text-right",
		"before:content-[counter(line)] before:[counter-increment:line]",
		"before:font-mono before:text-muted-foreground-2 before:select-none"
	);

	let highlighted = $state<TokenizedCode | null>(null);
	const tokenized = $derived(
		highlighted ?? highlightCode(code, language) ?? createRawTokens(code)
	);

	$effect(() => {
		const current = { code, language };
		highlighted = null;
		let cancelled = false;
		highlightCode(current.code, current.language, (result) => {
			if (!cancelled) highlighted = result;
		});
		return () => {
			cancelled = true;
		};
	});
</script>

<div class="relative overflow-auto">
	<pre class={cn("m-0 py-2.5 font-mono text-[12.5px] leading-[1.7]", showLineNumbers ? "pr-4" : "px-4")}><code
			class={cn("font-mono", showLineNumbers && "[counter-increment:line_0] [counter-reset:line]")}
			>{#each tokenized.tokens as line, i (i)}<span class={showLineNumbers ? LINE_NUMBER_CLASSES : "block"}
					>{#if line.length === 0}{"\n"}{:else}{#each line as token, j (j)}<span
								style:color={token.color}
								style:font-style={isItalic(token.fontStyle) ? "italic" : undefined}
								style:font-weight={isBold(token.fontStyle) ? "bold" : undefined}
								style:text-decoration={isUnderline(token.fontStyle) ? "underline" : undefined}
								>{token.content}</span
							>{/each}{/if}</span
				>{/each}</code
		></pre>
</div>
