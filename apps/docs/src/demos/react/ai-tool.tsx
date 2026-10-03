import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
} from "@edmi-react/components/ai/tool";

const input = { symbol: "NVDAx", window: "30d" };

export default function Demo() {
	return (
		<div className="flex w-full max-w-md flex-col gap-3">
			<Tool defaultOpen>
				<ToolHeader type="tool-get_prices" state="output-available" />
				<ToolContent>
					<ToolInput input={input} />
					<ToolOutput
						output={{ price: 188.2, change: 0.024 }}
						errorText={undefined}
					/>
				</ToolContent>
			</Tool>
			<Tool defaultOpen>
				<ToolHeader type="tool-get_prices" state="output-error" />
				<ToolContent>
					<ToolInput input={input} />
					<ToolOutput
						output={undefined}
						errorText="Rate limit: retry in 20 s"
					/>
				</ToolContent>
			</Tool>
			{(
				[
					"input-streaming",
					"input-available",
					"approval-requested",
					"approval-responded",
					"output-denied",
				] as const
			).map((state) => (
				<Tool key={state}>
					<ToolHeader type="tool-get_prices" state={state} />
					<ToolContent>
						<ToolInput input={input} />
					</ToolContent>
				</Tool>
			))}
		</div>
	);
}
