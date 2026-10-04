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

export default function Demo() {
	return (
		<PromptInput
			raised
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
					className="min-h-20"
					placeholder="Ask Keeper anything about your index…"
				/>
			</PromptInputBody>
			<PromptInputFooter>
				<PromptInputTools />
				<PromptInputSubmit
					size="icon-sm"
					className="size-10"
					variant="secondary"
				/>
			</PromptInputFooter>
		</PromptInput>
	);
}
