<script lang="ts">
	import {
		Plan,
		PlanAction,
		PlanContent,
		PlanDescription,
		PlanFooter,
		PlanHeader,
		PlanTitle,
		PlanTrigger,
	} from "@edmi-svelte/ai/plan";
	import { Button } from "@edmi-svelte/ui/button";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<Plan elevation={level.value} open class="w-full max-w-md">
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
				</PlanContent>
				<PlanFooter>
					<Button size="sm">Start</Button>
					<Button size="sm" variant="ghost">Edit plan</Button>
				</PlanFooter>
			</Plan>
		</div>
	{/each}
</div>
