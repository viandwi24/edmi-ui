// Landing showcase: every card is built from the real Edmi React registry components.

import { DatePicker } from "@edmi-react/blocks/date-picker/date-picker";
import { SiteFooter } from "@edmi-react/blocks/footer/footer";
import {
	SiteHeaderBrand,
	SiteHeaderMark,
} from "@edmi-react/blocks/site-header/site-header";
import { TickerStrip } from "@edmi-react/blocks/ticker-strip/ticker-strip";
import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";
import { Alert, AlertDescription, AlertTitle } from "@edmi-react/ui/alert";
import {
	Avatar,
	AvatarFallback,
	AvatarGroup,
	AvatarGroupCount,
} from "@edmi-react/ui/avatar";
import { Badge } from "@edmi-react/ui/badge";
import { Bubble, BubbleContent } from "@edmi-react/ui/bubble";
import { Button } from "@edmi-react/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@edmi-react/ui/button-group";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@edmi-react/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "@edmi-react/ui/chart";
import { Checkbox } from "@edmi-react/ui/checkbox";
import {
	Command,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
	CommandShortcut,
} from "@edmi-react/ui/command";
import { Field, FieldGroup, FieldLabel } from "@edmi-react/ui/field";
import { Input } from "@edmi-react/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText,
} from "@edmi-react/ui/input-group";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@edmi-react/ui/item";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@edmi-react/ui/message";
import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@edmi-react/ui/progress";
import {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnaireProgress,
	QuestionnaireSubmit,
	QuestionnaireTitle,
} from "@edmi-react/ui/questionnaire";
import { RadioGroup, RadioGroupItem } from "@edmi-react/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@edmi-react/ui/select";
import { Slider } from "@edmi-react/ui/slider";
import { Toaster, toast } from "@edmi-react/ui/sonner";
import { Switch } from "@edmi-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { Textarea } from "@edmi-react/ui/textarea";
import {
	ArrowRightIcon,
	CaretDownIcon,
	CheckCircleIcon,
	CopyIcon,
	MagnifyingGlassIcon,
	PaperPlaneRightIcon,
	PlusIcon,
	SparkleIcon,
	ThumbsUpIcon,
	WarningIcon,
} from "@phosphor-icons/react";
import { useEffect, useState, useSyncExternalStore } from "react";

/* shared flat | raised state (module singleton, shared by every island) ----------------------- */
let raisedState = false;
const raisedListeners = new Set<() => void>();
export function setRaised(next: boolean) {
	if (next === raisedState) return;
	raisedState = next;
	for (const l of raisedListeners) l();
}
export function useRaised() {
	return useSyncExternalStore(
		(cb) => {
			raisedListeners.add(cb);
			return () => raisedListeners.delete(cb);
		},
		() => raisedState,
		() => false,
	);
}

export function RaisedToggle() {
	const raised = useRaised();
	return (
		<Tabs
			value={raised ? "raised" : "flat"}
			onValueChange={(v) => setRaised(v === "raised")}
		>
			<TabsList aria-label="Showcase style" raised={raised}>
				<TabsTrigger value="flat">Flat</TabsTrigger>
				<TabsTrigger value="raised">Raised ✦</TabsTrigger>
			</TabsList>
		</Tabs>
	);
}

function useSiteDark() {
	const [dark, setDark] = useState(false);
	useEffect(() => {
		const root = document.documentElement;
		const read = () => setDark(root.classList.contains("dark"));
		read();
		const mo = new MutationObserver(read);
		mo.observe(root, { attributes: true, attributeFilter: ["class"] });
		return () => mo.disconnect();
	}, []);
	return dark;
}

