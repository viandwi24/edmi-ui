import {
	SessionFile,
	SessionOutputTitle,
	SessionPanel,
	SessionPanelDivider,
	SessionProgress,
	SessionSection,
} from "@edmi-react/components/ai/session-panel";

const levels = [
	{ value: "sunken", label: "Sunken (-1)" },
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="grid w-full max-w-3xl gap-5 sm:grid-cols-2">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<SessionPanel elevation={value}>
						<SessionProgress value={60}>Drafting the report.</SessionProgress>
						<SessionPanelDivider />
						<SessionSection title="Outputs">
							<SessionOutputTitle meta="Artifact">
								Rebalance report
							</SessionOutputTitle>
							<SessionFile name="Rebalance report" format="PDF" />
						</SessionSection>
					</SessionPanel>
				</div>
			))}
		</div>
	);
}
