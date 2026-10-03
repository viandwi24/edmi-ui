import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { AgentCard } from "@/registry/edmi/blocks/agent-card/agent-card";
import { CodeBlock } from "@/registry/edmi/blocks/code-block/code-block";
import { FeatureRow } from "@/registry/edmi/blocks/feature-row/feature-row";
import {
	FeedPost,
	FeedPostContent,
	FeedPostFooter,
	FeedPostHeader,
	FeedPostIndex,
	FeedPostStat,
} from "@/registry/edmi/blocks/feed-post/feed-post";
import { SiteFooter } from "@/registry/edmi/blocks/footer/footer";
import {
	KanbanColumn,
	KanbanItem,
} from "@/registry/edmi/blocks/kanban-column/kanban-column";
import { PricingPlan } from "@/registry/edmi/blocks/pricing-plan/pricing-plan";
import { StepCard } from "@/registry/edmi/blocks/step-card/step-card";
import { TaskList } from "@/registry/edmi/blocks/task-list/task-list";
import { Button } from "@/registry/edmi/ui/button";
import { RaisedSection } from "./_raised";

function DemoFeedPost({ raised }: { raised?: boolean }) {
	return (
		<FeedPost raised={raised} className="w-[460px] max-w-full">
			<FeedPostHeader
				name="Dewi Lestari"
				handle="@dewi"
				time="2h"
				initials="DL"
			/>
			<FeedPostContent>
				Rebalanced MAG4 after NVDAx drifted to 32.4%. Fees this week: 4.1 USDC.
			</FeedPostContent>
			<FeedPostIndex
				icon={
					<IconPlaceholder
						lucide="ChartLineIcon"
						tabler="IconChartLine"
						hugeicons="ChartIcon"
						phosphor="ChartLineIcon"
						remixicon="RiLineChartLine"
					/>
				}
				title="MAG4 · Magnificent Four"
				description="$0.9998 · +0.53%"
				action={<Button size="sm">Join</Button>}
			/>
			<FeedPostFooter>
				<FeedPostStat>
					<IconPlaceholder
						lucide="HeartIcon"
						tabler="IconBell"
						hugeicons="Notification02Icon"
						phosphor="HeartIcon"
						remixicon="RiHeartLine"
					/>
					24
				</FeedPostStat>
				<FeedPostStat>
					<IconPlaceholder
						lucide="ListIcon"
						tabler="IconListDetails"
						hugeicons="Menu01Icon"
						phosphor="ListIcon"
						remixicon="RiListUnordered"
					/>
					6
				</FeedPostStat>
				<FeedPostStat>
					<IconPlaceholder
						lucide="LinkIcon"
						tabler="IconLink"
						hugeicons="LinkIcon"
						phosphor="LinkIcon"
						remixicon="RiLinksLine"
					/>
					Share
				</FeedPostStat>
			</FeedPostFooter>
		</FeedPost>
	);
}

function DemoAgentCard({ raised }: { raised?: boolean }) {
	return (
		<AgentCard
			raised={raised}
			className="w-[380px] max-w-full"
			name="XSD"
			tag="AI"
			autopilot
			address="dG6r…4mSr"
			stats={[
				{ label: "Indexes", value: "3" },
				{ label: "AUM", value: "$12.4K" },
				{ label: "Best 7d", value: "+4.1%" },
			]}
		/>
	);
}

function DemoFeatureRow({ raised }: { raised?: boolean }) {
	return (
		<div className="flex w-[420px] max-w-full flex-col gap-2">
			<FeatureRow raised={raised} index="1.1" title="Thesis and weights">
				Describe the thesis, pick up to 10 assets and set their weights.
			</FeatureRow>
			<FeatureRow raised={raised} index="1.2" title="Index identity" />
			<FeatureRow raised={raised} index="1.3" title="Vault deployment" />
		</div>
	);
}

function DemoStepCard({ raised }: { raised?: boolean }) {
	return (
		<div className="flex flex-wrap gap-3">
			<StepCard
				raised={raised}
				className="w-[200px]"
				index="01"
				title="Create"
				description="Pick up to 10 assets and set weights."
			/>
			<StepCard
				raised={raised}
				className="w-[200px]"
				index="02"
				title="Share"
				description="A link, OG image, feed card and Blink."
			/>
			<StepCard
				raised={raised}
				className="w-[200px]"
				index="03"
				title="Join"
				description="Investors pay in USDC in one click."
			/>
		</div>
	);
}

function DemoPricingPlan({ raised }: { raised?: boolean }) {
	return (
		<PricingPlan
			raised={raised}
			className="w-[300px] max-w-full"
			name="Creator"
			tagline="Launch your own index"
			price="1% fee to you"
			priceNote="Earned on every holder’s share."
			action={<Button size="lg">Launch an index</Button>}
			features={[
				"Custom weights and mandate",
				"Pre-IPO sleeve",
				"Share cards and Blinks",
			]}
		/>
	);
}