/* 1 · controls ------------------------------------------------------------------------------ */
export function ControlsCard() {
	const raised = useRaised();
	return (
		<Card raised={raised} className="gap-4 p-5">
			<div className="flex flex-wrap items-center gap-2.5">
				<Button raised={raised}>
					Button <ArrowRightIcon />
				</Button>
				<Button raised={raised} variant="secondary">
					Secondary
				</Button>
				<Button raised={raised} variant="outline">
					Outline
				</Button>
				<Button raised={raised} variant="brand">
					Brand
				</Button>
			</div>
			<InputGroup>
				<InputGroupInput placeholder="Search indexes" />
				<InputGroupAddon align="inline-end">
					<MagnifyingGlassIcon />
				</InputGroupAddon>
			</InputGroup>
			<Textarea placeholder="Message" className="min-h-16" />
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-2">
					<Badge>Badge</Badge>
					<Badge variant="secondary">Secondary</Badge>
					<Badge variant="brand">Live</Badge>
				</div>
				<div className="flex items-center gap-3">
					<RadioGroup defaultValue="a" className="flex items-center gap-2">
						<RadioGroupItem value="a" aria-label="A" />
						<RadioGroupItem value="b" aria-label="B" />
					</RadioGroup>
					<Checkbox raised={raised} defaultChecked aria-label="Checked" />
					<Switch raised={raised} defaultChecked aria-label="Switch" />
				</div>
			</div>
			<div className="flex items-center justify-between gap-3">
				<Button raised={raised} variant="outline">
					Alert dialog
				</Button>
				<ButtonGroup>
					<Button raised={raised} variant="outline">
						Button group
					</Button>
					<ButtonGroupSeparator />
					<Button
						raised={raised}
						variant="outline"
						size="icon"
						aria-label="More"
					>
						<CaretDownIcon />
					</Button>
				</ButtonGroup>
			</div>
		</Card>
	);
}

