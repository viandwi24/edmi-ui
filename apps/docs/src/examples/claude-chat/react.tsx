import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardThumbnail,
	ArtifactCardTitle,
} from "@edmi-react/components/ai/artifact-card";
import {
	ArtifactStack,
	ArtifactStackDownloadAll,
} from "@edmi-react/components/ai/artifact-stack";
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
} from "@edmi-react/components/ai/artifact-viewer";
import { ChatComposer } from "@edmi-react/components/ai/chat-composer";
import {
	ChatHeader,
	ChatHeaderActions,
	ChatHeaderMenu,
	ChatHeaderProject,
	ChatHeaderShare,
	ChatHeaderTitle,
} from "@edmi-react/components/ai/chat-header";
import { CodeBlock } from "@edmi-react/components/ai/code-block";
import {
	Conversation,
	ConversationContent,
	ConversationEmptyState,
	ConversationItem,
	ConversationScrollButton,
} from "@edmi-react/components/ai/conversation";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "@edmi-react/components/ai/message";
import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@edmi-react/components/ai/prompt-input";
import { PromptInputAgent } from "@edmi-react/components/ai/prompt-input-agent";
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
} from "@edmi-react/components/ai/queue";
import { Suggestion, Suggestions } from "@edmi-react/components/ai/suggestion";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@edmi-react/ui/dropdown-menu";
import { ElevationProvider } from "@edmi-react/ui/elevation";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemTitle,
} from "@edmi-react/ui/item";
import { Spinner } from "@edmi-react/ui/spinner";
import { Tabs, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
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

function TypeIcon({
	type,
	className,
}: {
	type: ArtifactType;
	className?: string;
}) {
	if (type === "docs")
		return (
			<IconPlaceholder
				lucide="FileTextIcon"
				tabler="IconFileDescription"
				hugeicons="File01Icon"
				phosphor="FileTextIcon"
				remixicon="RiFileTextLine"
				className={className}
			/>
		);
	if (type === "slides")
		return (
			<IconPlaceholder
				lucide="AppWindowIcon"
				tabler="IconAppWindow"
				hugeicons="BrowserIcon"
				phosphor="AppWindowIcon"
				remixicon="RiWindowLine"
				className={className}
			/>
		);
	return (
		<IconPlaceholder
			lucide="PaletteIcon"
			tabler="IconPalette"
			hugeicons="PaintBoardIcon"
			phosphor="PaletteIcon"
			remixicon="RiPaletteLine"
			className={className}
		/>
	);
}

export default function ClaudeChatExample() {
	const [view, setView] = useState<View>("thread");
	const [openId, setOpenId] = useState<string | null>(null);
	const [expanded, setExpanded] = useState(false);
	const [navOpen, setNavOpen] = useState(false);
	const [tab, setTab] = useState("all");
	const [bannerOpen, setBannerOpen] = useState(true);
	const doc = docs.find((d) => d.id === openId);
	const visible = groups
		.map((g) => ({
			...g,
			items: g.items.filter(
				(i) => tab === "all" || (tab === "shared" ? i.shared : !i.shared),
			),
		}))
		.filter((g) => g.items.length > 0);

	function go(next: View) {
		setView(next);
		setOpenId(null);
		setExpanded(false);
		setNavOpen(false);
	}
	function close() {
		setExpanded(false);
		setOpenId(null);
	}

	return (
		<ElevationProvider mode="layered">
			<div className="flex h-svh bg-background text-foreground">
				{navOpen && (
					<button
						type="button"
						aria-label="Close menu"
						className="fixed inset-0 z-30 bg-overlay md:hidden"
						onClick={() => setNavOpen(false)}
					/>
				)}
				<aside
					className={`flex w-60 shrink-0 flex-col gap-1 border-r border-sidebar-border bg-sidebar p-3 text-sidebar-foreground max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 ${navOpen ? "" : "max-md:-translate-x-full"}`}
				>
					<div className="flex items-center gap-2 px-2 pt-1 pb-3 font-serif text-lg">
						{appName}
					</div>
					<Button
						className="w-full justify-start"
						type="button"
						variant="outline"
						onClick={() => go("home")}
					>
						<IconPlaceholder
							lucide="PlusIcon"
							tabler="IconPlus"
							hugeicons="Add01Icon"
							phosphor="PlusIcon"
							remixicon="RiAddLine"
							className="size-4"
						/>
						New chat
					</Button>
					<div className="mt-2 flex flex-col gap-0.5">
						{nav.map((n) => (
							<Button
								key={n.view}
								className={`w-full justify-start ${view === n.view ? "bg-sidebar-accent" : ""}`}
								type="button"
								variant="ghost"
								onClick={() => go(n.view)}
							>
								{n.view === "thread" ? (
									<IconPlaceholder
										lucide="MessageSquareIcon"
										tabler="IconMessage"
										hugeicons="Message01Icon"
										phosphor="ChatCircleIcon"
										remixicon="RiChat1Line"
										className="size-4"
									/>
								) : (
									<IconPlaceholder
										lucide="BookOpenIcon"
										tabler="IconBook"
										hugeicons="BookOpen01Icon"
										phosphor="BookOpenIcon"
										remixicon="RiBookOpenLine"
										className="size-4"
									/>
								)}
								{n.label}
							</Button>
						))}
					</div>
					<div className="mt-4 px-2 text-xs text-muted-foreground">Recents</div>
					<div className="flex min-h-0 flex-col gap-0.5 overflow-y-auto">
						{recents.map((r) => (
							<Button
								key={r}
								className="w-full justify-start font-normal"
								type="button"
								variant="ghost"
								onClick={() => go("thread")}
							>
								<span className="truncate">{r}</span>
							</Button>
						))}
					</div>
				</aside>

				<div className="flex min-w-0 flex-1">
					<div className="flex min-w-0 flex-1 flex-col">
						<div className="flex items-center p-2 pb-0 md:hidden">
							<Button
								aria-label="Open menu"
								size="icon-sm"
								type="button"
								variant="ghost"
								onClick={() => setNavOpen(true)}
							>
								<IconPlaceholder
									lucide="PanelLeftIcon"
									tabler="IconLayoutSidebar"
									hugeicons="SidebarLeftIcon"
									phosphor="SidebarIcon"
									remixicon="RiLayoutLeftLine"
									className="size-4"
								/>
							</Button>
						</div>

						{view === "home" && (
							<div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
								<div className="mx-auto flex min-h-full w-full max-w-2xl flex-col gap-4 p-4">
									<ConversationEmptyState
										variant="home"
										title={greeting}
										description=""
										className="flex-1 gap-8 p-2"
									>
										<Badge variant="secondary" className="-mt-5 gap-1.5">
											<IconPlaceholder
												lucide="MapIcon"
												tabler="IconMap"
												hugeicons="Location01Icon"
												phosphor="MapTrifoldIcon"
												remixicon="RiMapLine"
												className="size-3"
											/>
											{project}
										</Badge>
										<Queue variant="flat" className="w-full text-left">
											<QueueSection>
												<QueueSectionTrigger className="font-normal text-muted-foreground">
													<QueueSectionLabel label="Tasks" chevron={false} />
												</QueueSectionTrigger>
												<QueueSectionContent>
													<QueueList>
														{tasks.map((task) => (
															<QueueItem key={task.id}>
																<div className="flex items-center gap-2">
																	<QueueItemAvatar>
																		<AgentAvatar
																			seed={task.agent.id}
																			color={task.agent.color}
																			size={22}
																			tile={false}
																		/>
																	</QueueItemAvatar>
																	<QueueItemContent>
																		{task.title}
																	</QueueItemContent>
																	<QueueItemStatus>
																		<span className="font-mono">
																			{task.age}
																		</span>
																		{task.status === "running" ? (
																			<Spinner className="size-3.5" />
																		) : (
																			<span className="size-1.5 rounded-full bg-success" />
																		)}
																	</QueueItemStatus>
																</div>
															</QueueItem>
														))}
													</QueueList>
												</QueueSectionContent>
											</QueueSection>
										</Queue>
										<div className="flex w-full items-center gap-2">
											<span className="shrink-0 text-xs text-muted-foreground">
												Suggested
											</span>
											<Suggestions>
												{suggestions.map((s) => (
													<Suggestion
														key={s}
														suggestion={s}
														onClick={() => go("thread")}
													/>
												))}
											</Suggestions>
										</div>
									</ConversationEmptyState>

									<PromptInput onSubmit={() => go("thread")}>
										<PromptInputHeader>
											<PromptInputAgent agent={agent} />
										</PromptInputHeader>
										<PromptInputBody>
											<PromptInputTextarea
												placeholder={`Ask ${agent.name} anything about your index…`}
												className="min-h-20"
											/>
										</PromptInputBody>
										<PromptInputFooter>
											<PromptInputTools>
												<Button
													aria-label="Attach"
													size="icon-sm"
													type="button"
													variant="ghost"
												>
													<IconPlaceholder
														lucide="PlusIcon"
														tabler="IconPlus"
														hugeicons="Add01Icon"
														phosphor="PlusIcon"
														remixicon="RiAddLine"
														className="size-4"
													/>
												</Button>
											</PromptInputTools>
											<PromptInputSubmit
												size="icon-sm"
												className="size-10"
												variant="secondary"
											/>
										</PromptInputFooter>
									</PromptInput>
								</div>
							</div>
						)}

						{view === "thread" && (
							<div className="flex min-h-0 flex-1 flex-col gap-2 p-3">
								<ChatHeader>
									<ChatHeaderTitle>
										<span className="truncate">{title}</span>
										<ChatHeaderProject status="connected" />
										<ChatHeaderMenu>
											<DropdownMenuItem>Rename</DropdownMenuItem>
											<DropdownMenuItem>Move to project</DropdownMenuItem>
											<DropdownMenuItem variant="destructive">
												Delete
											</DropdownMenuItem>
										</ChatHeaderMenu>
									</ChatHeaderTitle>
									<ChatHeaderActions>
										<Button
											aria-label="Web access"
											size="icon-sm"
											type="button"
											variant="ghost"
										>
											<IconPlaceholder
												lucide="GlobeIcon"
												tabler="IconWorld"
												hugeicons="Globe02Icon"
												phosphor="GlobeIcon"
												remixicon="RiGlobalLine"
												className="size-4"
											/>
										</Button>
										<Button size="sm" type="button" variant="ghost">
											<IconPlaceholder
												lucide="FileTextIcon"
												tabler="IconFileDescription"
												hugeicons="File01Icon"
												phosphor="FileTextIcon"
												remixicon="RiFileTextLine"
												className="size-3.5"
											/>
											{docs.length}
										</Button>
										<ChatHeaderShare />
									</ChatHeaderActions>
								</ChatHeader>

								<Conversation className="min-h-0">
									<ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
										{thread.map((turn) => (
											<ConversationItem key={turn.id} messageId={turn.id}>
												<Message from={turn.role}>
													<MessageContent className="gap-4">
														{turn.blocks.map((block, i) => {
															switch (block.type) {
																case "markdown":
																	return turn.role === "user" ? (
																		block.text
																	) : (
																		// biome-ignore lint/suspicious/noArrayIndexKey: static sample data
																		<MessageResponse key={i}>
																			{block.text}
																		</MessageResponse>
																	);
																case "code":
																	return (
																		<CodeBlock
																			// biome-ignore lint/suspicious/noArrayIndexKey: static sample data
																			key={i}
																			code={block.code}
																			language={block.language}
																		/>
																	);
																case "archive":
																	return (
																		// biome-ignore lint/suspicious/noArrayIndexKey: static sample data
																		<ArtifactCard key={i}>
																			<ArtifactCardIcon kind="archive" />
																			<ArtifactCardBody>
																				<ArtifactCardTitle>
																					{block.title}
																				</ArtifactCardTitle>
																				<ArtifactCardMeta>
																					{block.meta}
																				</ArtifactCardMeta>
																			</ArtifactCardBody>
																			<ArtifactCardActions>
																				<DropdownMenuItem>
																					Copy link
																				</DropdownMenuItem>
																				<DropdownMenuItem>
																					Open
																				</DropdownMenuItem>
																			</ArtifactCardActions>
																		</ArtifactCard>
																	);
																default:
																	return (
																		// biome-ignore lint/suspicious/noArrayIndexKey: static sample data
																		<ArtifactStack key={i}>
																			{block.ids.map((id) => {
																				const d = docs.find((x) => x.id === id);
																				if (!d) return null;
																				return (
																					<ArtifactCard
																						key={d.id}
																						className="cursor-pointer"
																						onClick={() => setOpenId(d.id)}
																					>
																						{d.thumbnail ? (
																							<ArtifactCardThumbnail />
																						) : (
																							<ArtifactCardIcon kind={d.kind} />
																						)}
																						<ArtifactCardBody>
																							<ArtifactCardTitle>
																								{d.title}
																							</ArtifactCardTitle>
																							<ArtifactCardMeta>
																								{d.meta}
																							</ArtifactCardMeta>
																						</ArtifactCardBody>
																						<ArtifactCardActions>
																							<DropdownMenuItem>
																								Copy link
																							</DropdownMenuItem>
																							<DropdownMenuItem
																								onClick={() => setOpenId(d.id)}
																							>
																								Open
																							</DropdownMenuItem>
																						</ArtifactCardActions>
																					</ArtifactCard>
																				);
																			})}
																			<ArtifactStackDownloadAll />
																		</ArtifactStack>
																	);
															}
														})}
													</MessageContent>
												</Message>
											</ConversationItem>
										))}
									</ConversationContent>
									<ConversationScrollButton />
								</Conversation>

								<ChatComposer
									className="mx-auto max-w-3xl"
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
						)}

						{view === "library" && (
							<div className="min-h-0 flex-1 overflow-y-auto">
								<div className="mx-auto w-full max-w-[920px] px-5 py-[30px] sm:px-[34px]">
									<h1 className="font-serif text-[30px] leading-tight font-normal tracking-[-0.3px]">
										Library
									</h1>

									<div className="mt-[18px] flex flex-wrap items-center justify-between gap-2">
										<Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
											<TabsList variant="pills">
												{tabs.map((t) => (
													<TabsTrigger key={t.value} value={t.value}>
														{t.label}
													</TabsTrigger>
												))}
											</TabsList>
										</Tabs>
										<div className="flex items-center gap-1">
											<Button
												aria-label="Search"
												size="icon-sm"
												type="button"
												variant="ghost"
											>
												<IconPlaceholder
													lucide="SearchIcon"
													tabler="IconSearch"
													hugeicons="SearchIcon"
													phosphor="MagnifyingGlassIcon"
													remixicon="RiSearchLine"
													className="size-4"
												/>
											</Button>
											<Button
												aria-label="Grid view"
												size="icon-sm"
												type="button"
												variant="ghost"
											>
												<IconPlaceholder
													lucide="LayoutGridIcon"
													tabler="IconLayoutGrid"
													hugeicons="GridViewIcon"
													phosphor="GridFourIcon"
													remixicon="RiLayoutGridLine"
													className="size-4"
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

									{bannerOpen && (
										<Card className="mt-[18px] flex-row items-start justify-between gap-3 px-4 py-3.5">
											<div>
												<div className="text-sm font-semibold">
													{banner.title}
												</div>
												<div className="mt-0.5 text-[13.5px] text-muted-foreground">
													{banner.text}
												</div>
												<Button
													className="mt-2.5"
													size="sm"
													type="button"
													variant="secondary"
												>
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
												onClick={() => setBannerOpen(false)}
											>
												<IconPlaceholder
													lucide="XIcon"
													tabler="IconX"
													hugeicons="Cancel01Icon"
													phosphor="XIcon"
													remixicon="RiCloseLine"
													className="size-4"
												/>
											</Button>
										</Card>
									)}

									<div className="mt-[22px] mb-2.5 text-[13px] text-muted-foreground">
										Make something new
									</div>
									<div className="grid grid-cols-3 gap-3.5 sm:max-w-[538px]">
										{tiles.map((t) => (
											<div key={t.type} className="flex flex-col gap-2">
												<div
													className={`flex h-[118px] w-full items-center justify-center rounded-[calc(var(--radius)*1.4)] border border-border ${tone[t.type]}`}
												>
													<TypeIcon type={t.type} className="size-6" />
												</div>
												<div className="flex items-center gap-1.5 text-sm">
													{t.label}
													<Badge
														variant="secondary"
														className="h-[18px] text-[10.5px]"
													>
														Beta
													</Badge>
												</div>
											</div>
										))}
									</div>

									{visible.map((g) => (
										<section key={g.label}>
											<div className="mt-[22px] mb-0.5 text-[13px] text-muted-foreground">
												{g.label}
											</div>
											<ItemGroup>
												{g.items.map((i) => (
													<Item
														key={i.id}
														className="cursor-pointer px-0 py-3"
														onClick={() => setOpenId(i.docId)}
													>
														<span
															className={`inline-flex size-10 shrink-0 items-center justify-center rounded-[10px] ${tone[i.type]}`}
														>
															<TypeIcon type={i.type} className="size-[18px]" />
														</span>
														<ItemContent>
															<ItemTitle className="text-[15px] font-normal">
																{i.title}
															</ItemTitle>
															{i.note && (
																<ItemDescription>{i.note}</ItemDescription>
															)}
														</ItemContent>
														<ItemActions>
															<span className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
																<IconPlaceholder
																	lucide="LockIcon"
																	tabler="IconLock"
																	hugeicons="SquareLock02Icon"
																	phosphor="LockKeyIcon"
																	remixicon="RiLockLine"
																	className="size-3.5"
																/>
																<span className="max-sm:hidden">
																	{i.viewed}
																</span>
															</span>
															<DropdownMenu>
																<DropdownMenuTrigger
																	render={
																		<Button
																			aria-label="More"
																			size="icon-sm"
																			type="button"
																			variant="ghost"
																			onClick={(e) => e.stopPropagation()}
																		/>
																	}
																>
																	<IconPlaceholder
																		lucide="MoreHorizontalIcon"
																		tabler="IconDots"
																		hugeicons="MoreHorizontalCircle01Icon"
																		phosphor="DotsThreeOutlineIcon"
																		remixicon="RiMoreLine"
																		className="size-4 rotate-90"
																	/>
																</DropdownMenuTrigger>
																<DropdownMenuContent align="end">
																	{menu.map((m) => (
																		<DropdownMenuItem
																			key={m}
																			variant={
																				m === "Delete"
																					? "destructive"
																					: "default"
																			}
																		>
																			{m}
																		</DropdownMenuItem>
																	))}
																</DropdownMenuContent>
															</DropdownMenu>
														</ItemActions>
													</Item>
												))}
											</ItemGroup>
										</section>
									))}
								</div>
							</div>
						)}
					</div>

					{doc && (
						<div
							className={
								expanded
									? "fixed inset-0 z-50 flex"
									: "flex border-l border-border max-md:fixed max-md:inset-0 max-md:z-50 md:w-1/2 md:shrink-0"
							}
						>
							<ArtifactViewer className="h-full w-full rounded-none border-0">
								<ArtifactViewerHeader>
									<ArtifactViewerTitle format={doc.format}>
										{doc.title}
									</ArtifactViewerTitle>
									<ArtifactViewerOpenIn />
									<ArtifactViewerDownload />
									<ArtifactViewerExpand
										onClick={() => setExpanded((e) => !e)}
									/>
									<ArtifactViewerClose onClick={close} />
								</ArtifactViewerHeader>
								<ArtifactViewerContent>
									<ArtifactViewerPaper className="px-8 py-[30px]">
										<div className="font-mono text-[10.5px] tracking-[2px] text-[#7a7974]">
											{doc.paper.kicker}
										</div>
										<div className="mt-2.5 font-serif text-2xl leading-[1.15] font-bold">
											{doc.paper.headline}
										</div>
										<p className="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
											{doc.paper.lead.map((s) =>
												s.b ? (
													<b key={s.t}>{s.t}</b>
												) : s.link ? (
													<span key={s.t} className="text-[#3b6fd6]">
														{s.t}
													</span>
												) : (
													s.t
												),
											)}
										</p>
										<div className="mt-4 mb-2.5 h-0.5 bg-[#22406b]" />
										<div className="font-serif text-base font-bold text-[#22406b]">
											{doc.paper.heading}
										</div>
										<p className="mt-3 text-[12.5px] leading-[1.7] text-[#3d3c38]">
											{doc.paper.body.map((s) =>
												s.b ? <b key={s.t}>{s.t}</b> : s.t,
											)}
										</p>
									</ArtifactViewerPaper>
								</ArtifactViewerContent>
							</ArtifactViewer>
						</div>
					)}
				</div>
			</div>
		</ElevationProvider>
	);
}
