<script lang="ts">
	import * as Questionnaire from "@edmi-svelte/ui/questionnaire";

	const items = [{ name: "rebalance", choices: [{ value: "drift" }, { value: "schedule" }, { value: "sign" }] }];

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
	}
</script>

<div class="grid w-full max-w-3xl gap-5 md:grid-cols-2">
	{#each [false, true] as raised (raised)}
		<Questionnaire.Root
			{items}
			{raised}
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
			</Questionnaire.Item>
		</Questionnaire.Root>
	{/each}
</div>
