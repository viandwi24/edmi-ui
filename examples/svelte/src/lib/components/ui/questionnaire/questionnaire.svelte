<script lang="ts">
	import { cn, type WithElementRef } from "#lib/utils.js";
	import type { HTMLFormAttributes } from "svelte/elements";
	import { onMount, untrack, type Snippet } from "svelte";
	import {
		type ItemRegistration,
		type QuestionnaireItemDefinition,
		type QuestionnaireItemStatus,
		type QuestionnaireShortcutMode,
		compareDocumentOrder,
		createQuestionnaireCollection,
		getInitialItemName,
		getShortcutFromKey,
		isAnswerFilled,
		isRadioTarget,
		isTextEntryTarget,
		setQuestionnaireRootContext,
	} from "./use-questionnaire.svelte.js";

	let {
		ref = $bindable(null),
		class: className,
		/** Item shown first. Ignored when `item` is provided. */
		defaultItem = undefined,
		/** Active item. Use with `bind:item`. */
		item = $bindable(undefined),
		/** Declares the item order, and the choice order shortcuts are assigned in. */
		items = undefined,
		/** Set to `false` to run native constraint validation on answered items. */
		noValidate = true,
		/** Assigns a keyboard shortcut to every choice. */
		shortcuts = undefined,
		/** ✦ opt-in one-step 3D look, applied to every option. */
		raised = false,
		onItemChange = undefined,
		onsubmit,
		onreset,
		children,
		...restProps
	}: Omit<WithElementRef<HTMLFormAttributes, HTMLFormElement>, "children" | "onsubmit" | "onreset"> & {
		defaultItem?: string;
		item?: string;
		items?: readonly QuestionnaireItemDefinition[];
		noValidate?: boolean;
		shortcuts?: QuestionnaireShortcutMode;
		raised?: boolean;
		onItemChange?: (item: string) => void;
		onsubmit?: (event: SubmitEvent) => void;
		onreset?: (event: Event) => void;
		children?: Snippet<[{ current: number; first: boolean; last: boolean; total: number }]>;
	} = $props();

	interface PendingFocus {
		name: string;
		target: "invalid" | "item";
	}

	let registrations = $state.raw<ItemRegistration[]>([]);
	let domVersion = $state(0);
	let pendingFocus: PendingFocus | null = null;

	const collection = $derived(createQuestionnaireCollection(items));
	let uncontrolledItem = $state<string | null>(
		untrack(() => getInitialItemName(createQuestionnaireCollection(items), defaultItem))
	);
	const activeItemName = $derived(item !== undefined ? item : uncontrolledItem);
	const resolvedShortcuts = $derived(shortcuts ?? null);

	const runtimeItems = $derived.by(() => {
		// Re-sort whenever items are added to or removed from the DOM.
		void domVersion;
		return registrations
			.filter((registration) => !registration.isDisabled())
			.sort((first, second) => compareDocumentOrder(first.element, second.element));
	});
	const runtimeItemByName = $derived(new Map(runtimeItems.map((r) => [r.name, r])));
	/** `items` is authoritative when provided, so items can be declared before they render. */
	const logicalItems = $derived<readonly { name: string }[]>(
		collection?.enabledItems ?? runtimeItems
	);
	const currentIndex = $derived(logicalItems.findIndex((l) => l.name === activeItemName));
	const activeItem = $derived(
		currentIndex < 0 || !activeItemName ? null : (runtimeItemByName.get(activeItemName) ?? null)
	);
	const activeDefinition = $derived(
		activeItemName ? collection?.itemByName.get(activeItemName) : undefined
	);
	const activeItemRequired = $derived.by(() => {
		if (currentIndex < 0) return null;
		return activeDefinition
			? Boolean(activeDefinition.required)
			: (activeItem?.isRequired() ?? false);
	});
	const activeItemStatus = $derived.by<QuestionnaireItemStatus | null>(() => {
		if (currentIndex < 0) return null;
		return activeItem?.status() ?? (activeItemName ? "unanswered" : null);
	});
	const orderedRegistrations = $derived.by(() => {
		if (!collection) return runtimeItems;
		return collection.enabledItems.flatMap((definition) => {
			const registration = runtimeItemByName.get(definition.name);
			return registration ? [registration] : [];
		});
	});
	const total = $derived(logicalItems.length);
	const current = $derived(currentIndex < 0 ? 0 : currentIndex + 1);
	const first = $derived(total > 0 && currentIndex === 0);
	const last = $derived(total > 0 && currentIndex === total - 1);

	function setItem(nextItem: string, focusTarget: PendingFocus["target"] = "item") {
		if (nextItem === activeItemName) return;
		pendingFocus = { name: nextItem, target: focusTarget };
		uncontrolledItem = nextItem;
		item = nextItem;
		onItemChange?.(nextItem);
	}

	function registerItem(registration: ItemRegistration) {
		registrations = untrack(() => [
			...registrations.filter(
				(r) => r.element !== registration.element && r.name !== registration.name
			),
			registration,
		]);
		return () => {
			registrations = registrations.filter((r) => r !== registration);
		};
	}

	function setItemAt(index: number, focusTarget: PendingFocus["target"] = "item") {
		const nextItem = logicalItems[index];
		if (nextItem) setItem(nextItem.name, focusTarget);
	}

	function goPrevious() {
		if (currentIndex <= 0) return;
		setItemAt(currentIndex - 1);
	}

	function goNext() {
		if (!activeItem || currentIndex >= total - 1) return;
		if (!activeItem.validate()) {
			activeItem.focusInvalid();
			return;
		}
		setItemAt(currentIndex + 1);
	}

	function confirmCurrent() {
		if (!activeItem) return;
		if (!activeItem.validate()) {
			activeItem.focusInvalid();
			return;
		}
		if (last) {
			ref?.requestSubmit();
			return;
		}
		setItemAt(currentIndex + 1);
	}

	function skipCurrent() {
		if (!activeItem || activeItem.isRequired()) return;
		activeItem.skip();
		if (!last) {
			setItemAt(currentIndex + 1);
			return;
		}
		queueMicrotask(() => ref?.requestSubmit());
	}

	function handleReset(event: Event) {
		onreset?.(event);
		if (event.defaultPrevented) return;
		for (const registration of registrations) registration.reset();
		const resetItemName = collection
			? getInitialItemName(collection, defaultItem)
			: (runtimeItems.find((r) => r.name === defaultItem)?.name ?? runtimeItems[0]?.name);
		if (resetItemName) setItem(resetItemName);
	}

	function handleSubmit(event: SubmitEvent) {
		const firstInvalidItem = orderedRegistrations.find((r) => !r.validate());
		if (firstInvalidItem) {
			event.preventDefault();
			setItem(firstInvalidItem.name, "invalid");
			if (firstInvalidItem.name === activeItemName) {
				firstInvalidItem.focusInvalid();
				pendingFocus = null;
			}
			return;
		}
		onsubmit?.(event);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (
			event.defaultPrevented ||
			event.isComposing ||
			event.keyCode === 229 ||
			!activeItem ||
			!(event.target instanceof Element)
		) {
			return;
		}

		if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && !event.altKey && !event.shiftKey) {
			event.preventDefault();
			if (!event.repeat) confirmCurrent();
			return;
		}

		if (event.metaKey || event.ctrlKey || event.altKey) return;

		if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			const moved = activeItem.moveAnswerFocus(
				event.target,
				event.key === "ArrowDown" ? "next" : "previous"
			);
			if (moved) {
				event.preventDefault();
				return;
			}
		}

		if (
			(event.key === "ArrowLeft" || event.key === "ArrowRight") &&
			!isTextEntryTarget(event.target) &&
			!isRadioTarget(event.target)
		) {
			event.preventDefault();
			if (event.repeat) return;
			if (event.key === "ArrowLeft") goPrevious();
			else if (activeItem.status() !== "unanswered") goNext();
			return;
		}

		if (event.key === "Enter") {
			const answer = activeItem.getAnswerByElement(event.target);
			if (!answer) return;
			event.preventDefault();
			if (!event.repeat && isAnswerFilled(answer)) confirmCurrent();
			return;
		}

		if (!resolvedShortcuts || isTextEntryTarget(event.target)) return;

		const shortcut = getShortcutFromKey(event.key, resolvedShortcuts);
		const answer = shortcut ? activeItem.getAnswerByShortcut(shortcut) : null;
		if (!answer) return;

		event.preventDefault();
		if (event.repeat) return;
		answer.element.focus();
		if (answer.type === "choice") answer.element.click();
	}

	let previousActiveItemName: string | null = untrack(() => activeItemName);
	$effect(() => {
		const name = activeItemName;
		const index = currentIndex;
		const count = total;
		const registration = activeItem;
		if (count === 0) return;

		if (index < 0) {
			const firstItem = logicalItems[0];
			if (!firstItem) return;
			if (item === undefined && name === null) {
				uncontrolledItem = firstItem.name;
				return;
			}
			setItem(firstItem.name);
			return;
		}

		const focus = pendingFocus;
		const activeItemChanged = previousActiveItemName !== name;
		previousActiveItemName = name;

		if (!focus || focus.name !== name) {
			if (item !== undefined && activeItemChanged) {
				pendingFocus = null;
				registration?.focus();
			}
			return;
		}

		if (focus.target === "invalid") registration?.focusInvalid();
		else registration?.focus();
		pendingFocus = null;
	});

	onMount(() => {
		if (!ref || typeof MutationObserver === "undefined") return;
		const observer = new MutationObserver(() => {
			domVersion += 1;
		});
		observer.observe(ref, { childList: true, subtree: true });
		return () => observer.disconnect();
	});

	setQuestionnaireRootContext({
		get raised() {
			return raised;
		},
		get activeItem() {
			return activeItem;
		},
		get activeItemName() {
			return activeItemName;
		},
		get activeItemRequired() {
			return activeItemRequired;
		},
		get activeItemStatus() {
			return activeItemStatus;
		},
		get current() {
			return current;
		},
		get domVersion() {
			return domVersion;
		},
		get first() {
			return first;
		},
		get itemDefinitionByName() {
			return collection?.itemByName ?? null;
		},
		get last() {
			return last;
		},
		get nativeValidation() {
			return noValidate === false;
		},
		get shortcuts() {
			return resolvedShortcuts;
		},
		get total() {
			return total;
		},
		goNext,
		goPrevious,
		registerItem,
		skipCurrent,
	});
</script>

<form
	bind:this={ref}
	data-slot="questionnaire"
	data-shortcuts={resolvedShortcuts ?? undefined}
	data-raised={raised ? "" : undefined}
	novalidate={noValidate}
	class={cn("flex w-full min-w-0 flex-col gap-4", className)}
	onkeydown={handleKeydown}
	onreset={handleReset}
	onsubmit={handleSubmit}
	{...restProps}
>
	{@render children?.({ current, first, last, total })}
</form>
