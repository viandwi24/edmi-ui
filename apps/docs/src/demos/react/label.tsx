import { Checkbox } from "@edmi-react/ui/checkbox";
import { Label } from "@edmi-react/ui/label";

export default function Demo() {
	return (
		<div className="flex flex-wrap items-center gap-8">
			<Label>Index name</Label>
			<Label>
				Ticker <span className="text-destructive-text">*</span>
			</Label>
			<Label className="items-baseline">
				Description{" "}
				<span className="font-normal text-muted-foreground">(optional)</span>
			</Label>
			<div className="flex items-center gap-2">
				<Checkbox id="keeper" defaultChecked />
				<Label htmlFor="keeper">Allow keeper</Label>
			</div>
		</div>
	);
}
