import {
	type Layout,
	LayoutPicker,
	LayoutPickerToast,
} from "@edmi-react/blocks/layout-picker/layout-picker";
import { Button } from "@edmi-react/ui/button";
import type { Elevation } from "@edmi-react/ui/elevation";
import { useState } from "react";

function Sample({ elevation }: { elevation: Elevation }) {
	const [layout, setLayout] = useState<Layout>("dashboard");
	const [toast, setToast] = useState(false);
	return (
		<div className="flex flex-col items-start gap-4">
			<LayoutPicker
				elevation={elevation}
				value={layout}
				onValueChange={setLayout}
			/>
			<Button variant="outline" onClick={() => setToast(true)}>
				Show corner toast
			</Button>
			{toast ? (
				<LayoutPickerToast
					elevation={elevation}
					defaultOpen
					defaultValue={layout}
					onValueChange={setLayout}
					onClose={() => setToast(false)}
				/>
			) : null}
		</div>
	);
}

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