/* 2 · chart --------------------------------------------------------------------------------- */
const bars = [
	{ m: "Dec", v: 186 },
	{ m: "Jan", v: 305 },
	{ m: "Feb", v: 237 },
	{ m: "Mar", v: 273 },
	{ m: "Apr", v: 209 },
	{ m: "May", v: 314 },
];
const barConfig = {
	v: { label: "Contributions", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ChartCard() {
	const raised = useRaised();
	return (
		<Card raised={raised}>
			<CardHeader>
				<CardTitle>Contribution history</CardTitle>
				<CardDescription>Last 6 months of activity</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<ChartContainer config={barConfig} className="aspect-auto h-44 w-full">
					<BarChartInner />
				</ChartContainer>
				<div className="grid grid-cols-2 gap-3">
					{[
						["Upcoming", "May 2026", "Scheduled"],
						["Savings plan", "Accelerated", "Recurring"],
					].map(([k, v, s]) => (
						<div
							key={k}
							className="rounded-lg border border-border-2 bg-muted px-3.5 py-3"
						>
							<div className="font-mono text-[10.5px] tracking-wider text-muted-foreground uppercase">
								{k}
							</div>
							<div className="mt-1 text-[15px] font-medium text-foreground">
								{v}
							</div>
							<div className="text-[12.5px] text-muted-foreground">{s}</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

function BarChartInner() {
	return (
		<BarChart data={bars}>
			<CartesianGrid vertical={false} />
			<XAxis dataKey="m" tickLine={false} axisLine={false} tickMargin={8} />
			<ChartTooltip content={<ChartTooltipContent hideLabel />} />
			<Bar dataKey="v" fill="var(--color-v)" radius={5} />
		</BarChart>
	);
}

const strategies: Record<string, string> = {
	steady: "Steady monthly",
	accel: "Accelerated",
	drift: "Rebalance on drift",
};

/* 3 · form ---------------------------------------------------------------------------------- */
export function FormCard() {
	const raised = useRaised();
	return (
		<Card raised={raised}>
			<CardHeader>
				<CardTitle>Set a new milestone</CardTitle>
				<CardDescription>
					Define a target and we pace the deposits.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FieldGroup>
					<Field>
						<FieldLabel htmlFor="lp-goal">Goal name</FieldLabel>
						<Input id="lp-goal" placeholder="e.g. New car, home" />
					</Field>
					<div className="grid grid-cols-1 gap-3">
						<Field>
							<FieldLabel htmlFor="lp-amount">Target amount</FieldLabel>
							<InputGroup>
								<InputGroupInput
									id="lp-amount"
									defaultValue="15,000"
									className="font-mono"
								/>
								<InputGroupAddon align="inline-end">
									<InputGroupText>USD</InputGroupText>
								</InputGroupAddon>
							</InputGroup>
						</Field>
						<Field>
							<FieldLabel>Target date</FieldLabel>
							<DatePicker
								defaultValue={new Date(2026, 11, 14)}
								className="w-full"
							/>
						</Field>
					</div>
					<Field>
						<FieldLabel>Strategy</FieldLabel>
						<Select defaultValue="steady">
							<SelectTrigger raised={raised} className="w-full">
								<SelectValue>{(v: string) => strategies[v] ?? v}</SelectValue>
							</SelectTrigger>
							<SelectContent alignItemWithTrigger={false}>
								<SelectItem value="steady">Steady monthly</SelectItem>
								<SelectItem value="accel">Accelerated</SelectItem>
								<SelectItem value="drift">Rebalance on drift</SelectItem>
							</SelectContent>
						</Select>
					</Field>
				</FieldGroup>
			</CardContent>
			<CardFooter className="flex-col gap-2.5">
				<Button raised={raised} className="w-full">
					Create goal
				</Button>
				<Button raised={raised} variant="outline" className="w-full">
					Cancel
				</Button>
			</CardFooter>
		</Card>
	);
}

/* 4 · chat ---------------------------------------------------------------------------------- */
export function ChatCard() {
	const raised = useRaised();
	return (
		<Card raised={raised}>
			<CardHeader>
				<CardTitle>New chat</CardTitle>
				<CardDescription>How can I help today?</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-5">
				<MessageGroup className="gap-5">
					<Message>
						<MessageAvatar className="size-6 border border-border bg-brand-soft text-brand-text">
							<SparkleIcon className="size-3" />
						</MessageAvatar>
						<MessageContent>
							<MessageHeader>
								<span className="font-semibold text-foreground">
									Research agent
								</span>
								<span className="font-mono">09:41</span>
							</MessageHeader>
							<Bubble variant="ghost">
								<BubbleContent>
									I screened the megacaps against your mandate. A rebalance
									would cost about 0.08% in slippage.
								</BubbleContent>
							</Bubble>
							<MessageFooter>
								<Button variant="ghost" size="icon-xs" aria-label="Copy">
									<CopyIcon />
								</Button>
								<Button variant="ghost" size="icon-xs" aria-label="Like">
									<ThumbsUpIcon />
								</Button>
							</MessageFooter>
						</MessageContent>
					</Message>
					<Message align="end">
						<MessageAvatar className="size-6 bg-secondary font-mono text-[10px]">
							DL
						</MessageAvatar>
						<MessageContent>
							<Bubble align="end">
								<BubbleContent>
									Run it and send me the transaction to sign.
								</BubbleContent>
							</Bubble>
							<MessageFooter>Read</MessageFooter>
						</MessageContent>
					</Message>
				</MessageGroup>
				<InputGroup>
					<InputGroupInput placeholder="Ask anything" />
					<InputGroupAddon align="inline-end">
						<InputGroupButton
							size="icon-xs"
							variant="default"
							aria-label="Send"
						>
							<PaperPlaneRightIcon />
						</InputGroupButton>
					</InputGroupAddon>
				</InputGroup>
			</CardContent>
		</Card>
	);
}

/* 5 · questionnaire ------------------------------------------------------------------------- */
export function QuestionCard() {
	const raised = useRaised();
	return (
		<Questionnaire
			items={[
				{
					name: "rebalance",
					choices: [
						{ value: "drift" },
						{ value: "schedule" },
						{ value: "sign" },
					],
				},
			]}
			shortcuts="letters"
			raised={raised}
			className={`w-full rounded-xl border border-border bg-card p-5 ${raised ? "border-b-lip shadow-card" : ""}`}
			onSubmit={(e) => {
				e.preventDefault();
				toast.success("Mandate saved");
			}}
		>
			<QuestionnaireProgress />
			<QuestionnaireItem name="rebalance" required>
				<QuestionnaireTitle>How should the index rebalance?</QuestionnaireTitle>
				<QuestionnaireDescription>
					You can change this later.
				</QuestionnaireDescription>
				<QuestionnaireChoices>
					<QuestionnaireChoice value="drift">
						When a weight drifts past a limit
					</QuestionnaireChoice>
					<QuestionnaireChoice value="schedule">
						On a fixed schedule
					</QuestionnaireChoice>
					<QuestionnaireChoice value="sign">
						Only when I sign
					</QuestionnaireChoice>
				</QuestionnaireChoices>
			</QuestionnaireItem>
			<QuestionnaireActions>
				<QuestionnaireNext />
				<QuestionnaireSubmit />
			</QuestionnaireActions>
		</Questionnaire>
	);
}

/* 6 · command ------------------------------------------------------------------------------- */
export function CommandCard() {
	return (
		<Command className="w-full rounded-xl border border-border">
			<CommandInput placeholder="Search indexes and actions…" />
			<CommandList>
				<CommandGroup heading="Indexes">
					<CommandItem>MAG4 · Magnificent Four</CommandItem>
					<CommandItem>MAG7 · equal weight</CommandItem>
					<CommandItem>AIFR · AI infrastructure</CommandItem>
				</CommandGroup>
				<CommandSeparator />
				<CommandGroup heading="Actions">
					<CommandItem>
						<PlusIcon /> Create index <CommandShortcut>⌘N</CommandShortcut>
					</CommandItem>
					<CommandItem>
						<SparkleIcon /> Ask agent <CommandShortcut>⌘J</CommandShortcut>
					</CommandItem>
				</CommandGroup>
			</CommandList>
		</Command>
	);
}

/* 7 · market -------------------------------------------------------------------------------- */
export function MarketCard() {
	const raised = useRaised();
	return (
		<div className="flex flex-col gap-3">
			<TickerStrip
				items={[
					{ symbol: "AAPLx", price: "$339.86", change: "+0.42%" },
					{ symbol: "NVDAx", price: "$227.06", change: "+0.81%" },
					{ symbol: "TSLAx", price: "$370.21", change: "−0.31%" },
				]}
				raised={raised}
			/>
			<Card raised={raised} className="gap-1.5 p-3">
				<div className="px-2 pt-1 pb-1.5 font-mono text-[10.5px] tracking-wider text-muted-foreground uppercase">
					Watchlist
				</div>
				<WatchlistItem
					raised={raised}
					href="#"
					symbol="MAG4"
					price="1.0000"
					change="+2.38%"
					color="var(--chart-1)"
					active
				/>
				<WatchlistItem
					raised={raised}
					href="#"
					symbol="AIFR"
					price="1.0104"
					change="+0.84%"
					color="var(--chart-4)"
				/>
				<WatchlistItem
					raised={raised}
					href="#"
					symbol="ATLS"
					price="0.9893"
					change="−0.64%"
					color="var(--chart-3)"
				/>
			</Card>
		</div>
	);
}

/* 8 · feedback ------------------------------------------------------------------------------ */
export function FeedbackCard() {
	const dark = useSiteDark();
	const raised = useRaised();
	const [value, setValue] = useState(35);
	useEffect(() => {
		const id = setInterval(
			() => setValue((v) => (v >= 100 ? 15 : v + 10)),
			1400,
		);
		return () => clearInterval(id);
	}, []);
	return (
		<Card raised={raised} className="gap-4 p-5">
			<Toaster raised={raised} theme={dark ? "dark" : "light"} />
			<Alert variant="brand">
				<CheckCircleIcon />
				<AlertTitle>Index launched</AlertTitle>
				<AlertDescription>MAG4 is live and accepting joins.</AlertDescription>
			</Alert>
			<Alert variant="warning">
				<WarningIcon />
				<AlertTitle>Drift is 6.2%</AlertTitle>
				<AlertDescription>
					The keeper rebalances at the next run.
				</AlertDescription>
			</Alert>
			<Progress value={value} variant="brand">
				<ProgressLabel>Raising for launch</ProgressLabel>
				<ProgressValue />
			</Progress>
			<Slider raised={raised} defaultValue={[25, 70]} />
			<div className="flex flex-wrap gap-2">
				<Button
					raised={raised}
					variant="outline"
					size="sm"
					onClick={() =>
						toast.success("Joined MAG4", { description: "98,209 shares" })
					}
				>
					Toast
				</Button>
				<Button
					raised={raised}
					variant="outline"
					size="sm"
					onClick={() =>
						toast.info("Rebalance scheduled", {
							description: "Next run 09:00 UTC",
						})
					}
				>
					Info
				</Button>
				<Button
					raised={raised}
					variant="outline"
					size="sm"
					onClick={() => toast.error("Signature rejected")}
				>
					Error
				</Button>
			</div>
		</Card>
	);
}

/* 9 · people -------------------------------------------------------------------------------- */
const people = [
	["NG", "Nadia Gomez", "Creator of MAG4"],
	["ER", "Erik Ross", "Keeper operator"],
	["SC", "Sam Chen", "Joined yesterday"],
];
export function PeopleCard() {
	const raised = useRaised();
	return (
		<Card raised={raised} className="gap-3 p-3">
			<div className="flex items-center justify-between px-2 pt-1">
				<Tabs defaultValue="team">
					<TabsList raised={raised}>
						<TabsTrigger value="team">Team</TabsTrigger>
						<TabsTrigger value="holders">Holders</TabsTrigger>
					</TabsList>
				</Tabs>
				<AvatarGroup>
					<Avatar size="sm">
						<AvatarFallback>NG</AvatarFallback>
					</Avatar>
					<Avatar size="sm">
						<AvatarFallback>ER</AvatarFallback>
					</Avatar>
					<AvatarGroupCount>+9</AvatarGroupCount>
				</AvatarGroup>
			</div>
			<ItemGroup>
				{people.map(([init, name, role], i) => (
					<div key={name}>
						{i > 0 ? <ItemSeparator /> : null}
						<Item>
							<ItemMedia>
								<Avatar>
									<AvatarFallback>{init}</AvatarFallback>
								</Avatar>
							</ItemMedia>
							<ItemContent>
								<ItemTitle>{name}</ItemTitle>
								<ItemDescription>{role}</ItemDescription>
							</ItemContent>
							<ItemActions>
								<Button raised={raised} size="sm" variant="outline">
									Follow
								</Button>
							</ItemActions>
						</Item>
					</div>
				))}
			</ItemGroup>
		</Card>
	);
}

/* footer ------------------------------------------------------------------------------------ */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export function LandingFooter() {
	return (
		<SiteFooter
			brand={
				<SiteHeaderBrand
					name="edmi"
					href={`${base}/`}
					className="gap-2 text-foreground [&>span:last-child]:text-[17px]"
					logo={<SiteHeaderMark className="size-6 rounded-[7px]" />}
				/>
			}
			description="Editorial-minimalist, shadcn-compatible components for React, Vue and Svelte."
			columns={[
				{
					title: "Docs",
					links: [
						{ label: "React", href: `${base}/getting-started/react/` },
						{ label: "Vue", href: `${base}/getting-started/vue/` },
						{ label: "Svelte", href: `${base}/getting-started/svelte/` },
					],
				},
				{
					title: "Library",
					links: [
						{ label: "Components", href: `${base}/components/actions/button/` },
						{
							label: "AI pack",
							href: `${base}/components/ai-chat/ai-message/`,
						},
						{
							label: "Patterns",
							href: `${base}/components/patterns/stat-tile/`,
						},
						{ label: "Theming", href: `${base}/theming/` },
					],
				},
				{
					title: "Project",
					links: [
						{ label: "Design rules", href: `${base}/rules/` },
						{ label: "Changelog", href: `${base}/changelog/` },
						{ label: "GitHub", href: "https://github.com/viandwi24/edmi-ui" },
					],
				},
			]}
			legal="MIT licensed. Copy the code, own it."
			note="Flat by default · no blurred shadows"
		/>
	);
}
