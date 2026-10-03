import { AllocationBar } from "@edmi-react/blocks/allocation-bar/allocation-bar";

export default function Demo() {
	return (
		<AllocationBar
			className="max-w-md"
			segments={[
				{ label: "AAPLx", value: 40 },
				{ label: "NVDAx", value: 30 },
				{ label: "TSLAx", value: 20 },
				{ label: "SPACEX-pre", value: 10 },
			]}
		/>
	);
}
