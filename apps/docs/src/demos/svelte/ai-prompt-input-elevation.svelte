<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<PromptInput elevation={level.value} initialInput="Rebalance MAG4" class="max-w-xl" onSubmit={() => {}}>
				<PromptInputBody>
					<PromptInputTextarea />
				</PromptInputBody>
				<PromptInputFooter>
					<PromptInputTools />
					<PromptInputSubmit status="ready" />
				</PromptInputFooter>
			</PromptInput>
		</div>
	{/each}
</div>
