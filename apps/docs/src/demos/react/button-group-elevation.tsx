import { Button } from "@edmi-react/ui/button";
import { ButtonGroup, ButtonGroupSeparator } from "@edmi-react/ui/button-group";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap items-center gap-4">
						<ButtonGroup elevation={value}>
							<Button variant="outline">Day</Button>
							<Button variant="outline">Week</Button>
							<Button variant="outline">Month</Button>
						</ButtonGroup>
						<ButtonGroup elevation={value}>
							<Button variant="secondary">Buy</Button>
							<ButtonGroupSeparator />
							<Button variant="secondary">Sell</Button>
						</ButtonGroup>
					</div>
				</div>
			))}
		</div>
	);
}
