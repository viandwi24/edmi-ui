import {
	Alert,
	AlertAction,
	AlertDescription,
	AlertTitle,
} from "@edmi-react/ui/alert";
import { Button } from "@edmi-react/ui/button";

const icon = (d: string) =>
	function Icon() {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				aria-hidden="true"
			>
				<path d={d} />
			</svg>
		);
	};
const InfoIcon = icon(
	"M12 8h.01M11 12h1v4h1M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0",
);
const CircleCheckIcon = icon(
	"m8 12 3 3 5-6M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0",
);
const TriangleAlertIcon = icon(
	"M12 9v4M12 17h.01M10.3 3.9 2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0",
);

export default function Demo() {
	return (
		<div className="grid w-full max-w-xl gap-3">
			<Alert>
				<InfoIcon />
				<AlertTitle>Devnet only</AlertTitle>
				<AlertDescription>
					Prices come from a mock oracle. Nothing here is real money.
				</AlertDescription>
			</Alert>
			<Alert variant="destructive">
				<TriangleAlertIcon />
				<AlertTitle>Transaction failed</AlertTitle>
				<AlertDescription>
					Slippage was above 1%. Try a smaller order.
				</AlertDescription>
			</Alert>
			<Alert variant="success">
				<CircleCheckIcon />
				<AlertTitle>Index launched</AlertTitle>
				<AlertDescription>MAG4 is live and accepting joins.</AlertDescription>
				<AlertAction>
					<Button size="xs" variant="outline">
						View
					</Button>
				</AlertAction>
			</Alert>
			<Alert variant="brand">
				<InfoIcon />
				<AlertTitle>Autopilot is on</AlertTitle>
				<AlertDescription>
					Rebalances run automatically with the theme accent.
				</AlertDescription>
			</Alert>
			<Alert variant="info">
				<InfoIcon />
				<AlertTitle>Oracle updated</AlertTitle>
				<AlertDescription>Prices refresh every 15 seconds.</AlertDescription>
			</Alert>
			<Alert variant="warning">
				<TriangleAlertIcon />
				<AlertTitle>Drift is 6.2%</AlertTitle>
				<AlertDescription>
					Above the 5% limit. The keeper will rebalance at the next run.
				</AlertDescription>
			</Alert>
		</div>
	);
}
