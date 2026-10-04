import {
	Bubble,
	BubbleContent,
	BubbleGroup,
	BubbleReaction,
	BubbleReactions,
} from "@edmi-react/ui/bubble";
import type { Elevation } from "@edmi-react/ui/elevation";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

const variants = [
	"default",
	"secondary",
	"muted",
	"tinted",
	"outline",
	"ghost",
	"destructive",
] as const;

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<div className="flex w-full max-w-md flex-col gap-4">
			<BubbleGroup>
				{variants.map((variant) => (
					<Bubble key={variant} variant={variant}>
						<BubbleContent>{variant} bubble</BubbleContent>
					</Bubble>
				))}
			</BubbleGroup>
			<BubbleGroup>
				<Bubble align="end">
					<BubbleContent>Run it and send me the transaction.</BubbleContent>
				</Bubble>
			</BubbleGroup>
			<Bubble variant="secondary" className="mb-3">
				<BubbleContent>The keeper just rebalanced MAG4.</BubbleContent>
				<BubbleReactions elevation={elevation}>
					<BubbleReaction active>👍 4</BubbleReaction>
					<BubbleReaction>🚀 2</BubbleReaction>
					<BubbleReaction aria-label="Add reaction">
						<IconPlaceholder
							lucide="SmileIcon"
							tabler="IconMoodSmile"
							hugeicons="SmileIcon"
							phosphor="SmileyIcon"
							remixicon="RiEmotionLine"
							className="size-3"
						/>
					</BubbleReaction>
				</BubbleReactions>
			</Bubble>
		</div>
	);
}

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
] as const;

export default function Demo() {
	return (
		<div className="flex flex-col gap-6">
			{levels.map(({ value, label }) => (
				<div key={value} className="flex flex-col gap-2">
					<p className="text-xs font-medium text-muted-foreground">{label}</p>
					<Sample elevation={value} />
				</div>
			))}
		</div>
	);
}
