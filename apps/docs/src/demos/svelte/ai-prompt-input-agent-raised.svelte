<script lang="ts">
	import {
		PromptInput,
		PromptInputBody,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";
	import { PromptInputAgent } from "@edmi-svelte/ai/prompt-input-agent";
</script>

<PromptInput raised onSubmit={() => {}} class="max-w-xl [&_[data-slot=input-group]]:bg-muted">
	<PromptInputHeader>
		<PromptInputAgent agent={{ id: "keeper", name: "Keeper", color: "chart-3" }} />
	</PromptInputHeader>
	<PromptInputBody>
		<PromptInputTextarea class="min-h-20" placeholder="Ask Keeper anything about your index…" />
	</PromptInputBody>
	<PromptInputFooter>
		<PromptInputTools />
		<PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
	</PromptInputFooter>
</PromptInput>
