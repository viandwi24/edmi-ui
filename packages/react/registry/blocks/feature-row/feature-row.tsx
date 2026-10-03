"use client";

import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Card } from "@/registry/edmi/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/registry/edmi/ui/collapsible";

type FeatureRowProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
	/** Mono number, e.g. "1.1". */
	index: React.ReactNode;
	title: React.ReactNode;
	/** Trailing icon element; defaults to a plus. */
	icon?: React.ReactNode;
	/** When set the row expands to show this content. */
	children?: React.ReactNode;
};

const plus = (
	<IconPlaceholder
		lucide="PlusIcon"
		tabler="IconPlus"
		hugeicons="Add01Icon"
		phosphor="PlusIcon"
		remixicon="RiAddLine"
		className="size-4"
	/>
);

function FeatureRow({
	className,
	index,
	title,
	icon = plus,
	children,
	...props
}: FeatureRowProps) {
	const head = (
		<>
			<span className="font-mono text-xs text-muted-foreground">{index}</span>
			<span className="flex-1 text-left text-base font-medium">{title}</span>
			<span className="text-muted-foreground transition-transform group-data-[panel-open]/feature-row:rotate-45">
				{icon}
			</span>
		</>
	);
	if (!children) {
		return (
			<Card
				data-slot="feature-row"
				className={cn("h-14 flex-row items-center gap-4 px-5 py-0", className)}
				{...props}
			>
				{head}
			</Card>
		);
	}
	return (
		<Card
			data-slot="feature-row"
			className={cn("gap-0 py-0", className)}
			{...props}
		>
			<Collapsible className="group/feature-row">
				<CollapsibleTrigger className="flex h-14 w-full cursor-pointer items-center gap-4 px-5 outline-none focus-visible:bg-accent">
					{head}
				</CollapsibleTrigger>
				<CollapsibleContent className="px-5 pb-4 pl-[52px] text-sm text-muted-foreground">
					{children}
				</CollapsibleContent>
			</Collapsible>
		</Card>
	);
}

export { FeatureRow };
