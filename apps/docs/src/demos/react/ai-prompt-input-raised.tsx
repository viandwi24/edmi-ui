import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";

export default function Demo() {
	return (
		<PromptInput raised onSubmit={() => {}} className="max-w-xl">
			<PromptInputBody>
				<PromptInputTextarea defaultValue="Rebalance MAG4" />
			</PromptInputBody>
			<PromptInputFooter>
				<PromptInputTools />
				<PromptInputSubmit status="ready" />
			</PromptInputFooter>
		</PromptInput>
	);
}
