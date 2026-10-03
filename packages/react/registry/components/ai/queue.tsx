"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import { Button } from "@/registry/edmi/ui/button";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";
import { ScrollArea } from "@/registry/edmi/ui/scroll-area";

export interface QueueMessagePart {
	type: string;
	text?: string;
	url?: string;
	filename?: string;
	mediaType?: string;
}

export interface QueueMessage {
	id: string;
	parts: QueueMessagePart[];
}

export interface QueueTodo {
	id: string;
	title: string;
	description?: string;
	status?: "pending" | "completed";
}

export type QueueItemProps = ComponentProps<"li">;

export const QueueItem = ({ className, ...props }: QueueItemProps) => (
	<li
		data-slot="ai-queue-item"
		className={cn(
			"group/queue-item flex flex-col gap-0.5 rounded-[7px] px-2 py-[7px] text-[13.5px] transition-colors hover:bg-accent",
			className,
		)}
		{...props}
	/>
);

export type QueueItemIndicatorProps = ComponentProps<"span"> & {
	completed?: boolean;
};

export const QueueItemIndicator = ({
	completed = false,
	className,
	...props
}: QueueItemIndicatorProps) => (
	<span
		data-slot="ai-queue-item-indicator"
		className={cn(
			"mt-0.5 inline-block size-3.5 shrink-0 rounded-full border-[1.5px]",
			completed
				? "border-[color-mix(in_srgb,var(--success)_40%,var(--popover))] bg-success-soft"
				: "border-muted-foreground-2",
			className,
		)}
		{...props}
	/>
);

// QueueItemAvatar: leading slot (avatar, icon) of an item row
export type QueueItemAvatarProps = ComponentProps<"span">;

export const QueueItemAvatar = ({
	className,
	...props
}: QueueItemAvatarProps) => (
	<span
		data-slot="ai-queue-item-avatar"
		className={cn("flex shrink-0 items-center", className)}
		{...props}
	/>
);

// QueueItemStatus: trailing slot (age, spinner, status dot) of an item row
export type QueueItemStatusProps = ComponentProps<"span">;

export const QueueItemStatus = ({
	className,
	...props
}: QueueItemStatusProps) => (
	<span
		data-slot="ai-queue-item-status"
		className={cn(
			"flex shrink-0 items-center gap-2 text-xs text-muted-foreground",
			className,
		)}
		{...props}
	/>
);

export type QueueItemContentProps = ComponentProps<"span"> & {
	completed?: boolean;
};

export const QueueItemContent = ({
	completed = false,
	className,
	...props
}: QueueItemContentProps) => (
	<span
		data-slot="ai-queue-item-content"
		className={cn(
			"line-clamp-1 grow break-words",
			completed ? "text-muted-foreground-2 line-through" : "text-foreground",
			className,
		)}
		{...props}
	/>
);

export type QueueItemDescriptionProps = ComponentProps<"div"> & {
	completed?: boolean;
};

export const QueueItemDescription = ({
	completed = false,
	className,
	...props
}: QueueItemDescriptionProps) => (
	<div
		data-slot="ai-queue-item-description"
		className={cn(
			"ml-[22px] text-xs",
			completed
				? "text-muted-foreground-2 line-through"
				: "text-muted-foreground",
			className,
		)}
		{...props}
	/>
);

export type QueueItemActionsProps = ComponentProps<"div">;

export const QueueItemActions = ({
	className,
	...props
}: QueueItemActionsProps) => (
	<div
		data-slot="ai-queue-item-actions"
		className={cn("flex gap-0.5", className)}
		{...props}
	/>
);

export type QueueItemActionProps = Omit<
	ComponentProps<typeof Button>,
	"variant" | "size"
>;

export const QueueItemAction = ({
	className,
	...props
}: QueueItemActionProps) => (
	<Button
		data-slot="ai-queue-item-action"
		className={cn(
			"text-muted-foreground opacity-0 transition-opacity group-focus-within/queue-item:opacity-100 group-hover/queue-item:opacity-100 hover:text-foreground focus-visible:opacity-100",
			className,
		)}
		size="icon-xs"
		type="button"
		variant="ghost"
		{...props}
	/>
);

export type QueueItemAttachmentProps = ComponentProps<"div">;

