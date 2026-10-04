import { Button } from "@edmi-react/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@edmi-react/ui/card";
import {
	ElevationProvider,
	SurfaceProvider,
	useElevation,
} from "@edmi-react/ui/elevation";
import { Input } from "@edmi-react/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@edmi-react/ui/popover";

/* What each role resolves to inside the scope (the same call every component makes). */
function Resolved() {
	const field = useElevation(undefined, "field");
	const button = useElevation(undefined, "button-filled");
	const surface = useElevation(undefined, "surface");
	const overlay = useElevation(undefined, "overlay");
	return (
		<p className="font-mono text-[11.5px] text-muted-foreground">
			field {field} · button {button} · surface {surface} · overlay {overlay}
		</p>
	);
}

function Scope({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col gap-3">
			<div className="text-xs font-semibold text-muted-foreground">{title}</div>
			{children}
		</div>
	);
}

function Sample() {
	return (
		<Card className="w-72">
			<CardHeader>
				<CardTitle>Rebalance limits</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				<Input defaultValue="5%" />
				<div className="flex gap-2">
					<Button>Save</Button>
					<Popover>
						<PopoverTrigger render={<Button variant="outline" />}>
							More
						</PopoverTrigger>
						<PopoverContent className="w-48 text-[13px]">
							Applied to the next keeper run.
						</PopoverContent>
					</Popover>
				</div>
				<Resolved />
			</CardContent>
		</Card>
	);
}

/* Token check: the v4 shadow utilities and bevel / sunken variables, straight from the theme map. */
function Swatches() {
	return (
		<div className="flex flex-wrap items-center gap-4">
			<div className="flex h-12 w-24 items-center justify-center rounded-lg border border-border bg-card text-xs">
				flat
			</div>
			<div className="flex h-12 w-24 items-center justify-center rounded-lg border border-transparent bg-card text-xs shadow-raised">
				shadow-raised
			</div>
			<div className="flex h-12 w-24 items-center justify-center rounded-lg border border-transparent bg-card text-xs shadow-floating">
				shadow-floating
			</div>
			<div className="flex h-12 w-24 items-center justify-center rounded-lg border border-sk-bd bg-sk-bg text-xs shadow-sunken">
				shadow-sunken
			</div>
		</div>
	);
}

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-wrap gap-8">
				<Scope title="Flat (default)">
					<ElevationProvider>
						<Sample />
					</ElevationProvider>
				</Scope>
				<Scope title='mode="layered"'>
					<ElevationProvider mode="layered">
						<Sample />
					</ElevationProvider>
				</Scope>
				<Scope title='level="raised" (forced)'>
					<ElevationProvider level="raised">
						<SurfaceProvider level="raised">
							<Resolved />
						</SurfaceProvider>
					</ElevationProvider>
				</Scope>
			</div>
			<Swatches />
		</div>
	);
}
