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
</script>

<ChatComposer
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
