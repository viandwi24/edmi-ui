<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLInputAttributes } from "svelte/elements";
	import { untrack } from "svelte";
	import {
		type QuestionnaireInputType,
		getAnswerKeyShortcuts,
		getQuestionnaireItemContext,
		getQuestionnaireRootContext,
		hasInputValue,
	} from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		/** Fills the answer on mount and after a native form reset. */
		defaultValue = undefined,
		disabled: disabledProp = false,
		/** Controlled value. Use with `bind:value`. */
		value: valueProp = $bindable(undefined),
		type = "text",
		oninput,
		...restProps
	}: Omit<
		WithElementRef<HTMLInputAttributes, HTMLInputElement>,
		"type" | "form" | "name" | "disabled"
	> & {
		disabled?: boolean;
		defaultValue?: string | number;
		type?: QuestionnaireInputType;
	} = $props();

	const item = getQuestionnaireItemContext();
	const root = getQuestionnaireRootContext();
	const answerId = $props.id();
	const initialDefaultFilled = untrack(() => hasInputValue(defaultValue));
	let uncontrolledValue = $state(untrack(() => String(defaultValue ?? "")));

	const controlled = $derived(valueProp !== undefined);
	const defaultFilled = $derived(hasInputValue(defaultValue));
	const disabled = $derived(item.disabled || disabledProp);
	const value = $derived(controlled ? String(valueProp ?? "") : uncontrolledValue);
	const filled = $derived(hasInputValue(value));
	const selected = $derived(item.selectedAnswerIds.includes(answerId));

	function handleInput(event: Event & { currentTarget: EventTarget & HTMLInputElement }) {
		const nextValue = event.currentTarget.value;
		oninput?.(event);
		if (controlled) valueProp = nextValue;
		else uncontrolledValue = nextValue;
		item.setAnswerSelectionFromInteraction(answerId, hasInputValue(nextValue));
	}

	$effect(() => item.registerAnswerSelection(answerId, initialDefaultFilled));

	$effect(() => {
		const element = ref;
		if (!element) return;
		return item.registerAnswerControl({
			disabled,
			element,
			id: answerId,
			ownDisabled: disabledProp,
			type: "input",
			value: "",
		});
	});

	$effect(() => {
		item.setAnswerDefault(answerId, defaultFilled);
	});

	// A host update clears the skipped state even when the answer stays filled.
	$effect(() => {
		void value;
		if (controlled) item.syncControlledAnswerSelection(answerId, filled);
	});

	$effect(() => {
		void item.resetVersion;
		untrack(() => {
			if (!controlled) uncontrolledValue = String(defaultValue ?? "");
		});
	});

	$effect(() => {
		if (!ref) return;
		// A native form reset restores `defaultValue`, so keep it in sync with the value we own.
		ref.defaultValue = String((controlled ? valueProp : defaultValue) ?? "");
	});
</script>

<div
	data-slot="questionnaire-input-wrapper"
	class="group/questionnaire-input relative w-full min-w-0"
>
	<input
		bind:this={ref}
		id={answerId}
		data-slot="questionnaire-input"
		aria-invalid={item.invalid || undefined}
		aria-keyshortcuts={getAnswerKeyShortcuts(null, !disabled && filled && selected)}
		data-disabled={disabled ? "" : undefined}
		data-empty={filled ? undefined : ""}
		data-filled={filled ? "" : undefined}
		data-invalid={item.invalid ? "" : undefined}
		{disabled}
		form={selected ? undefined : ""}
		name={selected ? item.name : undefined}
		{type}
		{value}
		class={cn(
			"h-12 w-full min-w-0 rounded-xl border border-border bg-card px-3.5 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:shadow-[0_0_0_1px_var(--ring)] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive",
			"placeholder:text-muted-foreground",
			root.raised && "border-b-lip shadow-card focus-visible:border-b-ring",
			className
		)}
		oninput={handleInput}
		{...restProps}
	/>
</div>
