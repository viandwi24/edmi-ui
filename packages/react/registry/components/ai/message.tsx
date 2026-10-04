"use client";

import { cjk } from "@streamdown/cjk";
import { code } from "@streamdown/code";
import { math } from "@streamdown/math";
import { mermaid } from "@streamdown/mermaid";
import type { UIMessage } from "ai";
import { cn } from "cn";
import type { ComponentProps, HTMLAttributes, ReactElement } from "react";
import {
	createContext,
	memo,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { Streamdown } from "streamdown";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Bubble, BubbleContent } from "@/registry/edmi/ui/bubble";
import { Button } from "@/registry/edmi/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/registry/edmi/ui/button-group";
import {
	Message as UiMessage,
	MessageAvatar as UiMessageAvatar,
	MessageContent as UiMessageContent,
	MessageHeader as UiMessageHeader,
} from "@/registry/edmi/ui/message";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/registry/edmi/ui/tooltip";

// Thin layer on ui/message + ui/bubble (DESIGN §5b). Assistant turns have NO avatar by default: the response
// is full width on the left; a user turn is a secondary bubble on the right. `MessageAvatar` + `MessageHeader`
// are opt-in for multi-agent chats (the avatar then aligns to the name line). Status / shimmer text goes inside
// `MessageContent` (a ghost bubble) so its first line aligns like any message.

const MessageContext = createContext<{ from: UIMessage["role"] }>({
	from: "assistant",
});

export type MessageProps = Omit<ComponentProps<typeof UiMessage>, "align"> & {
	from: UIMessage["role"];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
	<MessageContext.Provider value={{ from }}>
		<UiMessage
			data-slot="ai-message"
			data-from={from}
			align={from === "user" ? "end" : "start"}
			className={cn(
				"max-w-full flex-col items-stretch gap-1.5 data-[align=end]:flex-col",
				// opt-in avatar: two columns, avatar spans the rows, everything else stacks in column 2
				"has-[>[data-slot=message-avatar]]:grid has-[>[data-slot=message-avatar]]:grid-cols-[auto_minmax(0,1fr)] has-[>[data-slot=message-avatar]]:items-start has-[>[data-slot=message-avatar]]:gap-x-2.5 has-[>[data-slot=message-avatar]]:gap-y-1.5 [&>[data-slot=message-avatar]]:row-span-full has-[>[data-slot=message-avatar]]:[&>:not([data-slot=message-avatar])]:col-start-2",
				className,
			)}
			{...props}
		/>
	</MessageContext.Provider>
);

export type MessageContentProps = ComponentProps<typeof BubbleContent> & {
	/** Defaults to `secondary` for the user and `ghost` (no fill, keeps vertical padding) for the assistant. */
	variant?: ComponentProps<typeof Bubble>["variant"];
};

export const MessageContent = ({
	className,
	variant,
	...props
}: MessageContentProps) => {
	const { from } = useContext(MessageContext);
	const user = from === "user";
	return (
		<UiMessageContent data-slot="ai-message-content">
			<Bubble
				variant={variant ?? (user ? "secondary" : "ghost")}
				align={user ? "end" : "start"}
				className={cn(!user && "w-full")}
			>
				<BubbleContent
					className={cn(!user && "w-full", className)}
					{...props}
				/>
			</Bubble>
		</UiMessageContent>
	);
};

/** Opt-in (multi-agent). Same part as `ui/message` `MessageAvatar`. */
export const MessageAvatar = UiMessageAvatar;
/** Opt-in (multi-agent): the sender name line the avatar aligns to. */
export const MessageHeader = UiMessageHeader;

export type MessageActionsProps = ComponentProps<"div">;

export const MessageActions = ({
	className,
	children,
	...props
}: MessageActionsProps) => (
	<div
		data-slot="ai-message-actions"
		className={cn("flex items-center gap-0.5", className)}
		{...props}
	>
		{children}
	</div>
);

export type MessageActionProps = ComponentProps<typeof Button> & {
	tooltip?: string;
	label?: string;
};

export const MessageAction = ({
	tooltip,
	children,
	label,
	variant = "ghost",
	size = "icon-xs",
	...props
}: MessageActionProps) => {
	const button = (
		<Button size={size} type="button" variant={variant} {...props}>
			{children}
			<span className="sr-only">{label || tooltip}</span>
		</Button>
	);

	if (tooltip) {
		return (
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger render={button} />
					<TooltipContent>
						<p>{tooltip}</p>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		);
	}

	return button;
};

