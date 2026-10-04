import { cn } from "cn";
import type * as React from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { Button } from "@/registry/edmi/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/registry/edmi/ui/input-group";
import { Kbd } from "@/registry/edmi/ui/kbd";

type AppHeaderItem = { label: string; href: string };

function AppHeaderMark({ raised = false }: { raised?: boolean }) {
	return (
		<span
			className={cn(
				"inline-flex size-7 items-center justify-center rounded-lg border border-transparent bg-primary text-primary-foreground",
				raised &&
					"border-primary-edge border-b-primary-lip bg-linear-to-b from-primary-hi to-primary shadow-btn-primary [background-origin:border-box]",
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

// Nav pills stand alone (no track): the `pills` Tabs look. Active = --tab-active + 1px border; `raised` ✦ makes it a 3D secondary button.
function AppHeaderNavItem({
	className,
	active,
	raised = false,
	...props
}: React.ComponentProps<"a"> & { active?: boolean; raised?: boolean }) {
	return (
		<a
			data-slot="app-header-nav-item"
			data-active={active ? "" : undefined}
			aria-current={active ? "page" : undefined}
			className={cn(
				"inline-flex h-8 items-center rounded-[7px] border border-transparent px-3 text-[13.5px] font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
				"data-[active]:border-border data-[active]:bg-tab-active data-[active]:text-foreground",
				raised &&
					"data-[active]:border-input data-[active]:border-b-secondary-lip data-[active]:bg-linear-to-b data-[active]:from-secondary-hi data-[active]:to-secondary data-[active]:shadow-btn-secondary data-[active]:[background-origin:border-box]",
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
	raised = false,
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
	/** ✦ one-step 3D look: header card, active nav pill, buttons. */
	raised?: boolean;
}) {
	return (
		<header
			data-slot="app-header"
			className={cn(
				"@container/app-header flex w-full items-center justify-between gap-4 rounded-xl border border-border bg-card px-5 py-3 text-sm text-card-foreground",
				raised && "border-b-lip shadow-card",
				className,
			)}
			{...props}
		>
			<div className="flex items-center gap-[18px]">
				<a href={href} className="flex items-center gap-2.5 whitespace-nowrap">
					{logo ?? <AppHeaderMark raised={raised} />}
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
							raised={raised}
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
							<Kbd elevation={raised ? "raised" : undefined}>{shortcut}</Kbd>
						</InputGroupAddon>
					</InputGroup>
				) : null}
				{network ? (
					<Button
						variant="secondary"
						elevation={raised ? "raised" : undefined}
						onClick={onNetworkClick}
					>
						{network}
					</Button>
				) : null}
				<Button elevation={raised ? "raised" : undefined} onClick={onConnect}>
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
