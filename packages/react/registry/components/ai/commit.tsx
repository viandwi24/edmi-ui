"use client";

import { cn } from "cn";
import type { ComponentProps, HTMLAttributes } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Avatar, AvatarFallback } from "@/registry/edmi/ui/avatar";
import { Badge } from "@/registry/edmi/ui/badge";
import { Button } from "@/registry/edmi/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

export type CommitProps = ComponentProps<typeof Collapsible>;

/** A git commit: author, message, time, short hash and the changed files. */
export const Commit = ({ className, children, ...props }: CommitProps) => (
	<Collapsible
		data-slot="ai-commit"
		className={cn(
			"overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
			className,
		)}
		{...props}
	>
		{children}
	</Collapsible>
);

export type CommitHeaderProps = HTMLAttributes<HTMLDivElement>;

export const CommitHeader = ({
	className,
	children,
	...props
}: CommitHeaderProps) => (
	<div
		data-slot="ai-commit-header"
		className={cn("flex items-start gap-2.5 px-4 py-3.5", className)}
		{...props}
	>
		{children}
	</div>
);

export type CommitHashProps = HTMLAttributes<HTMLSpanElement>;

/** Hash chip: mono, outline. Put `CommitCopyButton` inside it for the board's chip with a copy icon. */
export const CommitHash = ({
	className,
	children,
	...props
}: CommitHashProps) => (
	<span
		className={cn(
			"inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md border border-input px-2 font-mono text-xs text-foreground",
			className,
		)}
		{...props}
	>
		{children}
	</span>
);

export type CommitMessageProps = HTMLAttributes<HTMLSpanElement>;

export const CommitMessage = ({
	className,
	children,
	...props
}: CommitMessageProps) => (
	<span className={cn("text-[13.5px] font-semibold", className)} {...props}>
		{children}
	</span>
);

export type CommitMetadataProps = HTMLAttributes<HTMLDivElement>;

