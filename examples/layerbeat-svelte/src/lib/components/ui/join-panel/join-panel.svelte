<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type JoinPanelRow = { label: string; value: string | number };
</script>

<script lang="ts">
	import { Button } from "#lib/components/ui/button/index.js";
	import { Card } from "#lib/components/ui/card/index.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
	} from "#lib/components/ui/input-group/index.js";
	import { cn } from "#lib/utils.js";
	import type { ComponentProps } from "svelte";

	let {
		ref = $bindable(null),
		class: className,
		label = "Amount",
		currency = "USDC",
		amount = $bindable(""),
		onAmountChange,
		onMax,
		rows = [],
		joinLabel = "Join",
		onJoin,
		disabled,
		raised = false,
		...restProps
	}: Omit<ComponentProps<typeof Card>, "children" | "size"> & {
		label?: string;
		currency?: string;
		/** Two-way bindable (`bind:amount`). */
		amount?: string;
		onAmountChange?: (value: string) => void;
		onMax?: () => void;
		/** Summary rows (estimated shares, fee, …). Values render mono. */
		rows?: JoinPanelRow[];
		joinLabel?: string | Snippet;
		onJoin?: () => void;
		disabled?: boolean;
		/** ✦ opt-in one-step 3D look; forwarded to the Card and the Join button. */
		raised?: boolean;
	} = $props();

	const id = $props.id();
</script>

<!-- Amount field (mono, Max button, currency) + summary rows + one big action. -->
<Card bind:ref data-slot="join-panel" size="sm" {raised} class={cn("w-80 gap-0", className)} {...restProps}>
	<label for={id} class="px-(--card-spacing) text-xs text-muted-foreground">
		{label} ({currency})
	</label>
	<div class="px-(--card-spacing)">
		<InputGroup class="mt-2 h-11">
			<InputGroupInput
				{id}
				inputmode="decimal"
				autocomplete="off"
				bind:value={amount}
				oninput={() => onAmountChange?.(amount)}
				class="font-mono text-[17px]"
			/>
			<InputGroupAddon align="inline-end">
				<InputGroupButton variant="secondary" onclick={onMax}>Max</InputGroupButton>
				<InputGroupText class="bg-transparent px-1.5 text-xs">{currency}</InputGroupText>
			</InputGroupAddon>
		</InputGroup>
	</div>
	{#each rows as r, i (i)}
		<div class={cn("flex items-center justify-between px-(--card-spacing) text-[13px]", i === 0 ? "mt-3" : "mt-1.5")}>
			<span class="text-muted-foreground">{r.label}</span>
			<span class="font-mono">{r.value}</span>
		</div>
	{/each}
	<div class="mt-3.5 px-(--card-spacing)">
		<Button size="lg" {raised} class="w-full" onclick={onJoin} {disabled}>
			{#if typeof joinLabel === "function"}{@render joinLabel()}{:else}{joinLabel}{/if}
		</Button>
	</div>
</Card>
