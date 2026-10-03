import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Card } from "@/registry/edmi/ui/card";
import { Separator } from "@/registry/edmi/ui/separator";

type PricingPlanProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
	name: React.ReactNode;
	tagline?: React.ReactNode;
	/** Headline price, e.g. "1% fee to you". */
	price?: React.ReactNode;
	/** Small note under the price. */
	priceNote?: React.ReactNode;
	/** Call to action, usually a full-width `Button`. */
	action?: React.ReactNode;
	features?: React.ReactNode[];
};

function PricingPlan({
	className,
	name,
	tagline,
	price,
	priceNote,
	action,
	features,
	...props
}: PricingPlanProps) {
	return (
		<Card
			data-slot="pricing-plan"
			className={cn("gap-0 p-6", className)}
			{...props}
		>
			<div className="text-[22px] font-semibold">{name}</div>
			{tagline ? (
				<div className="mt-1 text-[13.5px] text-muted-foreground">
					{tagline}
				</div>
			) : null}
			{price ? (
				<div className="mt-[22px] text-[22px] font-semibold">{price}</div>
			) : null}
			{priceNote ? (
				<div className="mt-1 text-[12.5px] text-muted-foreground">
					{priceNote}
				</div>
			) : null}
			{action ? (
				<div className="mt-[18px] [&>[data-slot=button]]:w-full">{action}</div>
			) : null}
			{features?.length ? (
				<>
					<Separator className="my-[18px]" />
					<ul className="flex flex-col gap-2.5 text-[13.5px]">
						{features.map((f, i) => (
							// biome-ignore lint/suspicious/noArrayIndexKey: static list
							<li key={i} className="flex items-center gap-2.5">
								<IconPlaceholder
									lucide="CheckIcon"
									tabler="IconCheck"
									hugeicons="Tick02Icon"
									phosphor="CheckIcon"
									remixicon="RiCheckLine"
									className="size-3.5 text-muted-foreground"
								/>
								{f}
							</li>
						))}
					</ul>
				</>
			) : null}
		</Card>
	);
}

export { PricingPlan };
