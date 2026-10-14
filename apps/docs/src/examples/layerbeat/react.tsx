import { Avatar, AvatarFallback } from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldLabel,
	FieldTitle,
} from "@edmi-react/ui/field";
import { Input } from "@edmi-react/ui/input";
import { Kbd } from "@edmi-react/ui/kbd";
import { Label } from "@edmi-react/ui/label";
import { RadioGroup, RadioGroupItem } from "@edmi-react/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarTrigger,
	useSidebar,
} from "@edmi-react/ui/sidebar";
import { Switch } from "@edmi-react/ui/switch";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@edmi-react/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useMemo, useRef, useState } from "react";
import {
	availableCredit,
	billingTerms,
	configurationCount,
	type Flag as FlagData,
	formatUsd,
	type Image,
	images,
	type Location,
	locations,
	navPlatform,
	navWorkspace,
	type Plan,
	type PlanCategory,
	planCategories,
	plans,
	type Region,
	regions,
	workspaces,
} from "./data";
import {
	ArrowUpRightIcon,
	CaretDownIcon,
	CaretUpDownIcon,
	CheckCircleIcon,
	CpuIcon,
	CreditCardIcon,
	FileTextIcon,
	HomeIcon,
	KeyIcon,
	LogoMark,
	MemoryIcon,
	MoonIcon,
	RefreshIcon,
	ServerIcon,
	SunIcon,
	UsersIcon,
} from "./react/icons";

const navIcons = {
	home: HomeIcon,
	server: ServerIcon,
	billing: CreditCardIcon,
	key: KeyIcon,
	team: UsersIcon,
} as const;

// Tiny striped flag (3 bands) used in location cards and the summary.
function Flag({ flag }: { flag: FlagData }) {
	const [a, b, c] = flag.colors;
	const bands =
		flag.dir === "h"
			? `linear-gradient(to bottom, ${a} 33.3%, ${b} 33.3% 66.6%, ${c} 66.6%)`
			: `linear-gradient(to right, ${a} 33.3%, ${b} 33.3% 66.6%, ${c} 66.6%)`;
	return (
		<span
			aria-hidden
			className="inline-block h-3.5 w-5 shrink-0 rounded-[2px]"
			style={{ background: bands }}
		/>
	);
}

// Round distro mark: a coloured disc (Ubuntu gets its circle of friends).
function OsLogo({
	color,
	ubuntu = false,
}: {
	color: string;
	ubuntu?: boolean;
}) {
	return (
		<svg width={22} height={22} viewBox="0 0 24 24" aria-hidden>
			<circle cx="12" cy="12" r="11" fill={color} />
			{ubuntu ? (
				<>
					<circle
						cx="12"
						cy="12"
						r="5.2"
						fill="none"
						stroke="#fff"
						strokeWidth="2.2"
					/>
					<circle cx="5.6" cy="12" r="2" fill="#fff" />
					<circle cx="15.2" cy="6.5" r="2" fill="#fff" />
					<circle cx="15.2" cy="17.5" r="2" fill="#fff" />
				</>
			) : null}
		</svg>
	);
}

// One numbered configuration step: Kbd index + title, optional description, then the controls.
function StepCard({
	index,
	title,
	description,
	children,
}: {
	index: string;
	title: string;
	description?: string;
	children: React.ReactNode;
}) {
	return (
		<Card className="gap-0 px-[26px] pt-[22px] pb-[26px]">
			<div className="flex items-center gap-3">
				<Kbd className="h-6 min-w-7 text-[11.5px]">{index}</Kbd>
				<h2 className="text-lg font-semibold tracking-[-0.2px]">{title}</h2>
			</div>
			{description ? (
				<p className="mt-3 text-sm text-muted-foreground">{description}</p>
			) : null}
			<div className="mt-[18px]">{children}</div>
		</Card>
	);
}

