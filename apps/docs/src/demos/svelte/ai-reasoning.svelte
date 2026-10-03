<script lang="ts">
	import { Reasoning, ReasoningContent, ReasoningTrigger } from "@edmi-svelte/ai/reasoning";
	import { onMount } from "svelte";

	const text =
		"NVDAx is 2.4% over target. The keeper limit is 2%, so a rebalance is allowed. Slippage on 0.42 NVDAx at current depth is about 0.08%.";

	// Streams the text in, then flips `isStreaming` off: the block opens while streaming and closes itself afterwards.
	let shown = $state(0);
	let streaming = $state(true);
	onMount(() => {
		const id = setInterval(() => {
			shown += 3;
			if (shown >= text.length) {
				streaming = false;
				clearInterval(id);
			}
		}, 40);
		return () => clearInterval(id);
	});
</script>

<div class="flex w-full max-w-lg flex-col gap-6">
	<Reasoning isStreaming={streaming}>
		<ReasoningTrigger />
		<ReasoningContent content={text.slice(0, shown)} />
	</Reasoning>
	<Reasoning defaultOpen={false} duration={6}>
		<ReasoningTrigger />
		<ReasoningContent content={text} />
	</Reasoning>
</div>
