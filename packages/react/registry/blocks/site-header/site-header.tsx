import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

type SiteHeaderLink = { label: string; href: string };

// Dark tile with a chart glyph: the Stockbreak mark (`raised` ✦ adds the 3D gradient). Pass `logo` to replace it.
function SiteHeaderMark({
	className,
	raised = false,
	...props
}: React.ComponentProps<"span"> & { raised?: boolean }) {
	return (
		<span
			data-slot="site-header-mark"
			className={cn(
				"inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground",
				raised &&
					"border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary shadow-btn-primary [background-origin:border-box]",
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
	raised = false,
	...props
}: Omit<React.ComponentProps<"a">, "children"> & {
	logo?: React.ReactNode;
	name?: React.ReactNode;
	raised?: boolean;
}) {
	return (
		<a
			data-slot="site-header-brand"
			href={href}
			className={cn("flex items-center gap-2.5 whitespace-nowrap", className)}
			{...props}
		>
			{logo ?? <SiteHeaderMark raised={raised} />}
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
	raised = false,
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
	/** ✦ one-step 3D look: header card and mark (pass `raised` to the CTA Button yourself). */
	raised?: boolean;
}) {
	return (
		<header
			data-slot="site-header"
			className={cn(
				"flex w-full items-center justify-between gap-6 rounded-xl border border-border bg-card px-5 py-3.5 text-sm text-card-foreground",
				raised && "border-b-lip shadow-card",
				className,
			)}
			{...props}
		>
			<SiteHeaderBrand logo={logo} name={name} href={href} raised={raised} />
			<nav className="flex items-center gap-1 max-md:hidden" aria-label="Main">
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
			{action ? <div className="ml-4 flex items-center">{action}</div> : null}
		</header>
	);
}

export type { SiteHeaderLink };
export { SiteHeader, SiteHeaderBrand, SiteHeaderMark };
