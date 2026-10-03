import type { MaybeRefOrGetter } from "vue";
import { computed, ref, toValue, watch } from "vue";
import type { PromptInputAgentOption } from "./types";

const MENTION = /(^|\s)@(\w*)$/;

export type UseAgentMentionOptions = {
	agents: PromptInputAgentOption[];
	/** Textarea value (ref or getter), for example the lifted composer `textInput`. */
	value: MaybeRefOrGetter<string>;
	onValueChange: (value: string) => void;
	/** Called with the chosen agent; the `@query` token is removed from the text. */
	onAgentSelect: (agent: PromptInputAgentOption) => void;
};

/**
 * Opens the mention list when the text ends in `@query`. Attach `onKeydown` to the textarea with the
 * capture modifier (`@keydown.capture`) so it runs before the composer's own Enter handling.
 */
export function useAgentMention({
	agents,
	value,
	onValueChange,
	onAgentSelect,
}: UseAgentMentionOptions) {
	const activeIndex = ref(0);
	const dismissed = ref(false);
	const query = computed(() => MENTION.exec(toValue(value))?.[2]);
	const items = computed(() =>
		query.value === undefined
			? []
			: agents.filter((a) =>
					a.name.toLowerCase().includes((query.value as string).toLowerCase()),
				),
	);
	const open = computed(
		() =>
			query.value !== undefined && items.value.length > 0 && !dismissed.value,
	);

	// A new query reopens the list and resets the highlight.
	watch(query, () => {
		dismissed.value = false;
		activeIndex.value = 0;
	});

	const select = (agent: PromptInputAgentOption) => {
		onValueChange(toValue(value).replace(MENTION, "$1"));
		onAgentSelect(agent);
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (!open.value) return;
		const count = items.value.length;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			activeIndex.value = (activeIndex.value + 1) % count;
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			activeIndex.value = (activeIndex.value - 1 + count) % count;
		} else if (e.key === "Enter" || e.key === "Tab") {
			e.preventDefault();
			// stop the composer's own Enter handler (submit)
			e.stopImmediatePropagation();
			const agent = items.value[activeIndex.value];
			if (agent) select(agent);
		} else if (e.key === "Escape") {
			dismissed.value = true;
		}
	};

	return { open, items, activeIndex, onKeydown, select };
}
