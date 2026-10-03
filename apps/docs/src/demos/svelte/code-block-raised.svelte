<script lang="ts">
	import { CodeBlock } from "@edmi-svelte/ui/code-block";

	const code = "claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp";
</script>

<CodeBlock raised class="w-[420px] max-w-full" title="Claude Code" {code} highlightLines={[2]} />
