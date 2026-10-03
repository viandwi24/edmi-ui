import {
	Terminal,
	TerminalActions,
	TerminalClearButton,
	TerminalContent,
	TerminalCopyButton,
	TerminalHeader,
	TerminalStatus,
	TerminalTitle,
} from "@edmi-react/components/ai/terminal";
import { useState } from "react";

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

export default function Demo() {
	const [output, setOutput] = useState(initial);

	return (
		<Terminal
			className="max-w-xl"
			isStreaming
			onClear={() => setOutput("")}
			output={output}
		>
			<TerminalHeader>
				<div className="flex items-center">
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
	);
}
