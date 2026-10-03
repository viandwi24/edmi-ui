<script lang="ts">
	import * as Questionnaire from "@edmi-svelte/ui/questionnaire";

	const items = [
		{ name: "rebalance", choices: [{ value: "drift" }, { value: "schedule" }, { value: "sign" }] },
		{ name: "notes" },
	];
	let done = $state<string | null>(null);

	function onsubmit(event: SubmitEvent) {
		event.preventDefault();
		const data = new FormData(event.currentTarget as HTMLFormElement);
		done = JSON.stringify(Object.fromEntries(data));
	}
</script>

<Questionnaire.Root
	{items}
	shortcuts="letters"
	class="w-full max-w-md rounded-2xl border border-border bg-card p-6"
	{onsubmit}
>
	<Questionnaire.Progress />
	<Questionnaire.Item name="rebalance" required>
		<Questionnaire.Title>How should the index rebalance?</Questionnaire.Title>
		<Questionnaire.Description>You can change this later in the mandate.</Questionnaire.Description>
		<Questionnaire.Choices>
			<Questionnaire.Choice value="drift">When any weight drifts past a limit</Questionnaire.Choice>
			<Questionnaire.Choice value="schedule">On a fixed schedule</Questionnaire.Choice>
			<Questionnaire.Choice value="sign">Only when I sign</Questionnaire.Choice>
		</Questionnaire.Choices>
	</Questionnaire.Item>
	<Questionnaire.Item name="notes">
		<Questionnaire.Title>Anything else?</Questionnaire.Title>
		<Questionnaire.Input placeholder="Something else…" />
	</Questionnaire.Item>
	<Questionnaire.Actions>
		<Questionnaire.Previous />
		<Questionnaire.Skip />
		<Questionnaire.Next />
		<Questionnaire.Submit />
	</Questionnaire.Actions>
	{#if done}
		<p class="font-mono text-xs text-muted-foreground">{done}</p>
	{/if}
</Questionnaire.Root>
