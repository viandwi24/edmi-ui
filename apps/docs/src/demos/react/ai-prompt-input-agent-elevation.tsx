import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";
import { PromptInputAgent } from "@edmi-react/components/ai/prompt-input-agent";

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
						className="max-w-xl [&_[data-slot=input-group]]:bg-muted"
					>
						<PromptInputHeader>
							<PromptInputAgent
								agent={{ id: "keeper", name: "Keeper", color: "chart-3" }}
							/>
						</PromptInputHeader>
						<PromptInputBody>
							<PromptInputTextarea
								defaultValue="Rebalance MAG4 and draft a post"
								className="min-h-14"
								placeholder="Ask Keeper anything about your index…"
							/>
						</PromptInputBody>
						<PromptInputFooter>
							<PromptInputTools />
							<PromptInputSubmit size="icon-sm" variant="secondary" />
						</PromptInputFooter>
					</PromptInput>
				</div>
			))}
		</div>
	);
}
