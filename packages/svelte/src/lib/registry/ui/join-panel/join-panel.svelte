<script lang="ts" module>
	import type { Snippet } from "svelte";

	export type JoinPanelRow = { label: string; value: string | number };
	/** ✦ Quick-amount chip: sets the amount to `value`; without `value` it calls `onMax`. */
	export type JoinPanelQuickAmount = { label: string; value?: string };
	/** ✦ Mode tab, e.g. Join / Redeem. */
	export type JoinPanelTab = { value: string; label: string };
</script>

<script lang="ts">
	import { Button } from "$lib/registry/ui/button/index.js";
	import { Card } from "$lib/registry/ui/card/index.js";
	import {
		InputGroup,
		InputGroupAddon,
		InputGroupButton,
		InputGroupInput,
		InputGroupText,
	} from "$lib/registry/ui/input-group/index.js";
	import { Tabs, TabsList, TabsTrigger } from "$lib/registry/ui/tabs/index.js";
	import { cn } from "$lib/utils.js";
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
		tabs,
		tab = $bindable(),
		onTabChange,
		quickAmounts,
		footnote,
		amountSize = "default",
		maxLabel,
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
		/** ✦ Join / Redeem style mode tabs above the amount (the IndexDetail board). */
		tabs?: JoinPanelTab[];
		/** ✦ Two-way bindable tab value (`bind:tab`); defaults to the first tab. */
		tab?: string;
		onTabChange?: (value: string) => void;
		/** ✦ Chips under the amount field, e.g. `[{ label: "$10", value: "10" }, { label: "Max" }]`. */
		quickAmounts?: JoinPanelQuickAmount[];
		/** ✦ Small centred note under the action. */
		footnote?: string | Snippet;
		/** ✦ `lg`: taller field with a 26px mono amount (the IndexDetail board). */
		amountSize?: "default" | "lg";
		/** ✦ Plain muted text in the field (e.g. `Max 1,240`) instead of the Max button and currency. */
		maxLabel?: string;
		joinLabel?: string | Snippet;
		onJoin?: () => void;
		disabled?: boolean;
		/** ✦ opt-in one-step 3D look; forwarded to the Card and the Join button. */
		raised?: boolean;
	} = $props();

	const id = $props.id();

</script>

<!-- Amount field (mono, Max button, currency) + summary rows + one big action. -->
<Card bind:ref data-slot="join-panel" size="sm" elevation={raised ? "raised" : undefined} class={cn("w-80 gap-0", className)} {...restProps}>
	{#if tabs?.length}
		<div class="mb-5 px-(--card-spacing)">
			<Tabs
				value={tab ?? tabs[0].value}
				onValueChange={(v) => {
					tab = v;
					onTabChange?.(v);
				}}
			>
				<TabsList elevation={raised ? "raised" : undefined} class="w-full">
					{#each tabs as t (t.value)}
						<TabsTrigger value={t.value}>{t.label}</TabsTrigger>
					{/each}
				</TabsList>
			</Tabs>
		</div>
	{/if}
	<label for={id} class="px-(--card-spacing) text-xs text-muted-foreground">
		{label} ({currency})
	</label>
	<div class="px-(--card-spacing)">
		<InputGroup class={cn("mt-2", amountSize === "lg" ? "h-14" : "h-11")}>
			<InputGroupInput
				{id}
				inputmode="decimal"
				autocomplete="off"
				bind:value={amount}
				oninput={() => {
					// Digits, thousands separators and a decimal point only.
					amount = amount.replace(/[^\d.,]/g, "");
					onAmountChange?.(amount);
				}}
				class={cn("font-mono", amountSize === "lg" ? "text-[26px]" : "text-[17px]")}
			/>
			<InputGroupAddon align="inline-end">
				{#if maxLabel}
					<InputGroupText class="bg-transparent text-xs">{maxLabel}</InputGroupText>
				{:else}
					<InputGroupButton variant="secondary" onclick={onMax}>Max</InputGroupButton>
					<InputGroupText class="bg-transparent px-1.5 text-xs">{currency}</InputGroupText>
				{/if}
			</InputGroupAddon>
		</InputGroup>
	</div>
	{#if quickAmounts?.length}
		<div class="mt-3 flex gap-2 px-(--card-spacing)">
			{#each quickAmounts as q, i (i)}
				<Button
					type="button"
					variant="secondary"
					size="sm"
					elevation={raised ? "raised" : undefined}
					class="flex-1 font-mono"
					onclick={() => {
						if (q.value !== undefined) {
							amount = q.value;
							onAmountChange?.(q.value);
						} else onMax?.();
					}}
				>
					{q.label}
				</Button>
			{/each}
		</div>
	{/if}
	{#each rows as r, i (i)}
		<div class={cn("flex items-center justify-between px-(--card-spacing) text-[13px]", i === 0 ? "mt-3" : "mt-1.5")}>
			<span class="text-muted-foreground">{r.label}</span>
			<span class="font-mono">{r.value}</span>
		</div>
	{/each}
	<div class="mt-3.5 px-(--card-spacing)">
		<Button size="lg" elevation={raised ? "raised" : undefined} class="w-full" onclick={onJoin} {disabled}>
			{#if typeof joinLabel === "function"}{@render joinLabel()}{:else}{joinLabel}{/if}
		</Button>
	</div>
	{#if footnote}
		<div class="mt-3 px-(--card-spacing) text-center text-xs text-muted-foreground-2">
			{#if typeof footnote === "function"}{@render footnote()}{:else}{footnote}{/if}
		</div>
	{/if}
</Card>
