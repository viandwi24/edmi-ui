import {
	Message,
	MessageAction,
	MessageActions,
	MessageContent,
	MessageResponse,
	MessageToolbar,
} from "@edmi-react/components/ai/message";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const markdown = `### Rebalance plan

1. Sell **0.42 NVDAx** ($79)
2. Buy **0.18 MSFTx** and **0.21 AAPLx**

Estimated slippage \`0.08%\`.

> Slippage stays under 1% at current depth.

Sources: [Jupiter quote API](https://example.com).`;

export default function Demo() {
	return (
		<div className="flex w-full max-w-xl flex-col gap-6">
			<Message from="user">
				<MessageContent>Rebalance if drift is above 2%.</MessageContent>
			</Message>
			<Message from="assistant">
				<MessageContent>
					<MessageResponse>{markdown}</MessageResponse>
				</MessageContent>
				<MessageToolbar>
					<MessageActions>
						<MessageAction tooltip="Copy">
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="Copy01Icon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
							/>
						</MessageAction>
						<MessageAction tooltip="Regenerate">
							<IconPlaceholder
								lucide="RefreshCcwIcon"
								tabler="IconRefresh"
								hugeicons="ReloadIcon"
								phosphor="ArrowClockwiseIcon"
								remixicon="RiRefreshLine"
							/>
						</MessageAction>
						<MessageAction tooltip="Good response">
							<IconPlaceholder
								lucide="ThumbsUpIcon"
								tabler="IconThumbUp"
								hugeicons="ThumbsUpIcon"
								phosphor="ThumbsUpIcon"
								remixicon="RiThumbUpLine"
							/>
						</MessageAction>
					</MessageActions>
				</MessageToolbar>
			</Message>
		</div>
	);
}
