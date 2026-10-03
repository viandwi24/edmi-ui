import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import { useState } from "react";

const items = [
	{ label: "Explore", href: "#explore" },
	{ label: "Feed", href: "#feed" },
	{ label: "Leaderboard", href: "#leaderboard" },
	{ label: "AI", href: "#ai" },
	{ label: "Create", href: "#create" },
];

export default function Demo() {
	const [connected, setConnected] = useState(false);
	return (
		<AppHeader
			items={items}
			active="#leaderboard"
			connectLabel={connected ? "dG6r…4mSr" : "Connect"}
			onConnect={() => setConnected((c) => !c)}
		/>
	);
}
