import { Label } from "@edmi-react/ui/label";
import { RadioGroup, RadioGroupItem } from "@edmi-react/ui/radio-group";

export default function Demo() {
	return (
		<RadioGroup defaultValue="weekly" className="w-fit">
			{["daily", "weekly", "drift"].map((v) => (
				<Label key={v} className="flex items-center gap-2.5 text-sm capitalize">
					<RadioGroupItem value={v} />
					{v === "drift" ? "On drift only" : v}
				</Label>
			))}
		</RadioGroup>
	);
}
