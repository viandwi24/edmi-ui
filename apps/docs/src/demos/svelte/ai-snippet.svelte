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
	<Snippet code="npx shadcn-svelte@latest add https://viandwi24.github.io/edmi-ui/r/svelte/ai-tool.json">
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