// Tailwind scans for whole class names, so each tint is spelled out.
const tints = {
	1: "border-[color-mix(in_srgb,var(--chart-1)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-1)_12%,var(--card))] text-chart-1",
	2: "border-[color-mix(in_srgb,var(--chart-2)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-2)_12%,var(--card))] text-chart-2",
	3: "border-[color-mix(in_srgb,var(--chart-3)_22%,transparent)] bg-[color-mix(in_srgb,var(--chart-3)_12%,var(--card))] text-chart-3",
} as const;

function Spec({
	icon,
	label,
	value,
	n,
}: {
	icon: React.ReactNode;
	label: string;
	value: string;
	n: 1 | 2 | 3;
}) {
	return (
		<div className={`flex-1 rounded-xl border px-3 py-2.5 ${tints[n]}`}>
			<div className="flex items-center gap-1.5 text-[12.5px]">
				{icon}
				<span className="text-foreground-2">{label}</span>
			</div>
			<div className="mt-1.5 font-mono text-[17px] text-foreground">
				{value}
			</div>
		</div>
	);
}

function Row({ label, value }: { label: string; value: string }) {
	return (
		<div className="flex items-center justify-between text-[13.5px]">
			<span className="text-muted-foreground">{label}</span>
			<span className="font-medium">{value}</span>
		</div>
	);
}

// Sticky raised summary: the only raised surface besides the CTA and the billing segmented control.
function SummaryCard({
	category,
	location,
	plan,
	image,
	version,
	termLabel,
	total,
}: {
	category: string;
	location: Location;
	plan: Plan;
	image: Image;
	version: string;
	termLabel: string;
	total: number;
}) {
	return (
		<Card elevation="raised" className="gap-0 p-0">
			<div className="relative overflow-hidden border-b border-border-2 bg-[linear-gradient(160deg,var(--brand-soft),var(--card)_75%)] px-5 pt-5 pb-[18px]">
				<span className="absolute -right-[26px] -bottom-[30px] size-[110px] rounded-full bg-[color-mix(in_srgb,var(--chart-2)_35%,transparent)]" />
				<span className="absolute right-[30px] -bottom-10 h-[90px] w-[70px] rounded-[40px] bg-[color-mix(in_srgb,var(--chart-1)_30%,transparent)]" />
				<div className="relative flex items-center justify-between">
					<span className="inline-flex size-11 items-center justify-center rounded-xl border border-border bg-popover">
						<OsLogo color={image.color} ubuntu={image.id === "ubuntu"} />
					</span>
					<Badge variant="brand" shape="pill">
						{category}
					</Badge>
				</div>
				<div className="relative mt-4 text-[22px] font-semibold tracking-[-0.4px]">
					Your new server
				</div>
				<div className="relative mt-1 font-mono text-xs text-muted-foreground">
					{plan.id}
				</div>
				<div className="relative mt-3.5 flex items-center gap-2 text-sm font-medium">
					<Flag flag={location.flag} />
					{location.city}
				</div>
			</div>
			<div className="flex flex-col gap-3.5 px-5 pt-[18px] pb-5">
				<div className="flex gap-2">
					<Spec
						icon={<CpuIcon className="size-3.5" />}
						label="vCPU"
						value={String(plan.vcpu)}
						n={1}
					/>
					<Spec
						icon={<MemoryIcon className="size-3.5" />}
						label="RAM"
						value={`${plan.ram} GB`}
						n={2}
					/>
					<Spec
						icon={<ServerIcon className="size-3.5" />}
						label="SSD"
						value={`${plan.ssd} GB`}
						n={3}
					/>
				</div>
				<Row label="Image" value={`${image.name} ${version}`} />
				<Row label="Billing term" value={termLabel} />
				<Row label="Location" value={`${location.city}, ${location.country}`} />
				<div className="rounded-xl border border-[color-mix(in_srgb,var(--brand)_25%,var(--popover))] bg-brand-soft px-4 py-3.5">
					<div className="text-[13px] text-foreground-2">Purchase total</div>
					<div className="mt-1 font-mono text-[30px] tracking-[-0.5px]">
						{formatUsd(total)}
					</div>
					<div className="mt-0.5 text-xs text-muted-foreground">
						Full term · USD
					</div>
				</div>
				<div className="flex items-center justify-between rounded-xl bg-success-soft px-3.5 py-2.5 text-[13.5px]">
					<span className="flex items-center gap-2">
						<CreditCardIcon className="size-[15px]" />
						Available credit
					</span>
					<span className="font-mono font-medium text-success-text">
						{formatUsd(availableCredit)}
					</span>
				</div>
				<p className="rounded-xl border border-border px-3.5 py-3 text-xs leading-normal text-muted-foreground">
					Review your configuration before purchasing. Credit is used only when
					you confirm.
				</p>
				<Button elevation="raised" size="lg" className="w-full">
					Purchase server
				</Button>
				<Button variant="ghost" className="-mt-1.5 w-full">
					Save as draft
				</Button>
			</div>
		</Card>
	);
}

