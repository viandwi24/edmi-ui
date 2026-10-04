import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import type { Elevation } from "@edmi-react/ui/elevation";
import { useState } from "react";

const items = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

function Sample({ elevation }: { elevation: Elevation }) {
	const [connected, setConnected] = useState(false);
	return (
		<AppHeader
			elevation={elevation}
			items={items}
			active="#leaderboard"
			connectLabel={connected ? "dG6r…4mSr" : "Connect"}
			onConnect={() => setConnected((c) => !c)}
		/>
	);
}

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
