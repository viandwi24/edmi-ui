import type { ChatStatus } from "ai";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Attachment,
	AttachmentHoverCard,
	AttachmentHoverCardContent,
	AttachmentHoverCardTrigger,
	AttachmentInfo,
	AttachmentPreview,
	AttachmentRemove,
	Attachments,
} from "@/registry/edmi/components/ai/attachments";
import {
	Context,
	ContextContent,
	ContextContentBody,
	ContextContentFooter,
	ContextContentHeader,
	ContextTrigger,
} from "@/registry/edmi/components/ai/context";
import {
	Conversation,
	ConversationContent,
	ConversationEmptyState,
	ConversationItem,
	ConversationScrollButton,
} from "@/registry/edmi/components/ai/conversation";
import {
	Message,
	MessageAction,
	MessageActions,
	MessageAvatar,
	MessageBranch,
	MessageBranchContent,
	MessageBranchNext,
	MessageBranchPage,
	MessageBranchPrevious,
	MessageBranchSelector,
	MessageContent,
	MessageHeader,
	MessageResponse,
	MessageToolbar,
} from "@/registry/edmi/components/ai/message";
import {
	ModelSelector,
	ModelSelectorContent,
	ModelSelectorEmpty,
	ModelSelectorGroup,
	ModelSelectorInput,
	ModelSelectorItem,
	ModelSelectorList,
	ModelSelectorLogo,
	ModelSelectorName,
	ModelSelectorShortcut,
	ModelSelectorTrigger,
} from "@/registry/edmi/components/ai/model-selector";
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
} from "@/registry/edmi/components/ai/prompt-input";
import { Shimmer } from "@/registry/edmi/components/ai/shimmer";
import {
	Suggestion,
	Suggestions,
} from "@/registry/edmi/components/ai/suggestion";
import { Button } from "@/registry/edmi/ui/button";
import { ElevationSection } from "./_elevation";

const Label = ({ children }: { children: string }) => (
	<p className="mb-3 font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
		{children}
	</p>
);

const actions = (
	<MessageActions>
		<MessageAction tooltip="Copy">
			<IconPlaceholder
				lucide="CopyIcon"
				tabler="IconCopy"
				hugeicons="Copy01Icon"
				phosphor="CopyIcon"
				remixicon="RiFileCopyLine"
			/>
		</MessageAction>
		<MessageAction tooltip="Regenerate">
			<IconPlaceholder
				lucide="RefreshCcwIcon"
				tabler="IconRefresh"
				hugeicons="ReloadIcon"
				phosphor="ArrowClockwiseIcon"
				remixicon="RiRefreshLine"
			/>
		</MessageAction>
		<MessageAction tooltip="Good response">
			<IconPlaceholder
				lucide="ThumbsUpIcon"
				tabler="IconThumbUp"
				hugeicons="ThumbsUpIcon"
				phosphor="ThumbsUpIcon"
				remixicon="RiThumbUpLine"
			/>
		</MessageAction>
	</MessageActions>
);

const files = [
	{
		id: "1",
		type: "file" as const,
		filename: "weights.csv",
		mediaType: "text/csv",
		url: "",
		size: 2048,
	},
	{
		id: "2",
		type: "file" as const,
		filename: "chart.png",
		mediaType: "image/png",
		url: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='120'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%2362b36f'/><stop offset='1' stop-color='%23386fd6'/></linearGradient></defs><rect width='220' height='120' fill='url(%23g)'/></svg>",
		size: 188416,
	},
];

function Composer({ status }: { status?: ChatStatus }) {
	return (
		<PromptInput onSubmit={() => {}} className="max-w-xl">
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
				<PromptInputSubmit status={status} />
			</PromptInputFooter>
		</PromptInput>
	);
}

