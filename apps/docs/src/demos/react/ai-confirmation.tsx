import {
	Confirmation,
	ConfirmationAccepted,
	ConfirmationAction,
	ConfirmationActions,
	ConfirmationDescription,
	ConfirmationRejected,
	ConfirmationRequest,
	ConfirmationTitle,
} from "@edmi-react/components/ai/confirmation";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const check = (
	<IconPlaceholder
		lucide="CheckIcon"
		tabler="IconCheck"
		hugeicons="Tick02Icon"
		phosphor="CheckIcon"
		remixicon="RiCheckLine"
		className="size-4"
	/>
);
const cross = (
	<IconPlaceholder
		lucide="XIcon"
		tabler="IconX"
		hugeicons="Cancel01Icon"
		phosphor="XIcon"
		remixicon="RiCloseLine"
		className="size-4"
	/>
);

function Row({
	state,
	approval,
}: {
	state: "approval-requested" | "approval-responded" | "output-denied";
	approval: { id: string; approved?: boolean };
}) {
	return (
		<Confirmation approval={approval} state={state} className="w-full max-w-md">
			<ConfirmationTitle>
				<ConfirmationRequest>Run rebalance on MAG4?</ConfirmationRequest>
				<ConfirmationAccepted>
					{check}
					<span>Approved · rebalance sent</span>
				</ConfirmationAccepted>
				<ConfirmationRejected>
					{cross}
					<span>Rejected · nothing was changed</span>
				</ConfirmationRejected>
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

export default function Demo() {
	return (
		<div className="flex flex-col gap-4">
			<Row state="approval-requested" approval={{ id: "1" }} />
			<Row state="approval-responded" approval={{ id: "2", approved: true }} />
			<Row state="output-denied" approval={{ id: "3", approved: false }} />
		</div>
	);
}
