import { Bubble, BubbleContent } from "@edmi-react/ui/bubble";
import { Marker, MarkerContent } from "@edmi-react/ui/marker";
import { Message, MessageContent } from "@edmi-react/ui/message";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@edmi-react/ui/message-scroller";

const turns = Array.from({ length: 12 }, (_, i) => i);

export default function Demo() {
	return (
		<div className="h-72 w-full max-w-md rounded-xl border border-border bg-card p-3">
			<MessageScrollerProvider autoScroll>
				<MessageScroller>
					<MessageScrollerViewport>
						<MessageScrollerContent className="gap-4 pr-2">
							<Marker variant="separator">
								<MarkerContent>Yesterday</MarkerContent>
							</Marker>
							{turns.map((i) => (
								<MessageScrollerItem key={i} messageId={`m${i}`}>
									<Message align={i % 2 ? "end" : "start"}>
										<MessageContent>
											<Bubble
												align={i % 2 ? "end" : "start"}
												variant={i % 2 ? "default" : "secondary"}
											>
												<BubbleContent>
													{i % 2 ? "Any drift?" : `NVDAx is at ${30 + i}%.`}
												</BubbleContent>
											</Bubble>
										</MessageContent>
									</Message>
								</MessageScrollerItem>
							))}
						</MessageScrollerContent>
					</MessageScrollerViewport>
					<MessageScrollerButton />
				</MessageScroller>
			</MessageScrollerProvider>
		</div>
	);
}
