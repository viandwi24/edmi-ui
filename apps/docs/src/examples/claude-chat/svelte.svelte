<script lang="ts">
	import { ElevationProvider } from "@edmi-svelte/ui/elevation";
	import { AgentAvatar } from "@edmi-svelte/ai/agent-avatar";
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
		ConversationEmptyState,
		ConversationItem,
		ConversationScrollButton,
	} from "@edmi-svelte/ai/conversation";
	import { Message, MessageContent, MessageResponse } from "@edmi-svelte/ai/message";
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
	import {
		Queue,
		QueueItem,
		QueueItemAvatar,
		QueueItemContent,
		QueueItemStatus,
		QueueList,
		QueueSection,
		QueueSectionContent,
		QueueSectionLabel,
		QueueSectionTrigger,
	} from "@edmi-svelte/ai/queue";
	import { Suggestion, Suggestions } from "@edmi-svelte/ai/suggestion";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { DropdownMenuItem } from "@edmi-svelte/ui/dropdown-menu";
	import * as DropdownMenu from "@edmi-svelte/ui/dropdown-menu";
	import * as Item from "@edmi-svelte/ui/item";
	import { Spinner } from "@edmi-svelte/ui/spinner";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import IconPlaceholder from "$lib/components/icon-placeholder/icon-placeholder.svelte";
	import {
		type ArtifactType,
		agent,
		appName,
		banner,
		composer,
		docs,
		greeting,
		groups,
		menu,
		nav,
		project,
		recents,
		suggestions,
		tabs,
		tasks,
		thread,
		tiles,
		title,
		type View,
	} from "./data";

	const tone: Record<ArtifactType, string> = {
		docs: "bg-[color-mix(in_srgb,var(--chart-2)_14%,var(--card))] text-chart-2",
		slides: "bg-[color-mix(in_srgb,var(--chart-3)_14%,var(--card))] text-chart-3",
		design: "bg-[color-mix(in_srgb,var(--chart-4)_14%,var(--card))] text-chart-4",
	};

	let view = $state<View>("thread");
	let openId = $state<string | null>(null);
	let expanded = $state(false);
	let navOpen = $state(false);
	let tab = $state("all");
	let bannerOpen = $state(true);
	const doc = $derived(docs.find((d) => d.id === openId));
	const visible = $derived(
		groups
			.map((g) => ({
				...g,
				items: g.items.filter((i) => tab === "all" || (tab === "shared" ? i.shared : !i.shared)),
			}))
			.filter((g) => g.items.length > 0),
	);

	function go(next: View) {
		view = next;
		openId = null;
		expanded = false;
		navOpen = false;
	}
	function close() {
		expanded = false;
		openId = null;
	}
	function docById(id: string) {
		return docs.find((x) => x.id === id);
	}
</script>

