import {
	ModelSelector,
	ModelSelectorContent,
	ModelSelectorEmpty,
	ModelSelectorGroup,
	ModelSelectorInput,
	ModelSelectorItem,
	ModelSelectorList,
	ModelSelectorLogo,
	ModelSelectorName,
	ModelSelectorShortcut,
	ModelSelectorTrigger,
} from "@edmi-react/components/ai/model-selector";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";

const models = [
	{
		provider: "anthropic",
		label: "Anthropic",
		items: ["Claude Opus", "Claude Sonnet"],
	},
	{ provider: "openai", label: "OpenAI", items: ["GPT-5"] },
	{ provider: "google", label: "Google", items: ["Gemini 2.5 Pro"] },
];

export default function Demo() {
	const [selected, setSelected] = useState("Claude Opus");
	const [open, setOpen] = useState(false);
	const current = models.find((g) => g.items.includes(selected));
	let n = 0;
	return (
		<ModelSelector open={open} onOpenChange={setOpen}>
			<ModelSelectorTrigger render={<Button variant="outline" />}>
				{current && <ModelSelectorLogo provider={current.provider} />}
				<ModelSelectorName>{selected}</ModelSelectorName>
			</ModelSelectorTrigger>
			<ModelSelectorContent>
				<ModelSelectorInput placeholder="Search models..." />
				<ModelSelectorList>
					<ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
					{models.map((group) => (
						<ModelSelectorGroup key={group.provider} heading={group.label}>
							{group.items.map((item) => (
								<ModelSelectorItem
									key={item}
									value={item}
									onSelect={() => {
										setSelected(item);
										setOpen(false);
									}}
								>
									<ModelSelectorLogo provider={group.provider} />
									<ModelSelectorName>{item}</ModelSelectorName>
									<ModelSelectorShortcut>{`⌘${++n}`}</ModelSelectorShortcut>
								</ModelSelectorItem>
							))}
						</ModelSelectorGroup>
					))}
				</ModelSelectorList>
			</ModelSelectorContent>
		</ModelSelector>
	);
}
