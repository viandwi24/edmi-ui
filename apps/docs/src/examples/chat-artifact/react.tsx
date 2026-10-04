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
	Conversation,
	ConversationContent,
	ConversationItem,
} from "@edmi-react/components/ai/conversation";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "@edmi-react/components/ai/message";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";
import { ElevationProvider } from "@edmi-react/ui/elevation";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@edmi-react/ui/resizable";
import { useEffect, useState } from "react";
import { composer, docs, notes, processNote, question } from "./data";

export default function ChatArtifactExample() {
	const [openId, setOpenId] = useState<string | null>(docs[0]?.id ?? null);
	const [expanded, setExpanded] = useState(false);
	const doc = docs.find((d) => d.id === openId);

	// Narrow screens start with the viewer closed; a card click opens it.
	useEffect(() => {
		if (window.matchMedia("(max-width: 767px)").matches) setOpenId(null);
	}, []);

	return (
		<ElevationProvider mode="layered">
			<ResizablePanelGroup
				orientation="horizontal"
				className="h-svh bg-background text-foreground"
			>
				<ResizablePanel
					id="chat"
					defaultSize={doc ? "42%" : "100%"}
					minSize="30%"
				>
					<div className="flex h-full min-w-0 flex-col">
						<Conversation className="min-h-0">
							<ConversationContent className="mx-auto w-full max-w-3xl gap-4 px-[18px] py-[14px]">
								<ConversationItem messageId="a1">
									<Message from="assistant">
										<MessageContent className="gap-4">
											<MessageResponse>{notes}</MessageResponse>
											<ArtifactStack>
												{docs.map((d) => (
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
															<ArtifactCardTitle>{d.title}</ArtifactCardTitle>
															<ArtifactCardMeta>{d.meta}</ArtifactCardMeta>
														</ArtifactCardBody>
														<ArtifactCardActions>
															<DropdownMenuItem>Copy link</DropdownMenuItem>
															<DropdownMenuItem>Open</DropdownMenuItem>
														</ArtifactCardActions>
													</ArtifactCard>
												))}
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
										<MessageContent className="text-[13.5px] text-muted-foreground">
											{processNote}
										</MessageContent>
									</Message>
								</ConversationItem>
							</ConversationContent>
						</Conversation>
						<div className="px-3.5 pt-2 pb-3">
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
				</ResizablePanel>
				{doc && (
					<>
						<ResizableHandle withHandle />
						<ResizablePanel id="viewer" defaultSize="58%" minSize="30%">
							<ArtifactViewer
								className={
									expanded
										? "fixed inset-0 z-50 h-svh rounded-none border-0"
										: "h-full rounded-none border-0"
								}
							>
								<ArtifactViewerHeader>
									<ArtifactViewerTitle format={doc.format}>
										{doc.title}
									</ArtifactViewerTitle>
									<ArtifactViewerOpenIn />
									<ArtifactViewerDownload />
									<ArtifactViewerExpand
										onClick={() => setExpanded((e) => !e)}
									/>
									<ArtifactViewerClose
										onClick={() => {
											setExpanded(false);
											setOpenId(null);
										}}
									/>
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
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>
		</ElevationProvider>
	);
}
