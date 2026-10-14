import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Card } from "@/registry/edmi/ui/card";
import type { Elevation } from "@/registry/edmi/ui/elevation";

type StepCardProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
	/** Mono step number, e.g. "01". */
	index: React.ReactNode;
	title: React.ReactNode;
	description?: React.ReactNode;
	/** Corner icon element; defaults to an arrow up-right. */
	icon?: React.ReactNode;
	/** ✦ depth of the card: sunken -1, flat 0, raised +1, floating +2. */
	elevation?: Elevation;
};

const arrow = (
	<IconPlaceholder
		lucide="ArrowUpRightIcon"
		tabler="IconArrowUpRight"
		hugeicons="ArrowUpRightIcon"
		phosphor="ArrowUpRightIcon"
		remixicon="RiArrowRightUpLine"
		className="size-3.5"
	/>
);

function StepCard({
	className,
	index,
	title,
	description,
	icon = arrow,
	elevation,
	...props
}: StepCardProps) {
	return (
		<Card
			data-slot="step-card"
			elevation={elevation}
			className={cn("gap-0 p-[18px]", className)}
			{...props}
		>
			<div className="flex items-center justify-between">
				<span className="font-mono text-xs text-muted-foreground">{index}</span>
				<span className="text-muted-foreground">{icon}</span>
			</div>
			<div className="mt-[18px] text-base font-semibold">{title}</div>
			{description ? (
				<div className="mt-1.5 text-[13px] text-muted-foreground">
					{description}
				</div>
			) : null}
		</Card>
	);
}

export { StepCard };
