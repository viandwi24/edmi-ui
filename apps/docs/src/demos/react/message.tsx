import { Bubble, BubbleContent } from "@edmi-react/ui/bubble";
import { Button } from "@edmi-react/ui/button";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageGroup,
	MessageHeader,
} from "@edmi-react/ui/message";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

export default function Demo() {
	return (
		<MessageGroup className="w-full max-w-lg gap-5">
			<Message>
				<MessageAvatar className="size-6 border border-border bg-brand-soft text-brand-text">
					<IconPlaceholder
						lucide="SparklesIcon"
						tabler="IconSparkles"
						hugeicons="SparklesIcon"
						phosphor="SparkleIcon"
						remixicon="RiSparklingLine"
						className="size-3"
					/>
				</MessageAvatar>
				<MessageContent>
					<MessageHeader>
						<span className="font-semibold text-foreground">
							Research agent
						</span>
						<span className="font-mono">09:41</span>
					</MessageHeader>
					<Bubble variant="ghost">
						<BubbleContent>
							I screened the megacaps against your mandate. A rebalance would
							cost about 0.08% in slippage.
						</BubbleContent>
					</Bubble>
					<MessageFooter>
						<Button variant="ghost" size="icon-xs" aria-label="Copy">
							<IconPlaceholder
								lucide="CopyIcon"
								tabler="IconCopy"
								hugeicons="CopyIcon"
								phosphor="CopyIcon"
								remixicon="RiFileCopyLine"
							/>
						</Button>
						<Button variant="ghost" size="icon-xs" aria-label="Like">
							<IconPlaceholder
								lucide="ThumbsUpIcon"
								tabler="IconThumbUp"
								hugeicons="ThumbsUpIcon"
								phosphor="ThumbsUpIcon"
								remixicon="RiThumbUpLine"
							/>
						</Button>
					</MessageFooter>
				</MessageContent>
			</Message>
			<Message align="end">
				<MessageAvatar className="size-6 bg-secondary font-mono text-[10px]">
					DL
				</MessageAvatar>
				<MessageContent>
					<Bubble align="end">
						<BubbleContent>
							Run it and send me the transaction to sign.
						</BubbleContent>
					</Bubble>
					<MessageFooter>Read</MessageFooter>
				</MessageContent>
			</Message>
		</MessageGroup>
	);
}
