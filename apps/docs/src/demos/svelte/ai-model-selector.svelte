<script lang="ts">
	import {
		ModelSelector,
		ModelSelectorContent,
		ModelSelectorEmpty,
		ModelSelectorGroup,
		ModelSelectorInput,
		ModelSelectorItem,
		ModelSelectorList,
		ModelSelectorLogo,
		ModelSelectorName,
		ModelSelectorShortcut,
		ModelSelectorTrigger,
	} from "@edmi-svelte/ai/model-selector";
	import { Button } from "@edmi-svelte/ui/button";

	const models = [
		{ provider: "anthropic", label: "Anthropic", items: ["Claude Opus", "Claude Sonnet"] },
		{ provider: "openai", label: "OpenAI", items: ["GPT-5"] },
		{ provider: "google", label: "Google", items: ["Gemini 2.5 Pro"] },
	];

	let selected = $state("Claude Opus");
	let open = $state(false);
	const current = $derived(models.find((g) => g.items.includes(selected)));

	// Running ⌘1..⌘n shortcut index across groups.
	const shortcut = (provider: string, item: string) => {
		let n = 0;
		for (const g of models) {
			for (const i of g.items) {
				n++;
				if (g.provider === provider && i === item) return `⌘${n}`;
			}
		}
		return "";
	};

	function pick(item: string) {
		selected = item;
		open = false;
	}
</script>

<ModelSelector bind:open>
	<ModelSelectorTrigger>
		{#snippet child({ props })}
			<Button variant="outline" {...props}>
				{#if current}<ModelSelectorLogo provider={current.provider} />{/if}
				<ModelSelectorName>{selected}</ModelSelectorName>
			</Button>
		{/snippet}
	</ModelSelectorTrigger>
	<ModelSelectorContent>
		<ModelSelectorInput placeholder="Search models..." />
		<ModelSelectorList>
			<ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
			{#each models as group (group.provider)}
				<ModelSelectorGroup heading={group.label}>
					{#each group.items as item (item)}
						<ModelSelectorItem value={item} onSelect={() => pick(item)}>
							<ModelSelectorLogo provider={group.provider} />
							<ModelSelectorName>{item}</ModelSelectorName>
							<ModelSelectorShortcut>{shortcut(group.provider, item)}</ModelSelectorShortcut>
						</ModelSelectorItem>
					{/each}
				</ModelSelectorGroup>
			{/each}
		</ModelSelectorList>
	</ModelSelectorContent>
</ModelSelector>
