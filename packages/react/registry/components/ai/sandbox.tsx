"use client";

// Derived from Vercel AI Elements (Apache-2.0), modified for Edmi UI.
import type { ToolUIPart } from "ai";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/registry/edmi/ui/tabs";

const CircleIcon = () => (
	<svg
		aria-hidden="true"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.7"
		viewBox="0 0 24 24"
	>
		<circle cx="12" cy="12" r="9" />
	</svg>
);

const CircleXIcon = () => (
	<svg
		aria-hidden="true"
		fill="none"
		stroke="currentColor"
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth="1.7"
		viewBox="0 0 24 24"
	>
		<circle cx="12" cy="12" r="9" />
		<path d="m9 9 6 6M15 9l-6 6" />
	</svg>
);

type SandboxState = ToolUIPart["state"];

const statusLabels: Record<SandboxState, string> = {
	"approval-requested": "Awaiting Approval",
	"approval-responded": "Responded",
	"input-available": "Running",
	"input-streaming": "Pending",
	"output-available": "Completed",
	"output-denied": "Denied",
	"output-error": "Error",
};

const statusVariants: Record<
	SandboxState,
	ComponentProps<typeof Badge>["variant"]
> = {
	"approval-requested": "warning",
	"approval-responded": "info",
	"input-available": "info",
	"input-streaming": "secondary",
	"output-available": "success",
	"output-denied": "warning",
	"output-error": "destructive",
};

const statusIcons: Record<SandboxState, ReactNode> = {
	"approval-requested": (
		<IconPlaceholder
			lucide="ClockIcon"
			tabler="IconClock"
			hugeicons="Clock01Icon"
			phosphor="ClockIcon"
			remixicon="RiTimeLine"
		/>
	),
	"approval-responded": (
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
		/>
	),
	"input-available": (
		<IconPlaceholder
			lucide="ClockIcon"
			tabler="IconClock"
			hugeicons="Clock01Icon"
			phosphor="ClockIcon"
			remixicon="RiTimeLine"
		/>
	),
	"input-streaming": <CircleIcon />,
	"output-available": (
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
		/>
	),
	"output-denied": <CircleXIcon />,
	"output-error": <CircleXIcon />,
};

const getStatusBadge = (status: SandboxState) => (
	<Badge shape="pill" variant={statusVariants[status]}>
		{statusIcons[status]}
		{statusLabels[status]}
	</Badge>
);

export type SandboxRootProps = ComponentProps<typeof Collapsible>;

export const Sandbox = ({ className, ...props }: SandboxRootProps) => (
	<Collapsible
		data-slot="ai-sandbox"
		className={cn(
			"not-prose group/ai-sandbox w-full overflow-hidden rounded-[calc(var(--radius)*1.2)] border border-border bg-card",
			className,
		)}
		defaultOpen
		{...props}
	/>
);

export interface SandboxHeaderProps {
	title?: string;
	state: ToolUIPart["state"];
	className?: string;
}

export const SandboxHeader = ({
	className,
	title,
	state,
	...props
}: SandboxHeaderProps) => (
	<CollapsibleTrigger
		data-slot="ai-sandbox-header"
		className={cn(
			"group/ai-sandbox-trigger flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
			className,
		)}
		{...props}
	>
		<IconPlaceholder
			lucide="TerminalSquareIcon"
			tabler="IconTerminal2"
			hugeicons="ComputerTerminalIcon"
			phosphor="TerminalIcon"
			remixicon="RiTerminalBoxLine"
			className="size-[15px] shrink-0 text-muted-foreground"
		/>
		<span className="font-mono text-[12.5px]">{title}</span>
		{getStatusBadge(state)}
		<IconPlaceholder
			lucide="ChevronDownIcon"
			tabler="IconChevronDown"
			hugeicons="ArrowDown01Icon"
			phosphor="CaretDownIcon"
			remixicon="RiArrowDownSLine"
			className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[panel-open]/ai-sandbox-trigger:rotate-180"
		/>
	</CollapsibleTrigger>
);

export type SandboxContentProps = ComponentProps<typeof CollapsibleContent>;

export const SandboxContent = ({
	className,
	...props
}: SandboxContentProps) => (
	<CollapsibleContent
		data-slot="ai-sandbox-content"
		className={cn(
			"h-(--collapsible-panel-height) overflow-hidden border-t border-border outline-none transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
			className,
		)}
		{...props}
	/>
);

export type SandboxTabsProps = ComponentProps<typeof Tabs>;

export const SandboxTabs = ({ className, ...props }: SandboxTabsProps) => (
	<Tabs
		data-slot="ai-sandbox-tabs"
		className={cn("w-full gap-0", className)}
		{...props}
	/>
);

export type SandboxTabsBarProps = ComponentProps<"div">;

export const SandboxTabsBar = ({
	className,
	...props
}: SandboxTabsBarProps) => (
	<div
		data-slot="ai-sandbox-tabs-bar"
		className={cn("flex w-full items-center px-3 pt-2.5", className)}
		{...props}
	/>
);

export type SandboxTabsListProps = ComponentProps<typeof TabsList>;

export const SandboxTabsList = ({ ...props }: SandboxTabsListProps) => (
	<TabsList {...props} />
);

export type SandboxTabsTriggerProps = ComponentProps<typeof TabsTrigger>;

export const SandboxTabsTrigger = ({
	className,
	...props
}: SandboxTabsTriggerProps) => (
	<TabsTrigger
		className={cn("h-[26px] px-3.5 text-[12.5px]", className)}
		{...props}
	/>
);

export type SandboxTabContentProps = ComponentProps<typeof TabsContent>;

export const SandboxTabContent = ({
	className,
	...props
}: SandboxTabContentProps) => (
	<TabsContent
		data-slot="ai-sandbox-tab-content"
		className={cn("px-3 pt-2.5 pb-3 text-sm", className)}
		{...props}
	/>
);
