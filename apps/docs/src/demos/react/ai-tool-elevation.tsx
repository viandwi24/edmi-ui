import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
} from "@edmi-react/components/ai/tool";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Tool elevation={value} defaultOpen className="max-w-md">
						<ToolHeader type="tool-get_prices" state="output-available" />
						<ToolContent>
							<ToolInput input={{ symbol: "NVDAx", window: "30d" }} />
							<ToolOutput
								output={{ price: 188.2, change: 0.024 }}
								errorText={undefined}
							/>
						</ToolContent>
					</Tool>
				</div>
			))}
		</div>
	);
}
