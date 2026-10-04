<script lang="ts">
	import { CodeBlock } from "@edmi-svelte/ui/code-block";

	const code = "claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp";

	const levels = [
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<CodeBlock elevation={l.value} class="w-[420px] max-w-full" title="Claude Code" {code} highlightLines={[2]} />
		</div>
	{/each}
</div>
