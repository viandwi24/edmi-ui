<script lang="ts">
	import {
		Terminal,
		TerminalActions,
		TerminalClearButton,
		TerminalContent,
		TerminalCopyButton,
		TerminalHeader,
		TerminalStatus,
		TerminalTitle,
	} from "@edmi-svelte/ai/terminal";

	const initial = [
		"\u001b[90m$\u001b[0m pnpm test",
		"",
		"\u001b[34mRUN\u001b[0m  v2.1.4 /app",
		"",
		" \u001b[32m✓\u001b[0m tests/drift.test.ts \u001b[90m(4)\u001b[0m",
		" \u001b[31m✗\u001b[0m tests/keeper.test.ts \u001b[90m(3)\u001b[0m",
		"   \u001b[31m→ expected 0.02 to be less than 0.02\u001b[0m",
		"",
		"\u001b[33mTest Files\u001b[0m  \u001b[31m1 failed\u001b[0m | \u001b[32m1 passed\u001b[0m",
	].join("\n");

	let output = $state(initial);
</script>

<Terminal class="max-w-xl" isStreaming {output} onClear={() => (output = "")}>
	<TerminalHeader>
		<div class="flex items-center">
			<TerminalTitle />
			<TerminalStatus />
		</div>
		<TerminalActions>
			<TerminalCopyButton />
			<TerminalClearButton />
		</TerminalActions>
	</TerminalHeader>
	<TerminalContent />
</Terminal>
