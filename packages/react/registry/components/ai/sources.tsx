"use client";

import { cn } from "cn";
import type { ComponentProps } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

export type SourcesProps = ComponentProps<typeof Collapsible>;

export const Sources = ({ className, ...props }: SourcesProps) => (
	<Collapsible
		data-slot="ai-sources"
		className={cn("not-prose text-[13.5px]", className)}
		{...props}
	/>
);

export type SourcesTriggerProps = ComponentProps<typeof CollapsibleTrigger> & {
	count: number;
};

export const SourcesTrigger = ({
	className,
	count,
	children,
	...props
}: SourcesTriggerProps) => (
	<CollapsibleTrigger
		data-slot="ai-sources-trigger"
		className={cn(
			"group/sources-trigger flex w-full items-center gap-2 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
			className,
		)}
		{...props}
	>
		{children ?? (
			<>
				<IconPlaceholder
					lucide="BookmarkIcon"
					tabler="IconBookmark"
					hugeicons="BookmarkIcon"
					phosphor="BookmarkIcon"
					remixicon="RiBookmarkLine"
					className="size-4"
				/>
				<span>
					Used {count} {count === 1 ? "source" : "sources"}
				</span>
				<IconPlaceholder
					lucide="ChevronDownIcon"
					tabler="IconChevronDown"
					hugeicons="ArrowDown01Icon"
					phosphor="CaretDownIcon"
					remixicon="RiArrowDownSLine"
					className="ml-auto size-4 transition-transform group-data-[panel-open]/sources-trigger:rotate-180"
				/>
			</>
		)}
	</CollapsibleTrigger>
);

export type SourcesContentProps = ComponentProps<typeof CollapsibleContent>;

export const SourcesContent = ({
	className,
	children,
	...props
}: SourcesContentProps) => (
	<CollapsibleContent
		data-slot="ai-sources-content"
		className={cn(
			"h-(--collapsible-panel-height) overflow-hidden outline-none transition-[height] duration-200 ease-out data-[ending-style]:h-0 data-[starting-style]:h-0",
			className,
		)}
		{...props}
	>
		<div className="flex flex-col gap-1.5 pt-2 pl-[23px]">{children}</div>
	</CollapsibleContent>
);

export type SourceProps = ComponentProps<"a">;

const hostOf = (href?: string) => {
	if (!href) return undefined;
	try {
		return new URL(href).hostname.replace(/^www\./, "");
	} catch {
		return undefined;
	}
};

export const Source = ({
	href,
	title,
	className,
	children,
	...props
}: SourceProps) => {
	const host = hostOf(href);
	return (
		<a
			data-slot="ai-source"
			className={cn("flex items-center gap-2 text-foreground", className)}
			href={href}
			rel="noreferrer"
			target="_blank"
			{...props}
		>
			{children ?? (
				<>
					<IconPlaceholder
						lucide="GlobeIcon"
						tabler="IconWorld"
						hugeicons="Globe02Icon"
						phosphor="GlobeIcon"
						remixicon="RiGlobalLine"
						className="size-3.5 shrink-0 text-muted-foreground"
					/>
					<span className="underline underline-offset-[3px]">{title}</span>
					{host && (
						<span className="font-mono text-[11.5px] text-muted-foreground">
							{host}
						</span>
					)}
				</>
			)}
		</a>
	);
};
