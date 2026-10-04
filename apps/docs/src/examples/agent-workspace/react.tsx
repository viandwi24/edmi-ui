import { AgentAvatar } from "@edmi-react/components/ai/agent-avatar";
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
	Reasoning,
	ReasoningContent,
	ReasoningTrigger,
} from "@edmi-react/components/ai/reasoning";
import { Suggestion } from "@edmi-react/components/ai/suggestion";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import {
	InsetPanel,
	InsetPanelBody,
	InsetPanelHeader,
} from "@edmi-react/ui/inset-panel";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemGroup,
	ItemMedia,
	ItemSeparator,
	ItemTitle,
} from "@edmi-react/ui/item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@edmi-react/ui/tabs";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	agent,
	agentReply,
	composerPlaceholder,
	index,
	reasoning,
	reply,
	suggestions,
	tabs,
	userMessage,
} from "./data";

const setupIcon = {
	domain: (
		<IconPlaceholder
			lucide="GlobeIcon"
			tabler="IconWorld"
			hugeicons="Globe02Icon"
			phosphor="GlobeIcon"
			remixicon="RiGlobalLine"
		/>
	),
	email: (
		<IconPlaceholder
			lucide="MailIcon"
			tabler="IconMail"
			hugeicons="Mail01Icon"
			phosphor="EnvelopeSimpleIcon"
			remixicon="RiMailLine"
		/>
	),
	fees: (
		<IconPlaceholder
			lucide="CreditCardIcon"
			tabler="IconCreditCard"
			hugeicons="CreditCardIcon"
			phosphor="CreditCardIcon"
			remixicon="RiBankCardLine"
		/>
	),
	rpc: (
		<IconPlaceholder
			lucide="ServerIcon"
			tabler="IconServer"
			hugeicons="ServerStackIcon"
			phosphor="HardDrivesIcon"
			remixicon="RiHardDriveLine"
		/>
	),
};

const sectionLabel = "mt-[22px] mb-2.5 text-[15px] text-foreground-2";

function AgentTab() {
	return (
		<>
			<div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
				<div className="flex items-center justify-between gap-2">
					<Reasoning
						defaultOpen={false}
						duration={4}
						className="min-w-0 flex-1"
					>
						<ReasoningTrigger getThinkingMessage={() => reasoning.label} />
						<ReasoningContent>{reasoning.text}</ReasoningContent>
					</Reasoning>
					<Button
						aria-label="More"
						size="icon-xs"
						type="button"
						variant="ghost"
					>
						<IconPlaceholder
							lucide="MoreHorizontalIcon"
							tabler="IconDots"
							hugeicons="MoreHorizontalCircle01Icon"
							phosphor="DotsThreeOutlineIcon"
							remixicon="RiMoreLine"
							className="size-4"
						/>
					</Button>
				</div>
				<div className="mt-3 flex flex-col gap-[18px]">
					<Message from="assistant">
						<MessageContent>
							<MessageResponse>{reply}</MessageResponse>
						</MessageContent>
					</Message>
					<Message from="user">
						<MessageContent>{userMessage}</MessageContent>
					</Message>
					<Message from="assistant">
						<div className="flex items-center gap-2 text-sm text-muted-foreground">
							<AgentAvatar
								seed={agent.id}
								color={agent.color}
								size={19}
								tile={false}
							/>
							{agent.name}
						</div>
						<MessageContent>{agentReply}</MessageContent>
					</Message>
					<div className="flex flex-col gap-2">
						{suggestions.map((s) => (
							<Suggestion
								key={s.title}
								suggestion={s.title}
								variant="card"
								className="w-full bg-card"
							>
								{s.note}
							</Suggestion>
						))}
					</div>
				</div>
			</div>
			<div className="px-2.5 pb-2.5">
				<PromptInput
					raised
					onSubmit={() => {}}
					className="[&_[data-slot=input-group]]:bg-muted"
				>
					<PromptInputHeader>
						<PromptInputAgent agent={agent} />
					</PromptInputHeader>
					<PromptInputBody>
						<PromptInputTextarea placeholder={composerPlaceholder} />
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
		</>
	);
}

