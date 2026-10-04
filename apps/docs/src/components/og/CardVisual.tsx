// Small elevation visual for the OpenGraph card (server-rendered only).
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { ElevationProvider } from "@edmi-react/ui/elevation";
import { Input } from "@edmi-react/ui/input";
import { Switch } from "@edmi-react/ui/switch";

export default function CardVisual() {
	return (
		<ElevationProvider mode="layered">
			<div className="flex w-[400px] flex-col gap-[18px]">
				<Card elevation="floating" className="gap-3 p-5">
					<div className="flex gap-2">
						<Badge variant="brand">Live</Badge>
						<Badge variant="outline">Floating</Badge>
					</div>
					<div className="font-mono text-4xl tracking-tight">$49,182</div>
				</Card>
				<Card className="gap-3 p-5">
					<Input
						elevation="sunken"
						defaultValue="1,000 USDC"
						className="font-mono"
					/>
					<div className="flex items-center gap-2.5">
						<Button>Join index</Button>
						<Button variant="outline">Cancel</Button>
						<Switch defaultChecked />
					</div>
				</Card>
			</div>
		</ElevationProvider>
	);
}
