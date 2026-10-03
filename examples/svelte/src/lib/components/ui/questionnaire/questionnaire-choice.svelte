<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLLabelAttributes } from "svelte/elements";
	import CheckIcon from 'phosphor-svelte/lib/Check';
	import { untrack, type Snippet } from "svelte";
	import {
		type AnswerControlRegistration,
		getAnswerKeyShortcuts,
		getQuestionnaireItemContext,
		getQuestionnaireRootContext,
	} from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		/** Controlled checked state. Use with `bind:checked`. */
		checked: checkedProp = $bindable(undefined),
		/** Checks the choice on mount and after a native form reset. */
		defaultChecked = false,
		disabled: disabledProp = false,
		/** Submitted as the answer of the parent item. */
		value,
		/** ✦ opt-in one-step 3D look; defaults to the Questionnaire `raised`. */
		raised: raisedProp = undefined,
		onchange,
		children,
		...restProps
	}: Omit<WithElementRef<HTMLLabelAttributes, HTMLLabelElement>, "children" | "onchange"> & {
		checked?: boolean;
		defaultChecked?: boolean;
		disabled?: boolean;
		value: string;
		raised?: boolean;
		onchange?: (event: Event) => void;
		children?: Snippet<
			[{ checked: boolean; disabled: boolean; shortcut: string | null; type: "checkbox" | "radio" }]
		>;
	} = $props();

	const item = getQuestionnaireItemContext();
	const root = getQuestionnaireRootContext();
	const raised = $derived(raisedProp ?? root.raised);
	const answerId = $props.id();
	let inputElement = $state<HTMLInputElement | null>(null);
	const initialDefaultChecked = untrack(() => defaultChecked);

	const controlled = $derived(checkedProp !== undefined);
	const disabled = $derived(item.disabled || disabledProp);
	const selected = $derived(item.selectedAnswerIds.includes(answerId));
	const checked = $derived.by(() => {
		if (!controlled) return selected;
		// A skipped item clears every answer, including controlled ones.
		return item.status === "skipped" ? false : checkedProp!;
	});
	const type = $derived(item.multiple ? "checkbox" : "radio");
	const shortcut = $derived(
		item.shortcutByChoiceValue?.get(value) ?? item.shortcutByAnswerId.get(answerId) ?? null
	);

	function syncCheckedElement() {
		if (inputElement && inputElement.checked !== checked) inputElement.checked = checked;
	}

	function handleChange(event: Event) {
		onchange?.(event);
		if (event.defaultPrevented) {
			syncCheckedElement();
			return;
		}
		const nextChecked = (event.target as HTMLInputElement).checked;
		if (!controlled) {
			item.setAnswerSelectionFromInteraction(answerId, nextChecked);
			checkedProp = undefined;
			return;
		}
		checkedProp = nextChecked;
		item.setAnswerSelectionFromInteraction(answerId, nextChecked);
		// Checking a radio clears its siblings, so the whole group re-syncs.
		item.requestControlSync();
	}

	$effect(() => item.registerAnswerSelection(answerId, initialDefaultChecked));

	$effect(() => {
		const element = inputElement;
		if (!element) return;
		return item.registerAnswerControl({
			disabled,
			element,
			id: answerId,
			ownDisabled: disabledProp,
			type: "choice",
			value,
		} satisfies AnswerControlRegistration);
	});

	$effect(() => {
		item.setAnswerDefault(answerId, defaultChecked);
	});

	$effect(() => {
		void item.resetVersion;
		if (controlled) item.syncControlledAnswerSelection(answerId, checkedProp!);
	});

	$effect(() => {
		void item.controlSyncVersion;
		syncCheckedElement();
	});

	$effect(() => {
		if (!inputElement) return;
		// Keep the native reset target aligned with the questionnaire owned default.
		inputElement.defaultChecked = controlled ? checkedProp! : defaultChecked;
		void checked;
		syncCheckedElement();
	});
</script>

<label
	bind:this={ref}
	data-slot="questionnaire-choice"
	data-checked={checked ? "" : undefined}
	data-disabled={disabled ? "" : undefined}
	data-invalid={item.invalid ? "" : undefined}
	data-shortcut={shortcut ?? undefined}
	data-type={type}
	data-unchecked={checked ? undefined : ""}
	class={cn(
		"group/questionnaire-choice relative flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-border bg-card px-3.5 py-2 text-start text-sm transition-colors outline-none select-none hover:bg-accent has-[>input:focus-visible]:outline-2 has-[>input:focus-visible]:outline-offset-2 has-[>input:focus-visible]:outline-ring data-[invalid]:border-destructive data-[checked]:border-ring data-[checked]:bg-[color-mix(in_srgb,var(--brand)_5%,var(--card))] data-[checked]:shadow-[0_0_0_1px_var(--ring)]",
		raised && "border-b-lip shadow-card data-[checked]:border-b-ring",
		"data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
		className
	)}
	{...restProps}
>
	<input
		id={answerId}
		bind:this={inputElement}
		data-slot="questionnaire-choice-input"
		class="absolute inset-0 z-10 size-full cursor-pointer opacity-0"
		aria-invalid={item.invalid || undefined}
		aria-keyshortcuts={getAnswerKeyShortcuts(shortcut, !disabled && checked)}
		{checked}
		data-checked={checked ? "" : undefined}
		data-unchecked={checked ? undefined : ""}
		{disabled}
		name={item.status === "skipped" ? undefined : item.name}
		required={item.required && !item.multiple && !item.hasInputAnswer}
		{type}
		{value}
		onchange={handleChange}
	/>
	{#if shortcut}
		<span
			aria-hidden="true"
			data-slot="questionnaire-choice-shortcut"
			class="pointer-events-none hidden size-5 shrink-0 items-center justify-center rounded-md border border-input bg-card font-mono text-[10.5px] leading-none font-medium text-muted-foreground group-data-[shortcut]/questionnaire-choice:inline-flex group-data-[checked]/questionnaire-choice:border-brand group-data-[checked]/questionnaire-choice:bg-brand group-data-[checked]/questionnaire-choice:text-brand-foreground"
		>
			{shortcut}
		</span>
	{/if}
	<span
		data-slot="questionnaire-choice-label"
		class="flex min-w-0 flex-1 flex-col gap-0.5 text-sm leading-snug"
	>
		{@render children?.({ checked, disabled, shortcut, type })}
	</span>
	<span
		aria-hidden="true"
		data-slot="questionnaire-choice-indicator"
		class="pointer-events-none relative flex size-4 shrink-0 items-center justify-center text-foreground group-data-[type=checkbox]/questionnaire-choice:size-[18px] group-data-[type=checkbox]/questionnaire-choice:rounded-[5px] group-data-[type=checkbox]/questionnaire-choice:border group-data-[type=checkbox]/questionnaire-choice:border-input group-data-[type=checkbox]/questionnaire-choice:bg-card group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:border-primary group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:bg-primary group-data-[type=checkbox]/questionnaire-choice:group-data-[checked]/questionnaire-choice:text-primary-foreground"
	>
		<CheckIcon data-slot="questionnaire-choice-indicator-check" class="hidden size-3.5 group-data-[checked]/questionnaire-choice:block" />
	</span>
</label>
