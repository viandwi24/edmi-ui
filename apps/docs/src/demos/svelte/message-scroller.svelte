<script lang="ts">
	import * as Bubble from "@edmi-svelte/ui/bubble";
	import * as Marker from "@edmi-svelte/ui/marker";
	import * as Message from "@edmi-svelte/ui/message";
	import * as MessageScroller from "@edmi-svelte/ui/message-scroller";

	const turns = Array.from({ length: 12 }, (_, i) => i);
</script>

<div class="h-72 w-full max-w-md rounded-xl border border-border bg-card p-3">
	<MessageScroller.Provider autoScroll>
		<MessageScroller.Root>
			<MessageScroller.Viewport>
				<MessageScroller.Content class="gap-4 pr-2">
					<Marker.Root variant="separator">
						<Marker.Content>Yesterday</Marker.Content>
					</Marker.Root>
					{#each turns as i (i)}
						<MessageScroller.Item messageId={`m${i}`}>
							<Message.Root align={i % 2 ? "end" : "start"}>
								<Message.Content>
									<Bubble.Root
										align={i % 2 ? "end" : "start"}
										variant={i % 2 ? "default" : "secondary"}
									>
										<Bubble.Content>
											{i % 2 ? "Any drift?" : `NVDAx is at ${30 + i}%.`}
										</Bubble.Content>
									</Bubble.Root>
								</Message.Content>
							</Message.Root>
						</MessageScroller.Item>
					{/each}
				</MessageScroller.Content>
			</MessageScroller.Viewport>
			<MessageScroller.Button />
		</MessageScroller.Root>
	</MessageScroller.Provider>
</div>
