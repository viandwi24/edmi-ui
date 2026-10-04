import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { type Elevation, useElevation } from "@/registry/edmi/ui/elevation";

type SiteHeaderLink = { label: string; href: string };

const surfaceElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

// Dark tile with a chart glyph: the Stockbreak mark (`raised` adds the raised face). Pass `logo` to replace it.
function SiteHeaderMark({
	className,
	elevation,
	...props
}: React.ComponentProps<"span"> & { elevation?: Elevation }) {
	const level = useElevation(elevation, "handle");
	const raised = level === "raised" || level === "floating";
	return (
		<span
			data-slot="site-header-mark"
			className={cn(
				"inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground",
				raised &&
					"[background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]",
				className,
			)}
			{...props}
		>
			<IconPlaceholder
				lucide="ChartLineIcon"
				tabler="IconChartLine"
				hugeicons="ChartLineData01Icon"
				phosphor="ChartLineUpIcon"
				remixicon="RiLineChartLine"
				className="size-[15px]"
			/>
		</span>
	);
}

function SiteHeaderBrand({
	className,
	logo,
	name = "Stockbreak",
	href = "/",
	elevation,
	...props
}: Omit<React.ComponentProps<"a">, "children"> & {
	logo?: React.ReactNode;
	name?: React.ReactNode;
	/** ✦ depth of the mark. */
	elevation?: Elevation;
}) {
	return (
		<a
			data-slot="site-header-brand"
			href={href}
			className={cn("flex items-center gap-2.5 whitespace-nowrap", className)}
			{...props}
		>
			{logo ?? <SiteHeaderMark elevation={elevation} />}
			<span className="font-brand text-xl font-semibold tracking-[-0.4px]">
				{name}
			</span>
		</a>
	);
}

// Marketing top bar (navbar layout): brand, a muted lead-in with a stepped list, plain links, one CTA.
function SiteHeader({
	className,
	logo,
	name,
	href,
	lead,
	steps = [],
	links = [],
	action,
	elevation,
	...props
}: Omit<React.ComponentProps<"header">, "children"> & {
	logo?: React.ReactNode;
	name?: React.ReactNode;
	href?: string;
	/** Muted lead-in before the stepped list, e.g. "How to". */
	lead?: React.ReactNode;
	steps?: SiteHeaderLink[];
	links?: SiteHeaderLink[];
	/** Trailing slot, usually a `<Button>`. */
	action?: React.ReactNode;
	/** ✦ depth of the header plate; raised +1 / floating +2 also raise the mark (pass `elevation` to the CTA Button yourself). */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "surface");
	const raised = level === "raised" || level === "floating";
	return (
		<header
			data-slot="site-header"
			className={cn(
				"flex w-full items-center justify-between gap-6 rounded-xl border border-border bg-card px-5 py-3.5 text-sm text-card-foreground",
				surfaceElevation[level],
				className,
			)}
			{...props}
		>
			<SiteHeaderBrand
				logo={logo}
				name={name}
				href={href}
				elevation={
					elevation && elevation !== "auto"
						? raised
							? "raised"
							: "flat"
						: undefined
				}
			/>
			<nav
				className="flex items-center gap-1 whitespace-nowrap max-md:hidden"
				aria-label="Main"
			>
				{lead ? <span className="text-muted-foreground-2">{lead}</span> : null}
				{steps.map((s) => (
					<span key={s.href} className="flex items-center">
						<span className="mx-2.5 h-3 w-px bg-border" aria-hidden />
						<a href={s.href} className="hover:text-muted-foreground">
							{s.label}
						</a>
					</span>
				))}
				{links.map((l, i) => (
					<a
						key={l.href}
						href={l.href}
						className={cn(
							"hover:text-muted-foreground",
							i === 0 ? "ml-7" : "ml-[18px]",
						)}
					>
						{l.label}
					</a>
				))}
			</nav>
			{action ? (
				<div className="ml-4 flex shrink-0 items-center">{action}</div>
			) : null}
		</header>
	);
}

export type { SiteHeaderLink };
export { SiteHeader, SiteHeaderBrand, SiteHeaderMark };