function DemoTaskList({ raised }: { raised?: boolean }) {
	return (
		<TaskList
			raised={raised}
			className="w-[300px] max-w-full"
			tasks={[
				{ title: "ICP analysis", agent: "Research agent", status: "review" },
				{ title: "Q1 analyst report", agent: "Vault agent", status: "running" },
				{
					title: "Q4 drift review",
					agent: "Keeper agent",
					status: "completed",
				},
				{
					title: "Rebalance playbook v2",
					agent: "Research agent",
					status: "completed",
				},
			]}
		/>
	);
}

const icon = (
	<IconPlaceholder
		lucide="SparklesIcon"
		tabler="IconSparkles"
		hugeicons="SparklesIcon"
		phosphor="SparkleIcon"
		remixicon="RiSparklingLine"
	/>
);

function DemoKanbanColumn({ raised }: { raised?: boolean }) {
	return (
		<div className="flex flex-wrap items-start gap-3">
			<KanbanColumn title="Thesis stage" meta="1/1">
				<KanbanItem
					raised={raised}
					icon={icon}
					title="Initial thesis"
					description="User task"
				/>
			</KanbanColumn>
			<KanbanColumn title="Mandate stage" meta="0/3">
				<KanbanItem
					raised={raised}
					disabled
					icon={icon}
					title="Pick tokens + weights"
					description="Agent task"
				/>
				<KanbanItem
					raised={raised}
					disabled
					icon={icon}
					title="Review mandate"
					description="Agent requests approval"
				/>
			</KanbanColumn>
		</div>
	);
}

function DemoCodeBlock({ raised }: { raised?: boolean }) {
	return (
		<CodeBlock
			raised={raised}
			className="w-[420px] max-w-full"
			title="Claude Code"
			code={"claude mcp add stockbreak \\\n  https://stockbreak.fun/api/mcp"}
			highlightLines={[2]}
		/>
	);
}

function DemoFooter({ raised }: { raised?: boolean }) {
	return (
		<SiteFooter
			raised={raised}
			className="w-full"
			brand={
				<span className="font-brand text-xl font-semibold tracking-tight">
					Stockbreak
				</span>
			}
			description="Turn a stock thesis into a token. Built on Solana devnet."
			socials={
				<>
					<Button variant="secondary" size="icon-sm" aria-label="X">
						<IconPlaceholder
							lucide="XIcon"
							tabler="IconX"
							hugeicons="Cancel01Icon"
							phosphor="XIcon"
							remixicon="RiCloseLine"
						/>
					</Button>
					<Button variant="secondary" size="icon-sm" aria-label="Link">
						<IconPlaceholder
							lucide="LinkIcon"
							tabler="IconLink"
							hugeicons="LinkIcon"
							phosphor="LinkIcon"
							remixicon="RiLinksLine"
						/>
					</Button>
				</>
			}
			columns={[
				{
					title: "Product",
					links: [
						{ label: "Explore", href: "#" },
						{ label: "Leaderboard", href: "#" },
						{ label: "Create index", href: "#" },
						{ label: "Faucet", href: "#" },
					],
				},
				{
					title: "Developers",
					links: [
						{ label: "Docs", href: "#" },
						{ label: "API", href: "#" },
						{ label: "MCP server", href: "#" },
					],
				},
				{
					title: "Company",
					links: [
						{ label: "About", href: "#" },
						{ label: "Careers", href: "#" },
						{ label: "Terms", href: "#" },
					],
				},
			]}
			legal="© 2026 Stockbreak"
			note="Not investment advice · devnet only"
		/>
	);
}

export default function PatternsTwoPreview() {
	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					feed-post
				</span>
				<DemoFeedPost />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					agent-card
				</span>
				<DemoAgentCard />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					feature-row
				</span>
				<DemoFeatureRow />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					step-card
				</span>
				<DemoStepCard />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					pricing-plan
				</span>
				<DemoPricingPlan />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					task-list
				</span>
				<DemoTaskList />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					kanban-column
				</span>
				<DemoKanbanColumn />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					code-block
				</span>
				<DemoCodeBlock />
			</section>
			<section className="flex flex-col gap-2">
				<span className="font-mono text-[10.5px] text-muted-foreground uppercase">
					footer
				</span>
				<DemoFooter />
			</section>
			<RaisedSection>
				<DemoFeedPost raised />
				<DemoAgentCard raised />
				<DemoFeatureRow raised />
				<DemoStepCard raised />
				<DemoPricingPlan raised />
				<DemoTaskList raised />
				<DemoKanbanColumn raised />
				<DemoCodeBlock raised />
				<DemoFooter raised />
			</RaisedSection>
		</div>
	);
}