export const QueueItemAttachment = ({
	className,
	...props
}: QueueItemAttachmentProps) => (
	<div
		data-slot="ai-queue-item-attachment"
		className={cn("mt-1 ml-[22px] flex flex-wrap gap-2", className)}
		{...props}
	/>
);

export type QueueItemImageProps = ComponentProps<"img">;

export const QueueItemImage = ({
	className,
	alt = "",
	...props
}: QueueItemImageProps) => (
	<img
		alt={alt}
		className={cn(
			"size-8 rounded-md border border-border object-cover",
			className,
		)}
		height={32}
		width={32}
		{...props}
	/>
);

export type QueueItemFileProps = ComponentProps<"span">;

export const QueueItemFile = ({
	children,
	className,
	...props
}: QueueItemFileProps) => (
	<span
		data-slot="ai-queue-item-file"
		className={cn(
			"flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1 text-xs",
			className,
		)}
		{...props}
	>
		<IconPlaceholder
			lucide="PaperclipIcon"
			tabler="IconPaperclip"
			hugeicons="AttachmentIcon"
			phosphor="PaperclipIcon"
			remixicon="RiAttachmentLine"
			className="size-3"
		/>
		<span className="max-w-[100px] truncate">{children}</span>
	</span>
);

export type QueueListProps = ComponentProps<typeof ScrollArea>;

export const QueueList = ({
	children,
	className,
	...props
}: QueueListProps) => (
	<ScrollArea
		data-slot="ai-queue-list"
		className={cn("mt-0.5", className)}
		{...props}
	>
		<div className="max-h-48">
			<ul>{children}</ul>
		</div>
	</ScrollArea>
);

// QueueSection: collapsible section container; a section that follows another gets the divider.
export type QueueSectionProps = ComponentProps<typeof Collapsible>;

export const QueueSection = ({
	className,
	defaultOpen = true,
	...props
}: QueueSectionProps) => (
	<Collapsible
		data-slot="ai-queue-section"
		className={cn(
			"not-first:mt-1.5 not-first:border-t not-first:border-border-2 not-first:pt-1.5",
			className,
		)}
		defaultOpen={defaultOpen}
		{...props}
	/>
);

// QueueSectionTrigger: section header
export type QueueSectionTriggerProps = ComponentProps<
	typeof CollapsibleTrigger
>;

export const QueueSectionTrigger = ({
	children,
	className,
	...props
}: QueueSectionTriggerProps) => (
	<CollapsibleTrigger
		data-slot="ai-queue-section-trigger"
		className={cn(
			"group/queue-trigger flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] font-semibold text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
			className,
		)}
		{...props}
	>
		{children}
	</CollapsibleTrigger>
);

// QueueSectionLabel: chevron, optional icon, label and a count badge
export type QueueSectionLabelProps = ComponentProps<"span"> & {
	count?: number;
	label: string;
	icon?: ReactNode;
	/** ✦ Show the collapse chevron (default true). */
	chevron?: boolean;
};

export const QueueSectionLabel = ({
	count,
	label,
	icon,
	chevron = true,
	className,
	...props
}: QueueSectionLabelProps) => (
	<span
		data-slot="ai-queue-section-label"
		className={cn("flex items-center gap-2", className)}
		{...props}
	>
		{chevron && (
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				className="size-4 text-muted-foreground transition-transform group-data-[panel-open]/queue-trigger:rotate-180"
			/>
		)}
		{icon}
		<span>{label}</span>
		{count !== undefined && (
			<Badge className="h-5" shape="number" variant="secondary">
				{count}
			</Badge>
		)}
	</span>
);

// QueueSectionContent: collapsible content area
export type QueueSectionContentProps = ComponentProps<
	typeof CollapsibleContent
>;

export const QueueSectionContent = ({
	className,
	...props
}: QueueSectionContentProps) => (
	<CollapsibleContent
		data-slot="ai-queue-section-content"
		className={cn(
			"h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
			className,
		)}
		{...props}
	/>
);

export type QueueProps = ComponentProps<"div"> & {
	/** ✦ `card` (default) or `flat` (no border, fill or padding). */
	variant?: "card" | "flat";
};

export const Queue = ({
	className,
	variant = "card",
	...props
}: QueueProps) => (
	<div
		data-slot="ai-queue"
		data-variant={variant}
		className={cn(
			"not-prose flex flex-col",
			variant === "card" && "rounded-xl border border-border bg-card p-2",
			className,
		)}
		{...props}
	/>
);