// The sidebar subtree carries its own `dark` class: it stays navy in light mode (scoped theming).
function AppSidebar() {
	const groups = [
		{ label: "Platform", items: navPlatform },
		{ label: "Workspace", items: navWorkspace },
	];
	return (
		<Sidebar collapsible="offcanvas">
			<div className="dark flex h-full w-full flex-col bg-[#0b2a6f] text-sidebar-foreground">
				<SidebarHeader className="flex-row items-center justify-between px-4 pt-5 pb-3">
					<a
						href="#/"
						className="flex items-center gap-2 font-brand text-xl font-semibold tracking-[-0.4px] text-white"
					>
						<LogoMark />
						Layerbeat
					</a>
					<SidebarTrigger className="text-muted-foreground hover:bg-[color-mix(in_srgb,white_10%,#0b2a6f)] hover:text-foreground" />
				</SidebarHeader>
				<SidebarContent className="px-2">
					{groups.map((group) => (
						<SidebarGroup key={group.label}>
							<SidebarGroupLabel className="text-[11.5px] tracking-[0.6px] uppercase">
								{group.label}
							</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									{group.items.map((item) => {
										const Icon = navIcons[item.icon];
										const active = "active" in item && item.active;
										const badge = "badge" in item ? item.badge : undefined;
										return (
											<SidebarMenuItem key={item.label}>
												<SidebarMenuButton
													isActive={active}
													className="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,#0b2a6f)] data-[active]:bg-[color-mix(in_srgb,white_9%,#0b2a6f)] data-[active]:text-foreground data-[active]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--brand)_55%,#0b2a6f)]"
													render={<a href="#/" />}
												>
													<Icon />
													<span>{item.label}</span>
												</SidebarMenuButton>
												{badge ? (
													<SidebarMenuBadge className="rounded-md border border-border bg-secondary text-secondary-foreground">
														{badge}
													</SidebarMenuBadge>
												) : null}
											</SidebarMenuItem>
										);
									})}
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					))}
				</SidebarContent>
				<SidebarFooter className="px-2 pb-4">
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								className="h-9 text-muted-foreground hover:bg-[color-mix(in_srgb,white_5%,#0b2a6f)]"
								render={<a href="#/api" />}
							>
								<FileTextIcon />
								<span className="flex-1">API documentation</span>
								<ArrowUpRightIcon className="size-3.5!" />
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarFooter>
			</div>
		</Sidebar>
	);
}

