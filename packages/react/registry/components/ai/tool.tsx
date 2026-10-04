"use client";

import type { DynamicToolUIPart, ToolUIPart } from "ai";
import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { isValidElement } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Badge } from "@/registry/edmi/ui/badge";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";
import {
	type Elevation,
	SurfaceProvider,
	useElevation,
} from "@/registry/edmi/ui/elevation";

export type ToolProps = ComponentProps<typeof Collapsible> & {
	/** ✦ depth of the card (sunken -1, flat 0, raised +1, floating +2). */
	elevation?: Elevation;
};

// surface role: same faces as the ui card
const toolElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

export const Tool = ({ className, elevation, ...props }: ToolProps) => {
	const level = useElevation(elevation, "surface");
	return (
		<SurfaceProvider level={level}>
			<Collapsible
				data-slot="ai-tool"
				className={cn(
					"group/tool not-prose w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground",
					toolElevation[level],
					className,
				)}
				{...props}
			/>
		</SurfaceProvider>
	);
};

export type ToolPart = ToolUIPart | DynamicToolUIPart;

export type ToolHeaderProps = {
	title?: string;
	className?: string;
} & (
	| { type: ToolUIPart["type"]; state: ToolUIPart["state"]; toolName?: never }
	| {
			type: DynamicToolUIPart["type"];
			state: DynamicToolUIPart["state"];
			toolName: string;
	  }
);

const statusLabels: Record<ToolPart["state"], string> = {
	"approval-requested": "Awaiting approval",
	"approval-responded": "Responded",
	"input-available": "Running",
	"input-streaming": "Pending",
	"output-available": "Completed",
	"output-denied": "Denied",
	"output-error": "Error",
};

const statusVariants: Record<
	ToolPart["state"],
	"secondary" | "info" | "warning" | "success" | "outline" | "destructive"
> = {
	"approval-requested": "warning",
	"approval-responded": "secondary",
	"input-available": "info",
	"input-streaming": "secondary",
	"output-available": "success",
	"output-denied": "outline",
	"output-error": "destructive",
};

const statusIcons: Record<ToolPart["state"], ReactNode> = {
	"approval-requested": (
		<IconPlaceholder
			lucide="ShieldIcon"
			tabler="IconShield"
			hugeicons="ShieldIcon"
			phosphor="ShieldIcon"
			remixicon="RiShieldLine"
		/>
	),
	"approval-responded": (
		<IconPlaceholder
			lucide="CheckIcon"
			tabler="IconCheck"
			hugeicons="Tick02Icon"
			phosphor="CheckIcon"
			remixicon="RiCheckLine"
		/>
	),
	"input-available": (
		<IconPlaceholder
			lucide="ClockIcon"
			tabler="IconClock"
			hugeicons="Clock01Icon"
			phosphor="ClockIcon"
			remixicon="RiTimeLine"
			className="animate-pulse"
		/>
	),
	"input-streaming": (
		<IconPlaceholder
			lucide="CircleIcon"
			tabler="IconCircle"
			hugeicons="CircleIcon"
			phosphor="CircleIcon"
			remixicon="RiCircleLine"
		/>
	),
	"output-available": (
		<IconPlaceholder
			lucide="CircleCheckIcon"
			tabler="IconCircleCheck"
			hugeicons="CheckmarkCircle02Icon"
			phosphor="CheckCircleIcon"
			remixicon="RiCheckboxCircleLine"
		/>
	),
	"output-denied": (
		<IconPlaceholder
			lucide="XIcon"
			tabler="IconX"
			hugeicons="Cancel01Icon"
			phosphor="XIcon"
			remixicon="RiCloseLine"
		/>
	),
	"output-error": (
		<IconPlaceholder
			lucide="CircleXIcon"
			tabler="IconCircleX"
			hugeicons="CancelCircleIcon"
			phosphor="XCircleIcon"
			remixicon="RiCloseCircleLine"
		/>
	),
};

export const getStatusBadge = (status: ToolPart["state"]) => (
	<Badge
		className="gap-1"
		data-slot="ai-tool-status"
		shape="pill"
		variant={statusVariants[status]}
	>
		{statusIcons[status]}
		{statusLabels[status]}
	</Badge>
);

export const ToolHeader = ({
	className,
	title,
	type,
	state,
	toolName,
	...props
}: ToolHeaderProps) => {
	const derivedName =
		type === "dynamic-tool" ? toolName : type.split("-").slice(1).join("-");

	return (
		<CollapsibleTrigger
			data-slot="ai-tool-header"
			className={cn(
				"group/tool-trigger flex w-full items-center gap-2.5 px-3.5 py-2.5 text-left text-[13.5px] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring",
				className,
			)}
			{...props}
		>
			<IconPlaceholder
				lucide="WrenchIcon"
				tabler="IconTool"
				hugeicons="Wrench01Icon"
				phosphor="WrenchIcon"
				remixicon="RiToolsLine"
				className="size-[15px] shrink-0 text-muted-foreground"
			/>
			<span className="font-mono text-[12.5px]">{title ?? derivedName}</span>
			{getStatusBadge(state)}
			<IconPlaceholder
				lucide="ChevronDownIcon"
				tabler="IconChevronDown"
				hugeicons="ArrowDown01Icon"
				phosphor="CaretDownIcon"
				remixicon="RiArrowDownSLine"
				className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform group-data-[panel-open]/tool-trigger:rotate-180"
			/>
		</CollapsibleTrigger>
	);
};

export type ToolContentProps = ComponentProps<typeof CollapsibleContent>;

export const ToolContent = ({
	className,
	children,
	...props
}: ToolContentProps) => (
	<CollapsibleContent
		data-slot="ai-tool-content"
		className={cn(
			"h-(--collapsible-panel-height) overflow-hidden outline-none transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
			className,
		)}
		{...props}
	>
		<div className="space-y-3 border-t border-border px-3.5 py-3 text-[13px]">
			{children}
		</div>
	</CollapsibleContent>
);

const labelClass =
	"mb-1.5 font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase";
const preClass =
	"m-0 overflow-x-auto rounded-lg bg-muted px-3 py-2.5 font-mono text-xs leading-[1.6] whitespace-pre text-foreground";

export type ToolInputProps = ComponentProps<"div"> & {
	input: ToolPart["input"];
};

export const ToolInput = ({ className, input, ...props }: ToolInputProps) => (
	<div
		data-slot="ai-tool-input"
		className={cn("overflow-hidden", className)}
		{...props}
	>
		<div className={labelClass}>Parameters</div>
		<pre className={preClass}>{JSON.stringify(input, null, 2)}</pre>
	</div>
);

export type ToolOutputProps = ComponentProps<"div"> & {
	output: ToolPart["output"];
	errorText: ToolPart["errorText"];
};

export const ToolOutput = ({
	className,
	output,
	errorText,
	...props
}: ToolOutputProps) => {
	if (!(output || errorText)) {
		return null;
	}

	let body: ReactNode;
	if (errorText) {
		body = (
			<pre
				className={cn(preClass, "bg-destructive-soft text-destructive-text")}
			>
				{errorText}
			</pre>
		);
	} else if (isValidElement(output)) {
		body = <div className="overflow-x-auto">{output}</div>;
	} else if (typeof output === "string") {
		body = <pre className={preClass}>{output}</pre>;
	} else {
		body = <pre className={preClass}>{JSON.stringify(output, null, 2)}</pre>;
	}

	return (
		<div data-slot="ai-tool-output" className={className} {...props}>
			<div className={labelClass}>{errorText ? "Error" : "Result"}</div>
			{body}
		</div>
	);
};