interface MessageBranchContextType {
	currentBranch: number;
	totalBranches: number;
	goToPrevious: () => void;
	goToNext: () => void;
	branches: ReactElement[];
	setBranches: (branches: ReactElement[]) => void;
}

const MessageBranchContext = createContext<MessageBranchContextType | null>(
	null,
);

const useMessageBranch = () => {
	const context = useContext(MessageBranchContext);

	if (!context) {
		throw new Error(
			"MessageBranch components must be used within MessageBranch",
		);
	}

	return context;
};

export type MessageBranchProps = HTMLAttributes<HTMLDivElement> & {
	defaultBranch?: number;
	onBranchChange?: (branchIndex: number) => void;
};

export const MessageBranch = ({
	defaultBranch = 0,
	onBranchChange,
	className,
	...props
}: MessageBranchProps) => {
	const [currentBranch, setCurrentBranch] = useState(defaultBranch);
	const [branches, setBranches] = useState<ReactElement[]>([]);

	const handleBranchChange = useCallback(
		(newBranch: number) => {
			setCurrentBranch(newBranch);
			onBranchChange?.(newBranch);
		},
		[onBranchChange],
	);

	const goToPrevious = useCallback(() => {
		const newBranch =
			currentBranch > 0 ? currentBranch - 1 : branches.length - 1;
		handleBranchChange(newBranch);
	}, [currentBranch, branches.length, handleBranchChange]);

	const goToNext = useCallback(() => {
		const newBranch =
			currentBranch < branches.length - 1 ? currentBranch + 1 : 0;
		handleBranchChange(newBranch);
	}, [currentBranch, branches.length, handleBranchChange]);

	const contextValue = useMemo<MessageBranchContextType>(
		() => ({
			branches,
			currentBranch,
			goToNext,
			goToPrevious,
			setBranches,
			totalBranches: branches.length,
		}),
		[branches, currentBranch, goToNext, goToPrevious],
	);

	return (
		<MessageBranchContext.Provider value={contextValue}>
			<div
				data-slot="ai-message-branch"
				className={cn("grid w-full gap-1.5 [&>div]:pb-0", className)}
				{...props}
			/>
		</MessageBranchContext.Provider>
	);
};

export type MessageBranchContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageBranchContent = ({
	children,
	...props
}: MessageBranchContentProps) => {
	const { currentBranch, setBranches, branches } = useMessageBranch();
	const childrenArray = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children],
	);

	// Keep the branch list in sync with the children.
	useEffect(() => {
		if (branches.length !== childrenArray.length) {
			setBranches(childrenArray);
		}
	}, [childrenArray, branches, setBranches]);

	return childrenArray.map((branch, index) => (
		<div
			className={cn(
				"grid gap-1.5 overflow-hidden [&>div]:pb-0",
				index === currentBranch ? "block" : "hidden",
			)}
			key={branch.key}
			{...props}
		>
			{branch}
		</div>
	));
};

export type MessageBranchSelectorProps = ComponentProps<typeof ButtonGroup>;

export const MessageBranchSelector = ({
	className,
	...props
}: MessageBranchSelectorProps) => {
	const { totalBranches } = useMessageBranch();

	// Nothing to switch between.
	if (totalBranches <= 1) {
		return null;
	}

	return (
		<ButtonGroup
			data-slot="ai-message-branch-selector"
			className={cn("items-center gap-0.5 [&>*]:rounded-md", className)}
			orientation="horizontal"
			{...props}
		/>
	);
};

export type MessageBranchPreviousProps = ComponentProps<typeof Button>;

export const MessageBranchPrevious = ({
	children,
	...props
}: MessageBranchPreviousProps) => {
	const { goToPrevious, totalBranches } = useMessageBranch();

	return (
		<Button
			aria-label="Previous branch"
			disabled={totalBranches <= 1}
			onClick={goToPrevious}
			size="icon-xs"
			type="button"
			variant="ghost"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="ChevronLeftIcon"
					tabler="IconChevronLeft"
					hugeicons="ArrowLeft01Icon"
					phosphor="CaretLeftIcon"
					remixicon="RiArrowLeftSLine"
				/>
			)}
		</Button>
	);
};

export type MessageBranchNextProps = ComponentProps<typeof Button>;

