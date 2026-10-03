import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@edmi-react/ui/item";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { type ArtifactType, banner, groups, menu, tabs, tiles } from "./data";

const tone: Record<ArtifactType, string> = {
	docs: "bg-[color-mix(in_srgb,var(--chart-2)_14%,var(--card))] text-chart-2",
	slides: "bg-[color-mix(in_srgb,var(--chart-3)_14%,var(--card))] text-chart-3",
	design: "bg-[color-mix(in_srgb,var(--chart-4)_14%,var(--card))] text-chart-4",
};

function TypeIcon({
	type,
	className,
}: {
	type: ArtifactType;
	className?: string;
}) {
	if (type === "docs")
		return (
			<IconPlaceholder
				lucide="FileTextIcon"
				tabler="IconFileDescription"
				hugeicons="File01Icon"
				phosphor="FileTextIcon"
				remixicon="RiFileTextLine"
				className={className}
			/>
		);
	if (type === "slides")
		return (
			<IconPlaceholder
				lucide="AppWindowIcon"
				tabler="IconAppWindow"
				hugeicons="BrowserIcon"
				phosphor="AppWindowIcon"
				remixicon="RiWindowLine"
				className={className}
			/>
		);
	return (
		<IconPlaceholder
			lucide="PaletteIcon"
			tabler="IconPalette"
			hugeicons="PaintBoardIcon"
			phosphor="PaletteIcon"
			remixicon="RiPaletteLine"
			className={className}
		/>
	);
}

export default function LibraryExample() {
	const [tab, setTab] = useState("all");
	const [bannerOpen, setBannerOpen] = useState(true);

	return (
		<div className="min-h-svh bg-background text-foreground">
			<div className="mx-auto w-full max-w-[920px] px-5 py-[30px] sm:px-[34px]">
				<h1 className="font-serif text-[30px] leading-tight font-normal tracking-[-0.3px]">
					Library
				</h1>

				<div className="mt-[18px] flex flex-wrap items-center justify-between gap-2">
					<Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
						<TabsList variant="pills">
							{tabs.map((t) => (
								<TabsTrigger key={t.value} value={t.value}>
									{t.label}
								</TabsTrigger>
							))}
						</TabsList>
					</Tabs>
					<div className="flex items-center gap-1">
						<Button
							aria-label="Search"
							size="icon-sm"
							type="button"
							variant="ghost"
						>
							<IconPlaceholder
								lucide="SearchIcon"
								tabler="IconSearch"
								hugeicons="SearchIcon"
								phosphor="MagnifyingGlassIcon"
								remixicon="RiSearchLine"
								className="size-4"
							/>
						</Button>
						<Button
							aria-label="Grid view"
							size="icon-sm"
							type="button"
							variant="ghost"
						>
							<IconPlaceholder
								lucide="LayoutGridIcon"
								tabler="IconLayoutGrid"
								hugeicons="GridViewIcon"
								phosphor="GridFourIcon"
								remixicon="RiLayoutGridLine"
								className="size-4"
							/>
						</Button>
						<Button size="sm" type="button" variant="secondary">
							Edmi Design
							<IconPlaceholder
								lucide="ChevronDownIcon"
								tabler="IconChevronDown"
								hugeicons="ArrowDown01Icon"
								phosphor="CaretDownIcon"
								remixicon="RiArrowDownSLine"
							/>
						</Button>
					</div>
				</div>

				{bannerOpen && (
					<Card className="mt-[18px] flex-row items-start justify-between gap-3 px-4 py-3.5">
						<div>
							<div className="text-sm font-semibold">{banner.title}</div>
							<div className="mt-0.5 text-[13.5px] text-muted-foreground">
								{banner.text}
							</div>
							<Button
								className="mt-2.5"
								size="sm"
								type="button"
								variant="secondary"
							>
								{banner.action}
								<IconPlaceholder
									lucide="ArrowUpRightIcon"
									tabler="IconArrowUpRight"
									hugeicons="ArrowUpRight01Icon"
									phosphor="ArrowUpRightIcon"
									remixicon="RiArrowRightUpLine"
								/>
							</Button>
						</div>
						<Button
							aria-label="Dismiss"
							size="icon-sm"
							type="button"
							variant="ghost"
							onClick={() => setBannerOpen(false)}
						>
							<IconPlaceholder
								lucide="XIcon"
								tabler="IconX"
								hugeicons="Cancel01Icon"
								phosphor="XIcon"
								remixicon="RiCloseLine"
								className="size-4"
							/>
						</Button>
					</Card>
				)}

				<div className="mt-[22px] mb-2.5 text-[13px] text-muted-foreground">
					Make something new
				</div>
				<div className="grid grid-cols-3 gap-3.5 sm:max-w-[538px]">
					{tiles.map((t) => (
						<div key={t.type} className="flex flex-col gap-2">
							<div
								className={`flex h-[118px] w-full items-center justify-center rounded-[calc(var(--radius)*1.4)] border border-border ${tone[t.type]}`}
							>
								<TypeIcon type={t.type} className="size-6" />
							</div>
							<div className="flex items-center gap-1.5 text-sm">
								{t.label}
								<Badge variant="secondary" className="h-[18px] text-[10.5px]">
									Beta
								</Badge>
							</div>
						</div>
					))}
				</div>

				{groups.map((g) => {
					const items = g.items.filter(
						(i) => tab === "all" || (tab === "shared" ? i.shared : !i.shared),
					);
					if (items.length === 0) return null;
					return (
						<section key={g.label}>
							<div className="mt-[22px] mb-0.5 text-[13px] text-muted-foreground">
								{g.label}
							</div>
							<ItemGroup>
								{items.map((i) => (
									<Item key={i.id} className="px-0 py-3">
										<span
											className={`inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] ${tone[i.type]}`}
										>
											<TypeIcon type={i.type} className="size-[18px]" />
										</span>
										<ItemContent>
											<ItemTitle className="text-[15px] font-normal">
												{i.title}
											</ItemTitle>
											{i.note && <ItemDescription>{i.note}</ItemDescription>}
										</ItemContent>
										<ItemActions>
											<span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
												<IconPlaceholder
													lucide="LockIcon"
													tabler="IconLock"
													hugeicons="SquareLock02Icon"
													phosphor="LockKeyIcon"
													remixicon="RiLockLine"
													className="size-3.5"
												/>
												<span className="max-sm:hidden">{i.viewed}</span>
											</span>
											<DropdownMenu>
												<DropdownMenuTrigger
													render={
														<Button
															aria-label="More"
															size="icon-sm"
															type="button"
															variant="ghost"
														/>
													}
												>
													<IconPlaceholder
														lucide="MoreHorizontalIcon"
														tabler="IconDots"
														hugeicons="MoreHorizontalCircle01Icon"
														phosphor="DotsThreeOutlineIcon"
														remixicon="RiMoreLine"
														className="size-4 rotate-90"
													/>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													{menu.map((m) => (
														<DropdownMenuItem
															key={m}
															variant={
																m === "Delete" ? "destructive" : "default"
															}
														>
															{m}
														</DropdownMenuItem>
													))}
												</DropdownMenuContent>
											</DropdownMenu>
										</ItemActions>
									</Item>
								))}
							</ItemGroup>
						</section>
					);
				})}
			</div>
		</div>
	);
}
