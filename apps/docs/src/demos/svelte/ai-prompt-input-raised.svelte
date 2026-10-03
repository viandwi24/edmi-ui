<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";
</script>

<PromptInput raised initialInput="Rebalance MAG4" class="max-w-xl" onSubmit={() => {}}>
	<PromptInputBody>
		<PromptInputTextarea />
	</PromptInputBody>
	<PromptInputFooter>
		<PromptInputTools />
		<PromptInputSubmit status="ready" />
	</PromptInputFooter>
</PromptInput>
