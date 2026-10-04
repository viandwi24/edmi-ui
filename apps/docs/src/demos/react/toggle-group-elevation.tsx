import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1): only the ON item rises" },
] as const;

const ranges = ["1D", "1W", "1M", "1Y", "All"];

export default function Demo() {
	const [range, setRange] = useState("1M");
	// A range always has one value: ignore the empty value a second click on the active item produces.
	const rangeProps = {
		value: [range],
		onValueChange: (v: string[]) => v[0] && setRange(v[0]),
	};
	return (
		<div className="flex flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<div className="flex flex-wrap items-start gap-6">
						<ToggleGroup elevation={value} variant="segmented" {...rangeProps}>
							{ranges.map((v) => (
								<ToggleGroupItem key={v} value={v}>
									{v}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
						<ToggleGroup
							elevation={value}
							variant="outline"
							spacing={0}
							{...rangeProps}
						>
							{ranges.map((v) => (
								<ToggleGroupItem key={v} value={v}>
									{v}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</div>
				</div>
			))}
		</div>
	);
}
