import {
	Confirmation,
	ConfirmationAction,
	ConfirmationActions,
	ConfirmationDescription,
	ConfirmationRequest,
	ConfirmationTitle,
} from "@edmi-react/components/ai/confirmation";

export default function Demo() {
	return (
		<Confirmation
			raised
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
	);
}
