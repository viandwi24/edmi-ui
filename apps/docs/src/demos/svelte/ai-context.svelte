<script lang="ts">
	import {
		Context,
		ContextCacheUsage,
		ContextContent,
		ContextContentBody,
		ContextContentFooter,
		ContextContentHeader,
		ContextInputUsage,
		ContextOutputUsage,
		ContextReasoningUsage,
		ContextTrigger,
	} from "@edmi-svelte/ai/context";

	const usage = {
		inputTokens: 98200,
		outputTokens: 18400,
		totalTokens: 124000,
		inputTokenDetails: {
			noCacheTokens: 96900,
			cacheReadTokens: 1300,
			cacheWriteTokens: 0,
		},
		outputTokenDetails: { textTokens: 12300, reasoningTokens: 6100 },
	};
</script>

<div class="flex items-start gap-6">
	<Context maxTokens={200000} usedTokens={124000} {usage} modelId="anthropic/claude-sonnet-4">
		<ContextTrigger />
		<ContextContent>
			<ContextContentHeader />
			<ContextContentBody>
				<ContextInputUsage />
				<ContextOutputUsage />
				<ContextReasoningUsage />
				<ContextCacheUsage />
			</ContextContentBody>
			<ContextContentFooter />
		</ContextContent>
	</Context>
	<Context maxTokens={200000} usedTokens={182000}>
		<ContextTrigger />
		<ContextContent>
			<ContextContentHeader />
		</ContextContent>
	</Context>
</div>
