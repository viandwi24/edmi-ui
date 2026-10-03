import {
	Conversation,
	ConversationContent,
	ConversationDownload,
	ConversationItem,
	ConversationScrollButton,
} from "@edmi-react/components/ai/conversation";
import {
	Message,
	MessageAction,
	MessageActions,
	MessageContent,
	MessageResponse,
	MessageToolbar,
} from "@edmi-react/components/ai/message";
import { Shimmer } from "@edmi-react/components/ai/shimmer";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const turns = [
	{ role: "user", text: "Which megacaps drift the most this month?" },
	{
		role: "assistant",
		text: "NVDAx moved most: **+2.4%** over its 32% target. MSFTx and AAPLx are within 0.5%.",
	},
	{ role: "user", text: "Rebalance if drift is above 2%." },
] as const;

export default function Demo() {
	return (
		<div className="relative flex h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card">
			<Conversation className="size-full">
				<ConversationContent>
					{turns.map((t, i) => (
						<ConversationItem key={t.text} messageId={`m${i}`}>
							<Message from={t.role}>
								<MessageContent>
									{t.role === "assistant" ? (
										<MessageResponse>{t.text}</MessageResponse>
									) : (
										t.text
									)}
								</MessageContent>
								{t.role === "assistant" && (
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
										</MessageActions>
									</MessageToolbar>
								)}
							</Message>
						</ConversationItem>
					))}
					<ConversationItem messageId="status">
						<Message from="assistant">
							<MessageContent>
								<Shimmer>Checking keeper limits...</Shimmer>
							</MessageContent>
						</Message>
					</ConversationItem>
				</ConversationContent>
				<ConversationScrollButton />
				<ConversationDownload
					messages={turns.map((t, i) => ({
						id: `m${i}`,
						role: t.role,
						parts: [{ type: "text" as const, text: t.text }],
					}))}
				/>
			</Conversation>
		</div>
	);
}
