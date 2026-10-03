import {
	CodeBlock,
	CodeBlockActions,
	CodeBlockCopyButton,
	CodeBlockFilename,
	CodeBlockHeader,
	CodeBlockTitle,
} from "@edmi-react/components/ai/code-block";
import {
	Conversation,
	ConversationContent,
	ConversationItem,
	ConversationScrollButton,
} from "@edmi-react/components/ai/conversation";
import {
	FileTree,
	FileTreeFile,
	FileTreeFolder,
} from "@edmi-react/components/ai/file-tree";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "@edmi-react/components/ai/message";
import {
	Plan,
	PlanAction,
	PlanContent,
	PlanDescription,
	PlanFooter,
	PlanHeader,
	PlanTitle,
	PlanTrigger,
} from "@edmi-react/components/ai/plan";
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
	QueueItemContent,
	QueueItemIndicator,
	QueueList,
	QueueSection,
	QueueSectionContent,
	QueueSectionLabel,
	QueueSectionTrigger,
} from "@edmi-react/components/ai/queue";
import {
	Terminal,
	TerminalActions,
	TerminalClearButton,
	TerminalContent,
	TerminalCopyButton,
	TerminalHeader,
	TerminalStatus,
	TerminalTitle,
} from "@edmi-react/components/ai/terminal";
import { Badge } from "@edmi-react/ui/badge";
import { Button } from "@edmi-react/ui/button";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	agent,
	expandedFolders,
	files,
	initialPath,
	plan,
	queue,
	reply,
	request,
	terminalOutput,
} from "./data";

export default function IdeExample() {
	const [selected, setSelected] = useState(initialPath);
	const [output, setOutput] = useState(terminalOutput);
	const file = files[selected] ?? files[initialPath];

	return (
		<div className="flex min-h-svh flex-col gap-2 bg-background p-2 text-foreground lg:h-svh">
			<header className="flex h-10 shrink-0 items-center justify-between gap-2 px-2">
				<div className="flex items-center gap-2 text-sm font-medium">
					keeper
					<Badge variant="secondary" shape="pill">
						main
					</Badge>
				</div>
				<Button size="sm" variant="outline">
					<IconPlaceholder
						lucide="PlayIcon"
						tabler="IconPlayerPlay"
						hugeicons="PlayIcon"
						phosphor="PlayIcon"
						remixicon="RiPlayLine"
						className="size-3.5"
					/>
					Run tests
				</Button>
			</header>

			<div className="grid min-h-0 flex-1 gap-2 lg:grid-cols-[220px_minmax(0,1fr)_380px]">
				<aside className="rounded-xl border border-border bg-card p-2">
					<FileTree
						defaultExpanded={new Set(expandedFolders)}
						onSelect={setSelected}
						selectedPath={selected}
					>
						<FileTreeFolder name="src" path="src">
							<FileTreeFolder name="lib" path="src/lib">
								<FileTreeFile name="keeper.ts" path="src/lib/keeper.ts" />
								<FileTreeFile name="drift.ts" path="src/lib/drift.ts" />
							</FileTreeFolder>
							<FileTreeFile name="app.tsx" path="src/app.tsx" />
						</FileTreeFolder>
						<FileTreeFolder name="tests" path="tests">
							<FileTreeFile name="keeper.test.ts" path="tests/keeper.test.ts" />
						</FileTreeFolder>
						<FileTreeFile name="package.json" path="package.json" />
					</FileTree>
				</aside>

				<section className="flex min-h-0 min-w-0 flex-col gap-2">
					<div className="min-h-0 flex-1 overflow-auto">
						<CodeBlock
							code={file.code}
							language={file.language}
							showLineNumbers
						>
							<CodeBlockHeader>
								<CodeBlockTitle>
									<IconPlaceholder
										lucide="FileCodeIcon"
										tabler="IconFileCode"
										hugeicons="File01Icon"
										phosphor="FileCodeIcon"
										remixicon="RiFileCodeLine"
										className="size-3.5"
									/>
									<CodeBlockFilename>{file.name}</CodeBlockFilename>
								</CodeBlockTitle>
								<CodeBlockActions>
									<CodeBlockCopyButton />
								</CodeBlockActions>
							</CodeBlockHeader>
						</CodeBlock>
					</div>
					<Terminal
						className="shrink-0"
						onClear={() => setOutput("")}
						output={output}
					>
						<TerminalHeader>
							<div className="flex items-center">
								<TerminalTitle />
								<TerminalStatus />
							</div>
							<TerminalActions>
								<TerminalCopyButton />
								<TerminalClearButton />
							</TerminalActions>
						</TerminalHeader>
						<TerminalContent className="max-h-40" />
					</Terminal>
				</section>

				<aside className="flex h-[34rem] min-h-0 flex-col gap-2 rounded-xl border border-border bg-card p-2 lg:h-auto">
					<Conversation className="min-h-0">
						<ConversationContent className="gap-5 p-2">
							<ConversationItem messageId="u1">
								<Message from="user">
									<MessageContent>{request}</MessageContent>
								</Message>
							</ConversationItem>
							<ConversationItem messageId="a1">
								<Message from="assistant">
									<MessageContent className="gap-3">
										<MessageResponse>{reply}</MessageResponse>
										<Plan defaultOpen className="w-full">
											<PlanHeader>
												<div>
													<PlanTitle>{plan.title}</PlanTitle>
													<PlanDescription>{plan.description}</PlanDescription>
												</div>
												<PlanAction>
													<PlanTrigger />
												</PlanAction>
											</PlanHeader>
											<PlanContent>
												{plan.steps.map((s) => (
													<p key={s}>{s}</p>
												))}
											</PlanContent>
											<PlanFooter>
												<Button size="sm">Start</Button>
												<Button size="sm" variant="ghost">
													Edit plan
												</Button>
											</PlanFooter>
										</Plan>
										<Queue className="w-full">
											<QueueSection>
												<QueueSectionTrigger>
													<QueueSectionLabel
														label="Queued"
														count={queue.queued.length}
													/>
												</QueueSectionTrigger>
												<QueueSectionContent>
													<QueueList>
														{queue.queued.map((t) => (
															<QueueItem key={t.id}>
																<div className="flex items-start gap-2">
																	<QueueItemIndicator />
																	<QueueItemContent>{t.title}</QueueItemContent>
																</div>
															</QueueItem>
														))}
													</QueueList>
												</QueueSectionContent>
											</QueueSection>
											<QueueSection defaultOpen={false}>
												<QueueSectionTrigger>
													<QueueSectionLabel
														label="Completed"
														count={queue.completed.length}
													/>
												</QueueSectionTrigger>
												<QueueSectionContent>
													<QueueList>
														{queue.completed.map((t) => (
															<QueueItem key={t.id}>
																<div className="flex items-start gap-2">
																	<QueueItemIndicator completed />
																	<QueueItemContent completed>
																		{t.title}
																	</QueueItemContent>
																</div>
															</QueueItem>
														))}
													</QueueList>
												</QueueSectionContent>
											</QueueSection>
										</Queue>
									</MessageContent>
								</Message>
							</ConversationItem>
						</ConversationContent>
						<ConversationScrollButton />
					</Conversation>

					<PromptInput onSubmit={() => {}}>
						<PromptInputHeader>
							<PromptInputAgent agent={agent} />
						</PromptInputHeader>
						<PromptInputBody>
							<PromptInputTextarea
								placeholder={`Ask ${agent.name} to change the code…`}
								className="min-h-16"
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
				</aside>
			</div>
		</div>
	);
}
