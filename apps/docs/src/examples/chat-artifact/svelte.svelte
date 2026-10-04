<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import {
		ArtifactCard,
		ArtifactCardActions,
		ArtifactCardBody,
		ArtifactCardIcon,
		ArtifactCardMeta,
		ArtifactCardThumbnail,
		ArtifactCardTitle,
	} from "@edmi-svelte/ai/artifact-card";
	import { ArtifactStack, ArtifactStackDownloadAll } from "@edmi-svelte/ai/artifact-stack";
	import {
		ArtifactViewer,
		ArtifactViewerClose,
		ArtifactViewerContent,
		ArtifactViewerDownload,
		ArtifactViewerExpand,
		ArtifactViewerHeader,
		ArtifactViewerOpenIn,
		ArtifactViewerPaper,
		ArtifactViewerTitle,
	} from "@edmi-svelte/ai/artifact-viewer";
	import { ChatComposer } from "@edmi-svelte/ai/chat-composer";
	import {
		Conversation,
		ConversationContent,
		ConversationItem,
	} from "@edmi-svelte/ai/conversation";
	import { Message, MessageContent, MessageResponse } from "@edmi-svelte/ai/message";
	import { DropdownMenuItem } from "@edmi-svelte/ui/dropdown-menu";
	import * as Resizable from "@edmi-svelte/ui/resizable";
	import { onMount } from "svelte";
	import { composer, docs, notes, processNote, question } from "./data";

	let openId = $state<string | null>(docs[0]?.id ?? null);
	let expanded = $state(false);
	const doc = $derived(docs.find((d) => d.id === openId));

	// Narrow screens start with the viewer closed; a card click opens it.
	onMount(() => {
		if (window.matchMedia("(max-width: 767px)").matches) openId = null;
	});

	function close() {
		expanded = false;
		openId = null;
	}
</script>

<ElevationProvider mode="layered">
<Resizable.PaneGroup direction="horizontal" class="h-svh bg-background text-foreground">
	<Resizable.Pane id="chat" order={1} defaultSize={doc ? 42 : 100} minSize={30}>
		<div class="flex h-full min-w-0 flex-col">
			<Conversation class="min-h-0">
				<ConversationContent class="mx-auto w-full max-w-3xl gap-4 px-[18px] py-[14px]">
					<ConversationItem messageId="a1">
						<Message from="assistant">
							<MessageContent class="gap-4">
								<MessageResponse content={notes} />
								<ArtifactStack>
									{#each docs as d (d.id)}
										<ArtifactCard class="cursor-pointer" onclick={() => (openId = d.id)}>
											{#if d.thumbnail}
												<ArtifactCardThumbnail />
											{:else}
												<ArtifactCardIcon kind={d.kind} />
											{/if}
											<ArtifactCardBody>
												<ArtifactCardTitle>{d.title}</ArtifactCardTitle>
												<ArtifactCardMeta>{d.meta}</ArtifactCardMeta>
											</ArtifactCardBody>
											<ArtifactCardActions>
												<DropdownMenuItem>Copy link</DropdownMenuItem>
												<DropdownMenuItem>Open</DropdownMenuItem>
											</ArtifactCardActions>
										</ArtifactCard>
									{/each}
									<ArtifactStackDownloadAll />
								</ArtifactStack>
							</MessageContent>
						</Message>
					</ConversationItem>
					<ConversationItem messageId="u1">
						<Message from="user">
							<MessageContent>{question}</MessageContent>
						</Message>
					</ConversationItem>
					<ConversationItem messageId="a2">
						<Message from="assistant">
							<MessageContent class="text-[13.5px] text-muted-foreground">
								{processNote}
							</MessageContent>
						</Message>
					</ConversationItem>
				</ConversationContent>
			</Conversation>
			<div class="px-3.5 pt-2 pb-3">
				<ChatComposer
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
		</div>
	</Resizable.Pane>
	{#if doc}
		<Resizable.Handle withHandle />
		<Resizable.Pane id="viewer" order={2} defaultSize={58} minSize={30}>
			<ArtifactViewer
				class={expanded
					? "fixed inset-0 z-50 h-svh rounded-none border-0"
					: "h-full rounded-none border-0"}
			>
				<ArtifactViewerHeader>
					<ArtifactViewerTitle format={doc.format}>{doc.title}</ArtifactViewerTitle>
					<ArtifactViewerOpenIn />
					<ArtifactViewerDownload />
					<ArtifactViewerExpand onclick={() => (expanded = !expanded)} />
					<ArtifactViewerClose onclick={close} />
				</ArtifactViewerHeader>
				<ArtifactViewerContent>
					<ArtifactViewerPaper class="px-8 py-[30px]">
						<div class="font-mono text-[10.5px] tracking-[2px] text-[#7a7974]">
							{doc.paper.kicker}
						</div>
						<div class="mt-2.5 font-serif text-2xl leading-[1.15] font-bold">
							{doc.paper.headline}
						</div>
						<p class="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
							{#each doc.paper.lead as s (s.t)}
								{#if s.b}<b>{s.t}</b>{:else if s.link}<span class="text-[#3b6fd6]">{s.t}</span>{:else}{s.t}{/if}
							{/each}
						</p>
						<div class="mt-4 mb-2.5 h-0.5 bg-[#22406b]"></div>
						<div class="font-serif text-base font-bold text-[#22406b]">{doc.paper.heading}</div>
						<p class="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
							{#each doc.paper.body as s (s.t)}
								{#if s.b}<b>{s.t}</b>{:else}{s.t}{/if}
							{/each}
						</p>
					</ArtifactViewerPaper>
				</ArtifactViewerContent>
			</ArtifactViewer>
		</Resizable.Pane>
	{/if}
</Resizable.PaneGroup>
</ElevationProvider>
