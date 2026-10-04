import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
import { ConversationEmptyState } from "@edmi-react/components/ai/conversation";
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
import { ElevationProvider } from "@edmi-react/ui/elevation";
import { Spinner } from "@edmi-react/ui/spinner";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { agent, greeting, project, suggestions, tasks } from "./data";

export default function AgentHomeExample() {
	return (
		<ElevationProvider mode="layered">
			<div className="mx-auto flex min-h-svh w-full max-w-2xl flex-col gap-4 bg-background p-4 text-foreground">
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
												<QueueItemContent>{task.title}</QueueItemContent>
												<QueueItemStatus>
													<span className="font-mono">{task.age}</span>
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
								<Suggestion key={s} suggestion={s} onClick={() => {}} />
							))}
						</Suggestions>
					</div>
				</ConversationEmptyState>

				<PromptInput onSubmit={() => {}}>
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
		</ElevationProvider>
	);
}
