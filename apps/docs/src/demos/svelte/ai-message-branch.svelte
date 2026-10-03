<script lang="ts">
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
	} from "@edmi-svelte/ai/message";

	const variants = [
		"Sell **0.42 NVDAx** and buy the other two.",
		"Skip the rebalance: drift is **1.9%**, under your limit.",
		"Rebalance in two steps to keep slippage under `0.05%`.",
	];
</script>

<MessageBranch class="max-w-xl">
	<MessageBranchContent>
		{#each variants as text (text)}
			<Message from="assistant">
				<MessageContent>
					<MessageResponse content={text} />
				</MessageContent>
			</Message>
		{/each}
	</MessageBranchContent>
	<MessageToolbar>
		<MessageBranchSelector>
			<MessageBranchPrevious />
			<MessageBranchPage />
			<MessageBranchNext />
		</MessageBranchSelector>
	</MessageToolbar>
</MessageBranch>
