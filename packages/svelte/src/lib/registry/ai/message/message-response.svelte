<script lang="ts">
	// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
	import { cn } from "$lib/utils.js";
	import { Streamdown, type StreamdownProps } from "svelte-streamdown";

	let { content, class: className, theme, ...restProps }: StreamdownProps = $props();

	// Response typography (DESIGN §5b rule 3): 15/1.65, 600 lead-ins, h1-h3 22/18/16, inline code = mono 12.5 on
	// --muted in --destructive-text, links --info-text underlined, quote = 3px --border rule, 22px list indent,
	// max ~68ch. Passed through Streamdown's theme (merged with tailwind-merge, so these win over the shadcn base).
	const typography = {
		h1: { base: "mt-4 mb-2 text-[22px] leading-snug font-semibold tracking-[-0.3px]" },
		h2: { base: "mt-4 mb-2 text-lg leading-snug font-semibold tracking-[-0.2px]" },
		h3: { base: "mt-3 mb-2 text-base leading-snug font-semibold" },
		paragraph: { base: "my-0" },
		strong: { base: "font-semibold" },
		codespan: {
			base: "rounded-md border border-border bg-muted px-1.5 py-px font-mono text-[12.5px] font-normal text-destructive-text",
		},
		link: {
			base: "font-normal text-info-text underline underline-offset-[3px] hover:text-info-text",
		},
		blockquote: {
			base: "my-2.5 border-l-[3px] border-border py-0.5 pl-3.5 text-foreground-2 not-italic",
		},
		ul: { base: "my-2.5 ml-0 list-outside pl-[22px]" },
		ol: { base: "my-2.5 ml-0 list-outside pl-[22px]" },
		li: { base: "py-0.5 pl-0" },
	};
</script>

<div
	data-slot="ai-message-response"
	class={cn(
		"size-full max-w-[68ch] text-[15px] leading-[1.65] text-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
		className
	)}
>
	<Streamdown
		{content}
		baseTheme="shadcn"
		theme={{ ...typography, ...theme }}
		{...restProps}
	/>
</div>
