import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardTitle,
} from "@edmi-react/components/ai/artifact-card";
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
	ConversationItem,
	ConversationScrollButton,
} from "@edmi-react/components/ai/conversation";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "@edmi-react/components/ai/message";
import { Button } from "@edmi-react/ui/button";
import { DropdownMenuItem } from "@edmi-react/ui/dropdown-menu";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { composer, thread, title } from "./data";

export default function ChatThreadExample() {
	return (
		<div className="flex h-svh flex-col gap-2 bg-background p-3 text-foreground">
			<ChatHeader>
				<ChatHeaderTitle>
					<span className="truncate">{title}</span>
					<ChatHeaderProject status="connected" />
					<ChatHeaderMenu>
						<DropdownMenuItem>Rename</DropdownMenuItem>
						<DropdownMenuItem>Move to project</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
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
						1
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
									{turn.blocks.map((block) => {
										switch (block.type) {
											case "markdown":
												return turn.role === "user" ? (
													block.text
												) : (
													<MessageResponse key={block.text}>
														{block.text}
													</MessageResponse>
												);
											case "code":
												return (
													<CodeBlock
														key={block.code}
														code={block.code}
														language={block.language}
													/>
												);
											default:
												return (
													<ArtifactCard key={block.title}>
														<ArtifactCardIcon kind={block.kind} />
														<ArtifactCardBody>
															<ArtifactCardTitle>
																{block.title}
															</ArtifactCardTitle>
															<ArtifactCardMeta>{block.meta}</ArtifactCardMeta>
														</ArtifactCardBody>
														<ArtifactCardActions>
															<DropdownMenuItem>Copy link</DropdownMenuItem>
															<DropdownMenuItem>Open</DropdownMenuItem>
														</ArtifactCardActions>
													</ArtifactCard>
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
	);
}
