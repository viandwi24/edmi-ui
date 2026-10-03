import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";
import {
	PromptInputAgent,
	PromptInputAgentMentions,
	type PromptInputAgentOption,
	useAgentMention,
} from "@edmi-react/components/ai/prompt-input-agent";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const agents: PromptInputAgentOption[] = [
	{ id: "keeper", name: "Keeper", scope: "trading", color: "chart-3" },
	{ id: "writer", name: "Writer", scope: "feed", color: "chart-4" },
	{ id: "analyst", name: "Analyst", scope: "research", color: "chart-2" },
];

export default function Demo({ raised = false }: { raised?: boolean }) {
	const [agent, setAgent] = useState(agents[0] as PromptInputAgentOption);
	const [value, setValue] = useState("@");
	const mention = useAgentMention({
		agents,
		value,
		onValueChange: setValue,
		onAgentSelect: setAgent,
	});

	return (
		<div className="w-full max-w-xl pt-36">
			<div className="relative">
				{mention.open && <PromptInputAgentMentions {...mention.mentions} />}
				<PromptInput
					raised={raised}
					onSubmit={() => setValue("")}
					className="[&_[data-slot=input-group]]:bg-muted"
				>
					<PromptInputHeader>
						<PromptInputAgent agent={agent} />
					</PromptInputHeader>
					<PromptInputBody>
						<PromptInputTextarea
							value={value}
							onChange={(e) => setValue(e.currentTarget.value)}
							onKeyDown={mention.onKeyDown}
							placeholder={`Ask ${agent.name} anything about your index… (type @ to switch)`}
							className="min-h-20"
						/>
					</PromptInputBody>
					<PromptInputFooter>
						<PromptInputTools>
							<Button
								aria-label="Attach"
								size="icon-sm"
								type="button"
								variant="ghost"
							>
								<IconPlaceholder
									lucide="PlusIcon"
									tabler="IconPlus"
									hugeicons="Add01Icon"
									phosphor="PlusIcon"
									remixicon="RiAddLine"
									className="size-4"
								/>
							</Button>
						</PromptInputTools>
						<PromptInputSubmit
							size="icon-sm"
							className="size-10"
							variant="secondary"
							disabled={!value}
						/>
					</PromptInputFooter>
				</PromptInput>
			</div>
		</div>
	);
}
