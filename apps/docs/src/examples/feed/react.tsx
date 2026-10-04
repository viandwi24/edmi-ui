import { AppHeader } from "@edmi-react/blocks/app-header/app-header";
import {
	FeedPost,
	FeedPostContent,
	FeedPostFooter,
	FeedPostHeader,
	FeedPostIndex,
	FeedPostStat,
} from "@edmi-react/blocks/feed-post/feed-post";
import { Avatar, AvatarFallback, AvatarGroup } from "@edmi-react/ui/avatar";
import { Button } from "@edmi-react/ui/button";
import { Card } from "@edmi-react/ui/card";
import { ElevationProvider } from "@edmi-react/ui/elevation";
import { Textarea } from "@edmi-react/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@edmi-react/ui/toggle-group";
import { useState } from "react";
import { IconPlaceholder } from "@/edmi/icon-placeholder";
import { maxChars, moreUpdates, nav, posts, updates, views } from "./data";

export default function FeedExample() {
	const [view, setView] = useState("following");
	const [draft, setDraft] = useState("");

	return (
		<ElevationProvider mode="layered">
			<div className="min-h-svh bg-background text-foreground">
				<div className="border-b border-border">
					<div className="mx-auto flex max-w-[1328px] items-center gap-2 px-4 py-3 md:px-10">
						<AppHeader
							className="flex-1 border-0 bg-transparent px-0 py-0 shadow-none"
							items={nav}
							active="#feed"
							onConnect={() => {}}
						/>
					</div>
				</div>
				<div className="mx-auto flex w-full max-w-[1328px] flex-col gap-6 px-4 py-8 md:px-10">
					<div className="flex flex-wrap items-end justify-between gap-4">
						<div>
							<h1 className="text-[44px] leading-tight font-normal tracking-[-1.5px]">
								Feed
							</h1>
							<p className="mt-1 text-lg text-muted-foreground">
								Ideas from creators and what happens on chain.
							</p>
						</div>
						<ToggleGroup
							elevation="raised"
							variant="segmented"
							value={[view]}
							onValueChange={(v) => v[0] && setView(v[0])}
							aria-label="Feed view"
						>
							{views.map((v) => (
								<ToggleGroupItem key={v.value} value={v.value}>
									{v.label}
								</ToggleGroupItem>
							))}
						</ToggleGroup>
					</div>

					<Card className="gap-0 p-0">
						<Textarea
							value={draft}
							maxLength={maxChars}
							onChange={(e) => setDraft(e.target.value)}
							placeholder="Share a thesis, a trade idea or an update…"
							aria-label="New post"
							className="min-h-[96px] resize-none rounded-none border-0 bg-transparent px-6 pt-6 shadow-none focus-visible:shadow-none"
						/>
						<div className="mx-6 flex flex-wrap items-center gap-3 border-t border-border-2 py-4">
							<span className="flex-1 text-[13px] text-muted-foreground">
								Plain text · up to 2 links · needs on-chain activity
							</span>
							<span className="font-mono text-[13px] text-muted-foreground">
								{draft.length}/{maxChars}
							</span>
							<Button onClick={() => setDraft("")}>Post</Button>
						</div>
					</Card>

					{view === "all"
						? posts.map((p) => (
								<FeedPost key={p.id} elevation="raised">
									<FeedPostHeader
										name={p.name}
										handle={p.handle}
										time={p.time}
										initials={p.initials}
									/>
									<FeedPostContent>{p.text}</FeedPostContent>
									<FeedPostIndex
										title={p.index.title}
										description={p.index.description}
										icon={
											<IconPlaceholder
												lucide="ChartLineIcon"
												tabler="IconChartLine"
												hugeicons="ChartIcon"
												phosphor="ChartLineIcon"
												remixicon="RiLineChartLine"
											/>
										}
										action={
											<Button elevation="raised" size="sm">
												Join
											</Button>
										}
									/>
									<FeedPostFooter>
										<FeedPostStat>
											<IconPlaceholder
												lucide="HeartIcon"
												tabler="IconHeart"
												hugeicons="FavouriteIcon"
												phosphor="HeartIcon"
												remixicon="RiHeartLine"
											/>
											{p.likes}
										</FeedPostStat>
										<FeedPostStat>
											<IconPlaceholder
												lucide="MessageSquareIcon"
												tabler="IconMessage"
												hugeicons="Comment01Icon"
												phosphor="ChatIcon"
												remixicon="RiChat1Line"
											/>
											{p.replies}
										</FeedPostStat>
									</FeedPostFooter>
								</FeedPost>
							))
						: null}

					<Card className="gap-0 p-0">
						<ul className="px-6">
							{updates.map((u) => (
								<li
									key={u.id}
									className="flex items-center gap-3 border-b border-border-2 py-4"
								>
									<span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-muted font-mono text-xs">
										{u.initial}
									</span>
									<div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1 text-[14px]">
										<span className="font-mono font-semibold">{u.who}</span>
										<span className="text-foreground-2">
											{u.action}
											{u.detail ? ` · ${u.detail}` : ""}
										</span>
										<span className="text-muted-foreground">·</span>
										<span className="font-mono font-semibold">{u.symbol}</span>
										<AvatarGroup>
											{u.tokens.map((t) => (
												<Avatar key={t} className="size-7">
													<AvatarFallback className="text-[10px]">
														{t}
													</AvatarFallback>
												</Avatar>
											))}
										</AvatarGroup>
									</div>
									<span className="text-[13px] whitespace-nowrap text-muted-foreground">
										{u.ago}
									</span>
								</li>
							))}
						</ul>
						<div className="px-6 py-4 text-[13px] text-muted-foreground">
							Show {moreUpdates} more updates
						</div>
					</Card>

					<div className="flex justify-center">
						<Button elevation="raised" variant="outline" size="lg">
							Load more
						</Button>
					</div>
				</div>
			</div>
		</ElevationProvider>
	);
}