function WorkspaceSwitcher() {
	const [current, setCurrent] = useState(workspaces[0]);
	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="ghost" className="gap-2.5 px-2 font-medium" />}
			>
				<LogoMark className="size-[18px]" />
				{current}
				<CaretUpDownIcon className="text-muted-foreground" />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="start" className="min-w-48">
				<DropdownMenuLabel>Workspaces</DropdownMenuLabel>
				{workspaces.map((w) => (
					<DropdownMenuItem key={w} onClick={() => setCurrent(w)}>
						{w}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

// The sidebar owns the toggle while it is open on desktop; the header takes over when it is closed or on mobile.
function HeaderTrigger() {
	const { isMobile, state } = useSidebar();
	return isMobile || state === "collapsed" ? <SidebarTrigger /> : null;
}

function AppShell({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider
			className="h-svh min-h-0 overflow-hidden"
			style={{ "--sidebar-width": "15rem" } as React.CSSProperties}
		>
			<AppSidebar />
			<SidebarInset className="min-h-0 min-w-0 overflow-hidden bg-background">
				<header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-card px-4 md:px-7">
					<div className="flex min-w-0 items-center gap-1">
						<HeaderTrigger />
						<WorkspaceSwitcher />
						<span className="px-1 text-muted-foreground max-sm:hidden">/</span>
						<span className="text-muted-foreground max-sm:hidden">BeatVPS</span>
					</div>
					<div className="flex items-center gap-3 sm:gap-[18px]">
						<span className="flex items-center gap-[7px] text-[13px] text-muted-foreground max-md:hidden">
							<span className="size-1.5 rounded-full bg-success" />
							Connected
						</span>
						<div className="flex items-center gap-2 text-muted-foreground">
							<SunIcon className="size-4" />
							<Switch aria-label="Dark mode" />
							<MoonIcon className="size-4" />
						</div>
						<Button variant="ghost" size="sm" className="max-sm:hidden">
							<RefreshIcon />
							Refresh
						</Button>
						<div className="flex items-center gap-1.5">
							<Avatar className="size-8">
								<AvatarFallback className="text-xs">AR</AvatarFallback>
							</Avatar>
							<CaretDownIcon className="size-3.5 text-muted-foreground max-sm:hidden" />
						</div>
					</div>
				</header>
				<div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
					{children}
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

function CreatePage() {
	const summaryRef = useRef<HTMLDivElement>(null);
	const [step, setStep] = useState("configure");
	const [name, setName] = useState("");
	const [region, setRegion] = useState<Region>("Europe");
	const [locationId, setLocationId] = useState("fra");
	const [category, setCategory] = useState<PlanCategory>("general");
	const [planId, setPlanId] = useState("BEAT2C2G-S");
	const [view, setView] = useState("list");
	const [imageId, setImageId] = useState("ubuntu");
	const [versions, setVersions] = useState<Record<string, string>>(() =>
		Object.fromEntries(images.map((i) => [i.id, i.versions[0].value])),
	);
	const [months, setMonths] = useState("1");
	const [autoRenew, setAutoRenew] = useState(true);

	const location = locations.find((l) => l.id === locationId) ?? locations[0];
	const plan =
		Object.values(plans)
			.flat()
			.find((p) => p.id === planId) ?? plans.general[0];
	const image = images.find((i) => i.id === imageId) ?? images[0];
	const term =
		billingTerms.find((t) => String(t.months) === months) ?? billingTerms[0];
	const total = useMemo(
		() => plan.price * term.months * (1 - term.discount / 100),
		[plan, term],
	);
	const regionLocations = locations.filter((l) => l.region === region);
	const categoryLabel =
		planCategories.find((c) => c.id === category)?.label ?? "";

	const pickRegion = (next: Region) => {
		setRegion(next);
		const first = locations.find((l) => l.region === next);
		if (first) setLocationId(first.id);
	};
	const pickCategory = (next: PlanCategory) => {
		setCategory(next);
		setPlanId(plans[next][0].id);
	};

	return (
		<div className="mx-auto w-full max-w-[1328px] px-4 pt-8 pb-12 md:px-9">
			<h1 className="text-[32px] font-semibold tracking-[-0.8px]">
				Create a BeatVPS
			</h1>
			<p className="mt-2 text-[15px] text-muted-foreground">
				A place for your next project. Choose a location, configuration and
				image.
			</p>

			<Card className="mt-[26px] p-1.5">
				<Tabs
					value={step}
					onValueChange={(v) => {
						setStep(v as string);
						if (v === "review")
							summaryRef.current?.scrollIntoView({ behavior: "smooth" });
					}}
				>
					<TabsList variant="pills" className="flex-wrap">
						<TabsTrigger value="configure" className="gap-2">
							<span className="font-mono text-[11.5px]">01</span> Configure
						</TabsTrigger>
						<TabsTrigger value="review" className="gap-2">
							<span className="font-mono text-[11.5px]">02</span> Review &amp;
							purchase
						</TabsTrigger>
					</TabsList>
				</Tabs>
			</Card>

			<div className="mt-6 flex flex-col items-start gap-6 lg:flex-row">
				<div className="flex w-full min-w-0 flex-1 flex-col gap-5">
					<StepCard index="01" title="Name your server">
						<Field>
							<Label htmlFor="server-name">Server name</Label>
							<Input
								id="server-name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								placeholder="my-first-server"
							/>
							<FieldDescription>
								A name to identify this server in your workspace.
							</FieldDescription>
						</Field>
					</StepCard>

					<StepCard
						index="02"
						title="Choose a location"
						description="Place your server close to your users. Each location has its own configurations and images."
					>
						<Tabs value={region} onValueChange={(v) => pickRegion(v as Region)}>
							<TabsList variant="line" className="mb-[18px] flex-wrap">
								{regions.map((r) => (
									<TabsTrigger key={r} value={r}>
										{r}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<RadioGroup
							value={locationId}
							onValueChange={(v) => setLocationId(v as string)}
							className="grid-cols-[repeat(auto-fill,minmax(170px,180px))] gap-3"
						>
							{regionLocations.map((l) => (
								<FieldLabel key={l.id} htmlFor={`loc-${l.id}`}>
									<Field
										orientation="horizontal"
										className="items-center gap-2.5 px-3.5 py-3"
									>
										<Flag flag={l.flag} />
										<span className="flex-1 text-sm font-medium whitespace-nowrap">
											{l.city}
										</span>
										{l.id === locationId ? (
											<CheckCircleIcon className="size-4 text-brand" />
										) : (
											<span className="font-mono text-[11px] whitespace-nowrap text-muted-foreground">
												{l.latency} ms
											</span>
										)}
										<RadioGroupItem
											id={`loc-${l.id}`}
											value={l.id}
											className="sr-only"
										/>
									</Field>
								</FieldLabel>
							))}
						</RadioGroup>
					</StepCard>

					<StepCard index="03" title="Choose your configuration">
						<div className="-mt-1 flex items-center justify-between gap-3">
							<span className="text-[13.5px] text-muted-foreground">
								{configurationCount} configurations · monthly prices
							</span>
							<ToggleGroup
								variant="segmented"
								value={[view]}
								onValueChange={(v) => v[0] && setView(v[0] as string)}
							>
								<ToggleGroupItem value="cards">Cards</ToggleGroupItem>
								<ToggleGroupItem value="list">List</ToggleGroupItem>
							</ToggleGroup>
						</div>
						<Tabs
							className="mt-3.5"
							value={category}
							onValueChange={(v) => pickCategory(v as PlanCategory)}
						>
							<TabsList variant="line" className="flex-wrap">
								{planCategories.map((c) => (
									<TabsTrigger key={c.id} value={c.id}>
										{c.label}
									</TabsTrigger>
								))}
							</TabsList>
						</Tabs>
						<RadioGroup
							value={planId}
							onValueChange={(v) => setPlanId(v as string)}
							className="mt-3.5 block"
						>
							{view === "list" ? (
								<Table>
									<TableHeader>
										<TableRow className="hover:bg-transparent">
											<TableHead className="w-9" />
											<TableHead>Plan</TableHead>
											<TableHead>vCPU</TableHead>
											<TableHead>RAM</TableHead>
											<TableHead>SSD</TableHead>
											<TableHead>Transfer</TableHead>
											<TableHead numeric>Price / mo</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{plans[category].map((p) => {
											const selected = p.id === planId;
											return (
												<TableRow
													key={p.id}
													data-state={selected ? "selected" : undefined}
													className="cursor-pointer [&>td]:py-3.5"
													onClick={() => setPlanId(p.id)}
												>
													<TableCell>
														<RadioGroupItem value={p.id} aria-label={p.id} />
													</TableCell>
													<TableCell className="font-mono text-[12.5px]">
														{p.id}
													</TableCell>
													<TableCell className="font-mono">{p.vcpu}</TableCell>
													<TableCell className="font-mono">
														{p.ram} GB
													</TableCell>
													<TableCell className="font-mono">
														{p.ssd} GB
													</TableCell>
													<TableCell className="font-mono text-muted-foreground">
														{p.transfer} TB
													</TableCell>
													<TableCell
														numeric
														className={selected ? "font-semibold" : ""}
													>
														{formatUsd(p.price)}
													</TableCell>
												</TableRow>
											);
										})}
									</TableBody>
								</Table>
							) : (
								<div className="grid gap-3 sm:grid-cols-2">
									{plans[category].map((p) => (
										<FieldLabel key={p.id} htmlFor={`plan-${p.id}`}>
											<Field orientation="horizontal">
												<FieldContent>
													<FieldTitle className="font-mono text-[12.5px]">
														{p.id}
													</FieldTitle>
													<FieldDescription>
														{p.vcpu} vCPU · {p.ram} GB RAM · {p.ssd} GB SSD
													</FieldDescription>
													<span className="font-mono text-sm">
														{formatUsd(p.price)} / mo
													</span>
												</FieldContent>
												<RadioGroupItem id={`plan-${p.id}`} value={p.id} />
											</Field>
										</FieldLabel>
									))}
								</div>
							)}
						</RadioGroup>
					</StepCard>

					<StepCard
						index="04"
						title="Choose an image"
						description="The operating system installed on first boot."
					>
						<RadioGroup
							value={imageId}
							onValueChange={(v) => setImageId(v as string)}
							className="grid-cols-2 gap-3 md:grid-cols-4"
						>
							{images.map((img) => (
								<FieldLabel key={img.id} htmlFor={`img-${img.id}`}>
									<Field className="gap-3">
										<div className="flex items-center gap-2.5">
											<OsLogo color={img.color} ubuntu={img.id === "ubuntu"} />
											<span className="flex-1 text-sm font-medium">
												{img.name}
											</span>
											<RadioGroupItem id={`img-${img.id}`} value={img.id} />
										</div>
										<Select
											value={versions[img.id]}
											items={img.versions}
											onValueChange={(v) => {
												setVersions((prev) => ({
													...prev,
													[img.id]: v as string,
												}));
												setImageId(img.id);
											}}
										>
											<SelectTrigger
												size="sm"
												className="w-full"
												aria-label={`${img.name} version`}
											>
												<SelectValue />
											</SelectTrigger>
											<SelectContent alignItemWithTrigger={false}>
												{img.versions.map((v) => (
													<SelectItem key={v.value} value={v.value}>
														{v.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</Field>
								</FieldLabel>
							))}
						</RadioGroup>
					</StepCard>

					<StepCard
						index="05"
						title="Billing term"
						description="Pay for the full term up front. Longer terms are cheaper."
					>
						<div className="flex flex-wrap items-center justify-between gap-4">
							<ToggleGroup
								elevation="raised"
								variant="segmented"
								className="flex-wrap"
								value={[months]}
								onValueChange={(v) => v[0] && setMonths(v[0] as string)}
							>
								{billingTerms.map((t) => (
									<ToggleGroupItem
										key={t.months}
										value={String(t.months)}
										className="px-3.5"
									>
										{t.label}
										{t.discount ? (
											<Badge
												variant="success"
												shape="number"
												className="ml-1 h-[18px]"
											>
												−{t.discount}%
											</Badge>
										) : null}
									</ToggleGroupItem>
								))}
							</ToggleGroup>
							<Label className="gap-2.5 text-[13.5px]">
								<Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
								Auto-renew
							</Label>
						</div>
					</StepCard>
				</div>

				<div
					ref={summaryRef}
					className="w-full scroll-mt-6 lg:sticky lg:top-6 lg:w-[330px] lg:shrink-0"
				>
					<SummaryCard
						category={categoryLabel}
						location={location}
						plan={plan}
						image={image}
						version={versions[image.id]}
						termLabel={term.label}
						total={total}
					/>
				</div>
			</div>
		</div>
	);
}

export default function LayerbeatCreateExample() {
	return (
		<AppShell>
			<CreatePage />
		</AppShell>
	);
}
