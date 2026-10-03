import { cn } from "cn";
import type * as React from "react";
import { Card } from "@/registry/edmi/ui/card";
import { Separator } from "@/registry/edmi/ui/separator";

type FooterLink = { label: React.ReactNode; href: string };
type FooterColumn = { title: React.ReactNode; links: FooterLink[] };

type SiteFooterProps = Omit<React.ComponentProps<typeof Card>, "title"> & {
	/** Brand lockup (logo + wordmark). */
	brand?: React.ReactNode;
	description?: React.ReactNode;
	/** Social icon buttons slot. */
	socials?: React.ReactNode;
	columns?: FooterColumn[];
	/** Bottom-left legal line. */
	legal?: React.ReactNode;
	/** Bottom-right note. */
	note?: React.ReactNode;
};

function SiteFooter({
	className,
	brand,
	description,
	socials,
	columns,
	legal,
	note,
	...props
}: SiteFooterProps) {
	return (
		<Card
			data-slot="site-footer"
			className={cn("gap-0 px-8 py-7", className)}
			{...props}
		>
			<div className="flex flex-wrap justify-between gap-8">
				<div className="flex flex-col gap-3">
					{brand}
					{description ? (
						<span className="max-w-[260px] text-[12.5px] text-muted-foreground">
							{description}
						</span>
					) : null}
					{socials ? (
						<div className="flex items-center gap-2">{socials}</div>
					) : null}
				</div>
				{columns?.map((col, i) => (
					// biome-ignore lint/suspicious/noArrayIndexKey: static columns
					<nav key={i} className="flex flex-col gap-2 text-[13.5px]">
						<span className="text-xs text-muted-foreground">{col.title}</span>
						{col.links.map((l) => (
							<a
								key={l.href + String(l.label)}
								href={l.href}
								className="w-fit hover:text-foreground-2"
							>
								{l.label}
							</a>
						))}
					</nav>
				))}
			</div>
			{legal || note ? (
				<>
					<Separator className="mt-[22px] mb-3.5" />
					<div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
						<span>{legal}</span>
						<span>{note}</span>
					</div>
				</>
			) : null}
		</Card>
	);
}

export type { FooterColumn, FooterLink };
export { SiteFooter };
