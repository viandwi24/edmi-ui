<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		PromptInput,
		PromptInputBody,
		PromptInputController,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
		setPromptInput,
	} from "@edmi-svelte/ai/prompt-input";
	import {
		PromptInputAgent,
		PromptInputAgentMentions,
		type PromptInputAgentOption,
		useAgentMention,
	} from "@edmi-svelte/ai/prompt-input-agent";
	import { Button } from "@edmi-svelte/ui/button";

	const agents: PromptInputAgentOption[] = [
		{ id: "keeper", name: "Keeper", scope: "trading", color: "chart-3" },
		{ id: "writer", name: "Writer", scope: "feed", color: "chart-4" },
		{ id: "analyst", name: "Analyst", scope: "research", color: "chart-2" },
	];

	let agent = $state<PromptInputAgentOption>(agents[0] as PromptInputAgentOption);
	// Lift the composer state so the mention list can read the text.
	const controller = setPromptInput(new PromptInputController("@"));
	const mention = useAgentMention({
		agents,
		value: () => controller.textInput,
		onValueChange: controller.setTextInput,
		onAgentSelect: (a) => (agent = a),
	});
</script>

<div class="w-full max-w-xl pt-36">
	<div class="relative">
		{#if mention.open}
			<PromptInputAgentMentions
				agents={mention.items}
				activeIndex={mention.activeIndex}
				onSelect={mention.select}
			/>
		{/if}
		<PromptInput onSubmit={() => {}} class="[&_[data-slot=input-group]]:bg-muted">
			<PromptInputHeader>
				<PromptInputAgent {agent} />
			</PromptInputHeader>
			<PromptInputBody>
				<PromptInputTextarea
					placeholder="Ask {agent.name} anything about your index… (type @ to switch)"
					class="min-h-20"
					onkeydown={mention.onkeydown}
				/>
			</PromptInputBody>
			<PromptInputFooter>
				<PromptInputTools>
					<Button aria-label="Attach" size="icon-sm" type="button" variant="ghost">
						<IconPlaceholder
							lucide="PlusIcon"
							tabler="IconPlus"
							hugeicons="Add01Icon"
							phosphor="PlusIcon"
							remixicon="RiAddLine"
							class="size-4"
						/>
					</Button>
				</PromptInputTools>
				<PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
			</PromptInputFooter>
		</PromptInput>
	</div>
</div>
