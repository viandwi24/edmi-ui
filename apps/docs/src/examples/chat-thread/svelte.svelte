<script lang="ts">
	import {
		ArtifactCard,
		ArtifactCardActions,
		ArtifactCardBody,
		ArtifactCardIcon,
		ArtifactCardMeta,
		ArtifactCardTitle,
	} from "@edmi-svelte/ai/artifact-card";
	import { ChatComposer } from "@edmi-svelte/ai/chat-composer";
	import {
		ChatHeader,
		ChatHeaderActions,
		ChatHeaderMenu,
		ChatHeaderProject,
		ChatHeaderShare,
		ChatHeaderTitle,
	} from "@edmi-svelte/ai/chat-header";
	import { CodeBlock } from "@edmi-svelte/ai/code-block";
	import {
		Conversation,
		ConversationContent,
		ConversationItem,
		ConversationScrollButton,
	} from "@edmi-svelte/ai/conversation";
	import { Message, MessageContent, MessageResponse } from "@edmi-svelte/ai/message";
	import { Button } from "@edmi-svelte/ui/button";
	import { DropdownMenuItem } from "@edmi-svelte/ui/dropdown-menu";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import { composer, thread, title } from "./data";
</script>

<div class="flex h-svh flex-col gap-2 bg-background p-3 text-foreground">
	<ChatHeader>
		<ChatHeaderTitle>
			<span class="truncate">{title}</span>
			<ChatHeaderProject status="connected" />
			<ChatHeaderMenu>
				<DropdownMenuItem>Rename</DropdownMenuItem>
				<DropdownMenuItem>Move to project</DropdownMenuItem>
				<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
			</ChatHeaderMenu>
		</ChatHeaderTitle>
		<ChatHeaderActions>
			<Button aria-label="Web access" size="icon-sm" type="button" variant="ghost">
				<IconPlaceholder
					lucide="GlobeIcon"
					tabler="IconWorld"
					hugeicons="Globe02Icon"
					phosphor="GlobeIcon"
					remixicon="RiGlobalLine"
					class="size-4"
				/>
			</Button>
			<Button size="sm" type="button" variant="ghost">
				<IconPlaceholder
					lucide="FileTextIcon"
					tabler="IconFileDescription"
					hugeicons="File01Icon"
					phosphor="FileTextIcon"
					remixicon="RiFileTextLine"
					class="size-3.5"
				/>
				1
			</Button>
			<ChatHeaderShare />
		</ChatHeaderActions>
	</ChatHeader>

	<Conversation class="min-h-0">
		<ConversationContent class="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
			{#each thread as turn (turn.id)}
				<ConversationItem messageId={turn.id}>
					<Message from={turn.role}>
						<MessageContent class="gap-4">
							{#each turn.blocks as block, i (i)}
								{#if block.type === "markdown"}
									{#if turn.role === "user"}
										{block.text}
									{:else}
										<MessageResponse content={block.text} />
									{/if}
								{:else if block.type === "code"}
									<CodeBlock code={block.code} language={block.language} />
								{:else}
									<ArtifactCard>
										<ArtifactCardIcon kind={block.kind} />
										<ArtifactCardBody>
											<ArtifactCardTitle>{block.title}</ArtifactCardTitle>
											<ArtifactCardMeta>{block.meta}</ArtifactCardMeta>
										</ArtifactCardBody>
										<ArtifactCardActions>
											<DropdownMenuItem>Copy link</DropdownMenuItem>
											<DropdownMenuItem>Open</DropdownMenuItem>
										</ArtifactCardActions>
									</ArtifactCard>
								{/if}
							{/each}
						</MessageContent>
					</Message>
				</ConversationItem>
			{/each}
		</ConversationContent>
		<ConversationScrollButton />
	</Conversation>

	<ChatComposer
		class="mx-auto max-w-3xl"
		onSubmit={() => {}}
		onAttach={() => {}}
		onSpeech={() => {}}
		disclaimer={composer.disclaimer}
		models={composer.models}
		efforts={composer.efforts}
		defaultEffort="medium"
		modes={composer.modes}
	/>
</div>
