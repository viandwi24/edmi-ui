import { StepCard } from "@edmi-react/blocks/step-card/step-card";

export default function Demo() {
	return (
		<div className="flex flex-wrap gap-3">
			<StepCard
				elevation="raised"
				className="w-[200px]"
				index="01"
				title="Create"
				description="Pick up to 10 assets and set weights."
			/>
			<StepCard
				elevation="raised"
				className="w-[200px]"
				index="02"
				title="Share"
				description="A link, OG image, feed card and Blink."
			/>
			<StepCard
				elevation="raised"
				className="w-[200px]"
				index="03"
				title="Join"
				description="Investors pay in USDC in one click."
			/>
		</div>
	);
}
