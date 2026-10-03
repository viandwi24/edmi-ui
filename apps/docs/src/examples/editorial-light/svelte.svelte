<script lang="ts">
	import { Avatar, AvatarFallback } from "@edmi-svelte/ui/avatar";
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { FeatureRow } from "@edmi-svelte/ui/feature-row";
	import { SiteFooter } from "@edmi-svelte/ui/footer";
	import { SiteHeader } from "@edmi-svelte/ui/site-header";
	import { StatTile } from "@edmi-svelte/ui/stat-tile";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import {
		board,
		footer,
		guide,
		header,
		hero,
		intro,
		joiners,
		joinersFooter,
		launch,
		metrics,
		operate,
		workspace,
	} from "./data";
</script>

{#snippet action()}
	<Button raised>{header.cta}</Button>
{/snippet}

{#snippet sectionCopy(s: typeof launch)}
	<div class="flex flex-col gap-6">
		<div class="font-mono text-xs tracking-[2px] text-muted-foreground uppercase">{s.eyebrow}</div>
		<h2 class="text-[34px] leading-[1.1] font-normal tracking-[-1.5px] text-foreground-2 md:text-[44px]">
			{s.lead}<br />
			<span class="text-muted-foreground">{s.muted}</span>
		</h2>
		<p class="text-[15px] leading-relaxed text-muted-foreground">{s.body}</p>
		<div class="flex flex-col gap-2">
			{#each s.rows as r (r.index)}
				<FeatureRow raised index={r.index} title={r.title}>{r.body}</FeatureRow>
			{/each}
		</div>
	</div>
{/snippet}

<div class="min-h-svh overflow-x-clip bg-background text-foreground">
	<div class="border-b border-border">
		<div class="mx-auto max-w-[1328px] px-4 md:px-10">
			<SiteHeader
				raised
				class="border-0 bg-transparent px-0 shadow-none"
				lead={header.lead}
				steps={header.steps}
				links={header.links}
				{action}
			/>
		</div>
	</div>

	<main class="mx-auto flex max-w-[1328px] flex-col gap-28 px-4 pt-14 pb-20 md:gap-36 md:px-10 md:pt-20">
		<section class="flex flex-col gap-14">
			<h1 class="text-center text-[36px] leading-[1.08] font-normal tracking-[-1.8px] text-foreground-2 md:text-[64px]">
				{hero.lead}<br />
				<span class="text-muted-foreground">{hero.muted}</span>
			</h1>

			<Card raised class="gap-0 p-0 lg:flex-row">
				<div class="relative min-h-72 flex-1 border-b border-border p-5 lg:min-h-[480px] lg:border-r lg:border-b-0">
					<div class="flex items-center gap-3 text-[13px]">
						<Badge variant="secondary" class="h-8 gap-2 px-3">
							<span class="font-mono text-[10px]">SB</span>
							{workspace.project}
						</Badge>
						<span class="font-mono text-xs text-brand-text">{workspace.zoom}</span>
					</div>
					<div class="mx-auto mt-10 grid max-w-md grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3">
						{#each workspace.nodes as n (n)}
							<Card raised size="sm" class="items-center justify-center px-3 py-2 text-[13px]">
								{n}
							</Card>
						{/each}
					</div>
					<div class="absolute bottom-4 left-5 font-mono text-[11px] text-muted-foreground">{workspace.path}</div>
				</div>
				<div class="flex w-full flex-col gap-4 p-4 lg:w-[420px]">
					<Tabs.Root value="Home">
						<Tabs.List variant="line" class="flex-wrap">
							{#each workspace.tabs as t (t)}
								<Tabs.Trigger value={t}>{t}</Tabs.Trigger>
							{/each}
						</Tabs.List>
					</Tabs.Root>
					<div class="flex flex-col gap-3 text-[13px] leading-relaxed">
						{#each workspace.thread as m (m.text)}
							{#if m.role === "user"}
								<div class="ml-8 rounded-xl border border-border bg-muted px-4 py-3">{m.text}</div>
							{:else}
								<p class="text-muted-foreground">{m.text}</p>
							{/if}
						{/each}
						{#each workspace.tasks as t (t.name)}
							<div class="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
								<span class="font-medium">{t.name}</span>
								<span class="min-w-0 flex-1 truncate text-xs text-muted-foreground">{t.detail}</span>
								<Badge variant={t.tone === "running" ? "brand" : "secondary"}>{t.status}</Badge>
							</div>
						{/each}
					</div>
					<div class="mt-auto rounded-xl border border-border bg-card px-4 py-3 text-[13px] text-muted-foreground">
						{workspace.prompt}
					</div>
				</div>
			</Card>

			<div class="grid gap-8 md:grid-cols-3">
				{#each hero.columns as c (c.title)}
					<p class="text-lg leading-snug text-muted-foreground">
						<b class="font-medium text-foreground">{c.title} — </b>{c.body}
					</p>
				{/each}
			</div>
			<div class="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center md:flex-row md:text-left">
				<p class="text-lg text-muted-foreground">{hero.closing}</p>
				<Button raised size="lg" class="shrink-0">{hero.closingCta}</Button>
			</div>
		</section>

		<section class="flex flex-col gap-8">
			<div class="font-mono text-xs tracking-[2px] text-muted-foreground uppercase">{intro.eyebrow}</div>
			<h2 class="text-[40px] leading-[1.08] font-normal tracking-[-1.5px] text-foreground-2 md:text-[56px]">
				{intro.lead}<br />
				<span class="text-muted-foreground">{intro.muted}</span>
			</h2>
			<p class="max-w-xl text-[17px] leading-relaxed text-muted-foreground">{intro.body}</p>
		</section>

		<section id="launch" class="grid items-start gap-12 lg:grid-cols-[480px_1fr]">
			{@render sectionCopy(launch)}
			<Card raised class="gap-0 p-0 md:flex-row">
				{#each board as col (col.title)}
					<div class="flex flex-1 flex-col gap-3 border-b border-border p-4 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0">
						<div class="flex justify-between font-mono text-[11px] text-muted-foreground">
							<span>{col.title}</span>
							<span>{col.count}</span>
						</div>
						{#each col.cards as c (c.name)}
							<Card raised size="sm" class="gap-0 px-3 py-2.5">
								<div class="text-[13px]">{c.name}</div>
								<div class="text-[11px] text-muted-foreground">{c.sub}</div>
							</Card>
						{/each}
					</div>
				{/each}
			</Card>
		</section>

		<section id="operate" class="grid items-start gap-12 lg:grid-cols-[480px_1fr]">
			{@render sectionCopy(operate)}
			<div class="relative flex flex-col gap-4 lg:pb-32">
				<Card raised class="gap-4 p-5 lg:mr-24">
					<div class="grid gap-4 sm:grid-cols-3">
						{#each metrics as m (m.label)}
							<StatTile
								class="w-auto border-0 bg-transparent p-0 shadow-none"
								label={m.label}
								value={m.value}
								delta={m.delta}
								meter={{ value: m.fill }}
							/>
						{/each}
					</div>
				</Card>
				<Card raised class="gap-0 overflow-hidden p-0 lg:absolute lg:right-0 lg:bottom-0 lg:w-[360px]">
					<div class="flex items-center gap-2 border-b border-border bg-muted px-4 py-2.5 text-[13px]">
						<span class="size-2 rounded-full bg-brand"></span>
						Live joiners
					</div>
					{#each joiners as j (j.name)}
						<div class="flex items-center gap-3 border-b border-border-2 px-4 py-2.5">
							<Avatar>
								<AvatarFallback class="font-mono text-xs">{j.initials}</AvatarFallback>
							</Avatar>
							<div class="min-w-0 flex-1">
								<div class="text-[13px] font-medium">{j.name}</div>
								<div class="text-xs text-muted-foreground">{j.place}</div>
							</div>
							<Badge variant="brand">Joined</Badge>
						</div>
					{/each}
					<div class="bg-muted px-4 py-3 text-center text-xs text-muted-foreground">
						<b class="font-medium text-foreground">{joinersFooter.count}</b> {joinersFooter.text}
					</div>
				</Card>
			</div>
		</section>

		<section class="flex flex-col items-center gap-8">
			<h2 class="text-center text-[34px] leading-[1.1] font-normal tracking-[-1.5px] text-foreground-2 md:text-[52px]">{guide.title}</h2>
			<p class="max-w-md text-center text-muted-foreground">{guide.body}</p>
			<Button raised size="lg">{guide.cta}</Button>
			<div class="grid w-full max-w-[780px] gap-8 sm:grid-cols-2">
				{#each guide.chapters as c (c.n)}
					<div class="flex flex-col gap-3">
						<Card raised class="gap-4 p-5">
							<div class="text-xl leading-snug">
								Chapter {c.n}<br />
								{c.title}
							</div>
							<div class="border-t border-border pt-3 font-mono text-[10px] text-muted-foreground">Chapter {c.numeral}</div>
							<div class={`h-44 rounded-md ${c.tone}`}></div>
							<div class="flex justify-between font-mono text-[10px] text-muted-foreground">
								<span>by Stockbreak</span>
								<span>2026</span>
							</div>
						</Card>
						<span class="text-center font-mono text-[11px] text-muted-foreground">Read this chapter ({c.numeral})</span>
					</div>
				{/each}
			</div>
			<Button raised variant="outline">{guide.download}</Button>
		</section>

		<section class="flex flex-col gap-10">
			<h2 class="text-[34px] leading-[1.1] font-normal tracking-[-1.5px] text-foreground-2 md:text-[44px]">
				{footer.title}<br />
				<span class="text-muted-foreground">{footer.muted}</span>
			</h2>
			<div class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
				<span class="text-muted-foreground">How to</span>
				{#each footer.howTo as h (h)}
					<a href="#guide" class="hover:text-muted-foreground">{h}</a>
				{/each}
			</div>
			<Card raised class="max-w-md gap-4 p-5">
				<div class="h-40 rounded-md bg-chart-2"></div>
				<p class="text-[15px]">{footer.card.text}</p>
				<Button raised size="sm" variant="outline" class="w-fit">{footer.card.cta}</Button>
			</Card>
			<SiteFooter raised columns={footer.columns} legal={footer.legal} note={footer.note} />
		</section>
	</main>
</div>
