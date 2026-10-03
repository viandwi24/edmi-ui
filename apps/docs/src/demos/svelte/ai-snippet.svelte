<script lang="ts">
	import {
		Snippet,
		SnippetAddon,
		SnippetCopyButton,
		SnippetInput,
		SnippetText,
	} from "@edmi-svelte/ai/snippet";
</script>

<div class="flex w-full max-w-md flex-col gap-3">
	<Snippet code="bunx --bun shadcn-svelte@latest add @edmi-ui/ai-tool">
		<SnippetAddon>
			<SnippetText>$</SnippetText>
		</SnippetAddon>
		<SnippetInput />
		<SnippetAddon align="inline-end">
			<SnippetCopyButton />
		</SnippetAddon>
	</Snippet>
	<Snippet code="idx_mag4_7f3a">
		<SnippetAddon>
			<SnippetText>id</SnippetText>
		</SnippetAddon>
		<SnippetInput />
		<SnippetAddon align="inline-end">
			<SnippetCopyButton />
		</SnippetAddon>
	</Snippet>
</div>