export default function AiChatPreview() {
	const [value, setValue] = useState(
		"Rebalance MAG4 using the attached weights",
	);
	return (
		<div className="flex max-w-3xl flex-col gap-12">
			<section>
				<Label>Conversation</Label>
				<div className="grid grid-cols-[1fr_16rem] gap-4">
					<div className="relative flex h-96 overflow-hidden rounded-xl border border-border bg-card">
						<Conversation className="size-full">
							<ConversationContent>
								<ConversationItem messageId="a1">
									<Message from="user">
										<MessageContent>
											Which megacaps drift the most this month?
										</MessageContent>
									</Message>
								</ConversationItem>
								<ConversationItem messageId="a2">
									<Message from="assistant">
										<MessageContent>
											<MessageResponse>
												{
													"NVDAx moved most: **+2.4%** over its 32% target. MSFTx and AAPLx are within 0.5%."
												}
											</MessageResponse>
										</MessageContent>
										<MessageToolbar>{actions}</MessageToolbar>
									</Message>
								</ConversationItem>
								<ConversationItem messageId="a3">
									<Message from="user">
										<MessageContent>
											Rebalance if drift is above 2%.
										</MessageContent>
									</Message>
								</ConversationItem>
								<ConversationItem messageId="a4">
									<Message from="assistant">
										<MessageContent>
											<Shimmer>Checking keeper limits...</Shimmer>
										</MessageContent>
									</Message>
								</ConversationItem>
							</ConversationContent>
							<ConversationScrollButton />
						</Conversation>
					</div>
					<div className="flex h-96 rounded-xl border border-border bg-card">
						<ConversationEmptyState
							title="Start a conversation"
							description="Ask about an index, a token or your portfolio."
							icon={
								<IconPlaceholder
									lucide="MessageSquareIcon"
									tabler="IconMessage"
									hugeicons="Message01Icon"
									phosphor="ChatIcon"
									remixicon="RiChat1Line"
								/>
							}
						/>
					</div>
				</div>
			</section>

			<section className="flex flex-col gap-6">
				<Label>Message</Label>
				<Message from="user" className="max-w-xs">
					<MessageContent>Rebalance if drift is above 2%.</MessageContent>
				</Message>
				<MessageBranch>
					<MessageBranchContent>
						{[1, 2, 3].map((n) => (
							<Message from="assistant" key={n} className="max-w-[620px]">
								<MessageContent>
									<MessageResponse>
										{`### Rebalance plan\n\n1. Sell **0.42 NVDAx** ($79)\n2. Buy **0.18 MSFTx** and **0.21 AAPLx**\n\nEstimated slippage \`0.08%\`. Variant ${n}.\n\n> Slippage stays under 1% at current depth.\n\nSee [Jupiter quote API](https://example.com).`}
									</MessageResponse>
								</MessageContent>
							</Message>
						))}
					</MessageBranchContent>
					<MessageToolbar className="max-w-[620px]">
						<MessageBranchSelector>
							<MessageBranchPrevious />
							<MessageBranchPage />
							<MessageBranchNext />
						</MessageBranchSelector>
						{actions}
					</MessageToolbar>
				</MessageBranch>
				<div className="flex max-w-md flex-col gap-4">
					<Label>Multi-agent · avatar + name (opt-in)</Label>
					<Message from="assistant">
						<MessageAvatar>
							<span className="flex size-6 items-center justify-center rounded-full border border-border bg-success-soft text-success-text">
								K
							</span>
						</MessageAvatar>
						<MessageHeader>
							<span className="font-semibold text-foreground">Keeper</span>
							agent
						</MessageHeader>
						<MessageContent>
							Drift is 2.4%, above the 2% limit. Rebalance is allowed.
						</MessageContent>
					</Message>
				</div>
			</section>

			<section className="flex flex-col gap-6">
				<Label>Prompt input</Label>
				<PromptInput onSubmit={() => {}} className="max-w-xl">
					<PromptInputHeader>
						<Attachments variant="inline">
							{files.map((f) => (
								<Attachment key={f.id} data={f} onRemove={() => {}}>
									<AttachmentPreview />
									<AttachmentInfo />
									<AttachmentRemove />
								</Attachment>
							))}
						</Attachments>
					</PromptInputHeader>
					<PromptInputBody>
						<PromptInputTextarea
							value={value}
							onChange={(e) => setValue(e.currentTarget.value)}
						/>
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
						</PromptInputTools>
						<PromptInputSubmit status="ready" />
					</PromptInputFooter>
				</PromptInput>
				<Composer status="streaming" />
				<div className="flex gap-3">
					{(["ready", "submitted", "streaming", "error"] as const).map((s) => (
						<PromptInputSubmit key={s} status={s} type="button" />
					))}
					<PromptInputSubmit disabled />
				</div>
				<ElevationSection>
					<PromptInput
						elevation="raised"
						onSubmit={() => {}}
						className="max-w-xl"
					>
						<PromptInputBody>
							<PromptInputTextarea defaultValue="Rebalance MAG4" />
						</PromptInputBody>
						<PromptInputFooter>
							<PromptInputTools />
							<PromptInputSubmit status="ready" />
						</PromptInputFooter>
					</PromptInput>
				</ElevationSection>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Suggestion</Label>
				<Suggestions>
					{[
						"What moved NVDAx today?",
						"Compare MAG4 vs SPYx",
						"Explain the keeper",
						"Show my fees",
					].map((s) => (
						<Suggestion key={s} suggestion={s} />
					))}
				</Suggestions>
				<div className="flex gap-2">
					<Suggestion suggestion="Rebalance now" variant="card">
						Check drift and propose trades
					</Suggestion>
					<Suggestion suggestion="Draft a post" variant="card">
						Write a feed update
					</Suggestion>
				</div>
				<ElevationSection>
					<div className="flex gap-2">
						<Suggestion suggestion="Rebalance now" elevation="raised" />
						<Suggestion suggestion="Draft a post" elevation="raised" />
					</div>
				</ElevationSection>
			</section>

			<section className="flex flex-col gap-6">
				<Label>Attachments</Label>
				<Attachments variant="grid">
					{files.map((f) => (
						<Attachment
							key={f.id}
							data={f}
							onRemove={f.id === "2" ? () => {} : undefined}
						>
							<AttachmentPreview />
							<AttachmentInfo />
							<AttachmentRemove />
						</Attachment>
					))}
				</Attachments>
				<Attachments variant="list" className="max-w-sm">
					{files.map((f) => (
						<Attachment key={f.id} data={f} onRemove={() => {}}>
							<AttachmentPreview />
							<AttachmentInfo showMediaType />
							<AttachmentRemove />
						</Attachment>
					))}
				</Attachments>
				<Attachments variant="inline">
					{files.map((f) => (
						<AttachmentHoverCard key={f.id}>
							<AttachmentHoverCardTrigger
								render={
									<Attachment data={f} onRemove={() => {}}>
										<AttachmentPreview />
										<AttachmentInfo />
										<AttachmentRemove />
									</Attachment>
								}
							/>
							<AttachmentHoverCardContent>
								<span className="text-xs">{f.filename}</span>
							</AttachmentHoverCardContent>
						</AttachmentHoverCard>
					))}
				</Attachments>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Model selector</Label>
				<ModelSelector>
					<ModelSelectorTrigger render={<Button variant="outline" />}>
						<ModelSelectorLogo provider="anthropic" />
						<ModelSelectorName>Claude Opus</ModelSelectorName>
					</ModelSelectorTrigger>
					<ModelSelectorContent>
						<ModelSelectorInput placeholder="Search models..." />
						<ModelSelectorList>
							<ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
							<ModelSelectorGroup heading="Anthropic">
								<ModelSelectorItem value="opus">
									<ModelSelectorLogo provider="anthropic" />
									<ModelSelectorName>Claude Opus</ModelSelectorName>
									<ModelSelectorShortcut>⌘1</ModelSelectorShortcut>
								</ModelSelectorItem>
							</ModelSelectorGroup>
						</ModelSelectorList>
					</ModelSelectorContent>
				</ModelSelector>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Context</Label>
				<div className="flex gap-6">
					<Context
						maxTokens={200000}
						usedTokens={124000}
						usage={{
							inputTokens: 98200,
							outputTokens: 18400,
							inputTokenDetails: {
								noCacheTokens: 1,
								cacheReadTokens: 1300,
								cacheWriteTokens: 0,
							},
							outputTokenDetails: { textTokens: 1, reasoningTokens: 6100 },
							totalTokens: 124000,
						}}
					>
						<ContextTrigger />
						<ContextContent>
							<ContextContentHeader />
							<ContextContentBody />
							<ContextContentFooter />
						</ContextContent>
					</Context>
					<Context maxTokens={200000} usedTokens={182000}>
						<ContextTrigger />
						<ContextContent>
							<ContextContentHeader />
						</ContextContent>
					</Context>
				</div>
			</section>

			<section>
				<Label>Shimmer</Label>
				<div className="flex items-center gap-8">
					<Shimmer>Thinking...</Shimmer>
					<Shimmer as="h2" className="text-2xl font-medium">
						Generating your plan
					</Shimmer>
				</div>
			</section>
		</div>
	);
}
