import {
	Message,
	MessageBranch,
	MessageBranchContent,
	MessageBranchNext,
	MessageBranchPage,
	MessageBranchPrevious,
	MessageBranchSelector,
	MessageContent,
	MessageResponse,
	MessageToolbar,
} from "@edmi-react/components/ai/message";

const variants = [
	"Sell **0.42 NVDAx** and buy the other two.",
	"Skip the rebalance: drift is **1.9%**, under your limit.",
	"Rebalance in two steps to keep slippage under `0.05%`.",
];

export default function Demo() {
	return (
		<MessageBranch className="max-w-xl">
			<MessageBranchContent>
				{variants.map((text) => (
					<Message from="assistant" key={text}>
						<MessageContent>
							<MessageResponse>{text}</MessageResponse>
						</MessageContent>
					</Message>
				))}
			</MessageBranchContent>
			<MessageToolbar>
				<MessageBranchSelector>
					<MessageBranchPrevious />
					<MessageBranchPage />
					<MessageBranchNext />
				</MessageBranchSelector>
			</MessageToolbar>
		</MessageBranch>
	);
}
