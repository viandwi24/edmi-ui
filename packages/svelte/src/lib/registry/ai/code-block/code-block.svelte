<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import type { BundledLanguage } from "shiki";
	import CodeBlockContent from "./code-block-content.svelte";
	import { setCodeBlockContext } from "./use-code-block.svelte.js";

	// The canonical code block of the kit (DESIGN 5b): body on --card, header on --muted. Highlight
	// colours come from chart tokens through Shiki's css-variables theme.
	const SHIKI_TOKEN_VARS = cn(
		"[--shiki-foreground:var(--foreground)] [--shiki-background:transparent]",
		"[--shiki-token-keyword:var(--chart-2)] [--shiki-token-string:var(--success-text)]",
		"[--shiki-token-string-expression:var(--success-text)] [--shiki-token-constant:var(--chart-3)]",
		"[--shiki-token-function:var(--chart-4)] [--shiki-token-comment:var(--muted-foreground)]",
		"[--shiki-token-parameter:var(--foreground)] [--shiki-token-punctuation:var(--foreground)]",
		"[--shiki-token-link:var(--info-text)]"
	);

	let {
		code,
		language,
		showLineNumbers = false,
		class: className,
		children,
		...restProps
	}: HTMLAttributes<HTMLDivElement> & {
		code: string;
		language: BundledLanguage;
		showLineNumbers?: boolean;
		children?: Snippet;
	} = $props();

	setCodeBlockContext({
		get code() {
			return code;
		},
	});
</script>

<div
	data-slot="ai-code-block"
	data-language={language}
	class={cn(
		"group relative w-full overflow-hidden rounded-xl border border-border bg-card text-foreground",
		SHIKI_TOKEN_VARS,
		className
	)}
	style="content-visibility:auto;contain-intrinsic-size:auto 200px"
	{...restProps}
>
	{@render children?.()}
	<CodeBlockContent {code} {language} {showLineNumbers} />
</div>