<ElevationProvider mode="layered">
{#snippet typeIcon(type: ArtifactType, cls: string)}
	{#if type === "docs"}
		<IconPlaceholder
			lucide="FileTextIcon"
			tabler="IconFileDescription"
			hugeicons="File01Icon"
			phosphor="FileTextIcon"
			remixicon="RiFileTextLine"
			class={cls}
		/>
	{:else if type === "slides"}
		<IconPlaceholder
			lucide="AppWindowIcon"
			tabler="IconAppWindow"
			hugeicons="BrowserIcon"
			phosphor="AppWindowIcon"
			remixicon="RiWindowLine"
			class={cls}
		/>
	{:else}
		<IconPlaceholder
			lucide="PaletteIcon"
			tabler="IconPalette"
			hugeicons="PaintBoardIcon"
			phosphor="PaletteIcon"
			remixicon="RiPaletteLine"
			class={cls}
		/>
	{/if}
{/snippet}

<div class="flex h-svh bg-background text-foreground">
	{#if navOpen}
		<button
			type="button"
			aria-label="Close menu"
			class="fixed inset-0 z-30 bg-overlay md:hidden"
			onclick={() => (navOpen = false)}
		></button>
	{/if}
	<aside
		class="flex w-60 shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 {navOpen
			? ''
			: 'max-md:-translate-x-full'}"
	>
		<div class="flex items-center gap-2 px-2 pt-1 pb-3 font-serif text-lg">{appName}</div>
		<Button class="w-full justify-start" type="button" variant="outline" onclick={() => go("home")}>
			<IconPlaceholder
				lucide="PlusIcon"
				tabler="IconPlus"
				hugeicons="Add01Icon"
				phosphor="PlusIcon"
				remixicon="RiAddLine"
				class="size-4"
			/>
			New chat
		</Button>
		<div class="mt-2 flex flex-col gap-0.5">
			{#each nav as n (n.view)}
				<Button
					class="w-full justify-start {view === n.view ? 'bg-sidebar-accent' : ''}"
					type="button"
					variant="ghost"
					onclick={() => go(n.view)}
				>
					{#if n.view === "thread"}
						<IconPlaceholder
							lucide="MessageSquareIcon"
							tabler="IconMessage"
							hugeicons="Message01Icon"
							phosphor="ChatCircleIcon"
							remixicon="RiChat1Line"
							class="size-4"
						/>
					{:else}
						<IconPlaceholder
							lucide="BookOpenIcon"
							tabler="IconBook"
							hugeicons="BookOpen01Icon"
							phosphor="BookOpenIcon"
							remixicon="RiBookOpenLine"
							class="size-4"
						/>
					{/if}
					{n.label}
				</Button>
			{/each}
		</div>
		<div class="mt-4 px-2 text-xs text-muted-foreground">Recents</div>
		<div class="flex min-h-0 flex-col gap-0.5 overflow-y-auto">
			{#each recents as r (r)}
				<Button
					class="w-full justify-start font-normal"
					type="button"
					variant="ghost"
					onclick={() => go("thread")}
				>
					<span class="truncate">{r}</span>
				</Button>
			{/each}
		</div>
	</aside>

	<div class="flex min-w-0 flex-1">
		<div class="flex min-w-0 flex-1 flex-col">
			<div class="flex items-center p-2 pb-0 md:hidden">
				<Button
					aria-label="Open menu"
					size="icon-sm"
					type="button"
					variant="ghost"
					onclick={() => (navOpen = true)}
				>
					<IconPlaceholder
						lucide="PanelLeftIcon"
						tabler="IconLayoutSidebar"
						hugeicons="SidebarLeftIcon"
						phosphor="SidebarIcon"
						remixicon="RiLayoutLeftLine"
						class="size-4"
					/>
				</Button>
			</div>

			{#if view === "home"}
				<div class="flex min-h-0 flex-1 flex-col overflow-y-auto">
					<div class="mx-auto flex min-h-full w-full max-w-2xl flex-col gap-4 p-4">
						<ConversationEmptyState variant="home" title={greeting} description="" class="flex-1 gap-8 p-2">
							<Badge variant="secondary" class="-mt-5 gap-1.5">
								<IconPlaceholder
									lucide="MapIcon"
									tabler="IconMap"
									hugeicons="Location01Icon"
									phosphor="MapTrifoldIcon"
									remixicon="RiMapLine"
									class="size-3"
								/>
								{project}
							</Badge>
							<Queue variant="flat" class="w-full text-left">
								<QueueSection>
									<QueueSectionTrigger class="font-normal text-muted-foreground">
										<QueueSectionLabel label="Tasks" chevron={false} />
									</QueueSectionTrigger>
									<QueueSectionContent>
										<QueueList>
											{#each tasks as task (task.id)}
												<QueueItem>
													<div class="flex items-center gap-2">
														<QueueItemAvatar>
															<AgentAvatar seed={task.agent.id} color={task.agent.color} size={22} tile={false} />
														</QueueItemAvatar>
														<QueueItemContent>{task.title}</QueueItemContent>
														<QueueItemStatus>
															<span class="font-mono">{task.age}</span>
															{#if task.status === "running"}
																<Spinner class="size-3.5" />
															{:else}
																<span class="size-1.5 rounded-full bg-success"></span>
															{/if}
														</QueueItemStatus>
													</div>
												</QueueItem>
											{/each}
										</QueueList>
									</QueueSectionContent>
								</QueueSection>
							</Queue>
							<div class="flex w-full items-center gap-2">
								<span class="shrink-0 text-xs text-muted-foreground">Suggested</span>
								<Suggestions>
									{#each suggestions as s (s)}
										<Suggestion suggestion={s} onclick={() => go("thread")} />
									{/each}
								</Suggestions>
							</div>
						</ConversationEmptyState>

						<PromptInput onSubmit={() => go("thread")}>
							<PromptInputHeader>
								<PromptInputAgent {agent} />
							</PromptInputHeader>
							<PromptInputBody>
								<PromptInputTextarea placeholder="Ask {agent.name} anything about your index…" class="min-h-20" />
							</PromptInputBody>
							<PromptInputFooter>
								<PromptInputTools>
									<Button aria-label="Attach" size="icon-sm" type="button" variant="ghost">
										<IconPlaceholder
											lucide="PlusIcon"
											tabler="IconPlus"
											hugeicons="Add01Icon"
											phosphor="PlusIcon"
											remixicon="RiAddLine"
											class="size-4"
										/>
									</Button>
								</PromptInputTools>
								<PromptInputSubmit class="size-10" size="icon-sm" variant="secondary" />
							</PromptInputFooter>
						</PromptInput>
					</div>
				</div>
			{:else if view === "thread"}
				<div class="flex min-h-0 flex-1 flex-col gap-2 p-3">
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
								{docs.length}
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
												{:else if block.type === "archive"}
													<ArtifactCard>
														<ArtifactCardIcon kind="archive" />
														<ArtifactCardBody>
															<ArtifactCardTitle>{block.title}</ArtifactCardTitle>
															<ArtifactCardMeta>{block.meta}</ArtifactCardMeta>
														</ArtifactCardBody>
														<ArtifactCardActions>
															<DropdownMenuItem>Copy link</DropdownMenuItem>
															<DropdownMenuItem>Open</DropdownMenuItem>
														</ArtifactCardActions>
													</ArtifactCard>
												{:else}
													<ArtifactStack>
														{#each block.ids as id (id)}
															{@const d = docById(id)}
															{#if d}
																<ArtifactCard class="cursor-pointer" onclick={() => (openId = id)}>
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
																		<DropdownMenuItem onclick={() => (openId = id)}>Open</DropdownMenuItem>
																	</ArtifactCardActions>
																</ArtifactCard>
															{/if}
														{/each}
														<ArtifactStackDownloadAll />
													</ArtifactStack>
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
			{:else}
				<div class="min-h-0 flex-1 overflow-y-auto">
					<div class="mx-auto w-full max-w-[920px] px-5 py-[30px] sm:px-[34px]">
						<h1 class="font-serif text-[30px] leading-tight font-normal tracking-[-0.3px]">Library</h1>

						<div class="mt-[18px] flex flex-wrap items-center justify-between gap-2">
							<Tabs.Root bind:value={tab}>
								<Tabs.List variant="pills">
									{#each tabs as t (t.value)}
										<Tabs.Trigger value={t.value}>{t.label}</Tabs.Trigger>
									{/each}
								</Tabs.List>
							</Tabs.Root>
							<div class="flex items-center gap-1">
								<Button aria-label="Search" size="icon-sm" type="button" variant="ghost">
									<IconPlaceholder
										lucide="SearchIcon"
										tabler="IconSearch"
										hugeicons="SearchIcon"
										phosphor="MagnifyingGlassIcon"
										remixicon="RiSearchLine"
										class="size-4"
									/>
								</Button>
								<Button aria-label="Grid view" size="icon-sm" type="button" variant="ghost">
									<IconPlaceholder
										lucide="LayoutGridIcon"
										tabler="IconLayoutGrid"
										hugeicons="GridViewIcon"
										phosphor="GridFourIcon"
										remixicon="RiLayoutGridLine"
										class="size-4"
									/>
								</Button>
								<Button size="sm" type="button" variant="secondary">
									Edmi Design
									<IconPlaceholder
										lucide="ChevronDownIcon"
										tabler="IconChevronDown"
										hugeicons="ArrowDown01Icon"
										phosphor="CaretDownIcon"
										remixicon="RiArrowDownSLine"
									/>
								</Button>
							</div>
						</div>

						{#if bannerOpen}
							<Card class="mt-[18px] flex-row items-start justify-between gap-3 px-4 py-3.5">
								<div>
									<div class="text-sm font-semibold">{banner.title}</div>
									<div class="mt-0.5 text-[13.5px] text-muted-foreground">{banner.text}</div>
									<Button class="mt-2.5" size="sm" type="button" variant="secondary">
										{banner.action}
										<IconPlaceholder
											lucide="ArrowUpRightIcon"
											tabler="IconArrowUpRight"
											hugeicons="ArrowUpRight01Icon"
											phosphor="ArrowUpRightIcon"
											remixicon="RiArrowRightUpLine"
										/>
									</Button>
								</div>
								<Button
									aria-label="Dismiss"
									size="icon-sm"
									type="button"
									variant="ghost"
									onclick={() => (bannerOpen = false)}
								>
									<IconPlaceholder
										lucide="XIcon"
										tabler="IconX"
										hugeicons="Cancel01Icon"
										phosphor="XIcon"
										remixicon="RiCloseLine"
										class="size-4"
									/>
								</Button>
							</Card>
						{/if}

						<div class="mt-[22px] mb-2.5 text-[13px] text-muted-foreground">Make something new</div>
						<div class="grid grid-cols-3 gap-3.5 sm:max-w-[538px]">
							{#each tiles as t (t.type)}
								<div class="flex flex-col gap-2">
									<div
										class="flex h-[118px] w-full items-center justify-center rounded-[calc(var(--radius)*1.4)] border border-border {tone[
											t.type
										]}"
									>
										{@render typeIcon(t.type, "size-6")}
									</div>
									<div class="flex items-center gap-1.5 text-sm">
										{t.label}
										<Badge variant="secondary" class="h-[18px] text-[10.5px]">Beta</Badge>
									</div>
								</div>
							{/each}
						</div>

						{#each visible as g (g.label)}
							<section>
								<div class="mt-[22px] mb-0.5 text-[13px] text-muted-foreground">{g.label}</div>
								<Item.Group>
									{#each g.items as i (i.id)}
										<Item.Root class="cursor-pointer px-0 py-3" onclick={() => (openId = i.docId)}>
											<span
												class="inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] {tone[
													i.type
												]}"
											>
												{@render typeIcon(i.type, "size-[18px]")}
											</span>
											<Item.Content>
												<Item.Title class="text-[15px] font-normal">{i.title}</Item.Title>
												{#if i.note}<Item.Description>{i.note}</Item.Description>{/if}
											</Item.Content>
											<Item.Actions>
												<span class="flex items-center gap-1.5 text-[13px] text-muted-foreground">
													<IconPlaceholder
														lucide="LockIcon"
														tabler="IconLock"
														hugeicons="SquareLock02Icon"
														phosphor="LockKeyIcon"
														remixicon="RiLockLine"
														class="size-3.5"
													/>
													<span class="max-sm:hidden">{i.viewed}</span>
												</span>
												<span role="none" onclick={(e) => e.stopPropagation()}>
													<DropdownMenu.Root>
														<DropdownMenu.Trigger>
															{#snippet child({ props })}
																<Button
																	{...props}
																	aria-label="More"
																	size="icon-sm"
																	type="button"
																	variant="ghost"
																>
																	<IconPlaceholder
																		lucide="MoreHorizontalIcon"
																		tabler="IconDots"
																		hugeicons="MoreHorizontalCircle01Icon"
																		phosphor="DotsThreeOutlineIcon"
																		remixicon="RiMoreLine"
																		class="size-4 rotate-90"
																	/>
																</Button>
															{/snippet}
														</DropdownMenu.Trigger>
														<DropdownMenu.Content align="end">
															{#each menu as m (m)}
																<DropdownMenu.Item variant={m === "Delete" ? "destructive" : "default"}>
																	{m}
																</DropdownMenu.Item>
															{/each}
														</DropdownMenu.Content>
													</DropdownMenu.Root>
												</span>
											</Item.Actions>
										</Item.Root>
									{/each}
								</Item.Group>
							</section>
						{/each}
					</div>
				</div>
			{/if}
		</div>

		{#if doc}
			<div
				class={expanded
					? "fixed inset-0 z-50 flex"
					: "flex border-l border-border max-md:fixed max-md:inset-0 max-md:z-50 md:w-1/2 md:shrink-0"}
			>
				<ArtifactViewer class="h-full w-full rounded-none border-0">
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
			</div>
		{/if}
	</div>
</div>
</ElevationProvider>
