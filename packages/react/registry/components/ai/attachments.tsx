"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { FileUIPart, SourceDocumentUIPart } from "ai";
import { cn } from "cn";
import type { ComponentProps, HTMLAttributes, ReactNode } from "react";
import { createContext, useCallback, useContext, useMemo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Attachment as UiAttachment } from "@/registry/edmi/ui/attachment";
import { Button } from "@/registry/edmi/ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "@/registry/edmi/ui/hover-card";

// Thin layer on ui/attachment (DESIGN §5b): three layouts around the ui item (grid tiles, inline pills, list rows).

// ============================================================================
// Types
// ============================================================================

export type AttachmentData =
	| (FileUIPart & {
			id: string /** Bytes, shown in the list meta line. */;
			size?: number;
	  })
	| (SourceDocumentUIPart & { id: string; size?: number });

export type AttachmentMediaCategory =
	| "image"
	| "video"
	| "audio"
	| "document"
	| "source"
	| "unknown";

export type AttachmentVariant = "grid" | "inline" | "list";

const icons: Record<AttachmentMediaCategory, ReactNode> = {
	audio: (
		<IconPlaceholder
			lucide="Music2Icon"
			tabler="IconMusic"
			hugeicons="MusicNote01Icon"
			phosphor="MusicNoteIcon"
			remixicon="RiMusic2Line"
		/>
	),
	document: (
		<IconPlaceholder
			lucide="FileTextIcon"
			tabler="IconFileDescription"
			hugeicons="File01Icon"
			phosphor="FileTextIcon"
			remixicon="RiFileTextLine"
		/>
	),
	image: (
		<IconPlaceholder
			lucide="ImageIcon"
			tabler="IconPhoto"
			hugeicons="Image01Icon"
			phosphor="ImageIcon"
			remixicon="RiImageLine"
		/>
	),
	source: (
		<IconPlaceholder
			lucide="GlobeIcon"
			tabler="IconWorld"
			hugeicons="Globe02Icon"
			phosphor="GlobeIcon"
			remixicon="RiGlobalLine"
		/>
	),
	unknown: (
		<IconPlaceholder
			lucide="PaperclipIcon"
			tabler="IconPaperclip"
			hugeicons="AttachmentIcon"
			phosphor="PaperclipIcon"
			remixicon="RiAttachmentLine"
		/>
	),
	video: (
		<IconPlaceholder
			lucide="VideoIcon"
			tabler="IconVideoPlus"
			hugeicons="RecordIcon"
			phosphor="VideoIcon"
			remixicon="RiVideoLine"
		/>
	),
};

// ============================================================================
// Utility Functions
// ============================================================================

export const getMediaCategory = (
	data: AttachmentData,
): AttachmentMediaCategory => {
	if (data.type === "source-document") {
		return "source";
	}

	const mediaType = data.mediaType ?? "";

	if (mediaType.startsWith("image/")) {
		return "image";
	}
	if (mediaType.startsWith("video/")) {
		return "video";
	}
	if (mediaType.startsWith("audio/")) {
		return "audio";
	}
	if (mediaType.startsWith("application/") || mediaType.startsWith("text/")) {
		return "document";
	}

	return "unknown";
};

export const getAttachmentLabel = (data: AttachmentData): string => {
	if (data.type === "source-document") {
		return data.title || data.filename || "Source";
	}

	const category = getMediaCategory(data);
	return data.filename || (category === "image" ? "Image" : "Attachment");
};

