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
	import { Button } from "@edmi-svelte/ui/button";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";
	import * as Tooltip from "@edmi-svelte/ui/tooltip";
	import { atlasAgent, composerMenu, composerPlaceholder, plantHead } from "../data";
	import Icon from "./Icon.svelte";
	import Pixels from "./Pixels.svelte";

	let { onSend, onClear }: { onSend: (text: string) => void; onClear: () => void } = $props();
</script>

<div class="px-2 pb-2">
	<PromptInput
		onSubmit={(m) => {
			if (m.text.trim()) onSend(m.text.trim());
		}}
	>
		<PromptInputHeader>
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger>
						{#snippet child({ props })}
							<Button type="button" variant="outline" size="sm" {...props}>
								<Pixels w={plantHead.w} h={plantHead.h} rects={plantHead.rects} class="h-3 w-3.5" />
								{atlasAgent.name}
							</Button>
						{/snippet}
					</Tooltip.Trigger>
					<Tooltip.Content>Atlas agent</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</PromptInputHeader>
		<PromptInputBody>
			<PromptInputTextarea placeholder={composerPlaceholder} />
		</PromptInputBody>
		<PromptInputFooter>
			<PromptInputTools>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button type="button" variant="ghost" size="icon-xs" aria-label="Add" {...props}>
								<Icon name="plus" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" align="start" elevation="floating">
						{#each composerMenu as m (m.id)}
							<DropdownMenu.Item onSelect={() => m.id === "clear" && onClear()}>
								<Icon name={m.icon} />
								{m.label}
							</DropdownMenu.Item>
						{/each}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</PromptInputTools>
			<PromptInputSubmit size="icon-sm" variant="secondary" elevation="raised">
				<Icon name="arrowUp" />
			</PromptInputSubmit>
		</PromptInputFooter>
	</PromptInput>
</div>
