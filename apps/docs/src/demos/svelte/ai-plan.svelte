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

	const steps = [
		"1. Quote all four legs on Jupiter",
		"2. Ask for approval",
		"3. Send one transaction and verify weights",
	];
</script>

<div class="flex flex-col gap-4">
	{#each [false, true] as streaming (streaming)}
		<Plan isStreaming={streaming} open class="w-full max-w-md">
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
				{#each steps as s (s)}
					<p>{s}</p>
				{/each}
			</PlanContent>
			<PlanFooter>
				<Button size="sm">Start</Button>
				<Button size="sm" variant="ghost">Edit plan</Button>
			</PlanFooter>
		</Plan>
	{/each}
</div>
