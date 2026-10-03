<script lang="ts">
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { Button } from "$lib/registry/ui/button/index.js";
	import * as DropdownMenu from "$lib/registry/ui/dropdown-menu/index.js";
	import { cn } from "$lib/utils.js";
	import type { ChatStatus } from "ai";
	import type { ComponentProps } from "svelte";
	import {
		PromptInput,
		PromptInputBody,
		PromptInputSubmit,
		PromptInputTextarea,
	} from "../prompt-input/index.js";
	import type { ChatComposerOption } from "./types.js";

	let {
		class: className,
		placeholder = "Reply",
		status,
		onStop,
		onAttach,
		onSpeech,
		disclaimer,
		models,
		model = $bindable(),
		defaultModel,
		efforts,
		effort = $bindable(),
		defaultEffort,
		modes,
		mode = $bindable(),
		defaultMode,
		...restProps
	}: Omit<ComponentProps<typeof PromptInput>, "children"> & {
		placeholder?: string;
		status?: ChatStatus;
		onStop?: () => void;
		/** Plus button in the footer; omit to hide it. */
		onAttach?: () => void;
		/** Mic button in the footer (speech input); omit to hide it. */
		onSpeech?: () => void;
		/** Small print centered in the footer. */
		disclaimer?: string;
		models?: ChatComposerOption[];
		/** `bind:model`; use `defaultModel` for uncontrolled. */
		model?: string;
		defaultModel?: string;
		efforts?: ChatComposerOption[];
		effort?: string;
		defaultEffort?: string;
		modes?: ChatComposerOption[];
		mode?: string;
		defaultMode?: string;
	} = $props();

	// Uncontrolled values start from the defaults (or the first option).
	$effect.pre(() => {
		model ??= defaultModel ?? models?.[0]?.id;
		effort ??= defaultEffort ?? efforts?.[0]?.id;
		mode ??= defaultMode ?? modes?.[0]?.id;
	});

	const labelOf = (options: ChatComposerOption[] | undefined, id?: string) =>
		options?.find((o) => o.id === id)?.label;
	const ready = $derived(status === undefined || status === "ready");
</script>

<!-- Prompt input with the quiet footer outside the field: attach, speech, disclaimer, model + effort, mode. -->
<div data-slot="ai-chat-composer" class={cn("flex w-full flex-col", className)}>
	<PromptInput {...restProps}>
		<PromptInputBody>
			<div class="flex w-full items-center pr-2">
				<PromptInputTextarea {placeholder} rows={1} class="min-h-12 px-4 py-3 text-[14.5px]" />
				<PromptInputSubmit
					{status}
					{onStop}
					variant={ready ? "ghost" : undefined}
					class={ready ? "text-muted-foreground" : undefined}
				>
					{#if ready}
						<span aria-hidden="true">↵</span>
					{/if}
				</PromptInputSubmit>
			</div>
		</PromptInputBody>
	</PromptInput>
	<div
		data-slot="ai-chat-composer-footer"
		class="flex items-center gap-0.5 px-1.5 pt-2 text-xs"
	>
		{#if onAttach}
			<Button aria-label="Attach" onclick={onAttach} size="icon-xs" type="button" variant="ghost">
				<IconPlaceholder
					lucide="PlusIcon"
					tabler="IconPlus"
					hugeicons="Add01Icon"
					phosphor="PlusIcon"
					remixicon="RiAddLine"
					class="size-4"
				/>
			</Button>
		{/if}
		{#if onSpeech}
			<Button
				aria-label="Speech input"
				onclick={onSpeech}
				size="xs"
				type="button"
				variant="ghost"
				class="gap-0.5"
			>
				<IconPlaceholder
					lucide="MicIcon"
					tabler="IconMicrophone"
					hugeicons="VoiceIcon"
					phosphor="MicrophoneIcon"
					remixicon="RiMicLine"
					class="size-4"
				/>
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					class="size-3"
				/>
			</Button>
		{/if}
		<span class="min-w-0 flex-1 truncate text-center text-muted-foreground">{disclaimer}</span>
		{#if models && models.length > 0}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} size="xs" type="button" variant="ghost" class="gap-[5px] font-medium">
							{labelOf(models, model)}
							{#if efforts}
								<span class="font-normal text-muted-foreground">{labelOf(efforts, effort)}</span>
							{/if}
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" side="top">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Model</DropdownMenu.Label>
						<DropdownMenu.RadioGroup bind:value={model}>
							{#each models as m (m.id)}
								<DropdownMenu.RadioItem value={m.id}>{m.label}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
					{#if efforts && efforts.length > 0}
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Label>Effort</DropdownMenu.Label>
							<DropdownMenu.RadioGroup bind:value={effort}>
								{#each efforts as e (e.id)}
									<DropdownMenu.RadioItem value={e.id}>{e.label}</DropdownMenu.RadioItem>
								{/each}
							</DropdownMenu.RadioGroup>
						</DropdownMenu.Group>
					{/if}
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
		{#if modes && modes.length > 0}
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					{#snippet child({ props })}
						<Button {...props} size="xs" type="button" variant="ghost" class="text-muted-foreground">
							{labelOf(modes, mode)}
						</Button>
					{/snippet}
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end" side="top">
					<DropdownMenu.Group>
						<DropdownMenu.Label>Mode</DropdownMenu.Label>
						<DropdownMenu.RadioGroup bind:value={mode}>
							{#each modes as m (m.id)}
								<DropdownMenu.RadioItem value={m.id}>{m.label}</DropdownMenu.RadioItem>
							{/each}
						</DropdownMenu.RadioGroup>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		{/if}
	</div>
</div>
