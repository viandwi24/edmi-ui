<script lang="ts">
	import {
		Attachment,
		AttachmentInfo,
		AttachmentPreview,
		AttachmentRemove,
		Attachments,
	} from "@edmi-svelte/ai/attachments";
	import {
		PromptInput,
		PromptInputActionAddAttachments,
		PromptInputActionAddScreenshot,
		PromptInputActionMenu,
		PromptInputActionMenuContent,
		PromptInputActionMenuTrigger,
		PromptInputBody,
		PromptInputButton,
		PromptInputFooter,
		PromptInputHeader,
		PromptInputSubmit,
		PromptInputTextarea,
		PromptInputTools,
	} from "@edmi-svelte/ai/prompt-input";
	import type { ChatStatus } from "ai";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";

	let status = $state<ChatStatus>("ready");

	function submit() {
		status = "submitted";
		setTimeout(() => (status = "streaming"), 600);
		setTimeout(() => (status = "ready"), 2400);
	}
</script>

<PromptInput class="max-w-xl" multiple onSubmit={submit}>
	{#snippet children({ files, remove })}
		<PromptInputHeader>
			<Attachments variant="inline">
				{#each files as f (f.id)}
					<Attachment data={f} onRemove={() => remove(f.id)}>
						<AttachmentPreview />
						<AttachmentInfo />
						<AttachmentRemove />
					</Attachment>
				{/each}
			</Attachments>
		</PromptInputHeader>
		<PromptInputBody>
			<PromptInputTextarea placeholder="Ask anything..." />
		</PromptInputBody>
		<PromptInputFooter>
			<PromptInputTools>
				<PromptInputActionMenu>
					<PromptInputActionMenuTrigger />
					<PromptInputActionMenuContent>
						<PromptInputActionAddAttachments />
						<PromptInputActionAddScreenshot />
					</PromptInputActionMenuContent>
				</PromptInputActionMenu>
				<PromptInputButton>
					<IconPlaceholder
						lucide="GlobeIcon"
						tabler="IconWorld"
						hugeicons="Globe02Icon"
						phosphor="GlobeIcon"
						remixicon="RiGlobalLine"
					/>
					<span>Search</span>
				</PromptInputButton>
			</PromptInputTools>
			<PromptInputSubmit {status} onStop={() => (status = "ready")} />
		</PromptInputFooter>
	{/snippet}
</PromptInput>
