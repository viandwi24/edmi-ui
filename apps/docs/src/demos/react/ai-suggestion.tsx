import { Suggestion, Suggestions } from "@edmi-react/components/ai/suggestion";

const prompts = [
	"What moved NVDAx today?",
	"Compare MAG4 vs SPYx",
	"Explain the keeper",
	"Show my fees",
];

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-4">
			<Suggestions>
				{prompts.map((p) => (
					<Suggestion key={p} suggestion={p} onClick={() => {}} />
				))}
			</Suggestions>
			<div className="flex flex-wrap gap-2">
				<Suggestion suggestion="Rebalance now" variant="card">
					Check drift and propose trades
				</Suggestion>
				<Suggestion suggestion="Draft a post" variant="card">
					Write an update for the feed
				</Suggestion>
			</div>
		</div>
	);
}
