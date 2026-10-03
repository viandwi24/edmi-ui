import type { PromptInputAgentOption } from "./types.js";

const MENTION = /(^|\s)@(\w*)$/;

export type UseAgentMentionOptions = {
	agents: PromptInputAgentOption[];
	/** Getter for the textarea value, for example `() => controller.textInput`. */
	value: () => string;
	onValueChange: (value: string) => void;
	/** Called with the chosen agent; the `@query` token is removed from the text. */
	onAgentSelect: (agent: PromptInputAgentOption) => void;
};

/**
 * Opens the mention list when the text ends in `@query`. Pass `onkeydown` to `PromptInputTextarea`
 * and render `PromptInputAgentMentions` with `mentions` while `open`. Call during component init.
 */
export function useAgentMention(options: UseAgentMentionOptions) {
	let activeIndex = $state(0);
	let dismissed = $state(false);
	const query = $derived(MENTION.exec(options.value())?.[2]);
	const items = $derived(
		query === undefined
			? []
			: options.agents.filter((a) =>
					a.name.toLowerCase().includes(query.toLowerCase()),
				),
	);
	const open = $derived(query !== undefined && items.length > 0 && !dismissed);

	// A new query reopens the list and resets the highlight.
	$effect(() => {
		void query;
		dismissed = false;
		activeIndex = 0;
	});

	const select = (agent: PromptInputAgentOption) => {
		options.onValueChange(options.value().replace(MENTION, "$1"));
		options.onAgentSelect(agent);
	};

	const onkeydown = (event: KeyboardEvent) => {
		if (!open) return;
		const count = items.length;
		if (event.key === "ArrowDown") {
			event.preventDefault();
			activeIndex = (activeIndex + 1) % count;
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			activeIndex = (activeIndex - 1 + count) % count;
		} else if (event.key === "Enter" || event.key === "Tab") {
			event.preventDefault();
			const agent = items[activeIndex];
			if (agent) select(agent);
		} else if (event.key === "Escape") {
			dismissed = true;
		}
	};

	return {
		get open() {
			return open;
		},
		get items() {
			return items;
		},
		get activeIndex() {
			return activeIndex;
		},
		onkeydown,
		select,
	};
}
