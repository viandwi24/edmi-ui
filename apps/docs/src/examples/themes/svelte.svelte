<script lang="ts">
	import { Badge } from "@edmi-svelte/ui/badge";
	import { Button } from "@edmi-svelte/ui/button";
	import { Card } from "@edmi-svelte/ui/card";
	import { Checkbox } from "@edmi-svelte/ui/checkbox";
	import { Input } from "@edmi-svelte/ui/input";
	import { Label } from "@edmi-svelte/ui/label";
	import { Switch } from "@edmi-svelte/ui/switch";
	import * as Tabs from "@edmi-svelte/ui/tabs";
	import * as ToggleGroup from "@edmi-svelte/ui/toggle-group";
	import { type ControlKey, controls, defaults, intro, preview, type State, snippet, snippetTitle } from "./data";

	let s = $state<State>({ ...defaults });
	const raised = $derived(s.raised === "raised");
	const code = $derived(snippet(s));
	function set(key: ControlKey, value: string | undefined) {
		if (value) s[key] = value;
	}
</script>

<div class="min-h-svh bg-background text-foreground">
	<div class="mx-auto flex max-w-[1100px] flex-col gap-8 px-4 py-10 md:px-10 md:py-14">
		<div class="flex flex-col gap-3">
			<h1 class="text-[40px] leading-tight font-normal tracking-[-1.5px] md:text-[52px]">{intro.title}</h1>
			<p class="max-w-2xl text-muted-foreground">{intro.body}</p>
		</div>

		<Card elevation="raised" class="gap-5 p-6">
			<div class="grid gap-5 sm:grid-cols-2">
				{#each controls as c (c.key)}
					<div class="flex flex-col gap-2">
						<div class="flex items-baseline gap-2">
							<span class="text-[13px] font-medium">{c.label}</span>
							<span class="font-mono text-[11px] text-muted-foreground">{c.hint}</span>
						</div>
						<ToggleGroup.Root
							type="single"
							elevation="raised"
							variant="segmented"
							class="flex-wrap"
							value={s[c.key]}
							onValueChange={(v) => set(c.key, v)}
						>
							{#each c.options as o (o.value)}
								<ToggleGroup.Item value={o.value}>{o.label}</ToggleGroup.Item>
							{/each}
						</ToggleGroup.Root>
					</div>
				{/each}
			</div>
		</Card>

		<div
			data-base={s.base}
			data-theme={s.theme}
			style="--radius: {s.radius}rem"
			class="{s.mode === 'dark' ? 'dark ' : 'edmi-light '}rounded-xl border border-border bg-background p-4 text-foreground sm:p-6"
		>
			<div class="grid gap-4 md:grid-cols-2">
				<Card elevation={raised ? "raised" : undefined} class="gap-4 px-5">
					<div class="flex items-center justify-between">
						<span class="text-lg font-medium">{preview.name} · {s.base}·{s.theme}</span>
						<Badge variant="success">Live</Badge>
					</div>
					<Tabs.Root value="nav">
						<Tabs.List elevation={raised ? "raised" : undefined}>
							{#each preview.tabs as t (t.value)}
								<Tabs.Trigger value={t.value}>{t.label}</Tabs.Trigger>
							{/each}
						</Tabs.List>
					</Tabs.Root>
					<div class="rounded-xl border border-border-2 bg-muted p-4">
						<div class="text-[13px] text-muted-foreground">{preview.aumLabel}</div>
						<div class="mt-1 flex items-center gap-3">
							<span class="font-mono text-3xl tracking-[-0.5px]">{preview.aum}</span>
							<Badge variant="success" shape="number">{preview.delta}</Badge>
						</div>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<Button elevation={raised ? "raised" : undefined} variant="brand">{preview.join}</Button>
						<Button elevation={raised ? "raised" : undefined} variant="outline">{preview.details}</Button>
						<Label class="ml-auto gap-2.5 text-[13px]">
							<Switch elevation={raised ? "raised" : undefined} checked />
							{preview.keeper}
						</Label>
					</div>
				</Card>

				<Card elevation={raised ? "raised" : undefined} class="gap-4 px-5">
					<div class="flex flex-wrap gap-2">
						{#each preview.variants as v (v)}
							<Button elevation={raised ? "raised" : undefined} variant={v} size="sm">{v}</Button>
						{/each}
					</div>
					<div class="flex flex-wrap gap-2">
						{#each preview.badges as b (b)}
							<Badge variant={b}>{b}</Badge>
						{/each}
					</div>
					<Input placeholder={preview.placeholder} />
					<Label class="gap-2.5 text-[13px]">
						<Checkbox elevation={raised ? "raised" : undefined} checked />
						{preview.mandate}
					</Label>
				</Card>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<span class="text-[13px] font-medium">{snippetTitle}</span>
			<pre class="overflow-x-auto rounded-xl border border-border bg-muted p-4 font-mono text-xs leading-relaxed">{code}</pre>
		</div>
	</div>
</div>
