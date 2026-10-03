import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
} from "@edmi-react/components/ai/tool";

export default function Demo() {
	return (
		<Tool raised defaultOpen className="max-w-md">
			<ToolHeader type="tool-get_prices" state="output-available" />
			<ToolContent>
				<ToolInput input={{ symbol: "NVDAx", window: "30d" }} />
				<ToolOutput
					output={{ price: 188.2, change: 0.024 }}
					errorText={undefined}
				/>
			</ToolContent>
		</Tool>
	);
}
