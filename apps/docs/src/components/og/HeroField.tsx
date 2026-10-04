// Hero field for the GitHub README image. Server-rendered only; every card is a real Edmi React component.

import { StatTile } from "@edmi-react/blocks/stat-tile/stat-tile";
import { TaskList } from "@edmi-react/blocks/task-list/task-list";
import { WatchlistItem } from "@edmi-react/blocks/watchlist-item/watchlist-item";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@edmi-react/ui/card";
import { Checkbox } from "@edmi-react/ui/checkbox";
import { ElevationProvider } from "@edmi-react/ui/elevation";
import { Input } from "@edmi-react/ui/input";
import { Label } from "@edmi-react/ui/label";
import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@edmi-react/ui/progress";
import { Switch } from "@edmi-react/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { ArrowRightIcon, PaperPlaneRightIcon } from "@phosphor-icons/react";

function Col({
	children,
	offset = 0,
	label,
}: {
	children: React.ReactNode;
	offset?: number;
	label?: string;
}) {
	return (
		<div
			className="flex w-[320px] shrink-0 flex-col gap-5"
			style={{ marginTop: offset }}
		>
			{label ? (
				<div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
					{label}
				</div>
			) : null}
			{children}
		</div>
	);
}

/** The same set of components, rendered once flat and once inside a layered scope. */
function ComponentSet() {
	return (
		<>
			<Card className="gap-4 p-5">
				<div className="flex flex-wrap gap-2.5">
					<Button>
						Join index <ArrowRightIcon />
					</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="outline">Outline</Button>
				</div>
				<div className="flex flex-wrap gap-2">
					<Badge>Index</Badge>
					<Badge variant="brand">Live</Badge>
					<Badge variant="success">Settled</Badge>
				</div>
			</Card>
			<Card>
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
					<Button size="sm" variant="outline">
						Cancel
					</Button>
					<Button size="sm">Join index</Button>
				</CardFooter>
			</Card>
			<Card className="gap-3 p-5">
				<Tabs defaultValue="overview">
					<TabsList variant="pills">
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="holdings">Holdings</TabsTrigger>
						<TabsTrigger value="activity">Activity</TabsTrigger>
					</TabsList>
				</Tabs>
				<Label className="flex items-center gap-2.5 text-sm">
					<Switch defaultChecked /> Keeper on
				</Label>
				<Label className="flex items-center gap-2.5 text-sm">
					<Checkbox defaultChecked /> Accept the mandate
				</Label>
			</Card>
		</>
	);
}

export default function HeroField() {
	return (
		<div className="flex gap-5">
			<Col offset={60} label="Flat">
				<ComponentSet />
			</Col>
			<ElevationProvider mode="layered">
				<Col offset={0} label="Layered">
					<ComponentSet />
				</Col>
				<Col offset={-30} label="Sunken, raised, floating">
					<StatTile
						label="AUM"
						value="$49,182"
						delta="+37%"
						deltaLabel="vs last week"
					/>
					<Card className="gap-3 p-5">
						<div className="text-sm font-medium">Sunken field</div>
						<Input elevation="sunken" placeholder="Search tokens" />
						<div className="grid gap-1.5">
							<WatchlistItem
								href="#a"
								symbol="MAG4"
								price="1.0000"
								change="+2.38%"
								color="var(--chart-1)"
								active
							/>
							<WatchlistItem
								href="#b"
								symbol="AIFR"
								price="1.0104"
								change="+0.84%"
								color="var(--chart-4)"
							/>
						</div>
					</Card>
					<TaskList
						tasks={[
							{
								title: "ICP analysis",
								agent: "Research agent",
								status: "review",
							},
							{
								title: "Q4 drift review",
								agent: "Keeper agent",
								status: "completed",
							},
						]}
					/>
				</Col>
				<Col offset={40} label="Floating">
					<Card elevation="floating" className="gap-3 p-4">
						<div className="text-sm text-muted-foreground">
							Ask the keeper to rebalance MAG4 when drift passes 5%.
						</div>
						<div className="flex items-center justify-between">
							<Badge variant="outline">Keeper</Badge>
							<Button size="sm">
								Send <PaperPlaneRightIcon />
							</Button>
						</div>
					</Card>
					<Card elevation="floating" className="gap-1 p-2">
						{["On drift above 5%", "Weekly schedule", "Sign each trade"].map(
							(c, i) => (
								<div
									key={c}
									className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm ${i === 0 ? "bg-muted" : ""}`}
								>
									<span className="font-mono text-xs text-muted-foreground">
										{"ABC"[i]}
									</span>
									{c}
								</div>
							),
						)}
					</Card>
					<Card className="gap-4 p-5">
						<div className="flex gap-2">
							<Badge variant="brand">Live</Badge>
							<Badge variant="outline">xStock</Badge>
						</div>
						<div className="font-mono text-3xl tracking-tight">$767.86</div>
						<div className="text-sm text-muted-foreground">
							SPYx · +0.30% today
						</div>
						<Button className="w-full">Trade</Button>
					</Card>
				</Col>
			</ElevationProvider>
		</div>
	);
}
