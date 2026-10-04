import { CodeBlock } from "@edmi-react/blocks/code-block/code-block";

export default function Demo() {
	return (
		<CodeBlock
			elevation="raised"
			className="w-[420px] max-w-full"
			title="Claude Code"
			code={"claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp"}
			highlightLines={[2]}
		/>
	);
}
