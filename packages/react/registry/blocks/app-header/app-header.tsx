import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	type Elevation,
	type ElevationLevel,
	useElevation,
} from "@/registry/edmi/ui/elevation";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/registry/edmi/ui/input-group";
import { Kbd } from "@/registry/edmi/ui/kbd";

type AppHeaderItem = { label: string; href: string };

const surfaceElevation = {
	sunken: "border-sk-bd bg-sk-bg shadow-sunken",
	flat: "",
	raised: "border-transparent shadow-raised",
	floating: "border-transparent shadow-floating",
};

// A header that rises hands the same depth to the controls it renders; `flat` and `sunken` keep them flat.
const rises = (level: ElevationLevel) =>
	level === "raised" || level === "floating";

function AppHeaderMark({ elevation }: { elevation?: Elevation }) {
	const raised = rises(useElevation(elevation, "handle"));
	return (
		<span
			className={cn(
				"inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground",
				raised &&
					"[background-image:var(--r1-p-face)] shadow-btn-raised-primary [background-origin:border-box]",
			)}
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

// Nav pills stand alone (no track): the `pills` Tabs look. Active = --tab-active + 1px border; `raised` makes the active pill a raised secondary button.
function AppHeaderNavItem({
	className,
	active,
	elevation,
	...props
}: React.ComponentProps<"a"> & {
	active?: boolean;
	/** ✦ raised +1 / floating +2 raise the active pill. */
	elevation?: Elevation;
}) {
	const raised = rises(useElevation(elevation, "control"));
	return (
		<a
			data-slot="app-header-nav-item"
			data-active={active ? "" : undefined}
			aria-current={active ? "page" : undefined}
			className={cn(
				"inline-flex h-8 items-center rounded-[7px] border border-transparent px-3 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				"data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground",
				raised &&
					"data-[active]:border-transparent data-[active]:[background-image:var(--r1-s-face)] data-[active]:shadow-btn-raised-neutral data-[active]:[background-origin:border-box]",
				className,
			)}
			{...props}
		/>
	);
}

// App top bar (navbar layout): brand + nav pills, then search, network and wallet.
function AppHeader({
	className,
	logo,
	name = "Stockbreak",
	href = "/",
	items = [],
	active,
	search = true,
	searchPlaceholder = "Search",
	shortcut = "⌘K",
	network = "Devnet",
	connectLabel = "Connect",
	onConnect,
	onNetworkClick,
	elevation,
	...props
}: Omit<React.ComponentProps<"header">, "children"> & {
	logo?: React.ReactNode;
	name?: React.ReactNode;
	href?: string;
	items?: AppHeaderItem[];
	/** `href` of the active item. */
	active?: string;
	/** `false` hides the search field. */
	search?: boolean;
	searchPlaceholder?: string;
	shortcut?: string;
	/** Network label; empty string hides the button. */
	network?: string;
	connectLabel?: React.ReactNode;
	onConnect?: () => void;
	onNetworkClick?: () => void;
	/** ✦ depth of the header plate; raised +1 / floating +2 also raise the mark, active pill and buttons. */
	elevation?: Elevation;
}) {
	const level = useElevation(elevation, "surface");
	const raised = rises(level);
	const control =
		elevation && elevation !== "auto"
			? raised
				? "raised"
				: "flat"
			: undefined;
	return (
		<header
			data-slot="app-header"
			className={cn(
				"@container/app-header flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 text-sm text-card-foreground",
				surfaceElevation[level],
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-[18px]">
				<a href={href} className="flex items-center gap-2.5 whitespace-nowrap">
					{logo ?? <AppHeaderMark elevation={control} />}
					<span className="font-brand text-xl font-semibold tracking-[-0.4px]">
						{name}
					</span>
				</a>
				<nav
					className="flex items-center gap-0.5 max-lg:hidden"
					aria-label="App"
				>
					{items.map((item) => (
						<AppHeaderNavItem
							key={item.href}
							href={item.href}
							active={item.href === active}
							elevation={control}
						>
							{item.label}
						</AppHeaderNavItem>
					))}
				</nav>
			</div>
			<div className="flex items-center gap-2">
				{search ? (
					<InputGroup className="w-[180px] @max-[960px]/app-header:hidden">
						<InputGroupAddon>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="SearchIcon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
							/>
						</InputGroupAddon>
						<InputGroupInput
							placeholder={searchPlaceholder}
							aria-label={searchPlaceholder}
							className="text-[13px]"
						/>
						<InputGroupAddon align="inline-end">
							<Kbd elevation={control}>{shortcut}</Kbd>
						</InputGroupAddon>
					</InputGroup>
				) : null}
				{network ? (
					<Button
						variant="secondary"
						elevation={control}
						onClick={onNetworkClick}
					>
						{network}
					</Button>
				) : null}
				<Button elevation={control} onClick={onConnect}>
					<IconPlaceholder
						lucide="WalletIcon"
						tabler="IconWallet"
						hugeicons="WalletIcon"
						phosphor="WalletIcon"
						remixicon="RiWalletLine"
					/>
					{connectLabel}
				</Button>
			</div>
		</header>
	);
}

export type { AppHeaderItem };
export { AppHeader, AppHeaderNavItem };
