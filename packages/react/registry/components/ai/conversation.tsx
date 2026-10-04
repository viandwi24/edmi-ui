"use client";

import type { UIMessage } from "ai";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { useCallback } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/registry/edmi/ui/message-scroller";

// Thin layer on ui/message-scroller (DESIGN §5b): the scroller already follows streaming replies and
// owns the scroll state; this adds the AI Elements anatomy, EmptyState (+ home variant) and Download.

export type ConversationProps = ComponentProps<typeof MessageScroller> & {
	/** Follow new content while the user is at the bottom. */
	autoScroll?: boolean;
};

export const Conversation = ({
	className,
	autoScroll = true,
	...props
}: ConversationProps) => (
	<MessageScrollerProvider autoScroll={autoScroll}>
		<MessageScroller
			data-slot="ai-conversation"
			role="log"
			className={cn("flex-1", className)}
			{...props}
		/>
	</MessageScrollerProvider>
);

export type ConversationContentProps = ComponentProps<
	typeof MessageScrollerContent
>;

/** Viewport + content column. Wrap each turn in `ConversationItem` so the scroller can anchor it. */
export const ConversationContent = ({
	className,
	...props
}: ConversationContentProps) => (
	<MessageScrollerViewport>
		<MessageScrollerContent
			data-slot="ai-conversation-content"
			className={cn("gap-6 p-4", className)}
			{...props}
		/>
	</MessageScrollerViewport>
);

export type ConversationItemProps = ComponentProps<typeof MessageScrollerItem>;

/** One turn inside the conversation (pass `messageId`; `scrollAnchor` pins a user turn to the top). */
export const ConversationItem = (props: ConversationItemProps) => (
	<MessageScrollerItem data-slot="ai-conversation-item" {...props} />
);

export type ConversationEmptyStateProps = Omit<
	ComponentProps<"div">,
	"title"
> & {
	title?: ReactNode;
	description?: ReactNode;
	icon?: ReactNode;
	/**
	 * `default`: icon tile, title and description centered.
	 * `home` ✦: greeting heading and subtitle on the empty chat; put the composer and suggestions in `children`.
	 */
	variant?: "default" | "home";
};

export const ConversationEmptyState = ({
	className,
	title = "No messages yet",
	description = "Start a conversation to see messages here",
	icon,
	variant = "default",
	children,
	...props
}: ConversationEmptyStateProps) => (
	<div
		data-slot="ai-conversation-empty"
		data-variant={variant}
		className={cn(
			"flex size-full flex-col items-center justify-center gap-3 p-8 text-center",
			variant === "home" && "gap-6",
			className,
		)}
		{...props}
	>
		{variant === "home" ? (
			<>
				<div className="flex flex-col items-center gap-2">
					{icon && <div className="text-muted-foreground">{icon}</div>}
					<h2 className="text-[28px] leading-tight font-normal tracking-[-0.6px] text-foreground-2">
						{title}
					</h2>
					{description && (
						<p className="text-[15px] text-muted-foreground">{description}</p>
					)}
				</div>
				{children}
			</>
		) : (
			(children ?? (
				<>
					{icon && (
						<div
							data-slot="ai-conversation-empty-icon"
							className="flex size-12 items-center justify-center rounded-xl border border-border bg-card text-foreground [&_svg:not([class*='size-'])]:size-5"
						>
							{icon}
						</div>
					)}
					<div className="space-y-1">
						<h3 className="text-sm font-semibold">{title}</h3>
						{description && (
							<p className="text-[13px] text-muted-foreground">{description}</p>
						)}
					</div>
				</>
			))
		)}
	</div>
);

export type ConversationScrollButtonProps = ComponentProps<
	typeof MessageScrollerButton
>;

/** Round "scroll to latest" button; only visible when the user scrolled up. */
export const ConversationScrollButton = ({
	className,
	children,
	size = "icon",
	...props
}: ConversationScrollButtonProps) => (
	<MessageScrollerButton
		aria-label="Scroll to latest"
		size={size}
		className={cn("rounded-full", className)}
		{...props}
	>
		{children ?? (
			<IconPlaceholder
				lucide="ArrowDownIcon"
				tabler="IconArrowDown"
				hugeicons="ArrowDownIcon"
				phosphor="ArrowDownIcon"
				remixicon="RiArrowDownLine"
				className="size-4"
			/>
		)}
	</MessageScrollerButton>
);

const getMessageText = (message: UIMessage): string =>
	message.parts
		.filter((part) => part.type === "text")
		.map((part) => part.text)
		.join("");

export type ConversationDownloadProps = Omit<
	ComponentProps<typeof Button>,
	"onClick"
> & {
	messages: UIMessage[];
	filename?: string;
	formatMessage?: (message: UIMessage, index: number) => string;
};

const defaultFormatMessage = (message: UIMessage): string => {
	const roleLabel =
		message.role.charAt(0).toUpperCase() + message.role.slice(1);
	return `**${roleLabel}:** ${getMessageText(message)}`;
};

export const messagesToMarkdown = (
	messages: UIMessage[],
	formatMessage: (
		message: UIMessage,
		index: number,
	) => string = defaultFormatMessage,
): string => messages.map((msg, i) => formatMessage(msg, i)).join("\n\n");

export const ConversationDownload = ({
	messages,
	filename = "conversation.md",
	formatMessage = defaultFormatMessage,
	className,
	children,
	...props
}: ConversationDownloadProps) => {
	const handleDownload = useCallback(() => {
		const markdown = messagesToMarkdown(messages, formatMessage);
		const blob = new Blob([markdown], { type: "text/markdown" });
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = filename;
		document.body.append(link);
		link.click();
		link.remove();
		URL.revokeObjectURL(url);
	}, [messages, filename, formatMessage]);

	return (
		<Button
			data-slot="ai-conversation-download"
			aria-label="Download conversation"
			className={cn("absolute top-4 right-4 rounded-full", className)}
			onClick={handleDownload}
			size="icon"
			type="button"
			variant="outline"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="DownloadIcon"
					tabler="IconDownload"
					hugeicons="DownloadIcon"
					phosphor="DownloadIcon"
					remixicon="RiDownloadLine"
					className="size-4"
				/>
			)}
		</Button>
	);
};
