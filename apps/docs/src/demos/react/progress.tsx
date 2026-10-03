import {
	Progress,
	ProgressLabel,
	ProgressValue,
} from "@edmi-react/ui/progress";
import * as React from "react";

export default function Demo() {
	const [value, setValue] = React.useState(20);
	React.useEffect(() => {
		const id = setInterval(
			() => setValue((v) => (v >= 100 ? 10 : v + 10)),
			1200,
		);
		return () => clearInterval(id);
	}, []);
	return (
		<div className="flex w-80 flex-col gap-6">
			<Progress value={value} />
			<Progress value={value} variant="brand">
				<ProgressLabel>Raising for launch</ProgressLabel>
				<ProgressValue />
			</Progress>
		</div>
	);
}