export const CommitMetadata = ({
	className,
	children,
	...props
}: CommitMetadataProps) => (
	<div
		className={cn(
			"flex items-center gap-1.5 text-xs text-muted-foreground",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type CommitSeparatorProps = HTMLAttributes<HTMLSpanElement>;

export const CommitSeparator = ({
	className,
	children,
	...props
}: CommitSeparatorProps) => (
	<span className={className} {...props}>
		{children ?? "·"}
	</span>
);

export type CommitInfoProps = HTMLAttributes<HTMLDivElement>;

export const CommitInfo = ({
	className,
	children,
	...props
}: CommitInfoProps) => (
	<div
		className={cn("flex min-w-0 flex-1 flex-col gap-0.5", className)}
		{...props}
	>
		{children}
	</div>
);

export type CommitAuthorProps = HTMLAttributes<HTMLDivElement>;

export const CommitAuthor = ({
	className,
	children,
	...props
}: CommitAuthorProps) => (
	<div className={cn("flex items-center", className)} {...props}>
		{children}
	</div>
);

export type CommitAuthorAvatarProps = ComponentProps<typeof Avatar> & {
	initials: string;
};

export const CommitAuthorAvatar = ({
	initials,
	className,
	...props
}: CommitAuthorAvatarProps) => (
	<Avatar className={cn("size-[30px]", className)} {...props}>
		<AvatarFallback className="text-[11px]">{initials}</AvatarFallback>
	</Avatar>
);

export type CommitTimestampProps = HTMLAttributes<HTMLTimeElement> & {
	date: Date;
};

const relativeTimeFormat = new Intl.RelativeTimeFormat("en", {
	numeric: "auto",
});

const formatRelativeDate = (date: Date) => {
	const seconds = Math.round((date.getTime() - Date.now()) / 1000);
	const steps: [Intl.RelativeTimeFormatUnit, number][] = [
		["day", 86_400],
		["hour", 3600],
		["minute", 60],
	];
	for (const [unit, size] of steps) {
		if (Math.abs(seconds) >= size) {
			return relativeTimeFormat.format(Math.round(seconds / size), unit);
		}
	}
	return relativeTimeFormat.format(0, "second");
};

export const CommitTimestamp = ({
	date,
	className,
	children,
	...props
}: CommitTimestampProps) => {
	const [formatted, setFormatted] = useState("");

	useEffect(() => {
		setFormatted(formatRelativeDate(date));
	}, [date]);

	return (
		<time
			className={cn("text-xs", className)}
			dateTime={date.toISOString()}
			{...props}
		>
			{children ?? formatted}
		</time>
	);
};

export type CommitActionsProps = HTMLAttributes<HTMLDivElement>;

const handleActionsClick = (e: React.MouseEvent) => e.stopPropagation();
const handleActionsKeyDown = (e: React.KeyboardEvent) => e.stopPropagation();

export const CommitActions = ({
	className,
	children,
	...props
}: CommitActionsProps) => (
	// biome-ignore lint/a11y/useSemanticElements: a plain group that only stops propagation
	<div
		className={cn("flex items-center gap-1", className)}
		onClick={handleActionsClick}
		onKeyDown={handleActionsKeyDown}
		role="group"
		{...props}
	>
		{children}
	</div>
);

export type CommitCopyButtonProps = ComponentProps<typeof Button> & {
	hash: string;
	onCopy?: () => void;
	onError?: (error: Error) => void;
	timeout?: number;
};

export const CommitCopyButton = ({
	hash,
	onCopy,
	onError,
	timeout = 2000,
	children,
	className,
	...props
}: CommitCopyButtonProps) => {
	const [isCopied, setIsCopied] = useState(false);
	const timeoutRef = useRef<number>(0);

	const copyToClipboard = useCallback(async () => {
		if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
			onError?.(new Error("Clipboard API not available"));
			return;
		}

		try {
			if (!isCopied) {
				await navigator.clipboard.writeText(hash);
				setIsCopied(true);
				onCopy?.();
				timeoutRef.current = window.setTimeout(
					() => setIsCopied(false),
					timeout,
				);
			}
		} catch (error) {
			onError?.(error as Error);
		}
	}, [hash, onCopy, onError, timeout, isCopied]);

	useEffect(
		() => () => {
			window.clearTimeout(timeoutRef.current);
		},
		[],
	);

	return (
		<Button
			aria-label="Copy hash"
			className={cn(
				"size-4 shrink-0 rounded-sm text-muted-foreground",
				className,
			)}
			onClick={copyToClipboard}
			size="icon-xs"
			variant="ghost"
			{...props}
		>
			{children ??
				(isCopied ? (
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
						className="size-3"
					/>
				) : (
					<IconPlaceholder
						lucide="CopyIcon"
						tabler="IconCopy"
						hugeicons="Copy01Icon"
						phosphor="CopyIcon"
						remixicon="RiFileCopyLine"
						className="size-3"
					/>
				))}
		</Button>
	);
};

export type CommitFilesToggleProps = ComponentProps<
	typeof CollapsibleTrigger
> & {
	/** Number of files; renders "N files changed" when no children are given. */
	count?: number;
};

/** ✦ The "N files changed" row that opens and closes the file list (sits under the header, own top border). */
export const CommitFilesToggle = ({
	count,
	className,
	children,
	...props
}: CommitFilesToggleProps) => (
	<div className="border-t border-border-2 px-4 pt-2 pb-1.5">
		<CollapsibleTrigger
			className={cn(
				"group/commit-toggle flex w-full cursor-pointer items-center gap-2 py-1 text-left text-[13.5px] text-muted-foreground outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				className,
			)}
			{...props}
		>
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				className="size-3.5 transition-transform group-data-[panel-open]/commit-toggle:rotate-180"
			/>
			<span>
				{children ?? `${count ?? 0} file${count === 1 ? "" : "s"} changed`}
			</span>
		</CollapsibleTrigger>
	</div>
);

export type CommitContentProps = ComponentProps<typeof CollapsibleContent>;

export const CommitContent = ({
	className,
	children,
	...props
}: CommitContentProps) => (
	<CollapsibleContent className={cn("px-4 pb-3", className)} {...props}>
		{children}
	</CollapsibleContent>
);

export type CommitFilesProps = HTMLAttributes<HTMLDivElement>;

export const CommitFiles = ({
	className,
	children,
	...props
}: CommitFilesProps) => (
	<div className={cn("flex flex-col", className)} {...props}>
		{children}
	</div>
);

export type CommitFileProps = HTMLAttributes<HTMLDivElement>;

export const CommitFile = ({
	className,
	children,
	...props
}: CommitFileProps) => (
	<div
		className={cn(
			"flex items-center justify-between gap-2 py-1 text-[12.5px]",
			className,
		)}
		{...props}
	>
		{children}
	</div>
);

export type CommitFileInfoProps = HTMLAttributes<HTMLDivElement>;

export const CommitFileInfo = ({
	className,
	children,
	...props
}: CommitFileInfoProps) => (
	<div className={cn("flex min-w-0 items-center gap-2", className)} {...props}>
		{children}
	</div>
);

const fileStatusVariants = {
	added: "success",
	deleted: "destructive",
	modified: "warning",
	renamed: "info",
} as const;

const fileStatusLabels = {
	added: "A",
	deleted: "D",
	modified: "M",
	renamed: "R",
};

export type CommitFileStatusProps = ComponentProps<typeof Badge> & {
	status: "added" | "modified" | "deleted" | "renamed";
};

export const CommitFileStatus = ({
	status,
	className,
	children,
	...props
}: CommitFileStatusProps) => (
	<Badge
		className={cn(
			"h-[18px] w-5 justify-center p-0 font-mono text-[10.5px]",
			className,
		)}
		variant={fileStatusVariants[status]}
		{...props}
	>
		{children ?? fileStatusLabels[status]}
	</Badge>
);

export type CommitFileIconProps = ComponentProps<"svg">;

export const CommitFileIcon = ({
	className,
	...props
}: CommitFileIconProps) => (
	<IconPlaceholder
		lucide="FileIcon"
		tabler="IconFileWord"
		hugeicons="File01Icon"
		phosphor="FileIcon"
		remixicon="RiFileLine"
		className={cn("size-3.5 shrink-0 text-muted-foreground", className)}
		{...props}
	/>
);

export type CommitFilePathProps = HTMLAttributes<HTMLSpanElement>;

export const CommitFilePath = ({
	className,
	children,
	...props
}: CommitFilePathProps) => (
	<span className={cn("truncate font-mono", className)} {...props}>
		{children}
	</span>
);

export type CommitFileChangesProps = HTMLAttributes<HTMLDivElement>;

export const CommitFileChanges = ({
	className,
	children,
	...props
}: CommitFileChangesProps) => (
	<div
		className={cn("flex shrink-0 items-center gap-2 font-mono", className)}
		{...props}
	>
		{children}
	</div>
);

export type CommitFileAdditionsProps = HTMLAttributes<HTMLSpanElement> & {
	count: number;
};

/** `+12`; always rendered (`+0` stays visible, board AI 05). */
export const CommitFileAdditions = ({
	count,
	className,
	children,
	...props
}: CommitFileAdditionsProps) => (
	<span className={cn("text-success-text", className)} {...props}>
		{children ?? `+${count}`}
	</span>
);

export type CommitFileDeletionsProps = HTMLAttributes<HTMLSpanElement> & {
	count: number;
};

export const CommitFileDeletions = ({
	count,
	className,
	children,
	...props
}: CommitFileDeletionsProps) => (
	<span className={cn("text-destructive-text", className)} {...props}>
		{children ?? `−${count}`}
	</span>
);
