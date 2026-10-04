import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";

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
					<PromptInput
						elevation={value}
						onSubmit={() => {}}
						className="max-w-xl"
					>
						<PromptInputBody>
							<PromptInputTextarea defaultValue="Rebalance MAG4" />
						</PromptInputBody>
						<PromptInputFooter>
							<PromptInputTools />
							<PromptInputSubmit status="ready" />
						</PromptInputFooter>
					</PromptInput>
				</div>
			))}
		</div>
	);
}
