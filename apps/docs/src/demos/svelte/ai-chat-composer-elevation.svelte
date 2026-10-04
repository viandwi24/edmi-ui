<script lang="ts">
	import { ChatComposer } from "@edmi-svelte/ai/chat-composer";

	const models = [
		{ id: "opus", label: "Opus" },
		{ id: "sonnet", label: "Sonnet" },
	];
	const efforts = [
		{ id: "low", label: "Low" },
		{ id: "medium", label: "Medium" },
		{ id: "high", label: "High" },
	];
	const modes = [
		{ id: "auto", label: "Auto" },
		{ id: "ask", label: "Ask first" },
	];

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<ChatComposer
				elevation={level.value}
				class="max-w-2xl"
				onSubmit={() => {}}
				onAttach={() => {}}
				onSpeech={() => {}}
				disclaimer="Edmi is AI and can make mistakes."
				{models}
				{efforts}
				defaultEffort="medium"
				{modes}
			/>
		</div>
	{/each}
</div>
