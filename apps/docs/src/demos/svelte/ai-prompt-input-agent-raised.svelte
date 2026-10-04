<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";
	import { PromptInputAgent } from "@edmi-svelte/ai/prompt-input-agent";

	const levels = [{ value: "sunken", label: "Sunken (-1)" }, { value: "flat", label: "Flat (0)" }, { value: "raised", label: "Raised (+1)" }, { value: "floating", label: "Floating (+2)" }] as const;
</script>

<div class="flex w-full max-w-2xl flex-col gap-5">
	{#each levels as level (level.value)}
		<div class="flex flex-col gap-2">
			<p class="text-xs font-medium text-muted-foreground">{level.label}</p>
			<PromptInput elevation={level.value} class="max-w-xl [&_[data-slot=input-group]]:bg-muted" onSubmit={() => {}}>
				<PromptInputHeader>
					<PromptInputAgent agent={{ id: "keeper", name: "Keeper", color: "chart-3" }} />
				</PromptInputHeader>
				<PromptInputBody>
					<PromptInputTextarea class="min-h-14" placeholder="Ask Keeper anything about your index…" />
				</PromptInputBody>
				<PromptInputFooter>
					<PromptInputTools />
					<PromptInputSubmit size="icon-sm" variant="secondary" />
				</PromptInputFooter>
			</PromptInput>
		</div>
	{/each}
</div>
