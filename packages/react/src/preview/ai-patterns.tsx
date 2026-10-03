import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { AgentAvatar } from "@/registry/edmi/components/ai/agent-avatar";
import {
	ArtifactCard,
	ArtifactCardActions,
	ArtifactCardBody,
	ArtifactCardIcon,
	ArtifactCardMeta,
	ArtifactCardThumbnail,
	ArtifactCardTitle,
} from "@/registry/edmi/components/ai/artifact-card";
import {
	ArtifactStack,
	ArtifactStackDownloadAll,
} from "@/registry/edmi/components/ai/artifact-stack";
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
} from "@/registry/edmi/components/ai/artifact-viewer";
import { ChatComposer } from "@/registry/edmi/components/ai/chat-composer";
import {
	ChatHeader,
	ChatHeaderActions,
	ChatHeaderMenu,
	ChatHeaderProject,
	ChatHeaderShare,
	ChatHeaderTitle,
} from "@/registry/edmi/components/ai/chat-header";
import {
	PromptInput,
	PromptInputBody,
	PromptInputFooter,
	PromptInputHeader,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@/registry/edmi/components/ai/prompt-input";
import {
	PromptInputAgent,
	PromptInputAgentMentions,
	type PromptInputAgentOption,
	useAgentMention,
} from "@/registry/edmi/components/ai/prompt-input-agent";
import {
	SessionFile,
	SessionOutputPreview,
	SessionOutputTitle,
	SessionPanel,
	SessionPanelDivider,
	SessionProgress,
	SessionSection,
	SessionSource,
} from "@/registry/edmi/components/ai/session-panel";
import { Button } from "@/registry/edmi/ui/button";
import { DropdownMenuItem } from "@/registry/edmi/ui/dropdown-menu";
import { RaisedSection } from "./_raised";

const agents: PromptInputAgentOption[] = [
	{ id: "keeper", name: "Keeper", scope: "trading", color: "chart-3" },
	{ id: "writer", name: "Writer", scope: "feed", color: "chart-4" },
	{ id: "analyst", name: "Analyst", scope: "research", color: "chart-2" },
];

function Label({ children }: { children: string }) {
	return (
		<p className="font-mono text-xs tracking-wide text-muted-foreground uppercase">
			{children}
		</p>
	);
}

const cardMenu = (
	<>
		<DropdownMenuItem>Copy link</DropdownMenuItem>
		<DropdownMenuItem>Open</DropdownMenuItem>
	</>
);

function AgentComposer({ raised }: { raised?: boolean }) {
	const [agent, setAgent] = useState(agents[0] as PromptInputAgentOption);
	const [value, setValue] = useState("@");
	const mention = useAgentMention({
		agents,
		value,
		onValueChange: setValue,
		onAgentSelect: setAgent,
	});
	return (
		<div className="max-w-xl pt-36">
			<div className="relative">
				{mention.open && <PromptInputAgentMentions {...mention.mentions} />}
				<PromptInput
					raised={raised}
					onSubmit={() => {}}
					className="[&_[data-slot=input-group]]:bg-muted"
				>
					<PromptInputHeader>
						<PromptInputAgent agent={agent} />
					</PromptInputHeader>
					<PromptInputBody>
						<PromptInputTextarea
							value={value}
							onChange={(e) => setValue(e.currentTarget.value)}
							onKeyDown={mention.onKeyDown}
							placeholder={`Ask ${agent.name} anything about your index…`}
							className="min-h-20"
						/>
					</PromptInputBody>
					<PromptInputFooter>
						<PromptInputTools />
						<PromptInputSubmit
							size="icon-sm"
							className="size-10"
							variant="secondary"
						/>
					</PromptInputFooter>
				</PromptInput>
			</div>
		</div>
	);
}

export default function AiPatterns() {
	return (
		<div className="flex flex-col gap-10">
			<section className="flex flex-col gap-4">
				<Label>Artifact card</Label>
				<div className="flex max-w-lg flex-col gap-3">
					<ArtifactCard>
						<ArtifactCardIcon kind="archive" />
						<ArtifactCardBody>
							<ArtifactCardTitle>Keeper starter</ArtifactCardTitle>
							<ArtifactCardMeta>ZIP</ArtifactCardMeta>
						</ArtifactCardBody>
						<ArtifactCardActions>{cardMenu}</ArtifactCardActions>
					</ArtifactCard>
					<ArtifactCard state="generating">
						<ArtifactCardIcon />
						<ArtifactCardBody>
							<ArtifactCardTitle>Rebalance report</ArtifactCardTitle>
							<ArtifactCardMeta>PDF · writing…</ArtifactCardMeta>
						</ArtifactCardBody>
						<ArtifactCardActions />
					</ArtifactCard>
				</div>
				<RaisedSection>
					<ArtifactCard raised className="max-w-lg">
						<ArtifactCardIcon kind="archive" />
						<ArtifactCardBody>
							<ArtifactCardTitle>Keeper starter</ArtifactCardTitle>
							<ArtifactCardMeta>ZIP</ArtifactCardMeta>
						</ArtifactCardBody>
						<ArtifactCardActions>{cardMenu}</ArtifactCardActions>
					</ArtifactCard>
				</RaisedSection>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Artifact stack</Label>
				<ArtifactStack className="max-w-lg">
					<ArtifactCard>
						<ArtifactCardThumbnail />
						<ArtifactCardBody>
							<ArtifactCardTitle>Eight index ideas</ArtifactCardTitle>
							<ArtifactCardMeta>Document · PDF</ArtifactCardMeta>
						</ArtifactCardBody>
						<ArtifactCardActions>{cardMenu}</ArtifactCardActions>
					</ArtifactCard>
					<ArtifactCard>
						<ArtifactCardIcon />
						<ArtifactCardBody>
							<ArtifactCardTitle>Eight index ideas</ArtifactCardTitle>
							<ArtifactCardMeta>Document · MD</ArtifactCardMeta>
						</ArtifactCardBody>
						<ArtifactCardActions>{cardMenu}</ArtifactCardActions>
					</ArtifactCard>
					<ArtifactStackDownloadAll />
				</ArtifactStack>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Artifact viewer</Label>
				<ArtifactViewer className="max-w-xl">
					<ArtifactViewerHeader>
						<ArtifactViewerTitle format="PDF">
							Eight index ideas
						</ArtifactViewerTitle>
						<ArtifactViewerOpenIn />
						<ArtifactViewerDownload />
						<ArtifactViewerExpand />
						<ArtifactViewerClose />
					</ArtifactViewerHeader>
					<ArtifactViewerContent>
						<ArtifactViewerPaper>
							<div className="font-mono text-[11px] tracking-[2px] text-[#7a7974]">
								RESEARCH · 8 INDEX IDEAS · OCT 2026
							</div>
							<div className="mt-2.5 font-serif text-[26px] leading-[1.15] font-bold">
								Distribution, not AI, picks the winner
							</div>
							<p className="mt-3 text-[13px] leading-[1.7] text-[#3d3c38]">
								Some indexes can win now, but the shape of the product and the
								channel decide it.{" "}
								<b>None of the eight passes without conditions.</b>
							</p>
							<div className="my-4 h-0.5 bg-[#22406b]" />
							<div className="font-serif text-[17px] font-bold text-[#22406b]">
								What wins now: narrow vertical, recurring billing
							</div>
						</ArtifactViewerPaper>
					</ArtifactViewerContent>
				</ArtifactViewer>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Session panel</Label>
				<SessionPanel>
					<SessionProgress onClose={() => {}} value={60} defaultOpen>
						Reading the keeper config, then drafting the report.
					</SessionProgress>
					<SessionPanelDivider />
					<SessionSection title="Outputs">
						<SessionOutputPreview className="bg-[#14213d] px-5 py-[18px]">
							<div className="font-mono text-[7px] tracking-[1px] text-[#e39a3c]">
								RESEARCH · OCT 2026
							</div>
							<div className="mt-9 font-serif text-[17px] leading-[1.2] font-bold text-white">
								Eight index ideas, three worth testing
							</div>
						</SessionOutputPreview>
						<SessionOutputTitle meta="Artifact">
							Eight index ideas
						</SessionOutputTitle>
						<div className="mt-1">
							<SessionFile name="Eight index ideas" format="PDF" />
							<SessionFile name="Eight index ideas" format="MD" kind="code" />
						</div>
					</SessionSection>
					<SessionPanelDivider />
					<SessionSection title="Used in this session">
						<SessionSource
							icon={
								<IconPlaceholder
									lucide="GlobeIcon"
									tabler="IconWorld"
									hugeicons="Globe02Icon"
									phosphor="GlobeIcon"
									remixicon="RiGlobalLine"
								/>
							}
							label="Web search"
							favicons={[
								{ label: "RC", color: "#e5484d" },
								{ label: "CL", color: "#3b6fd6" },
								{ label: "OB", color: "#111111" },
							]}
							more={4}
						/>
						<SessionSource
							icon={
								<IconPlaceholder
									lucide="ClockIcon"
									tabler="IconClock"
									hugeicons="Clock01Icon"
									phosphor="ClockIcon"
									remixicon="RiTimeLine"
								/>
							}
							label="Memory"
						>
							Read · Career, Tech, Index notes
						</SessionSource>
					</SessionSection>
				</SessionPanel>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Agent avatar</Label>
				<div className="flex items-center gap-5">
					{["Keeper", "Writer", "Analyst", "Engineer", "Designer"].map((n) => (
						<div key={n} className="flex flex-col items-center gap-1.5">
							<AgentAvatar seed={n.toLowerCase()} label={n} />
							<span className="text-xs text-muted-foreground">{n}</span>
						</div>
					))}
				</div>
				<div className="flex items-center gap-3.5">
					<AgentAvatar seed="keeper" size={20} />
					<AgentAvatar seed="keeper" size={28} />
					<AgentAvatar seed="keeper" size={40} />
					<AgentAvatar seed="keeper" size={56} />
					<AgentAvatar seed="keeper" size={28} tile={false} />
				</div>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Chat composer</Label>
				<ChatComposer
					className="max-w-2xl"
					onSubmit={() => {}}
					onAttach={() => {}}
					onSpeech={() => {}}
					disclaimer="Edmi is AI and can make mistakes."
					models={[
						{ id: "opus", label: "Opus" },
						{ id: "sonnet", label: "Sonnet" },
					]}
					efforts={[
						{ id: "low", label: "Low" },
						{ id: "medium", label: "Medium" },
					]}
					defaultEffort="medium"
					modes={[
						{ id: "auto", label: "Auto" },
						{ id: "ask", label: "Ask first" },
					]}
				/>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Prompt input agent (@ open, raised send)</Label>
				<AgentComposer raised />
			</section>

			<section className="flex flex-col gap-4">
				<Label>Chat header</Label>
				<ChatHeader className="max-w-3xl">
					<ChatHeaderTitle>
						<span className="truncate">Keeper starter plan</span>
						<ChatHeaderProject status="connected" />
						<ChatHeaderMenu>
							<DropdownMenuItem>Rename</DropdownMenuItem>
							<DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
						</ChatHeaderMenu>
					</ChatHeaderTitle>
					<ChatHeaderActions>
						<Button size="sm" type="button" variant="ghost">
							1 file
						</Button>
						<ChatHeaderShare />
					</ChatHeaderActions>
				</ChatHeader>
			</section>
		</div>
	);
}
