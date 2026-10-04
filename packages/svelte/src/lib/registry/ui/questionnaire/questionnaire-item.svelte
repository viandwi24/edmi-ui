<script lang="ts">
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLFieldsetAttributes } from "svelte/elements";
	import { untrack, type Snippet } from "svelte";
	import {
		type AnswerControlRegistration,
		type QuestionnaireItemStatus,
		compareDocumentOrder,
		getQuestionnaireRootContext,
		getShortcutByChoiceValue,
		getShortcutKeys,
		isAnswerFilled,
		isEmptyNavigableInput,
		isRadioTarget,
		isTextEntryTarget,
		setQuestionnaireItemContext,
	} from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		/** Excludes the item from the questionnaire without unmounting it. */
		disabled = false,
		/** Marks the item invalid from outside, for example after schema validation. */
		invalid: invalidProp = false,
		/** Renders choices as checkboxes and keeps every selected answer. */
		multiple = false,
		/** Submitted under this name, and used to activate the item. */
		name,
		/** Requires an answer before the questionnaire can continue. */
		required = false,
		onStatusChange = undefined,
		"aria-describedby": ariaDescribedBy = undefined,
		"aria-keyshortcuts": ariaKeyShortcuts = undefined,
		"aria-labelledby": ariaLabelledBy = undefined,
		children,
		...restProps
	}: Omit<
		WithElementRef<HTMLFieldsetAttributes, HTMLFieldSetElement>,
		"children" | "name" | "disabled"
	> & {
		disabled?: boolean;
		invalid?: boolean;
		multiple?: boolean;
		name: string;
		required?: boolean;
		onStatusChange?: (status: QuestionnaireItemStatus) => void;
		children?: Snippet<[{ active: boolean; invalid: boolean; status: QuestionnaireItemStatus }]>;
	} = $props();

	const root = getQuestionnaireRootContext();

	let answerControls = $state.raw<AnswerControlRegistration[]>([]);
	let selectedAnswerIds = $state.raw<string[]>([]);
	let validationAttempted = $state(false);
	let skipped = $state(false);
	let resetVersion = $state(0);
	let controlSyncVersion = $state(0);
	let descriptionIds = $state.raw<string[]>([]);
	let errorIds = $state.raw<string[]>([]);
	let titleIds = $state.raw<string[]>([]);
	let defaultSelectedAnswerIds: string[] = [];

	const active = $derived(!disabled && root.activeItemName === name);
	const orderedAnswerControls = $derived.by(() => {
		// Re-sort whenever answers are added to or removed from the DOM.
		void root.domVersion;
		return [...answerControls].sort((a, b) => compareDocumentOrder(a.element, b.element));
	});
	const answers = $derived(orderedAnswerControls.filter((answer) => !answer.disabled));
	const answered = $derived(answers.some((answer) => selectedAnswerIds.includes(answer.id)));
	const status = $derived<QuestionnaireItemStatus>(
		skipped ? "skipped" : answered ? "answered" : "unanswered"
	);
	const intentionallySkipped = $derived(status === "skipped" && !required);
	const valid = $derived(
		disabled || intentionallySkipped || (!invalidProp && status === "answered")
	);
	const invalid = $derived(
		!disabled && !intentionallySkipped && (invalidProp || (validationAttempted && !valid))
	);
	const hasInputAnswer = $derived(answers.some((answer) => answer.type === "input"));
	const itemDefinition = $derived(root.itemDefinitionByName?.get(name));
	const shortcutByChoiceValue = $derived(
		root.itemDefinitionByName ? getShortcutByChoiceValue(itemDefinition, root.shortcuts) : null
	);
	const shortcutByAnswerId = $derived.by(() => {
		// Choice values from `items` take precedence, so shortcuts stay stable.
		if (shortcutByChoiceValue) return new Map<string, string>();
		const keys = getShortcutKeys(root.shortcuts);
		return new Map(
			answers
				.filter((answer) => answer.type === "choice")
				.slice(0, keys.length)
				.flatMap((answer, index) => (keys[index] ? [[answer.id, keys[index]!] as const] : []))
		);
	});

	// Only set when the title does not render as the legend, which already names the fieldset.
	const labelledBy = $derived(
		[...titleIds, ariaLabelledBy].filter(Boolean).join(" ") || undefined
	);
	const describedBy = $derived(
		[...descriptionIds, ...(invalid ? errorIds : []), ariaDescribedBy]
			.filter(Boolean)
			.join(" ") || undefined
	);
	const keyShortcuts = $derived(
		[
			ariaKeyShortcuts,
			active ? "Meta+Enter Control+Enter" : undefined,
			active && answers.length ? "ArrowUp ArrowDown" : undefined,
			active && !root.first ? "ArrowLeft" : undefined,
			active && !root.last && status !== "unanswered" ? "ArrowRight" : undefined,
		]
			.filter(Boolean)
			.join(" ") || undefined
	);

	function updateAnswerSelected(answerId: string, selected: boolean) {
		return untrack(() => {
			if (!selected) {
				selectedAnswerIds = selectedAnswerIds.filter((c) => c !== answerId);
				return;
			}
			if (!multiple) {
				selectedAnswerIds = [answerId];
				return;
			}
			if (!selectedAnswerIds.includes(answerId)) {
				selectedAnswerIds = [...selectedAnswerIds, answerId];
			}
		});
	}

	function setAnswerSelectionFromInteraction(answerId: string, selected: boolean) {
		skipped = false;
		updateAnswerSelected(answerId, selected);
	}

	function syncControlledAnswerSelection(answerId: string, selected: boolean) {
		if (selected) skipped = false;
		updateAnswerSelected(answerId, selected);
	}

	function registerAnswerSelection(answerId: string, defaultSelected: boolean) {
		return untrack(() => {
			if (defaultSelected) {
				defaultSelectedAnswerIds = [
					...defaultSelectedAnswerIds.filter((c) => c !== answerId),
					answerId,
				];
				if (!multiple) {
					if (!selectedAnswerIds.length) selectedAnswerIds = [answerId];
				} else if (!selectedAnswerIds.includes(answerId)) {
					selectedAnswerIds = [...selectedAnswerIds, answerId];
				}
			}
			return () => {
				defaultSelectedAnswerIds = defaultSelectedAnswerIds.filter((c) => c !== answerId);
				selectedAnswerIds = selectedAnswerIds.filter((c) => c !== answerId);
			};
		});
	}

	function setAnswerDefault(answerId: string, defaultSelected: boolean) {
		return untrack(() => {
			if (defaultSelected) {
				if (!defaultSelectedAnswerIds.includes(answerId)) {
					defaultSelectedAnswerIds = [...defaultSelectedAnswerIds, answerId];
				}
				return;
			}
			defaultSelectedAnswerIds = defaultSelectedAnswerIds.filter((c) => c !== answerId);
		});
	}

	/** Selecting a choice clears the native checked state of its siblings, so every control re-syncs. */
	function requestControlSync() {
		controlSyncVersion += 1;
	}

	function registerAnswerControl(registration: AnswerControlRegistration) {
		return untrack(() => {
			answerControls = [
				...answerControls.filter(
					(c) => c.element !== registration.element && c.id !== registration.id
				),
				registration,
			];
			return () => {
				answerControls = answerControls.filter((c) => c !== registration);
			};
		});
	}

	function registerId(kind: "description" | "error" | "title", id: string) {
		return untrack(() => {
			const add = (list: string[]) => (list.includes(id) ? list : [...list, id]);
			const remove = (list: string[]) => list.filter((c) => c !== id);
			if (kind === "description") descriptionIds = add(descriptionIds);
			else if (kind === "error") errorIds = add(errorIds);
			else titleIds = add(titleIds);
			return () => {
				if (kind === "description") descriptionIds = remove(descriptionIds);
				else if (kind === "error") errorIds = remove(errorIds);
				else titleIds = remove(titleIds);
			};
		});
	}

	function validate() {
		validationAttempted = true;
		if (!valid) return false;
		if (!root.nativeValidation) return true;
		const invalidAnswer = answers.find(
			(answer) =>
				isAnswerFilled(answer) && answer.element.willValidate && !answer.element.validity.valid
		);
		if (!invalidAnswer) return true;
		invalidAnswer.element.focus();
		invalidAnswer.element.reportValidity();
		return false;
	}

	function focus() {
		ref?.focus();
	}

	function focusInvalid() {
		const selectedInput = ref?.querySelector<HTMLInputElement>(
			"input[data-filled][name]:not(:disabled)"
		);
		const firstControl = ref?.querySelector<HTMLElement>(
			"input:not([type=hidden]):not(:disabled), textarea:not(:disabled)"
		);
		(selectedInput ?? firstControl ?? ref)?.focus();
	}

	function reset() {
		validationAttempted = false;
		skipped = false;
		selectedAnswerIds = multiple
			? [...defaultSelectedAnswerIds]
			: defaultSelectedAnswerIds.slice(0, 1);
		resetVersion += 1;
	}

	function skip() {
		if (required) return;
		selectedAnswerIds = [];
		skipped = true;
	}

	function getAnswerByElement(element: Element) {
		return answers.find((answer) => answer.element === element) ?? null;
	}

	function getAnswerByShortcut(shortcut: string) {
		if (shortcutByChoiceValue) {
			const choiceValue = Array.from(shortcutByChoiceValue.entries()).find(
				([, choiceShortcut]) => choiceShortcut === shortcut
			)?.[0];
			return (
				answers.find((answer) => answer.type === "choice" && answer.value === choiceValue) ?? null
			);
		}
		const answerId = Array.from(shortcutByAnswerId.entries()).find(
			([, answerShortcut]) => answerShortcut === shortcut
		)?.[0];
		return answers.find((answer) => answer.id === answerId) ?? null;
	}

	function moveAnswerFocus(currentElement: Element, direction: "next" | "previous") {
		const currentIndex = answers.findIndex((answer) => answer.element === currentElement);
		const currentAnswer = currentIndex < 0 ? null : (answers[currentIndex] ?? null);

		if (
			!answers.length ||
			(isTextEntryTarget(currentElement) && !isEmptyNavigableInput(currentAnswer)) ||
			(currentIndex < 0 && currentElement !== ref)
		) {
			return false;
		}

		const nextAnswer =
			currentIndex < 0
				? (answers.find(isAnswerFilled) ??
					(direction === "next" ? answers[0] : answers[answers.length - 1]))
				: answers[
						(currentIndex + (direction === "next" ? 1 : -1) + answers.length) % answers.length
					];

		if (!nextAnswer || nextAnswer.element === currentElement) return false;

		// Radio groups already move focus with the arrow keys.
		if (currentIndex >= 0 && isRadioTarget(currentElement) && isRadioTarget(nextAnswer.element)) {
			return false;
		}

		nextAnswer.element.focus();
		if (nextAnswer.type === "choice" && isRadioTarget(nextAnswer.element)) {
			nextAnswer.element.click();
		}
		return true;
	}

	let previousStatus: QuestionnaireItemStatus | null = null;
	$effect(() => {
		const next = status;
		if (previousStatus !== null && previousStatus !== next) onStatusChange?.(next);
		previousStatus = next;
	});

	let previousMultiple = untrack(() => multiple);
	$effect(() => {
		const next = multiple;
		if (previousMultiple && !next) {
			const selectedAnswer = untrack(() =>
				answers.find((answer) => selectedAnswerIds.includes(answer.id))
			);
			selectedAnswerIds = selectedAnswer ? [selectedAnswer.id] : [];
		}
		previousMultiple = next;
	});

	$effect(() => {
		const element = ref;
		const itemName = name;
		if (!element) return;
		return root.registerItem({
			element,
			focus,
			focusInvalid,
			getAnswerByElement,
			getAnswerByShortcut,
			getChoices: () =>
				orderedAnswerControls.flatMap((answer) =>
					answer.type === "choice" ? [{ disabled: answer.ownDisabled, value: answer.value }] : []
				),
			isDisabled: () => disabled,
			isRequired: () => required,
			moveAnswerFocus,
			name: itemName,
			reset,
			skip,
			status: () => status,
			validate,
		});
	});

	setQuestionnaireItemContext({
		get active() {
			return active;
		},
		get controlSyncVersion() {
			return controlSyncVersion;
		},
		get disabled() {
			return disabled;
		},
		get hasInputAnswer() {
			return hasInputAnswer;
		},
		get invalid() {
			return invalid;
		},
		get multiple() {
			return multiple;
		},
		get name() {
			return name;
		},
		get required() {
			return required;
		},
		get resetVersion() {
			return resetVersion;
		},
		get selectedAnswerIds() {
			return selectedAnswerIds;
		},
		get shortcutByAnswerId() {
			return shortcutByAnswerId;
		},
		get shortcutByChoiceValue() {
			return shortcutByChoiceValue;
		},
		get shortcuts() {
			return root.shortcuts;
		},
		get status() {
			return status;
		},
		registerAnswerControl,
		registerAnswerSelection,
		registerDescription: (id) => registerId("description", id),
		registerError: (id) => registerId("error", id),
		registerTitle: (id) => registerId("title", id),
		requestControlSync,
		setAnswerDefault,
		setAnswerSelectionFromInteraction,
		syncControlledAnswerSelection,
	});
</script>

<!-- svelte-ignore a11y_no_noninteractive_tabindex, a11y_role_supports_aria_props_implicit -->
<fieldset
	bind:this={ref}
	data-slot="questionnaire-item"
	aria-describedby={describedBy}
	aria-invalid={invalid || undefined}
	aria-keyshortcuts={keyShortcuts}
	aria-labelledby={labelledBy}
	data-active={active ? "" : undefined}
	data-disabled={disabled ? "" : undefined}
	data-invalid={invalid ? "" : undefined}
	data-multiple={multiple ? "" : undefined}
	data-required={required ? "" : undefined}
	data-status={status}
	{disabled}
	hidden={!active}
	inert={!active}
	tabindex={-1}
	class={cn("flex min-w-0 flex-col gap-4 border-0 p-0 outline-none [&[hidden]]:hidden", className)}
	{...restProps}
>
	{@render children?.({ active, invalid, status })}
</fieldset>
