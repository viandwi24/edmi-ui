import { Label } from "@edmi-react/ui/label";
import { Switch } from "@edmi-react/ui/switch";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap items-center gap-6">
						<Label className="flex items-center gap-2.5 text-sm">
							<Switch elevation={value} defaultChecked /> Keeper on
						</Label>
						<Label className="flex items-center gap-2.5 text-sm">
							<Switch elevation={value} size="sm" defaultChecked /> Small
						</Label>
						<Label className="flex items-center gap-2.5 text-sm">
							<Switch elevation={value} /> Off
						</Label>
					</div>
				</div>
			))}
		</div>
	);
}
