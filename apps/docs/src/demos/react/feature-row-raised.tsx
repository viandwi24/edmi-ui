import { FeatureRow } from "@edmi-react/blocks/feature-row/feature-row";

export default function Demo() {
	return (
		<div className="flex w-[420px] max-w-full flex-col gap-2">
			<FeatureRow raised index="1.1" title="Thesis and weights">
				Describe the thesis, pick up to 10 assets and set their weights.
			</FeatureRow>
			<FeatureRow raised index="1.2" title="Index identity" />
			<FeatureRow raised index="1.3" title="Vault deployment" />
		</div>
	);
}
