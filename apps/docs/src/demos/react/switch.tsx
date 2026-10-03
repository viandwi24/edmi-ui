import { Label } from "@edmi-react/ui/label";
import { Switch } from "@edmi-react/ui/switch";

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<Label className="flex items-center gap-2.5 text-sm">
				<Switch defaultChecked /> Keeper on
			</Label>
			<Label className="flex items-center gap-2.5 text-sm">
				<Switch size="sm" /> Small
			</Label>
			<Label className="flex items-center gap-2.5 text-sm">
				<Switch disabled /> Disabled
			</Label>
		</div>
	);
}
