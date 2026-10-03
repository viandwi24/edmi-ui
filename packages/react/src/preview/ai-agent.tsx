import { useEffect, useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	ChainOfThought,
	ChainOfThoughtContent,
	ChainOfThoughtHeader,
	ChainOfThoughtImage,
	ChainOfThoughtSearchResult,
	ChainOfThoughtSearchResults,
	ChainOfThoughtStep,
} from "@/registry/edmi/components/ai/chain-of-thought";
import {
	Checkpoint,
	CheckpointIcon,
	CheckpointTrigger,
} from "@/registry/edmi/components/ai/checkpoint";
import {
	Confirmation,
	ConfirmationAccepted,
	ConfirmationAction,
	ConfirmationActions,
	ConfirmationDescription,
	ConfirmationRejected,
	ConfirmationRequest,
	ConfirmationTitle,
} from "@/registry/edmi/components/ai/confirmation";
import {
	InlineCitation,
	InlineCitationCard,
	InlineCitationCardBody,
	InlineCitationCardTrigger,
	InlineCitationCarousel,
	InlineCitationCarouselContent,
	InlineCitationCarouselHeader,
	InlineCitationCarouselIndex,
	InlineCitationCarouselItem,
	InlineCitationCarouselNext,
	InlineCitationCarouselPrev,
	InlineCitationQuote,
	InlineCitationSource,
	InlineCitationText,
} from "@/registry/edmi/components/ai/inline-citation";
import {
	Plan,
	PlanAction,
	PlanContent,
	PlanDescription,
	PlanFooter,
	PlanHeader,
	PlanTitle,
	PlanTrigger,
} from "@/registry/edmi/components/ai/plan";
import {
	Queue,
	QueueItem,
	QueueItemAction,
	QueueItemActions,
	QueueItemAttachment,
	QueueItemContent,
	QueueItemDescription,
	QueueItemFile,
	QueueItemIndicator,
	QueueList,
	QueueSection,
	QueueSectionContent,
	QueueSectionLabel,
	QueueSectionTrigger,
} from "@/registry/edmi/components/ai/queue";
import {
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from "@/registry/edmi/components/ai/reasoning";
import { Shimmer } from "@/registry/edmi/components/ai/shimmer";
import {
	Source,
	Sources,
	SourcesContent,
	SourcesTrigger,
} from "@/registry/edmi/components/ai/sources";
import {
	Task,
	TaskContent,
	TaskItem,
	TaskItemFile,
	TaskTrigger,
} from "@/registry/edmi/components/ai/task";
import {
	Tool,
	ToolContent,
	ToolHeader,
	ToolInput,
	ToolOutput,
} from "@/registry/edmi/components/ai/tool";
import { Button } from "@/registry/edmi/ui/button";
import { RaisedSection } from "./_raised";

const Label = ({ children }: { children: string }) => (
	<p className="mb-3 font-mono text-[10.5px] tracking-wide text-muted-foreground uppercase">
		{children}
	</p>
);

const reasoningText =
	"NVDAx is 2.4% over target. The keeper limit is 2%, so a rebalance is allowed. Slippage on 0.42 NVDAx at current depth is about 0.08%.";

const sources = [
	{
		title: "Nvidia Q3 results beat estimates",
		url: "https://reuters.com/technology/nvidia-q3",
		quote: "Revenue rose 94% from a year earlier…",
	},
	{
		title: "Form 10-Q, quarterly report",
		url: "https://sec.gov/cgi-bin/browse-edgar",
		quote: "Data center revenue was a record for the quarter.",
	},
	{
		title: "NVDA quote and guidance",
		url: "https://nasdaq.com/market-activity/stocks/nvda",
		quote: "The company raised its outlook for the next quarter.",
	},
];

const input = { symbol: "NVDAx", window: "30d" };
const toolStates = [
	"input-streaming",
	"input-available",
	"approval-requested",
	"approval-responded",
	"output-denied",
] as const;

const globe = (
	<IconPlaceholder
		lucide="GlobeIcon"
		tabler="IconWorld"
		hugeicons="Globe02Icon"
		phosphor="GlobeIcon"
		remixicon="RiGlobalLine"
		className="size-3"
	/>
);

function StreamingReasoning() {
	const [shown, setShown] = useState(0);
	const [streaming, setStreaming] = useState(true);
	useEffect(() => {
		if (shown >= reasoningText.length) {
			setStreaming(false);
			return;
		}
		const id = setTimeout(() => setShown((n) => n + 3), 40);
		return () => clearTimeout(id);
	}, [shown]);
	return (
		<Reasoning isStreaming={streaming}>
			<ReasoningTrigger />
			<ReasoningContent>{reasoningText.slice(0, shown)}</ReasoningContent>
		</Reasoning>
	);
}

function ConfirmationRow({
	state,
	approved,
	raised,
}: {
	state: "approval-requested" | "approval-responded" | "output-denied";
	approved?: boolean;
	raised?: boolean;
}) {
	return (
		<Confirmation
			approval={{ id: "1", approved }}
			state={state}
			raised={raised}
			className="w-full max-w-[440px]"
		>
			<ConfirmationTitle>
				<ConfirmationRequest>Run rebalance on MAG4?</ConfirmationRequest>
				<ConfirmationAccepted>
					<IconPlaceholder
						lucide="CheckIcon"
						tabler="IconCheck"
						hugeicons="Tick02Icon"
						phosphor="CheckIcon"
						remixicon="RiCheckLine"
						className="size-4"
					/>
					<span>Approved · rebalance sent</span>
				</ConfirmationAccepted>
				<ConfirmationRejected>
					<IconPlaceholder
						lucide="XIcon"
						tabler="IconX"
						hugeicons="Cancel01Icon"
						phosphor="XIcon"
						remixicon="RiCloseLine"
						className="size-4"
					/>
					<span>Rejected · nothing was changed</span>
				</ConfirmationRejected>
			</ConfirmationTitle>
			<ConfirmationDescription>
				Sells 0.42 NVDAx and buys MSFTx + AAPLx. Max slippage 1%.
			</ConfirmationDescription>
			<ConfirmationActions>
				<ConfirmationAction>Approve</ConfirmationAction>
				<ConfirmationAction variant="outline">Reject</ConfirmationAction>
			</ConfirmationActions>
		</Confirmation>
	);
}

function PlanExample({
	streaming,
	raised,
}: {
	streaming?: boolean;
	raised?: boolean;
}) {
	return (
		<Plan
			isStreaming={streaming}
			raised={raised}
			defaultOpen
			className="w-full max-w-[460px]"
		>
			<PlanHeader>
				<div>
					<PlanTitle>{streaming ? "Planning…" : "Rebalance MAG4"}</PlanTitle>
					<PlanDescription>3 steps · about 1 minute</PlanDescription>
				</div>
				<PlanAction>
					<PlanTrigger />
				</PlanAction>
			</PlanHeader>
			<PlanContent>
				<p>1. Quote all four legs on Jupiter</p>
				<p>2. Ask for approval</p>
				<p>3. Send one transaction and verify weights</p>
			</PlanContent>
			<PlanFooter>
				<Button size="sm" raised={raised}>
					Start
				</Button>
				<Button size="sm" variant="ghost">
					Edit plan
				</Button>
			</PlanFooter>
		</Plan>
	);
}

export default function AiAgentPreview() {
	return (
		<div className="flex max-w-3xl flex-col gap-12">
			<section>
				<Label>Reasoning</Label>
				<div className="flex w-full max-w-[520px] flex-col gap-6">
					<StreamingReasoning />
					<Reasoning defaultOpen={false} duration={6}>
						<ReasoningTrigger />
						<ReasoningContent>{reasoningText}</ReasoningContent>
					</Reasoning>
				</div>
			</section>

			<section>
				<Label>Chain of thought</Label>
				<ChainOfThought defaultOpen className="w-full max-w-[520px]">
					<ChainOfThoughtHeader />
					<ChainOfThoughtContent>
						<ChainOfThoughtStep
							icon={
								<IconPlaceholder
									lucide="SearchIcon"
									tabler="IconSearch"
									hugeicons="SearchIcon"
									phosphor="MagnifyingGlassIcon"
									remixicon="RiSearchLine"
								/>
							}
							label="Searched for NVDAx news"
						>
							<ChainOfThoughtSearchResults>
								{["reuters.com", "sec.gov", "nasdaq.com"].map((s) => (
									<ChainOfThoughtSearchResult key={s}>
										{globe}
										{s}
									</ChainOfThoughtSearchResult>
								))}
							</ChainOfThoughtSearchResults>
						</ChainOfThoughtStep>
						<ChainOfThoughtStep
							icon={
								<IconPlaceholder
									lucide="ChartLineIcon"
									tabler="IconChartLine"
									hugeicons="ChartLineData01Icon"
									phosphor="ChartLineIcon"
									remixicon="RiLineChartLine"
								/>
							}
							label="Read the 30-day chart"
						>
							<ChainOfThoughtImage caption="NVDAx 30-day price">
								<div className="h-28 w-64 bg-linear-to-br from-chart-2 to-chart-1" />
							</ChainOfThoughtImage>
						</ChainOfThoughtStep>
						<ChainOfThoughtStep
							status="active"
							icon={
								<IconPlaceholder
									lucide="BrainIcon"
									tabler="IconBrain"
									hugeicons="AiBrainIcon"
									phosphor="BrainIcon"
									remixicon="RiBrainLine"
								/>
							}
							label={
								<Shimmer as="span">Comparing weights with the mandate</Shimmer>
							}
							description="MAG4 · drift limit 5%"
						/>
						<ChainOfThoughtStep status="pending" label="Write the answer" />
					</ChainOfThoughtContent>
				</ChainOfThought>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Tool</Label>
				<div className="flex flex-wrap gap-4">
					<Tool defaultOpen className="w-full max-w-[440px]">
						<ToolHeader type="tool-get_prices" state="output-available" />
						<ToolContent>
							<ToolInput input={input} />
							<ToolOutput
								output={{ price: 188.2, change: 0.024 }}
								errorText={undefined}
							/>
						</ToolContent>
					</Tool>
					<Tool defaultOpen className="w-full max-w-[440px]">
						<ToolHeader type="tool-get_prices" state="output-error" />
						<ToolContent>
							<ToolInput input={input} />
							<ToolOutput
								output={undefined}
								errorText="Rate limit: retry in 20 s"
							/>
						</ToolContent>
					</Tool>
				</div>
				<div className="flex w-full max-w-[440px] flex-col gap-2">
					{toolStates.map((state) => (
						<Tool key={state}>
							<ToolHeader type="tool-get_prices" state={state} />
							<ToolContent>
								<ToolInput input={input} />
							</ToolContent>
						</Tool>
					))}
				</div>
				<RaisedSection>
					<Tool raised className="w-full max-w-[440px]">
						<ToolHeader type="tool-get_prices" state="output-available" />
						<ToolContent>
							<ToolInput input={input} />
						</ToolContent>
					</Tool>
				</RaisedSection>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Confirmation</Label>
				<ConfirmationRow state="approval-requested" />
				<ConfirmationRow state="approval-responded" approved />
				<ConfirmationRow state="output-denied" approved={false} />
				<RaisedSection>
					<ConfirmationRow state="approval-requested" raised />
				</RaisedSection>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Sources</Label>
				<div className="flex w-full max-w-[520px] flex-col gap-6">
					<Sources>
						<SourcesTrigger count={sources.length} />
						<SourcesContent>
							{sources.map((s) => (
								<Source key={s.url} href={s.url} title={s.title} />
							))}
						</SourcesContent>
					</Sources>
					<Sources defaultOpen>
						<SourcesTrigger count={sources.length} />
						<SourcesContent>
							{sources.map((s) => (
								<Source key={s.url} href={s.url} title={s.title} />
							))}
						</SourcesContent>
					</Sources>
				</div>
			</section>

			<section>
				<Label>Inline citation</Label>
				<p className="max-w-md text-sm leading-[1.7]">
					<InlineCitation>
						<InlineCitationText>
							Nvidia beat revenue estimates for the quarter
						</InlineCitationText>
						<InlineCitationCard>
							<InlineCitationCardTrigger sources={sources.map((s) => s.url)} />
							<InlineCitationCardBody>
								<InlineCitationCarousel>
									<InlineCitationCarouselHeader>
										<InlineCitationCarouselPrev />
										<InlineCitationCarouselNext />
										<InlineCitationCarouselIndex />
									</InlineCitationCarouselHeader>
									<InlineCitationCarouselContent>
										{sources.map((s) => (
											<InlineCitationCarouselItem key={s.url}>
												<InlineCitationSource title={s.title} url={s.url} />
												<InlineCitationQuote>{s.quote}</InlineCitationQuote>
											</InlineCitationCarouselItem>
										))}
									</InlineCitationCarouselContent>
								</InlineCitationCarousel>
							</InlineCitationCardBody>
						</InlineCitationCard>
					</InlineCitation>{" "}
					and raised guidance.
				</p>
			</section>

			<section className="flex flex-col gap-4">
				<Label>Plan</Label>
				<div className="flex flex-wrap gap-4">
					<PlanExample />
					<PlanExample streaming />
				</div>
				<RaisedSection>
					<PlanExample raised />
				</RaisedSection>
			</section>

			<section>
				<Label>Task</Label>
				<Task className="w-full max-w-[520px]">
					<TaskTrigger title="Update the weights file · 2 of 4" />
					<TaskContent>
						<TaskItem status="completed">
							Read <TaskItemFile>weights.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status="completed">Validate total = 100%</TaskItem>
						<TaskItem status="in-progress">
							Write <TaskItemFile>weights.ts</TaskItemFile>
						</TaskItem>
						<TaskItem status="pending">Run tests</TaskItem>
						<TaskItem status="error">Deploy preview failed</TaskItem>
					</TaskContent>
				</Task>
			</section>

			<section>
				<Label>Queue</Label>
				<Queue className="w-full max-w-[460px]">
					<QueueSection>
						<QueueSectionTrigger>
							<QueueSectionLabel label="Queued" count={3} />
						</QueueSectionTrigger>
						<QueueSectionContent>
							<QueueList>
								<QueueItem>
									<div className="flex items-start gap-2">
										<QueueItemIndicator />
										<QueueItemContent>Summarize Q3 filings</QueueItemContent>
										<QueueItemActions>
											<QueueItemAction aria-label="Edit">
												<IconPlaceholder
													lucide="PencilIcon"
													tabler="IconPencil"
													hugeicons="EditIcon"
													phosphor="PencilIcon"
													remixicon="RiPencilLine"
												/>
											</QueueItemAction>
											<QueueItemAction aria-label="Remove">
												<IconPlaceholder
													lucide="Trash2Icon"
													tabler="IconTrash"
													hugeicons="Delete02Icon"
													phosphor="TrashIcon"
													remixicon="RiDeleteBinLine"
												/>
											</QueueItemAction>
										</QueueItemActions>
									</div>
									<QueueItemDescription>For NVDAx, MSFTx</QueueItemDescription>
								</QueueItem>
								{["Draft a feed post about MAG4", "Compare fees with SPYx"].map(
									(t) => (
										<QueueItem key={t}>
											<div className="flex items-start gap-2">
												<QueueItemIndicator />
												<QueueItemContent>{t}</QueueItemContent>
											</div>
										</QueueItem>
									),
								)}
							</QueueList>
						</QueueSectionContent>
					</QueueSection>
					<QueueSection>
						<QueueSectionTrigger>
							<QueueSectionLabel label="Completed" count={2} />
						</QueueSectionTrigger>
						<QueueSectionContent>
							<QueueList>
								<QueueItem>
									<div className="flex items-start gap-2">
										<QueueItemIndicator completed />
										<QueueItemContent completed>
											Quote MAG4 legs
										</QueueItemContent>
									</div>
									<QueueItemAttachment>
										<QueueItemFile>quotes.csv</QueueItemFile>
									</QueueItemAttachment>
								</QueueItem>
							</QueueList>
						</QueueSectionContent>
					</QueueSection>
				</Queue>
			</section>

			<section>
				<Label>Checkpoint</Label>
				<Checkpoint className="w-full max-w-[560px]" time="14:02">
					<CheckpointIcon />
					<CheckpointTrigger tooltip="Restore the conversation and the agent's changes">
						<IconPlaceholder
							lucide="RotateCcwIcon"
							tabler="IconRotate"
							hugeicons="Undo02Icon"
							phosphor="ArrowCounterClockwiseIcon"
							remixicon="RiResetLeftLine"
						/>
						Restore checkpoint
					</CheckpointTrigger>
				</Checkpoint>
			</section>
		</div>
	);
}
