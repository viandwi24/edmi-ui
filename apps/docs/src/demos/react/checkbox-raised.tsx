import { Checkbox } from "@edmi-react/ui/checkbox";
import { Label } from "@edmi-react/ui/label";

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
							<Checkbox elevation={value} defaultChecked /> Checked
						</Label>
						<Label className="flex items-center gap-2.5 text-sm">
							<Checkbox elevation={value} indeterminate /> Indeterminate
						</Label>
						<Label className="flex items-center gap-2.5 text-sm">
							<Checkbox elevation={value} /> Unchecked
						</Label>
					</div>
				</div>
			))}
		</div>
	);
}
