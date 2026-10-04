import {
	FeedPost,
	FeedPostContent,
	FeedPostFooter,
	FeedPostHeader,
	FeedPostIndex,
	FeedPostStat,
} from "@edmi-react/blocks/feed-post/feed-post";
import { Button } from "@edmi-react/ui/button";
import type { Elevation } from "@edmi-react/ui/elevation";
import { IconPlaceholder } from "@/edmi/icon-placeholder";

function Sample({ elevation }: { elevation: Elevation }) {
	return (
		<FeedPost elevation={elevation} className="w-[460px] max-w-full">
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

const levels = [
	{ value: "flat", label: "Flat (0)" },
	{ value: "raised", label: "Raised (+1)" },
	{ value: "floating", label: "Floating (+2)" },
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