export const MessageBranchNext = ({
	children,
	...props
}: MessageBranchNextProps) => {
	const { goToNext, totalBranches } = useMessageBranch();

	return (
		<Button
			aria-label="Next branch"
			disabled={totalBranches <= 1}
			onClick={goToNext}
			size="icon-xs"
			type="button"
			variant="ghost"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="ChevronRightIcon"
					tabler="IconChevronRight"
					hugeicons="ArrowRight01Icon"
					phosphor="CaretRightIcon"
					remixicon="RiArrowRightSLine"
				/>
			)}
		</Button>
	);
};

export type MessageBranchPageProps = HTMLAttributes<HTMLSpanElement>;

export const MessageBranchPage = ({
	className,
	...props
}: MessageBranchPageProps) => {
	const { currentBranch, totalBranches } = useMessageBranch();

	return (
		<ButtonGroupText
			className={cn(
				"border-none bg-transparent px-1 font-mono text-xs text-muted-foreground tabular-nums shadow-none",
				className,
			)}
			{...props}
		>
			{currentBranch + 1} / {totalBranches}
		</ButtonGroupText>
	);
};

export type MessageResponseProps = ComponentProps<typeof Streamdown>;

const streamdownPlugins = { cjk, code, math, mermaid };

// Response typography (DESIGN §5b rule 3): 15/1.65, 600 lead-ins, h1-h3 22/18/16, inline code = mono 12.5 on
// --muted in --destructive-text, links --info-text underlined, quote = 3px --border rule, 22px list indent,
// max ~68ch. Selectors target Streamdown's `data-streamdown` hooks so its own utility classes lose.
const responseTypography = [
	"max-w-[68ch] text-[15px] leading-[1.65] text-foreground",
	"[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
	"[&_p]:my-0 [&_p+*]:mt-2.5",
	"[&_h1]:mt-4 [&_h1]:mb-2 [&_h1]:text-[22px] [&_h1]:leading-snug [&_h1]:font-semibold [&_h1]:tracking-[-0.3px]",
	"[&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:leading-snug [&_h2]:font-semibold [&_h2]:tracking-[-0.2px]",
	"[&_h3]:mt-3 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:leading-snug [&_h3]:font-semibold",
	"[&_[data-streamdown=strong]]:font-semibold",
	"[&_[data-streamdown=inline-code]]:rounded-md [&_[data-streamdown=inline-code]]:border [&_[data-streamdown=inline-code]]:border-border [&_[data-streamdown=inline-code]]:bg-muted [&_[data-streamdown=inline-code]]:px-1.5 [&_[data-streamdown=inline-code]]:py-px [&_[data-streamdown=inline-code]]:font-mono [&_[data-streamdown=inline-code]]:text-[12.5px] [&_[data-streamdown=inline-code]]:font-normal [&_[data-streamdown=inline-code]]:text-destructive-text",
	"[&_[data-streamdown=link]]:font-normal [&_[data-streamdown=link]]:text-info-text [&_[data-streamdown=link]]:underline [&_[data-streamdown=link]]:underline-offset-[3px]",
	"[&_[data-streamdown=blockquote]]:my-2.5 [&_[data-streamdown=blockquote]]:border-l-[3px] [&_[data-streamdown=blockquote]]:border-border [&_[data-streamdown=blockquote]]:py-0.5 [&_[data-streamdown=blockquote]]:pl-3.5 [&_[data-streamdown=blockquote]]:text-foreground-2 [&_[data-streamdown=blockquote]]:not-italic",
	"[&_[data-streamdown=unordered-list]]:my-2.5 [&_[data-streamdown=unordered-list]]:list-outside [&_[data-streamdown=unordered-list]]:pl-[22px] [&_[data-streamdown=ordered-list]]:my-2.5 [&_[data-streamdown=ordered-list]]:list-outside [&_[data-streamdown=ordered-list]]:pl-[22px] [&_[data-streamdown=list-item]]:py-0.5 [&_[data-streamdown=list-item]]:pl-0",
].join(" ");

export const MessageResponse = memo(
	({ className, ...props }: MessageResponseProps) => (
		<Streamdown
			className={cn("size-full", responseTypography, className)}
			plugins={streamdownPlugins}
			{...props}
		/>
	),
	(prevProps, nextProps) =>
		prevProps.children === nextProps.children &&
		nextProps.isAnimating === prevProps.isAnimating,
);

MessageResponse.displayName = "MessageResponse";

export type MessageToolbarProps = ComponentProps<"div">;

export const MessageToolbar = ({
	className,
	children,
	...props
}: MessageToolbarProps) => (
	<div
		data-slot="ai-message-toolbar"
		className={cn("flex w-full items-center justify-between gap-4", className)}
		{...props}
	>
		{children}
	</div>
);
