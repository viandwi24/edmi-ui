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

export default function Demo() {
	return (
		<Plan raised defaultOpen className="w-full max-w-md">
			<PlanHeader>
				<div>
					<PlanTitle>Rebalance MAG4</PlanTitle>
					<PlanDescription>3 steps · about 1 minute</PlanDescription>
				</div>
				<PlanAction>
					<PlanTrigger />
				</PlanAction>
			</PlanHeader>
			<PlanContent>
				<p>1. Quote all four legs on Jupiter</p>
				<p>2. Ask for approval</p>
				<p>3. Send one transaction and verify weights</p>
			</PlanContent>
			<PlanFooter>
				<Button raised size="sm">
					Start
				</Button>
				<Button size="sm" variant="ghost">
					Edit plan
				</Button>
			</PlanFooter>
		</Plan>
	);
}
