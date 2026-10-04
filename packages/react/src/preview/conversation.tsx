import { IconPlaceholder } from "@/edmi/icon-placeholder";
import {
	Bubble,
	BubbleContent,
	BubbleGroup,
	BubbleReaction,
	BubbleReactions,
} from "@/registry/edmi/ui/bubble";
import { Marker, MarkerContent, MarkerIcon } from "@/registry/edmi/ui/marker";
import {
	Message,
	MessageAvatar,
	MessageContent,
	MessageFooter,
	MessageHeader,
} from "@/registry/edmi/ui/message";
import {
	MessageScroller,
	MessageScrollerButton,
	MessageScrollerContent,
	MessageScrollerItem,
	MessageScrollerProvider,
	MessageScrollerViewport,
} from "@/registry/edmi/ui/message-scroller";
import {
	Questionnaire,
	QuestionnaireActions,
	QuestionnaireChoice,
	QuestionnaireChoices,
	QuestionnaireDescription,
	QuestionnaireInput,
	QuestionnaireItem,
	QuestionnaireNext,
	QuestionnairePrevious,
	QuestionnaireProgress,
	QuestionnaireSkip,
	QuestionnaireTitle,
} from "@/registry/edmi/ui/questionnaire";
import { ElevationSection } from "./_elevation";

const variants = [
	"default",
	"secondary",
	"muted",
	"tinted",
	"outline",
	"ghost",
	"destructive",
] as const;

export default function ConversationPreview() {
	return (
		<div className="flex max-w-lg flex-col gap-8">
			<BubbleGroup className="items-start">
				{variants.map((v) => (
					<Bubble key={v} variant={v}>
						<BubbleContent>{v}</BubbleContent>
					</Bubble>
				))}
			</BubbleGroup>
			<Bubble variant="secondary" className="mb-3">
				<BubbleContent>The keeper just rebalanced MAG4.</BubbleContent>
				<BubbleReactions>
					<BubbleReaction active>👍 4</BubbleReaction>
					<BubbleReaction>🚀 2</BubbleReaction>
				</BubbleReactions>
			</Bubble>
			<Message>
				<MessageAvatar className="size-6 border border-border bg-brand-soft text-brand-text">
					<IconPlaceholder
						lucide="SparklesIcon"
						tabler="IconSparkles"
						hugeicons="SparklesIcon"
						phosphor="SparkleIcon"
						remixicon="RiSparklingLine"
						className="size-3"
					/>
				</MessageAvatar>
				<MessageContent>
					<MessageHeader>
						<b className="text-foreground">Research agent</b> 09:41
					</MessageHeader>
					<Bubble variant="ghost">
						<BubbleContent>
							I screened the megacaps against your mandate.
						</BubbleContent>
					</Bubble>
					<MessageFooter>Sent · 09:43</MessageFooter>
				</MessageContent>
			</Message>
			<Message align="end">
				<MessageAvatar className="size-6 bg-linear-to-br from-brand to-info text-[10px] font-medium text-white">
					DL
				</MessageAvatar>
				<MessageContent>
					<Bubble align="end">
						<BubbleContent>Run it and send me the transaction.</BubbleContent>
					</Bubble>
				</MessageContent>
			</Message>
			<Marker variant="separator">
				<MarkerContent>Today</MarkerContent>
			</Marker>
			<Marker>
				<MarkerIcon>
					<IconPlaceholder
						lucide="SparklesIcon"
						tabler="IconSparkles"
						hugeicons="SparklesIcon"
						phosphor="SparkleIcon"
						remixicon="RiSparklingLine"
					/>
				</MarkerIcon>
				<MarkerContent>Keeper rebalanced MAG4 · 3 trades</MarkerContent>
			</Marker>
			<Marker variant="border">
				<MarkerContent>Transaction confirmed</MarkerContent>
			</Marker>
			<div className="h-56 rounded-xl border border-border bg-card p-3">
				<MessageScrollerProvider autoScroll>
					<MessageScroller>
						<MessageScrollerViewport>
							<MessageScrollerContent className="gap-3">
								{Array.from({ length: 10 }, (_, i) => `m${i}`).map((id, i) => (
									<MessageScrollerItem key={id} messageId={id}>
										<Bubble variant="secondary">
											<BubbleContent>Message {i + 1}</BubbleContent>
										</Bubble>
									</MessageScrollerItem>
								))}
							</MessageScrollerContent>
						</MessageScrollerViewport>
						<MessageScrollerButton />
					</MessageScroller>
				</MessageScrollerProvider>
			</div>
			<Questionnaire
				items={[
					{ name: "q1", choices: [{ value: "a" }, { value: "b" }] },
					{ name: "q2" },
				]}
				shortcuts="letters"
				className="rounded-2xl border border-border bg-card p-6"
			>
				<QuestionnaireProgress />
				<QuestionnaireItem name="q1">
					<QuestionnaireTitle>
						How should the index rebalance?
					</QuestionnaireTitle>
					<QuestionnaireDescription>
						Change this later.
					</QuestionnaireDescription>
					<QuestionnaireChoices>
						<QuestionnaireChoice value="a">On drift</QuestionnaireChoice>
						<QuestionnaireChoice value="b">On a schedule</QuestionnaireChoice>
					</QuestionnaireChoices>
				</QuestionnaireItem>
				<QuestionnaireItem name="q2">
					<QuestionnaireTitle>Anything else?</QuestionnaireTitle>
					<QuestionnaireInput placeholder="Something else…" />
				</QuestionnaireItem>
				<QuestionnaireActions>
					<QuestionnairePrevious />
					<QuestionnaireSkip />
					<QuestionnaireNext />
				</QuestionnaireActions>
			</Questionnaire>
			<ElevationSection>
				<Bubble variant="secondary" className="mb-3">
					<BubbleContent>The keeper just rebalanced MAG4.</BubbleContent>
					<BubbleReactions elevation="raised">
						<BubbleReaction active>👍 4</BubbleReaction>
						<BubbleReaction>🚀 2</BubbleReaction>
					</BubbleReactions>
				</Bubble>
				<Questionnaire
					elevation="raised"
					items={[{ name: "q1", choices: [{ value: "a" }, { value: "b" }] }]}
					shortcuts="letters"
					className="rounded-2xl border border-border bg-card p-6"
				>
					<QuestionnaireItem name="q1">
						<QuestionnaireTitle>
							How should the index rebalance?
						</QuestionnaireTitle>
						<QuestionnaireChoices>
							<QuestionnaireChoice value="a">On drift</QuestionnaireChoice>
							<QuestionnaireChoice value="b">On a schedule</QuestionnaireChoice>
						</QuestionnaireChoices>
					</QuestionnaireItem>
				</Questionnaire>
			</ElevationSection>
		</div>
	);
}