function IndexTab() {
	return (
		<div className="min-h-0 flex-1 overflow-y-auto px-[18px] pt-[18px] pb-6">
			<div className="flex items-center justify-between">
				<span className="text-xl font-medium">{index.name}</span>
				<Button
					aria-label="Edit"
					size="icon-sm"
					type="button"
					variant="outline"
					className="rounded-full"
				>
					<IconPlaceholder
						lucide="PencilIcon"
						tabler="IconPencil"
						hugeicons="PencilEdit01Icon"
						phosphor="PencilSimpleIcon"
						remixicon="RiPencilLine"
						className="size-4"
					/>
				</Button>
			</div>

			<div className={sectionLabel}>Stack</div>
			<Card className="gap-0 py-0">
				<ItemGroup>
					{index.stack.map((row, i) => (
						<div key={row.title}>
							{i > 0 && <ItemSeparator className="my-0" />}
							<Item>
								<ItemMedia variant="icon">{setupIcon[row.icon]}</ItemMedia>
								<ItemContent>
									<ItemTitle>{row.title}</ItemTitle>
									<ItemDescription>{row.note}</ItemDescription>
								</ItemContent>
								<ItemActions>
									<Button
										elevation="raised"
										size="sm"
										type="button"
										variant="outline"
									>
										{row.action}
									</Button>
								</ItemActions>
							</Item>
						</div>
					))}
				</ItemGroup>
			</Card>

			<div className={sectionLabel}>Important links</div>
			<Card className="gap-0 py-0">
				<ItemGroup>
					{index.links.map((row, i) => (
						<div key={row.title}>
							{i > 0 && <ItemSeparator className="my-0" />}
							<Item size="sm">
								<ItemContent>
									<ItemTitle>{row.title}</ItemTitle>
									<ItemDescription>{row.note}</ItemDescription>
								</ItemContent>
								<IconPlaceholder
									lucide="ChevronRightIcon"
									tabler="IconChevronRight"
									hugeicons="ArrowRight01Icon"
									phosphor="CaretRightIcon"
									remixicon="RiArrowRightSLine"
									className="size-4 text-muted-foreground"
								/>
							</Item>
						</div>
					))}
				</ItemGroup>
			</Card>

			<div className={sectionLabel}>Agents</div>
			<Card className="gap-0 py-0">
				<ItemGroup>
					{index.agents.map((row, i) => (
						<div key={row.id}>
							{i > 0 && <ItemSeparator className="my-0" />}
							<Item>
								<ItemMedia>
									<AgentAvatar seed={row.id} color={row.color} size={40} />
								</ItemMedia>
								<ItemContent>
									<ItemTitle>{row.name}</ItemTitle>
									<ItemDescription>{row.note}</ItemDescription>
								</ItemContent>
							</Item>
						</div>
					))}
				</ItemGroup>
			</Card>
		</div>
	);
}

function Panel({ value }: { value: string }) {
	return (
		<Tabs
			defaultValue={value}
			className="h-[calc(100svh-3rem)] max-h-[900px] w-full max-w-[440px] gap-0"
		>
			<InsetPanel className="h-full">
				<InsetPanelHeader className="px-3.5">
					<TabsList variant="pills">
						{tabs.map((t) => (
							<TabsTrigger key={t} value={t.toLowerCase()}>
								{t}
							</TabsTrigger>
						))}
					</TabsList>
				</InsetPanelHeader>
				<InsetPanelBody className="flex flex-col">
					<TabsContent value="agent" className="flex min-h-0 flex-1 flex-col">
						<AgentTab />
					</TabsContent>
					<TabsContent value="index" className="flex min-h-0 flex-1 flex-col">
						<IndexTab />
					</TabsContent>
					{["tasks", "library"].map((v) => (
						<TabsContent
							key={v}
							value={v}
							className="p-5 text-sm text-muted-foreground"
						>
							Nothing here yet.
						</TabsContent>
					))}
				</InsetPanelBody>
			</InsetPanel>
		</Tabs>
	);
}

export default function AgentWorkspaceExample() {
	return (
		<div className="flex min-h-svh items-start justify-center gap-6 bg-background p-6 text-foreground">
			<Panel value="agent" />
			<div className="hidden w-full max-w-[440px] min-[960px]:block">
				<Panel value="index" />
			</div>
		</div>
	);
}
