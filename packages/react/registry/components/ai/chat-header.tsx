import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/registry/edmi/ui/dropdown-menu";

export type ChatHeaderProps = ComponentProps<"header">;

/** Thread bar: title, project indicator and actions. */
export const ChatHeader = ({ className, ...props }: ChatHeaderProps) => (
	<header
		data-slot="ai-chat-header"
		className={cn(
			"flex h-[52px] w-full items-center justify-between gap-3 rounded-[calc(var(--radius)*1.2)] border border-border bg-background pr-2.5 pl-4",
			className,
		)}
		{...props}
	/>
);

export type ChatHeaderTitleProps = ComponentProps<"div">;

/** Title with its indicators; put `ChatHeaderProject` and `ChatHeaderMenu` inside. */
export const ChatHeaderTitle = ({
	className,
	...props
}: ChatHeaderTitleProps) => (
	<div
		data-slot="ai-chat-header-title"
		className={cn("flex min-w-0 items-center gap-2.5 text-[14.5px]", className)}
		{...props}
	/>
);

export type ChatHeaderProjectProps = ComponentProps<"span"> & {
	/** `connected` shows the green dot. */
	status?: "connected" | "idle";
	icon?: ReactNode;
};

/** Project icon with a status dot (dot = connected). */
export const ChatHeaderProject = ({
	status = "connected",
	icon,
	className,
	...props
}: ChatHeaderProjectProps) => (
	<span
		data-slot="ai-chat-header-project"
		data-status={status}
		className={cn("relative inline-flex text-muted-foreground", className)}
		{...props}
	>
		{icon ?? (
			<IconPlaceholder
				lucide="ServerIcon"
				tabler="IconServer"
				hugeicons="ServerStackIcon"
				phosphor="HardDrivesIcon"
				remixicon="RiHardDriveLine"
				className="size-4"
			/>
		)}
		{status === "connected" && (
			<span className="absolute -top-px -right-0.5 size-1.5 rounded-full bg-success" />
		)}
	</span>
);

export type ChatHeaderMenuProps = ComponentProps<typeof DropdownMenuContent>;

/** Chevron after the title; children are the `DropdownMenuItem`s. */
export const ChatHeaderMenu = ({ children, ...props }: ChatHeaderMenuProps) => (
	<DropdownMenu>
		<DropdownMenuTrigger
			render={
				<Button
					aria-label="Conversation menu"
					size="icon-xs"
					type="button"
					variant="ghost"
				/>
			}
		>
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				className="size-4"
			/>
		</DropdownMenuTrigger>
		<DropdownMenuContent {...props}>{children}</DropdownMenuContent>
	</DropdownMenu>
);

export type ChatHeaderActionsProps = ComponentProps<"div">;

export const ChatHeaderActions = ({
	className,
	...props
}: ChatHeaderActionsProps) => (
	<div
		data-slot="ai-chat-header-actions"
		className={cn("flex shrink-0 items-center gap-1", className)}
		{...props}
	/>
);

export type ChatHeaderShareProps = ComponentProps<typeof Button>;

export const ChatHeaderShare = ({
	children = "Share",
	...props
}: ChatHeaderShareProps) => (
	<Button size="sm" type="button" variant="secondary" {...props}>
		{children}
	</Button>
);
