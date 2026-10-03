"use client";

import { cn } from "cn";
import type { ComponentProps, KeyboardEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { AgentAvatar } from "@/registry/edmi/components/ai/agent-avatar";
import { Button } from "@/registry/edmi/ui/button";

export type PromptInputAgentOption = {
	id: string;
	name: string;
	/** Short scope shown on the right of the mention list (`trading`). */
	scope?: string;
	/** `chart-1` to `chart-5` or any CSS color for the identicon. */
	color?: string;
};

export type PromptInputAgentProps = Omit<
	ComponentProps<typeof Button>,
	"children"
> & {
	agent: PromptInputAgentOption;
};

/** Chip in the composer header: who you are talking to. */
export const PromptInputAgent = ({
	agent,
	className,
	...props
}: PromptInputAgentProps) => (
	<Button
		data-slot="ai-prompt-input-agent"
		variant="outline"
		size="sm"
		type="button"
		className={cn("gap-[7px] bg-card", className)}
		{...props}
	>
		<AgentAvatar seed={agent.id} color={agent.color} size={19} tile={false} />
		{agent.name}
	</Button>
);

export type PromptInputAgentMentionsProps = Omit<
	ComponentProps<"div">,
	"onSelect"
> & {
	agents: PromptInputAgentOption[];
	activeIndex?: number;
	onSelect?: (agent: PromptInputAgentOption) => void;
	label?: string;
};

/**
 * The @ mention list. It positions itself above the nearest `relative` ancestor, so render it next to
 * (not inside) `PromptInput`, whose group clips overflow.
 */
export const PromptInputAgentMentions = ({
	agents,
	activeIndex = 0,
	onSelect,
	label = "Agents",
	className,
	...props
}: PromptInputAgentMentionsProps) => (
	<div
		data-slot="ai-prompt-input-agent-mentions"
		role="listbox"
		aria-label={label}
		className={cn(
			"absolute bottom-full left-0 z-50 mb-2 w-70 rounded-xl border border-border bg-popover p-1.5 text-popover-foreground",
			className,
		)}
		{...props}
	>
		<div className="px-2 pt-1.5 pb-1 text-xs font-semibold text-muted-foreground">
			{label}
		</div>
		{agents.map((agent, i) => (
			<div
				key={agent.id}
				role="option"
				aria-selected={i === activeIndex}
				tabIndex={-1}
				data-active={i === activeIndex ? "" : undefined}
				className="flex h-8 cursor-default items-center gap-[9px] rounded-[7px] px-2 text-[13.5px] whitespace-nowrap data-[active]:bg-accent data-[active]:text-accent-foreground"
				// keep focus in the textarea while picking
				onMouseDown={(e) => e.preventDefault()}
				onClick={() => onSelect?.(agent)}
				onKeyDown={(e) => {
					if (e.key === "Enter") onSelect?.(agent);
				}}
			>
				<AgentAvatar
					seed={agent.id}
					color={agent.color}
					size={19}
					tile={false}
				/>
				<span>{agent.name}</span>
				{agent.scope && (
					<span className="ml-auto font-mono text-[11.5px] tracking-wide text-muted-foreground">
						{agent.scope}
					</span>
				)}
			</div>
		))}
	</div>
);

const MENTION = /(^|\s)@(\w*)$/;

export type UseAgentMentionOptions = {
	agents: PromptInputAgentOption[];
	/** Controlled textarea value. */
	value: string;
	onValueChange: (value: string) => void;
	/** Called with the chosen agent; the `@query` token is removed from the text. */
	onAgentSelect: (agent: PromptInputAgentOption) => void;
};

/**
 * Opens the mention list when the text ends in `@query`. Wire `onKeyDown` to the textarea and spread
 * `mentions` on `PromptInputAgentMentions` while `open`.
 */
export function useAgentMention({
	agents,
	value,
	onValueChange,
	onAgentSelect,
}: UseAgentMentionOptions) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [dismissed, setDismissed] = useState(false);
	const query = MENTION.exec(value)?.[2];
	const items = useMemo(
		() =>
			query === undefined
				? []
				: agents.filter((a) =>
						a.name.toLowerCase().includes(query.toLowerCase()),
					),
		[agents, query],
	);
	const open = query !== undefined && items.length > 0 && !dismissed;

	// A new query reopens the list and resets the highlight.
	// biome-ignore lint/correctness/useExhaustiveDependencies: reset on every query change
	useEffect(() => {
		setDismissed(false);
		setActiveIndex(0);
	}, [query]);

	const select = (agent: PromptInputAgentOption) => {
		onValueChange(value.replace(MENTION, "$1"));
		onAgentSelect(agent);
	};

	const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
		if (!open) return;
		if (e.key === "ArrowDown") {
			e.preventDefault();
			setActiveIndex((i) => (i + 1) % items.length);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setActiveIndex((i) => (i - 1 + items.length) % items.length);
		} else if (e.key === "Enter" || e.key === "Tab") {
			e.preventDefault();
			const agent = items[activeIndex];
			if (agent) select(agent);
		} else if (e.key === "Escape") {
			setDismissed(true);
		}
	};

	return {
		open,
		onKeyDown,
		mentions: { agents: items, activeIndex, onSelect: select },
	};
}
