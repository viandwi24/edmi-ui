import { Slider } from "@edmi-react/ui/slider";

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
					<div className="flex w-72 flex-col gap-5">
						<Slider elevation={value} defaultValue={[33]} max={100} step={1} />
						<Slider elevation={value} defaultValue={[25, 75]} />
					</div>
				</div>
			))}
		</div>
	);
}
