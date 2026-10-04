"use client";

import { cn } from "cn";
import type { ComponentProps, ReactNode } from "react";
import { Children, memo } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { CodeBlock } from "@/registry/edmi/components/ai/code-block";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/registry/edmi/ui/accordion";
import { Badge } from "@/registry/edmi/ui/badge";
import { Card } from "@/registry/edmi/ui/card";

// Section label (DESIGN §5b `.ai-lbl`): mono 11px caps.
const LABEL =
	"font-mono text-[11px] font-medium tracking-[0.8px] text-muted-foreground uppercase";

export type AgentProps = ComponentProps<typeof Card>;

/** An agent's configuration at a glance. Built on the ui card; `raised` ✦ gives the one-step 3D look. */
export const Agent = memo(
	({ className, raised = false, ...props }: AgentProps) => (
		<Card
			data-slot="ai-agent"
			className={cn("not-prose w-full gap-0 py-0", className)}
			raised={raised}
			{...props}
		/>
	),
);

export type AgentHeaderProps = ComponentProps<"div"> & {
	name: string;
	model?: string;
};

export const AgentHeader = memo(
	({ className, name, model, ...props }: AgentHeaderProps) => (
		<div
			data-slot="ai-agent-header"
			className={cn(
				"flex w-full items-center gap-2.5 border-b border-border px-4 py-3.5",
				className,
			)}
			{...props}
		>
			<span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand-text">
				<IconPlaceholder
					lucide="SparklesIcon"
					tabler="IconSparkles"
					hugeicons="SparklesIcon"
					phosphor="SparkleIcon"
					remixicon="RiSparklingLine"
					className="size-4"
				/>
			</span>
			<span className="text-sm font-semibold">{name}</span>
			{model && (
				<Badge className="h-5 font-mono text-[11px]" variant="secondary">
					{model}
				</Badge>
			)}
		</div>
	),
);

export type AgentContentProps = ComponentProps<"div">;

export const AgentContent = memo(
	({ className, ...props }: AgentContentProps) => (
		<div className={cn("flex flex-col gap-4 p-4", className)} {...props} />
	),
);

export type AgentInstructionsProps = Omit<ComponentProps<"div">, "children"> & {
	children: ReactNode;
};

export const AgentInstructions = memo(
	({ className, children, ...props }: AgentInstructionsProps) => (
		<div className={cn("flex flex-col gap-1.5", className)} {...props}>
			<span className={LABEL}>Instructions</span>
			<div className="text-[13.5px] leading-[1.6] text-foreground-2">
				{children}
			</div>
		</div>
	),
);

export type AgentToolsProps = ComponentProps<typeof Accordion>;

export const AgentTools = memo(
	({ className, children, ...props }: AgentToolsProps) => (
		<div className="flex flex-col gap-1">
			<span className={LABEL}>Tools · {Children.count(children)}</span>
			<Accordion
				className={cn("border-t border-border-2", className)}
				{...props}
			>
				{children}
			</Accordion>
		</div>
	),
);

export type AgentToolProps = ComponentProps<typeof AccordionItem> & {
	tool: {
		// Matches the AI SDK `Tool` shape (`description`, `inputSchema`) without requiring it;
		// a string schema is shown as typescript, anything else as JSON.
		description?: string;
		inputSchema?: unknown;
		jsonSchema?: unknown;
	};
	/** ✦ Tool name shown in mono before the description; falls back to `value`. */
	name?: string;
};

export const AgentTool = memo(
	({ className, tool, value, name, ...props }: AgentToolProps) => {
		const schema =
			"jsonSchema" in tool && tool.jsonSchema
				? tool.jsonSchema
				: tool.inputSchema;

		return (
			<AccordionItem
				className={cn("border-t-0 border-b border-border-2", className)}
				value={value}
				{...props}
			>
				<AccordionTrigger className="gap-2 py-[9px] text-[13px] font-normal">
					<IconPlaceholder
						lucide="Settings2Icon"
						tabler="IconSettings"
						hugeicons="Settings05Icon"
						phosphor="GearIcon"
						remixicon="RiSettingsLine"
						className="size-3.5 shrink-0 text-muted-foreground"
					/>
					<span className="font-mono text-[12.5px]">
						{name ?? String(value ?? "")}
					</span>
					<span className="min-w-0 flex-1 truncate text-[13px] font-normal text-muted-foreground">
						{tool.description ?? "No description"}
					</span>
				</AccordionTrigger>
				<AccordionContent className="pb-2.5">
					<CodeBlock
						className="rounded-lg border-0 bg-muted"
						code={
							typeof schema === "string"
								? schema
								: JSON.stringify(schema, null, 2)
						}
						language={typeof schema === "string" ? "typescript" : "json"}
					/>
				</AccordionContent>
			</AccordionItem>
		);
	},
);

export type AgentOutputProps = ComponentProps<"div"> & {
	schema: string;
};

export const AgentOutput = memo(
	({ className, schema, ...props }: AgentOutputProps) => (
		<div className={cn("flex flex-col gap-1.5", className)} {...props}>
			<span className={LABEL}>Output schema</span>
			<CodeBlock
				className="rounded-lg border-0 bg-muted"
				code={schema}
				language="typescript"
			/>
		</div>
	),
);

Agent.displayName = "Agent";
AgentHeader.displayName = "AgentHeader";
AgentContent.displayName = "AgentContent";
AgentInstructions.displayName = "AgentInstructions";
AgentTools.displayName = "AgentTools";
AgentTool.displayName = "AgentTool";
AgentOutput.displayName = "AgentOutput";
