<script lang="ts">
	import * as Questionnaire from "@edmi-svelte/ui/questionnaire";

	const items = [{ name: "rebalance", choices: [{ value: "drift" }, { value: "schedule" }, { value: "sign" }] }];

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
	}

	const levels = [
		{ value: "sunken", label: "Sunken (-1)" } as const,
		{ value: "flat", label: "Flat (0)" } as const,
		{ value: "raised", label: "Raised (+1)" } as const,
		{ value: "floating", label: "Floating (+2)" } as const,
	];
</script>

<div class="flex flex-col gap-6">
	{#each levels as l (l.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{l.label}</p>
<div class="grid w-full max-w-3xl gap-5 md:grid-cols-2">
		<Questionnaire.Root
			{items}
			elevation={l.value}
			shortcuts="letters"
			class="rounded-2xl border border-border bg-card p-5"
			{onsubmit}
		>
			<Questionnaire.Item name="rebalance" required>
				<Questionnaire.Title>How should the index rebalance?</Questionnaire.Title>
				<Questionnaire.Choices>
					<Questionnaire.Choice value="drift">On drift</Questionnaire.Choice>
					<Questionnaire.Choice value="schedule">On a schedule</Questionnaire.Choice>
					<Questionnaire.Choice value="sign">When I sign</Questionnaire.Choice>
				</Questionnaire.Choices>
				<Questionnaire.Input placeholder="Other…" />
			</Questionnaire.Item>
		</Questionnaire.Root>
</div>
		</div>
	{/each}
</div>
