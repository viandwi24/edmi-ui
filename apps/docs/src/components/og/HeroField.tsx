// Hero field for the GitHub README image. Server-rendered only; every card is a real Edmi React component.

import { StatTile } from "@edmi-react/blocks/stat-tile/stat-tile";
import { TaskList } from "@edmi-react/blocks/task-list/task-list";
import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";
import { Alert, AlertDescription, AlertTitle } from "@edmi-react/ui/alert";
import { Badge } from "@edmi-react/ui/badge";
import { Bubble, BubbleContent } from "@edmi-react/ui/bubble";
import { Button } from "@edmi-react/ui/button";
import { Calendar } from "@edmi-react/ui/calendar";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@edmi-react/ui/card";
import { Checkbox } from "@edmi-react/ui/checkbox";
import { Input } from "@edmi-react/ui/input";
import { Label } from "@edmi-react/ui/label";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageGroup,
	MessageHeader,
} from "@edmi-react/ui/message";
import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@edmi-react/ui/progress";
import { Switch } from "@edmi-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import {
	ArrowRightIcon,
	CheckCircleIcon,
	SparkleIcon,
} from "@phosphor-icons/react";

function Col({
	children,
	offset = 0,
}: {
	children: React.ReactNode;
	offset?: number;
}) {
	return (
		<div
			className="flex w-[320px] shrink-0 flex-col gap-5"
			style={{ marginTop: offset }}
		>
			{children}
		</div>
	);
}

export default function HeroField() {
	return (
		<div className="flex gap-5">
			<Col offset={60}>
				<Card elevation="raised" className="gap-4 p-5">
					<div className="flex flex-wrap gap-2.5">
						<Button elevation="raised">
							Join index <ArrowRightIcon />
						</Button>
						<Button elevation="raised" variant="secondary">
							Secondary
						</Button>
						<Button elevation="raised" variant="outline">
							Outline
						</Button>
						<Button variant="brand">Continue</Button>
					</div>
					<div className="flex flex-wrap gap-2">
						<Badge>Index</Badge>
						<Badge variant="brand">Live</Badge>
						<Badge variant="success">Settled</Badge>
						<Badge variant="warning">Drift 6%</Badge>
						<Badge variant="info">Rebalancing</Badge>
					</div>
				</Card>
				<TaskList
					elevation="raised"
					tasks={[
						{
							title: "ICP analysis",
							agent: "Research agent",
							status: "review",
						},
						{
							title: "Q1 analyst report",
							agent: "Vault agent",
							status: "running",
						},
						{
							title: "Q4 drift review",
							agent: "Keeper agent",
							status: "completed",
						},
					]}
				/>
				<Card className="gap-3 p-5">
					<Label className="flex items-center gap-2.5 text-sm">
						<Switch elevation="raised" defaultChecked /> Keeper on
					</Label>
					<Label className="flex items-center gap-2.5 text-sm">
						<Checkbox elevation="raised" defaultChecked /> Accept the mandate
					</Label>
					<Label className="flex items-center gap-2.5 text-sm">
						<Checkbox elevation="raised" /> Notify on drift
					</Label>
				</Card>
			</Col>
			<Col>
				<Card elevation="raised">
					<CardHeader>
						<CardTitle>Join MAG4</CardTitle>
						<CardDescription>Magnificent Four, 4 tokens</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-3">
						<Input defaultValue="1,000 USDC" className="font-mono" />
						<Progress value={72}>
							<ProgressLabel>Allocated</ProgressLabel>
							<ProgressValue />
						</Progress>
					</CardContent>
					<CardFooter className="gap-2">
						<Button elevation="raised" size="sm" variant="outline">
							Cancel
						</Button>
						<Button elevation="raised" size="sm">
							Join index
						</Button>
					</CardFooter>
				</Card>
				<Card className="p-4">
					<Calendar
						mode="single"
						selected={new Date(2026, 9, 16)}
						defaultMonth={new Date(2026, 9, 16)}
					/>
				</Card>
				<Alert>
					<CheckCircleIcon />
					<AlertTitle>Rebalance scheduled</AlertTitle>
					<AlertDescription>Next keeper run at 09:00 UTC.</AlertDescription>
				</Alert>
			</Col>
			<Col offset={-30}>
				<div className="grid gap-4">
					<StatTile
						elevation="raised"
						label="AUM"
						value="$49,182"
						delta="+37%"
						deltaLabel="vs last week"
					/>
					<StatTile
						label="Net flow"
						value="−$1,204"
						delta="−4.2%"
						deltaLabel="vs last week"
					/>
				</div>
				<Card className="gap-4 p-5">
					<Tabs defaultValue="overview">
						<TabsList variant="pills" elevation="raised">
							<TabsTrigger value="overview">Overview</TabsTrigger>
							<TabsTrigger value="holdings">Holdings</TabsTrigger>
							<TabsTrigger value="activity">Activity</TabsTrigger>
						</TabsList>
					</Tabs>
					<div className="grid gap-1.5">
						<WatchlistItem
							elevation="raised"
							href="#a"
							symbol="MAG4"
							price="1.0000"
							change="+2.38%"
							color="var(--chart-1)"
							active
						/>
						<WatchlistItem
							elevation="raised"
							href="#b"
							symbol="AIFR"
							price="1.0104"
							change="+0.84%"
							color="var(--chart-4)"
						/>
						<WatchlistItem
							elevation="raised"
							href="#c"
							symbol="ATLS"
							price="0.9893"
							change="−0.64%"
							color="var(--chart-3)"
						/>
					</div>
				</Card>
			</Col>
			<Col offset={40}>
				<Card className="p-5">
					<MessageGroup className="gap-4">
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
										A rebalance would cost about 0.08% in slippage.
									</BubbleContent>
								</Bubble>
							</MessageContent>
						</Message>
					</MessageGroup>
				</Card>
				<Card elevation="raised" className="gap-3 p-5">
					<div className="text-sm font-medium">
						How should the index rebalance?
					</div>
					<div className="grid gap-2">
						{["On drift above 5%", "Weekly schedule", "Sign each trade"].map(
							(c, i) => (
								<div
									key={c}
									className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-sm ${i === 0 ? "border-ring bg-card ring-1 ring-ring" : "border-border bg-card"}`}
								>
									<span className="font-mono text-xs text-muted-foreground">
										{"ABC"[i]}
									</span>
									{c}
								</div>
							),
						)}
					</div>
				</Card>
				<Card className="gap-3 p-5">
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							Flat
						</Button>
						<Button elevation="raised" variant="outline" size="sm">
							Raised
						</Button>
					</div>
					<Input placeholder="Search tokens" />
				</Card>
			</Col>
			<Col offset={90}>
				<Card elevation="raised" className="gap-4 p-5">
					<div className="flex gap-2">
						<Badge variant="brand">Live</Badge>
						<Badge variant="outline">xStock</Badge>
					</div>
					<div className="font-mono text-3xl tracking-tight">$767.86</div>
					<div className="text-sm text-muted-foreground">
						SPYx · +0.30% today
					</div>
					<Button elevation="raised" className="w-full">
						Trade
					</Button>
				</Card>
				<TaskList
					tasks={[
						{
							title: "Rebalance playbook v2",
							agent: "Research agent",
							status: "completed",
						},
						{
							title: "Mandate review",
							agent: "Keeper agent",
							status: "review",
						},
					]}
				/>
			</Col>
		</div>
	);
}
