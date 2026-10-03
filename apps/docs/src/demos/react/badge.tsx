import { Badge } from "@edmi-react/ui/badge";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-3">
			<Badge>Index</Badge>
			<Badge variant="secondary">Devnet</Badge>
			<Badge variant="outline">xStock</Badge>
			<Badge variant="destructive">Failed</Badge>
			<Badge variant="ghost">Draft</Badge>
			<Badge variant="link">Solscan</Badge>
			<Badge variant="brand">Live</Badge>
			<Badge variant="warning">Drift 6%</Badge>
			<Badge variant="info">Rebalancing</Badge>
			<Badge shape="pill" variant="brand">
				Pill
			</Badge>
			<Badge shape="number">12</Badge>
		</div>
	);
}
