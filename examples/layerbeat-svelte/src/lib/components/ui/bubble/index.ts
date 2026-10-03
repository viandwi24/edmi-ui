import Root, { type BubbleVariant, bubbleVariants } from "./bubble.svelte";
import Content from "./bubble-content.svelte";
import Group from "./bubble-group.svelte";
import Reaction, { bubbleReactionVariants } from "./bubble-reaction.svelte";
import Reactions, { bubbleReactionsVariants } from "./bubble-reactions.svelte";

export {
	type BubbleVariant,
	bubbleReactionsVariants,
	bubbleReactionVariants,
	bubbleVariants,
	Content,
	Content as BubbleContent,
	Group,
	Group as BubbleGroup,
	Reaction,
	Reaction as BubbleReaction,
	Reactions,
	Reactions as BubbleReactions,
	Root,
	//
	Root as Bubble,
};
