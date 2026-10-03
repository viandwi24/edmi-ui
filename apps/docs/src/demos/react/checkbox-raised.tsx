import { Checkbox } from "@edmi-react/ui/checkbox";
import { Label } from "@edmi-react/ui/label";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<Label className="flex items-start gap-2.5 text-sm">
				<Checkbox raised id="mandate" defaultChecked />
				<span className="grid gap-0.5">
					<span className="font-medium">Accept the mandate</span>
					<span className="text-[12.5px] text-muted-foreground">
						Weights and fees lock after launch.
					</span>
				</span>
			</Label>
			<Label className="flex items-center gap-2.5 text-sm">
				<Checkbox raised indeterminate /> Some selected
			</Label>
			<Label className="flex items-center gap-2.5 text-sm">
				<Checkbox raised disabled /> Disabled
			</Label>
		</div>
	);
}
