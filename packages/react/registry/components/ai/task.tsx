"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import { cn } from "cn";
import type { ComponentProps } from "react";
import { Children } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

export type TaskItemFileProps = ComponentProps<"div">;

export const TaskItemFile = ({
	children,
	className,
	...props
}: TaskItemFileProps) => (
	<div
		data-slot="ai-task-item-file"
		className={cn(
			"inline-flex h-5 items-center gap-1 rounded-md border border-border bg-secondary px-1.5 font-mono text-[11px] text-secondary-foreground [&_svg]:size-3 [&_svg]:shrink-0",
			className,
		)}
		{...props}
	>
		<IconPlaceholder
			lucide="FileIcon"
			tabler="IconFile"
			hugeicons="File01Icon"
			phosphor="FileIcon"
			remixicon="RiFileLine"
		/>
		{children}
	</div>
);

export type TaskItemStatus = "pending" | "in-progress" | "completed" | "error";

export type TaskItemProps = ComponentProps<"div"> & {
	/** ✦ Leading status icon: pending, in-progress (spinner), completed (struck through), error. */
	status?: TaskItemStatus;
};

const statusIcon = {
	pending: (
		<IconPlaceholder
			lucide="CircleIcon"
			tabler="IconCircle"
			hugeicons="CircleIcon"
			phosphor="CircleIcon"
			remixicon="RiCircleLine"
			className="text-muted-foreground-2"
		/>
	),
	"in-progress": (
		<IconPlaceholder
			lucide="Loader2Icon"
			tabler="IconLoader"
			hugeicons="Loading03Icon"
			phosphor="SpinnerIcon"
			remixicon="RiLoaderLine"
			className="animate-spin text-info-text"
		/>
	),
	completed: (
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
			className="text-success-text"
		/>
	),
	error: (
		<IconPlaceholder
			lucide="CircleAlertIcon"
			tabler="IconAlertCircle"
			hugeicons="AlertCircleIcon"
			phosphor="WarningCircleIcon"
			remixicon="RiErrorWarningLine"
			className="text-destructive-text"
		/>
	),
} as const;

export const TaskItem = ({
	children,
	className,
	status,
	...props
}: TaskItemProps) =>
	status ? (
		<div
			data-slot="ai-task-item"
			data-status={status}
			className={cn(
				"flex flex-wrap items-center gap-2 text-[13.5px] [&>svg]:size-4 [&>svg]:shrink-0",
				status === "completed" && "text-muted-foreground",
				status === "pending" && "text-muted-foreground",
				status === "error" && "text-destructive-text",
				className,
			)}
			{...props}
		>
			{statusIcon[status]}
			{/* line-through only the text, not the file chips (decorations propagate into flex items) */}
			{status === "completed"
				? Children.map(children, (child) =>
						typeof child === "string" ? (
							<span className="line-through">{child}</span>
						) : (
							child
						),
					)
				: children}
		</div>
	) : (
		<div
			data-slot="ai-task-item"
			className={cn("text-[13.5px] text-muted-foreground", className)}
			{...props}
		>
			{children}
		</div>
	);

export type TaskProps = ComponentProps<typeof Collapsible>;

export const Task = ({
	defaultOpen = true,
	className,
	...props
}: TaskProps) => (
	<Collapsible
		data-slot="ai-task"
		className={cn("not-prose", className)}
		defaultOpen={defaultOpen}
		{...props}
	/>
);

export type TaskTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
	title: string;
};

export const TaskTrigger = ({
	children,
	className,
	title,
	...props
}: TaskTriggerProps) => (
	<CollapsibleTrigger
		data-slot="ai-task-trigger"
		className={cn(
			"group/task-trigger flex w-full items-center gap-2 text-[13.5px] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
			className,
		)}
		{...props}
	>
		{children ?? (
			<>
				<IconPlaceholder
					lucide="CircleCheckIcon"
					tabler="IconCircleCheck"
					hugeicons="CheckmarkCircle02Icon"
					phosphor="CheckCircleIcon"
					remixicon="RiCheckboxCircleLine"
					className="size-4"
				/>
				<span>{title}</span>
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					className="ml-auto size-4 transition-transform group-data-[panel-open]/task-trigger:rotate-180"
				/>
			</>
		)}
	</CollapsibleTrigger>
);

export type TaskContentProps = ComponentProps<typeof CollapsibleContent>;

export const TaskContent = ({
	children,
	className,
	...props
}: TaskContentProps) => (
	<CollapsibleContent
		data-slot="ai-task-content"
		className={cn(
			"h-(--collapsible-panel-height) overflow-hidden outline-none transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
			className,
		)}
		{...props}
	>
		<div className="space-y-2 pt-2.5 pl-[23px]">{children}</div>
	</CollapsibleContent>
);
