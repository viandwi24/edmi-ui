import { CodeBlock } from "@edmi-react/blocks/code-block/code-block";
import type { Elevation } from "@edmi-react/ui/elevation";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<CodeBlock
			elevation={elevation}
			className="w-[420px] max-w-full"
			title="Claude Code"
			code={"claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp"}
			highlightLines={[2]}
		/>
	);
}

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
