import {
	type Layout,
	LayoutPicker,
	LayoutPickerToast,
} from "@edmi-react/blocks/layout-picker/layout-picker";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";

export default function Demo() {
	const [layout, setLayout] = useState<Layout>("dashboard");
	const [toast, setToast] = useState(false);
	return (
		<div className="flex flex-col items-start gap-4">
			<LayoutPicker raised value={layout} onValueChange={setLayout} />
			<Button variant="outline" onClick={() => setToast(true)}>
				Show corner toast
			</Button>
			{toast ? (
				<LayoutPickerToast
					raised
					defaultOpen
					onValueChange={setLayout}
					onClose={() => setToast(false)}
				/>
			) : null}
		</div>
	);
}
