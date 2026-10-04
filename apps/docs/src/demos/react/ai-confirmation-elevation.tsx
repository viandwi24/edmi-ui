import {
	Confirmation,
	ConfirmationAction,
	ConfirmationActions,
	ConfirmationDescription,
	ConfirmationRequest,
	ConfirmationTitle,
} from "@edmi-react/components/ai/confirmation";

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
] as const;

export default function Demo() {
	return (
		<div className="flex w-full max-w-2xl flex-col gap-5">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Confirmation
						elevation={value}
						approval={{ id: "1" }}
						state="approval-requested"
						className="max-w-md"
					>
						<ConfirmationTitle>
							<ConfirmationRequest>Run rebalance on MAG4?</ConfirmationRequest>
						</ConfirmationTitle>
						<ConfirmationDescription>
							Sells 0.42 NVDAx and buys MSFTx + AAPLx. Max slippage 1%.
						</ConfirmationDescription>
						<ConfirmationActions>
							<ConfirmationAction>Approve</ConfirmationAction>
							<ConfirmationAction variant="outline">Reject</ConfirmationAction>
						</ConfirmationActions>
					</Confirmation>
				</div>
			))}
		</div>
	);
}
