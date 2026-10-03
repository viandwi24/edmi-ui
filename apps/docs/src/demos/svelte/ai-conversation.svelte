<script lang="ts">
	import {
		Conversation,
		ConversationContent,
		ConversationDownload,
		ConversationItem,
		ConversationScrollButton,
	} from "@edmi-svelte/ai/conversation";
	import {
		Message,
		MessageAction,
		MessageActions,
		MessageContent,
		MessageResponse,
		MessageToolbar,
	} from "@edmi-svelte/ai/message";
	import { Shimmer } from "@edmi-svelte/ai/shimmer";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	const turns = [
		{ role: "user", text: "Which megacaps drift the most this month?" },
		{
			role: "assistant",
			text: "NVDAx moved most: **+2.4%** over its 32% target. MSFTx and AAPLx are within 0.5%.",
		},
		{ role: "user", text: "Rebalance if drift is above 2%." },
	] as const;

	const messages = turns.map((t, i) => ({
		id: `m${i}`,
		role: t.role,
		parts: [{ type: "text" as const, text: t.text }],
	}));
</script>

<div class="relative flex h-96 w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card">
	<Conversation class="size-full">
		<ConversationContent>
			{#each turns as t, i (t.text)}
				<ConversationItem messageId={`m${i}`}>
					<Message from={t.role}>
						<MessageContent>
							{#if t.role === "assistant"}
								<MessageResponse content={t.text} />
							{:else}
								{t.text}
							{/if}
						</MessageContent>
						{#if t.role === "assistant"}
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
						{/if}
					</Message>
				</ConversationItem>
			{/each}
			<ConversationItem messageId="status">
				<Message from="assistant">
					<MessageContent>
						<Shimmer>Checking keeper limits...</Shimmer>
					</MessageContent>
				</Message>
			</ConversationItem>
		</ConversationContent>
		<ConversationScrollButton />
		<ConversationDownload {messages} />
	</Conversation>
</div>