const formatSize = (bytes?: number): string | undefined => {
	if (bytes === undefined) return undefined;
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

// ============================================================================
// Contexts
// ============================================================================

interface AttachmentsContextValue {
	variant: AttachmentVariant;
}

const AttachmentsContext = createContext<AttachmentsContextValue | null>(null);

interface AttachmentContextValue {
	data: AttachmentData;
	mediaCategory: AttachmentMediaCategory;
	onRemove?: () => void;
	variant: AttachmentVariant;
}

const AttachmentContext = createContext<AttachmentContextValue | null>(null);

export const useAttachmentsContext = () =>
	useContext(AttachmentsContext) ?? { variant: "grid" as const };

export const useAttachmentContext = () => {
	const ctx = useContext(AttachmentContext);
	if (!ctx) {
		throw new Error("Attachment components must be used within <Attachment>");
	}
	return ctx;
};

// ============================================================================
// Attachments - Container
// ============================================================================

export type AttachmentsProps = HTMLAttributes<HTMLDivElement> & {
	variant?: AttachmentVariant;
};

export const Attachments = ({
	variant = "grid",
	className,
	children,
	...props
}: AttachmentsProps) => {
	const contextValue = useMemo(() => ({ variant }), [variant]);

	return (
		<AttachmentsContext.Provider value={contextValue}>
			<div
				data-slot="ai-attachments"
				data-variant={variant}
				className={cn(
					"flex items-start",
					variant === "list" ? "w-full flex-col gap-2" : "flex-wrap gap-2",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</AttachmentsContext.Provider>
	);
};

// ============================================================================
// Attachment - Item
// ============================================================================

export type AttachmentProps = HTMLAttributes<HTMLDivElement> & {
	data: AttachmentData;
	onRemove?: () => void;
};

export const Attachment = ({
	data,
	onRemove,
	className,
	children,
	...props
}: AttachmentProps) => {
	const { variant } = useAttachmentsContext();
	const mediaCategory = getMediaCategory(data);

	const contextValue = useMemo<AttachmentContextValue>(
		() => ({ data, mediaCategory, onRemove, variant }),
		[data, mediaCategory, onRemove, variant],
	);

	return (
		<AttachmentContext.Provider value={contextValue}>
			{variant === "grid" ? (
				<div
					data-slot="ai-attachment"
					data-variant="grid"
					className={cn("group/ai-attachment relative w-[110px]", className)}
					{...props}
				>
					{children}
				</div>
			) : (
				<UiAttachment
					data-slot="ai-attachment"
					data-variant={variant}
					size={variant === "inline" ? "xs" : "default"}
					className={cn(
						"group/ai-attachment items-center",
						variant === "inline" &&
							"h-8 w-fit min-w-0 cursor-pointer rounded-lg px-2 py-0 text-[13px]",
						variant === "list" && "w-full gap-3 rounded-xl p-2.5",
						className,
					)}
					{...props}
				>
					{children}
				</UiAttachment>
			)}
		</AttachmentContext.Provider>
	);
};

// ============================================================================
// AttachmentPreview - Media preview
// ============================================================================

export type AttachmentPreviewProps = HTMLAttributes<HTMLDivElement> & {
	fallbackIcon?: ReactNode;
};

export const AttachmentPreview = ({
	fallbackIcon,
	className,
	...props
}: AttachmentPreviewProps) => {
	const { data, mediaCategory, variant } = useAttachmentContext();

	const renderContent = () => {
		if (mediaCategory === "image" && data.type === "file" && data.url) {
			return (
				<img
					alt={data.filename || "Image"}
					className={cn(
						"size-full object-cover",
						variant !== "grid" && "rounded-[5px]",
					)}
					src={data.url}
				/>
			);
		}

		if (mediaCategory === "video" && data.type === "file" && data.url) {
			return <video className="size-full object-cover" muted src={data.url} />;
		}

		return fallbackIcon ?? icons[mediaCategory];
	};

	return (
		<div
			data-slot="ai-attachment-preview"
			className={cn(
				"flex shrink-0 items-center justify-center overflow-hidden text-muted-foreground [&_svg:not([class*='size-'])]:size-4",
				variant === "grid" &&
					"h-20 w-full rounded-xl border border-border bg-muted [&_svg:not([class*='size-'])]:size-5",
				variant === "inline" && "size-4 [&_svg:not([class*='size-'])]:size-3.5",
				variant === "list" &&
					"size-9 rounded-lg border border-border bg-muted text-foreground",
				className,
			)}
			{...props}
		>
			{renderContent()}
		</div>
	);
};

// ============================================================================
// AttachmentInfo - Name and type display
// ============================================================================

export type AttachmentInfoProps = HTMLAttributes<HTMLDivElement> & {
	showMediaType?: boolean;
};

export const AttachmentInfo = ({
	showMediaType = false,
	className,
	...props
}: AttachmentInfoProps) => {
	const { data, variant } = useAttachmentContext();
	const label = getAttachmentLabel(data);
	const meta = [data.mediaType, formatSize(data.size)]
		.filter(Boolean)
		.join(" · ");

	return (
		<div
			data-slot="ai-attachment-info"
			className={cn(
				"min-w-0",
				variant === "grid" ? "mt-1.5 w-full" : "flex-1",
				className,
			)}
			{...props}
		>
			<span
				className={cn(
					"block truncate",
					variant === "inline" && "font-medium",
					variant === "list" && "text-[13.5px] font-medium",
					variant === "grid" && "text-xs text-foreground",
				)}
			>
				{label}
			</span>
			{showMediaType && meta && (
				<span className="block truncate text-xs text-muted-foreground">
					{meta}
				</span>
			)}
		</div>
	);
};

// ============================================================================
// AttachmentRemove - Remove button
// ============================================================================

export type AttachmentRemoveProps = ComponentProps<typeof Button> & {
	label?: string;
};

export const AttachmentRemove = ({
	label = "Remove",
	className,
	children,
	...props
}: AttachmentRemoveProps) => {
	const { onRemove, variant } = useAttachmentContext();

	const handleClick = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			onRemove?.();
		},
		[onRemove],
	);

	if (!onRemove) {
		return null;
	}

	return (
		<Button
			data-slot="ai-attachment-remove"
			aria-label={label}
			className={cn(
				// solid chip over the tile (DESIGN §4.7): --popover + 1px border, no transparency
				variant === "grid" &&
					"absolute top-1.5 right-1.5 size-[22px] rounded-md border border-border bg-popover p-0 hover:bg-accent [&>svg]:size-3",
				variant === "inline" && "size-5 rounded-md p-0 [&>svg]:size-3",
				variant === "list" && "size-8 shrink-0 rounded-md p-0 [&>svg]:size-4",
				className,
			)}
			onClick={handleClick}
			type="button"
			variant="ghost"
			{...props}
		>
			{children ?? (
				<IconPlaceholder
					lucide="XIcon"
					tabler="IconX"
					hugeicons="Cancel01Icon"
					phosphor="XIcon"
					remixicon="RiCloseLine"
				/>
			)}
			<span className="sr-only">{label}</span>
		</Button>
	);
};

// ============================================================================
// AttachmentHoverCard - Hover preview
// ============================================================================

export type AttachmentHoverCardProps = ComponentProps<typeof HoverCard>;

export const AttachmentHoverCard = (props: AttachmentHoverCardProps) => (
	<HoverCard {...props} />
);

export type AttachmentHoverCardTriggerProps = ComponentProps<
	typeof HoverCardTrigger
>;

export const AttachmentHoverCardTrigger = ({
	delay = 0,
	closeDelay = 0,
	...props
}: AttachmentHoverCardTriggerProps) => (
	<HoverCardTrigger closeDelay={closeDelay} delay={delay} {...props} />
);

export type AttachmentHoverCardContentProps = ComponentProps<
	typeof HoverCardContent
>;

export const AttachmentHoverCardContent = ({
	align = "start",
	className,
	...props
}: AttachmentHoverCardContentProps) => (
	<HoverCardContent
		align={align}
		className={cn("w-auto p-2", className)}
		{...props}
	/>
);

// ============================================================================
// AttachmentEmpty - Empty state
// ============================================================================

export type AttachmentEmptyProps = HTMLAttributes<HTMLDivElement>;

export const AttachmentEmpty = ({
	className,
	children,
	...props
}: AttachmentEmptyProps) => (
	<div
		data-slot="ai-attachment-empty"
		className={cn(
			"flex items-center justify-center p-4 text-sm text-muted-foreground",
			className,
		)}
		{...props}
	>
		{children ?? "No attachments"}
	</div>
);
