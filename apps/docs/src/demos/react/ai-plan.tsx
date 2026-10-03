import {
	Plan,
	PlanAction,
	PlanContent,
	PlanDescription,
	PlanFooter,
	PlanHeader,
	PlanTitle,
	PlanTrigger,
} from "@edmi-react/components/ai/plan";
import { Button } from "@edmi-react/ui/button";

const steps = [
	"1. Quote all four legs on Jupiter",
	"2. Ask for approval",
	"3. Send one transaction and verify weights",
];

function Example({ streaming }: { streaming?: boolean }) {
	return (
		<Plan isStreaming={streaming} defaultOpen className="w-full max-w-md">
			<PlanHeader>
				<div>
					<PlanTitle>{streaming ? "Planning…" : "Rebalance MAG4"}</PlanTitle>
					<PlanDescription>3 steps · about 1 minute</PlanDescription>
				</div>
				<PlanAction>
					<PlanTrigger />
				</PlanAction>
			</PlanHeader>
			<PlanContent>
				{steps.map((s) => (
					<p key={s}>{s}</p>
				))}
			</PlanContent>
			<PlanFooter>
				<Button size="sm">Start</Button>
				<Button size="sm" variant="ghost">
					Edit plan
				</Button>
			</PlanFooter>
		</Plan>
	);
}

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<Example />
			<Example streaming />
		</div>
	);
}
