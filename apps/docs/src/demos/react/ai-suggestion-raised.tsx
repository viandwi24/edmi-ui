import { Suggestion } from "@edmi-react/components/ai/suggestion";

export default function Demo() {
	return (
		<div className="flex flex-wrap gap-2">
			<Suggestion suggestion="Rebalance now" raised />
			<Suggestion suggestion="Draft a post" raised />
			<Suggestion suggestion="Explain the keeper" variant="card" raised>
				How rebalancing works
			</Suggestion>
		</div>
	);
}
